# Деплой frontend1 на AlwaysData

Контекст: Nuxt 4 (preset `node-server`), артефакт — каталог `frontend1/.output`.

## Каждый деплой

1. Сборка локально:

   ```powershell
   Set-Location C:\projects\hhautoclick\frontend1
   npm run build
   ```

2. (Один раз или если менялся путь) каталог на сервере:

   ```powershell
   ssh sagadav@ssh-sagadav.alwaysdata.net "mkdir -p www/awfwaf-23232/frontend1"
   ```

3. Заливка:

   ```powershell
   scp -r "C:\projects\hhautoclick\frontend1\.output" sagadav@ssh-sagadav.alwaysdata.net:www/awfwaf-23232/frontend1/
   ```

   На сервере: `~/www/awfwaf-23232/frontend1/.output/`.

4. Панель AlwaysData: перезапуск Node-приложения. Рабочий каталог — `.output`, запуск — `node server/index.mjs` (уточнить по настройкам сайта в панели).

## Проверка на сервере

```powershell
ssh sagadav@ssh-sagadav.alwaysdata.net "ls -la www/awfwaf-23232/frontend1/.output"
```

## Заметки

- `scp` не создаёт родительские папки — нужен `mkdir -p` заранее.
- Без SSH-ключа команда будет ждать пароль (в неинтерактивной среде «зависнет»).
- Пароли и ключи в репозиторий не коммитить.

Черновик улучшений процесса: [DEPLOY-IDEAS.md](./DEPLOY-IDEAS.md).
