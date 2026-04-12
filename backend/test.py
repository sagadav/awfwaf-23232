import requests
from bs4 import BeautifulSoup
import re
import time
from datetime import datetime
from glom import glom
import json
from tabulate import tabulate
import argparse
import sys
import base64

# --- ФУНКЦИИ ---

def touch_resume(resume_hash: str, headers: dict, cookies: dict) -> int:
    """Поднимает резюме."""
    url_touch = "https://hh.ru/applicant/resumes/touch"
    touch_files = {
        "resume": (None, resume_hash),
        "undirectable": (None, "true")
    }
    try:
        response = requests.post(url_touch, headers=headers, cookies=cookies, files=touch_files)
        print(f"[Поднятие резюме] Status: {response.status_code}")
        return response.status_code
    except Exception as e:
        print(f"Ошибка при поднятии резюме: {e}")
        return 0

def send_vacancy_response(
    resume_hash: str,
    vacancy_id: str,
    my_letter: str,
    headers: dict,
    cookies: dict,
    response_number: int = None,
    total_responses: int = None
) -> int:
    """Отправляет отклик на вакансию."""
    url_response = "https://hh.ru/applicant/vacancy_response/popup"

    # Проверка на пустое письмо, если вдруг не передали
    if not my_letter:
        my_letter = "Здравствуйте! Прошу рассмотреть мое резюме на данную вакансию."

    files = {
        "resume_hash": (None, resume_hash),
        "vacancy_id": (None, vacancy_id),
        "letterRequired": (None, "true"),
        "letter": (None, my_letter),
        "lux": (None, "true"),
        "ignore_postponed": (None, "true"),
        "mark_applicant_visible_in_vacancy_country": (None, "false")
    }

    try:
        response = requests.post(url_response, headers=headers, cookies=cookies, files=files)
    except Exception as e:
        print(f"❌ Ошибка сети при отклике: {e}")
        return 0, str(e)

    if response.status_code != 200:
        print(f"❌ Ошибка отправки отклика. Код: {response.status_code}")
        return response.status_code, response.text

    try:
        parsed = response.json()
    except json.JSONDecodeError:
        print("❌ Ошибка: некорректный JSON в ответе.")
        return response.status_code, response.text

    # Сбор информации для вывода
    vacancy_title = glom(parsed, "responseStatus.shortVacancy.name", default="Неизвестно")
    vacancy_id_res = glom(parsed, "responseStatus.shortVacancy.vacancyId", default=vacancy_id)
    
    if response_number and total_responses:
        print(f"➡️ [{response_number}/{total_responses}] Отклик на '{vacancy_title}' (ID: {vacancy_id_res}) - OK")
    else:
        print(f"✅ Успешно откликнулись на '{vacancy_title}' (ID: {vacancy_id_res})")

    return response.status_code, response.text

def get_vacancy_ids(url, headers, cookies, page_num):
    """Парсит ID вакансий со страницы поиска."""
    try:
        response = requests.get(url, headers=headers, cookies=cookies)
        if response.status_code != 200:
            print(f"Ошибка получения списка вакансий: {response.status_code}")
            return []
            
        soup = BeautifulSoup(response.text, "html.parser")
        vacancy_links = soup.find_all("a", href=re.compile(r"/vacancy/\d+"))
        vacancy_ids = set()

        for link in vacancy_links:
            match = re.search(r"/vacancy/(\d+)", link["href"])
            if match:
                vacancy_ids.add(match.group(1))

        print(f"🔎 Со страницы {page_num} получено {len(vacancy_ids)} вакансий")
        return list(vacancy_ids)
    except Exception as e:
        print(f"Ошибка парсинга страницы {page_num}: {e}")
        return []

# --- ГЛАВНАЯ ФУНКЦИЯ ---

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--payload', help='Base64 encoded JSON payload')
    args = parser.parse_args()

    if not args.payload:
        print("No payload provided")
        sys.exit(1)

    try:
        # Декодируем параметры
        decoded_data = base64.b64decode(args.payload).decode('utf-8')
        data = json.loads(decoded_data)
        
        # Извлекаем переменные из JSON
        hhtoken = data.get('hhtoken')
        hhul = data.get('hhul')
        crypted_id = data.get('crypted_id')
        xsrf = data.get('xsrf')
        resume_hash = data.get('resume_hash')
        search_url = data.get('url')
        pages_count = int(data.get('pages', 1))
        
        # --- ИЗВЛЕЧЕНИЕ ПИСЬМА ---
        my_letter = data.get('my_letter')

        # Проверка обязательных технических полей
        if not all([hhtoken, xsrf, hhul, crypted_id, resume_hash, search_url]):
            print("Error: Missing required fields (tokens/url) in JSON payload")
            # print([hhtoken, hhul, crypted_id, xsrf, resume_hash, search_url])
            sys.exit(1)

        print(f"Запуск скрипта для URL: {search_url[:50]}...")
        if my_letter:
            print(f"Письмо загружено ({len(my_letter)} символов).")
        else:
            print("⚠️ Внимание: Текст письма не передан, будет использован стандартный.")

        # Настройка заголовков и куки
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Referer": "https://hh.ru/search/vacancy",
            "Origin": "https://hh.ru",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "ru-RU,ru;q=0.9,en;q=0.5",
            "X-Requested-With": "XMLHttpRequest",
            "X-HHTMFrom": "main",
            "X-HHTMSource": "vacancy",
            "X-XsrfToken": xsrf
        }

        cookies = {
            "hhtoken": hhtoken,
            "hhul": hhul,
            "crypted_hhuid": crypted_id,
            "_xsrf": xsrf
        }

        # 1. Поднятие резюме
        print("--- Поднимаем резюме ---")
        touch_resume(resume_hash, headers, cookies)
        time.sleep(2)

        # 2. Сбор вакансий
        print(f"\n--- Сбор вакансий ({pages_count} страниц) ---")
        all_vacancies = set()
        
        for i in range(pages_count):
            separator = "&" if "?" in search_url else "?"
            current_page_url = f"{search_url}{separator}page={i}"
            
            vacancies = get_vacancy_ids(current_page_url, headers, cookies, i)
            all_vacancies.update(vacancies)
            time.sleep(1.5)

        total_vacancies = len(all_vacancies)
        print(f"\n🚩 Всего уникальных вакансий найдено: {total_vacancies}")

        # 3. Рассылка откликов
        if total_vacancies > 0:
            print("\n--- Начало рассылки откликов ---")
            for idx, vacancy_id in enumerate(all_vacancies, 1):
                status_code, response_text = send_vacancy_response(
                    resume_hash, vacancy_id, my_letter, headers, cookies, idx, total_vacancies
                )

                if status_code != 200:
                    if "test-required" in response_text or "unknown" in response_text:
                        print("⏩ Требуется тест или неизвестная ошибка — пропускаю.")
                    elif status_code == 429:
                        print("⚠️ Слишком много запросов (429). Остановка.")
                        break
                    else:
                        print("⚠️ Ошибка отклика, идем дальше.")

                time.sleep(3) # Пауза
        else:
            print("Вакансий для отклика не найдено.")

        print("\n✅ Работа скрипта завершена.")
        sys.exit(0)

    except Exception as e:
        print(f"Critical Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()