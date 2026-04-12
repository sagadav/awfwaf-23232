<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;

/**
 * Загрузка списка резюме со страницы ЛК соискателя HH (сессионные куки).
 */
class HhResumeListService
{
    public function fetchForUser(User $user): array
    {
        if (! $user->hh_token || ! $user->hh_xsrf) {
            return [
                'ok' => false,
                'error' => 'no_hh_session',
                'message' => 'Сессия HeadHunter не найдена. Выйдите и войдите снова через HH.',
            ];
        }

        $parts = [
            'hhtoken='.$user->hh_token,
            'hhul='.rawurlencode((string) $user->hh_hhul),
            'crypted_hhuid='.rawurlencode((string) $user->hh_crypted_id),
            '_xsrf='.rawurlencode((string) $user->hh_xsrf),
        ];
        $cookie = implode('; ', $parts);

        $response = Http::withOptions(['verify' => false])
            ->withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language' => 'ru-RU,ru;q=0.9,en;q=0.5',
                'Cookie' => $cookie,
                'Referer' => 'https://hh.ru/',
            ])
            ->get('https://hh.ru/applicant/resumes');

        if (! $response->successful()) {
            return [
                'ok' => false,
                'error' => 'hh_request_failed',
                'message' => 'Не удалось загрузить список резюме с HH (код '.$response->status().').',
            ];
        }

        $html = $response->body();
        $items = $this->parseResumesFromHtml($html);

        if ($items === []) {
            return [
                'ok' => false,
                'error' => 'parse_failed',
                'message' => 'Не удалось разобрать страницу резюме. Укажите ссылку на резюме вручную.',
            ];
        }

        return ['ok' => true, 'data' => $items];
    }

    /**
     * @return list<array{hash: string, title: string, url: string}>
     */
    private function parseResumesFromHtml(string $html): array
    {
        $byHash = [];

        // data-qa="resume-title" рядом с карточкой / ссылкой на резюме
        if (preg_match_all(
            '/data-qa="resume-title"[^>]*>([^<]+)</u',
            $html,
            $titles,
            PREG_OFFSET_CAPTURE
        )) {
            foreach ($titles[1] as $match) {
                $title = trim(html_entity_decode($match[0], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
                $pos = $match[1];
                $window = substr($html, max(0, $pos - 2500), 5000);
                if (preg_match('#/resume/([A-Za-z0-9]+)#', $window, $hm)) {
                    $hash = $hm[1];
                    if (! isset($byHash[$hash]) && $title !== '') {
                        $byHash[$hash] = [
                            'hash' => $hash,
                            'title' => $title,
                            'url' => 'https://hh.ru/resume/'.$hash,
                        ];
                    }
                }
            }
        }

        // Запасной вариант: все ссылки на /resume/HASH
        if (preg_match_all('#href="(?:https://[^/]+)?/resume/([A-Za-z0-9]+)#', $html, $m)) {
            foreach ($m[1] as $hash) {
                if (! isset($byHash[$hash])) {
                    $byHash[$hash] = [
                        'hash' => $hash,
                        'title' => 'Резюме',
                        'url' => 'https://hh.ru/resume/'.$hash,
                    ];
                }
            }
        }

        return array_values($byHash);
    }
}
