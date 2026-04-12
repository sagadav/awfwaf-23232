#!/usr/bin/env bash
# Запуск Cursor Agent: agent -p (печать для скриптов).
# Результат: improvements/YYYY-MM-DD/agent-session.md и meta.json
# Нужен `agent` в PATH и авторизация: agent login
set -euo pipefail

SESSION_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SESSION_ROOT/../.." && pwd)"
cd "$REPO_ROOT"

if ! command -v agent >/dev/null 2>&1; then
  echo "Команда 'agent' не найдена в PATH. Установите Cursor Agent." >&2
  exit 1
fi

DATE="$(date +%Y-%m-%d)"
OUT_DIR="$REPO_ROOT/improvements/$DATE"
mkdir -p "$OUT_DIR"

PROMPT_FILE="$SESSION_ROOT/prompt.txt"
if [[ ! -f "$PROMPT_FILE" ]]; then
  echo "Не найден файл промпта: $PROMPT_FILE" >&2
  exit 1
fi

OUT_FILE="$OUT_DIR/agent-session.md"
META_FILE="$OUT_DIR/meta.json"

GIT_HASH=""
if command -v git >/dev/null 2>&1; then
  GIT_HASH="$(git -C "$REPO_ROOT" rev-parse HEAD 2>/dev/null || true)"
fi

STARTED_AT="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
printf '%s\n' "{
  \"date\": \"$DATE\",
  \"runner\": \"cursor-agent\",
  \"startedAt\": \"$STARTED_AT\",
  \"gitCommit\": \"$GIT_HASH\",
  \"repoRoot\": \"$REPO_ROOT\",
  \"promptFile\": \"$PROMPT_FILE\",
  \"outputFile\": \"$OUT_FILE\"
}" > "$META_FILE"

echo "Репозиторий: $REPO_ROOT"
echo "Папка вывода: $OUT_DIR"
echo "Запуск: agent -p --trust -f ..."

set +e
agent -p --trust -f --workspace "$REPO_ROOT" "$(cat "$PROMPT_FILE")" >"$OUT_FILE" 2>&1
EXIT_CODE=$?
set -e

FINISHED_AT="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
printf '%s\n' "{
  \"date\": \"$DATE\",
  \"runner\": \"cursor-agent\",
  \"startedAt\": \"$STARTED_AT\",
  \"finishedAt\": \"$FINISHED_AT\",
  \"gitCommit\": \"$GIT_HASH\",
  \"repoRoot\": \"$REPO_ROOT\",
  \"promptFile\": \"$PROMPT_FILE\",
  \"outputFile\": \"$OUT_FILE\",
  \"exitCode\": $EXIT_CODE
}" > "$META_FILE"

if [[ "$EXIT_CODE" -ne 0 ]]; then
  echo "agent завершился с кодом $EXIT_CODE. См. лог: $OUT_FILE" >&2
  exit "$EXIT_CODE"
fi

echo "Готово: $OUT_FILE"
