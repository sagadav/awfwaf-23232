/**
 * Текст ошибки из JSON-ответа Laravel (validation, abort(422), 404 message и т.д.).
 */
export async function parseLaravelApiError(
  response: Response,
  fallback: string
): Promise<string> {
  let raw: string;
  try {
    raw = await response.text();
  } catch {
    return fallback;
  }

  if (!raw?.trim()) {
    return fallback;
  }

  try {
    const data = JSON.parse(raw) as Record<string, unknown>;
    const parts: string[] = [];

    const errors = data.errors;
    if (errors && typeof errors === 'object' && !Array.isArray(errors)) {
      for (const msgs of Object.values(errors)) {
        if (Array.isArray(msgs)) {
          for (const m of msgs) {
            if (typeof m === 'string' && m.trim()) {
              parts.push(m.trim());
            }
          }
        } else if (typeof msgs === 'string' && msgs.trim()) {
          parts.push(msgs.trim());
        }
      }
    }

    const msg = typeof data.message === 'string' ? data.message.trim() : '';
    const genericValidation = /^The given data was invalid\.?$/i.test(msg);

    const out: string[] = [];
    if (msg && !genericValidation) {
      out.push(msg);
    }
    for (const p of parts) {
      if (!out.includes(p)) {
        out.push(p);
      }
    }

    if (out.length) {
      return out.join(' ');
    }
    if (msg) {
      return msg;
    }
  } catch {
    /* не JSON */
  }

  return fallback;
}
