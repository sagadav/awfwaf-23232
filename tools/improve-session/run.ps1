<# 
  Запуск Cursor Agent в режиме печати (-p): анализ репо, улучшения, реализация фичи.
  Результат: improvements/YYYY-MM-DD_HH-mm-ss/agent-session.md и meta.json
  Требуется: `agent` в PATH (Cursor Agent), вход через `agent login` (подписка Cursor, не API-ключи провайдеров).
#>
$ErrorActionPreference = "Stop"
$SessionRoot = $PSScriptRoot
$RepoRoot = (Resolve-Path (Join-Path $SessionRoot "..\..")).Path
Set-Location $RepoRoot

if (-not (Get-Command agent -ErrorAction SilentlyContinue)) {
    Write-Host "Команда 'agent' не найдена в PATH. Установите Cursor Agent или добавьте его в PATH." -ForegroundColor Red
    exit 1
}

$sessionStart = Get-Date
$date = $sessionStart.ToString("yyyy-MM-dd")
$sessionFolder = $sessionStart.ToString("yyyy-MM-dd_HH-mm-ss")
$outDir = Join-Path $RepoRoot "improvements\$sessionFolder"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$promptPath = Join-Path $SessionRoot "prompt.txt"
if (-not (Test-Path $promptPath)) {
    Write-Host "Не найден файл промпта: $promptPath" -ForegroundColor Red
    exit 1
}
$prompt = Get-Content -Raw -Encoding UTF8 $promptPath

$outFile = Join-Path $outDir "agent-session.md"
$metaFile = Join-Path $outDir "meta.json"

$gitHash = $null
try { $gitHash = (git -C $RepoRoot rev-parse HEAD 2>$null) } catch { }

$meta = [ordered]@{
    date          = $date
    sessionFolder = $sessionFolder
    runner        = "cursor-agent"
    startedAt     = (Get-Date).ToUniversalTime().ToString("o")
    gitCommit     = $gitHash
    repoRoot      = $RepoRoot
    promptFile    = $promptPath
    outputFile    = $outFile
}
$meta | ConvertTo-Json | Set-Content -Path $metaFile -Encoding UTF8

Write-Host "Репозиторий: $RepoRoot"
Write-Host "Папка вывода: $outDir"
Write-Host "Запуск: agent -p --trust -f --workspace <repo> <промпт> (долго, зависит от задачи)..."

# -p: печать в stdout для скриптов; --trust: без интерактивного trust workspace; -f: разрешить команды/инструменты
$agentArgs = @(
    "-p"
    "--trust"
    "-f"
    "--workspace"
    $RepoRoot
    $prompt
)

try {
    $output = & agent @agentArgs 2>&1
    $exitCode = $LASTEXITCODE
    if ($null -ne $output) {
        $output | Set-Content -Path $outFile -Encoding UTF8
    } else {
        "" | Set-Content -Path $outFile -Encoding UTF8
    }
} catch {
    Write-Host $_ -ForegroundColor Red
    exit 1
}

$meta.finishedAt = (Get-Date).ToUniversalTime().ToString("o")
$meta.exitCode = $exitCode
$meta | ConvertTo-Json | Set-Content -Path $metaFile -Encoding UTF8

if ($exitCode -ne 0) {
    Write-Host "agent завершился с кодом $exitCode. См. лог: $outFile" -ForegroundColor Red
    exit $exitCode
}

Write-Host "Готово: $outFile"
exit 0
