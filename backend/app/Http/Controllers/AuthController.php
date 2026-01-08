<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
        ]);

        $login = $request->input('login');
        $otpType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'sms';
        
        try {
            // Get fresh XSRF token
            $xsrf = $this->getXsrfToken() ?? 'test';
            
            $response = Http::asMultipart()
                ->withOptions(["verify" => false])
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept' => 'application/json',
                    'Accept-Language' => 'ru',
                    'X-Xsrftoken' => $xsrf,
                    'X-Requested-With' => 'XMLHttpRequest',
                    'X-hhtmSource' => 'account_login',
                    'Origin' => 'https://hh.ru',
                    'Referer' => 'https://hh.ru/account/login?role=applicant',
                    'Cookie' => "_xsrf=$xsrf;",
                ])
                ->post('https://hh.ru/account/otp_generate', [
                    ['name' => 'login', 'contents' => $login],
                    ['name' => 'otpType', 'contents' => $otpType],
                    ['name' => 'operationType', 'contents' => 'applicant_otp_auth'],
                    ['name' => 'isSignupPage', 'contents' => 'false'],
                    ['name' => 'captchaText', 'contents' => ''],
                ]);

            $data = $response->json();

            // Check for Captcha (isBot)
            if (isset($data['hhcaptcha']) && ($data['hhcaptcha']['isBot'] ?? false) === true) {
                $captchaState = $data['hhcaptcha']['captchaState'] ?? null;
                
                if ($captchaState) {
                    // Construct the iOS-style Captcha URL
                    // Generate a unique UUID to mimic a fresh mobile device installation
                    $uuid = strtoupper((string) \Illuminate\Support\Str::uuid());
                    // Mimic iPhone 14 Plus User-Agent
                    $ua = "ApplicantHH (iPhone 14 Plus; iOS 18.1; Version/7.145.133747; UUID {$uuid}; ru.hh.iphone)";
                    
                    $query = http_build_query([
                        'backurl' => 'hhios://backurlsHostForCustomScheme/captchaSuccessBackurl',
                        'hhmobile_user_agent' => base64_encode($ua),
                        'hhmobile_uuid' => $uuid,
                        'session_language' => 'EN',
                        'state' => $captchaState,
                    ]);
                    
                    return response()->json([
                        'success' => false,
                        'is_bot' => true,
                        'message' => 'Требуется капча',
                        'captcha_url' => "https://hh.ru/account/captcha?{$query}",
                        'hh_response' => $data,
                    ], 403);
                }
            }

            if (!$response->successful()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Не удалось отправить код',
                    'hh_response' => $data,
                ], 400);
            }

            // Return session data to client (stateless REST)
            return response()->json([
                'success' => true,
                'hh_response' => $response->json(),
                'message' => 'Код отправлен на ' . $login,
                'session_data' => [
                    'login' => $login,
                    'otp_type' => $otpType,
                    'xsrf' => $xsrf,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|string|size:4',
            'session_data' => 'required|array',
            'session_data.login' => 'required|string',
            'session_data.otp_type' => 'required|string',
            'session_data.xsrf' => 'required|string',
        ]);

        $code = $request->input('code');
        $sessionData = $request->input('session_data');

        try {
            // Verify code with HH.ru
            $response = Http::asMultipart()
                ->withOptions(["verify" => false])
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept' => 'application/json',
                    'Accept-Language' => 'ru',
                    'X-Xsrftoken' => $sessionData['xsrf'],
                    'X-Requested-With' => 'XMLHttpRequest',
                    'X-hhtmSource' => 'account_login',
                    'Origin' => 'https://hh.ru',
                    'Referer' => 'https://hh.ru/account/login?role=applicant',
                    'Cookie' => "_xsrf={$sessionData['xsrf']};",
                ])
                ->post('https://hh.ru/account/login/by_code', [
                    'code' => $code,
                    'operationType' => 'applicant_otp_auth',
                    'isSignupPage' => 'false',
                    'remember' => true,
                    'username' => $sessionData['login'],
                ]);

            if (!$response->successful()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Неверный код',
                    'hh_response' => $response->json(),
                ], 400);
            }

            // --- AUTO-CLICK LOGIC: Follow up with GET request to capture final cookies ---
            $authCookies = [];
            foreach ($response->cookies() as $cookie) {
                $authCookies[$cookie->getName()] = $cookie->getValue();
            }
            // Ensure xsrf is included
            if (!isset($authCookies['_xsrf'])) {
                $authCookies['_xsrf'] = $sessionData['xsrf'];
            }

            try {
                $getResponse = Http::withOptions(["verify" => false])
                    ->withCookies($authCookies, '.hh.ru')
                    ->withHeaders([
                        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                        'Referer' => 'https://hh.ru/account/login?role=applicant',
                    ])
                    ->get('https://hh.ru/');
                
                $getCookies = $getResponse->cookies()->toArray();
                logger()->info('GET hh.ru cookies:', $getCookies);
                
                // Merge cookies, prioritizing the latest (GET response)
                $allCookies = array_merge($getCookies, $response->cookies()->toArray());
            } catch (\Exception $e) {
                logger()->error('Failed GET hh.ru follow-up', ['error' => $e->getMessage()]);
                $allCookies = $response->cookies()->toArray();
            }

            // Extract tokens from combined cookies
            $cookies = $allCookies;
            
            $hhToken = $this->extractCookie($cookies, 'hhtoken');
            $hhul = $this->extractCookie($cookies, 'hhul');
            $cryptedId = $this->extractCookie($cookies, 'crypted_hhuid');

            // Create or update user
            $user = User::updateOrCreate(
                $sessionData['otp_type'] === 'email' 
                    ? ['email' => $sessionData['login']]
                    : ['phone' => $sessionData['login']],
                [
                    'hh_token' => $hhToken,
                    'hh_hhul' => $hhul,
                    'hh_crypted_id' => $cryptedId,
                    'hh_xsrf' => $sessionData['xsrf'],
                    'hh_token_expires_at' => now()->addDays(30),
                ]
            );

            // Generate API token (using Sanctum if installed)
            $token = $user->createToken('auth_token')->plainTextToken ?? null;

            return response()->json([
                'success' => true,
                'message' => 'Авторизация успешна',
                'user' => $user,
                'token' => $token,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function getXsrfToken(): ?string
    {
        try {
            $response = Http::withOptions(["verify" => false])
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept' => 'application/json',
                    'Accept-Language' => 'ru',
                    'X-Requested-With' => 'XMLHttpRequest',
                    'X-hhtmSource' => 'account_login',
                    'Origin' => 'https://hh.ru',
                    'Referer' => 'https://hh.ru/account/login?role=applicant',
                ])
                ->post('https://hh.ru/account/login?role=applicant', [
                    'login' => 'adawd@awd.ru',
                    'otpType' => 'email',
                    'operationType' => 'applicant_otp_auth',
                    'isSignupPage' => 'false',
                    'captchaText' => '',
                ]);
            
            $cookies = $response->cookies()->toArray();
            // logger()->info(1, $cookies);
            return $this->extractCookie($cookies, '_xsrf');
        } catch (\Exception $e) {
            return null;
        }
    }

    private function extractCookie(array $cookies, string $name): ?string
    {
        foreach ($cookies as $cookie) {
            if (isset($cookie['name']) && $cookie['name'] === $name || isset($cookie['Name']) && $cookie['Name'] === $name) {
                return $cookie['value'] ?? $cookie['Value'];
            }
        }
        return null;
    }
}
