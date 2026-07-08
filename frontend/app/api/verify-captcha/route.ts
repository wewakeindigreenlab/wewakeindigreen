/**
 * POST /api/verify-captcha
 * --------------------------------------------------------------
 * Verifies a reCAPTCHA v3 token against Google's siteverify API.
 * The browser generates a token by calling `grecaptcha.execute()`
 * and sends it here; we exchange it (with the secret key) for a
 * bot/human score. The secret key never leaves the server.
 *
 * Request body: { token: string }
 * Response:     { ok: boolean, score?: number }
 *
 * Behaviour:
 *   - RECAPTCHA_SECRET_KEY not set → returns ok:true (graceful
 *     degrade so the form still works before the key is added).
 *   - Google returns a score below THRESHOLD → ok:false.
 *   - Google says success:false → ok:false.
 *   - Any network / parse error → ok:false (fail-closed, safer).
 *
 * NOTE: Do not run this on the Edge runtime — Google's endpoint
 * expects a normal server request and can be flaky from certain
 * Edge regions. Node runtime keeps behaviour predictable.
 */
export const runtime = "nodejs";

/** Google's suggested score cutoff. 0.0 = bot, 1.0 = human. */
const THRESHOLD = 0.5;

export async function POST(req: Request) {
  // Parse the token from the request body.
  let token: string | undefined;
  try {
    const body = await req.json();
    token = typeof body?.token === "string" ? body.token : undefined;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!token) {
    return Response.json({ ok: false }, { status: 400 });
  }

  // If no secret key is configured, allow through so the form still
  // works. Honeypot + timing gates already provide baseline defence.
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn(
      "[verify-captcha] RECAPTCHA_SECRET_KEY not set — skipping verification"
    );
    return Response.json({ ok: true });
  }

  // Call Google's verification endpoint with the token + secret.
  try {
    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);

    const resp = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      }
    );

    if (!resp.ok) {
      return Response.json({ ok: false });
    }

    const data = (await resp.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    // Fail closed if Google says it failed OR the score is too low.
    if (!data.success) return Response.json({ ok: false });
    const score = typeof data.score === "number" ? data.score : 0;
    if (score < THRESHOLD) {
      return Response.json({ ok: false, score });
    }
    return Response.json({ ok: true, score });
  } catch {
    return Response.json({ ok: false });
  }
}
