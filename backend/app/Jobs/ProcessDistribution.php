<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessDistribution implements ShouldQueue
{
    use Queueable;

    protected $distribution;

    /**
     * Create a new job instance.
     */
    public function __construct($distribution)
    {
        $this->distribution = $distribution;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Refresh distribution data from DB to get latest status
        $this->distribution->refresh();

        if ($this->distribution->status !== 'active') {
            \Log::info("Distribution {$this->distribution->id} is not active (status: {$this->distribution->status}). Skipping.");
            return;
        }

        $user = $this->distribution->user;
        $filters = $this->distribution->search_filters;
        $text = str_replace(' ', '+', $filters['query'] ?? '');
        // 1. Получаем путь из URL (отбрасываем домен и параметры после ?)
        $path = parse_url($this->distribution->resume_link, PHP_URL_PATH);
        // 2. Берем последнюю часть пути (имя "файла")
        $hash = basename($path);
        $data = [
            'distribution_id' => $this->distribution->id,
            'user_id' => $user->id,
            'hhtoken' => $user->hh_token,
            'xsrf' => $user->hh_xsrf,
            'hhul' => $user->hh_hhul,
            'crypted_id' => $user->hh_crypted_id,

            'my_letter' => $this->distribution->cover_letter,
            'resume_hash' => $hash,
            'pages_count' => ceil($this->distribution->target_applications / 5),
            'url' => "https://hh.ru/search/vacancy?hhtmFrom=main&hhtmFromLabel=vacancy_search_line&search_field=name&search_field=company_name&search_field=description&enable_snippets=false&L_save_area=true&text={$text}&work_format=REMOTE&items_on_page=5",
            'filters' => $this->distribution->search_filters,
        ];
            // &experience=between1And3
        $jsonPayload = base64_encode(json_encode($data));
        
        $pythonPath = 'python'; // Или полный путь к python в вашей системе
        $scriptPath = base_path('test.py');
        
        $command = "{$pythonPath} {$scriptPath} --payload {$jsonPayload}";
        
        $output = [];
        $returnVar = 0;
        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            \Log::error("Python script failed with exit code {$returnVar}", [
                'output' => $output,
                'distribution_id' => $this->distribution->id
            ]);
            $this->distribution->update(['status' => 'failed']);
        } else {
            \Log::info("Python script executed successfully", [
                'output' => $output,
                'distribution_id' => $this->distribution->id
            ]);
            $this->distribution->update(['status' => 'completed']);
        }
    }
}
