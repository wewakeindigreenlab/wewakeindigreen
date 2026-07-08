"use client";

/**
 * CONTACT SECTION
 * --------------------------------------------------------------
 * Editorial copy + info cards are CMS-driven (`contact` doc).
 *
 * The form POSTs to a Google Form `formResponse` URL using the
 * named `entry.NNNNN` fields from `siteSettings`. We submit via
 * a hidden iframe (target="hidden_iframe") which is the standard
 * trick for Google Forms — it avoids CORS errors that would
 * otherwise reject a normal `fetch()` to docs.google.com.
 *
 * To wire it up to a real Google Sheet:
 *   1. Create a Google Form linked to a Google Sheet.
 *   2. Get the form's public URL (ending in /formResponse).
 *   3. Inspect the form to find each field's `entry.NNNN` id.
 *   4. Paste those values into Sanity → Site Settings.
 *
 * Until those are filled in, the dummy IDs in fallbacks still
 * let the UI run; submissions will just fail silently (no CORS
 * because the iframe absorbs the response).
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";

import { ContactData, SiteSettings } from "@/app/lib/sanity/types";
import {
  contactFallback,
  siteSettingsFallback,
  withFallback,
} from "@/app/lib/sanity/fallbacks";
import { resolveImage } from "@/app/lib/sanity/image";
import { splitTitle } from "@/app/lib/util";

/** reCAPTCHA v3 site key. Public on purpose — Google requires it
 *  in the browser. Empty string = feature disabled, form still
 *  works with honeypot + timing gates only. */
const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

/** Global typings for the `grecaptcha` object Google injects. */
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

type Props = {
  data?: ContactData | null;
  site?: SiteSettings | null;
};

export default function ContactSection({ data, site }: Props) {
  const contact = withFallback(data, contactFallback);
  const settings = withFallback(site, siteSettingsFallback);

  const [t1, t2, t3] = splitTitle(contact.title);

  // Controlled inputs. Lightweight — no validation libraries.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  // SPAM PROTECTION — layer 1: honeypot field
  // ------------------------------------------------------------
  // Hidden input that real users can't see. Bots reading the DOM
  // fill every input they find, so a filled honeypot is a
  // near-certain signal that the submitter is a bot.
  const [honeypot, setHoneypot] = useState("");

  // SPAM PROTECTION — layer 2: minimum time on page
  // ------------------------------------------------------------
  // Real humans take at least a few seconds to fill the form.
  // Bots submit within milliseconds of page load. We record when
  // the form component mounted and reject submissions that come
  // in faster than MIN_FILL_MS.
  const MIN_FILL_MS = 3000; // 3 seconds
  const mountedAtRef = useRef<number>(0);
  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  // UX states for the submit button.
  // idle | sending | success | error
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const formRef = useRef<HTMLFormElement | null>(null);

  /**
   * Ask Google for a reCAPTCHA v3 token, then verify server-side.
   * Returns `true` if verification passed (score ≥ threshold) OR if
   * reCAPTCHA is not configured (graceful degrade). Returns `false`
   * only when Google says the request looks like a bot.
   */
  const passesRecaptcha = async (): Promise<boolean> => {
    // Feature disabled — just let the request through (honeypot +
    // timing gates already provide baseline defence).
    if (!RECAPTCHA_SITE_KEY) return true;

    // Script hasn't loaded yet, or offline — fail closed. Bots
    // often submit before the script loads, so this is a bonus gate.
    if (typeof window === "undefined" || !window.grecaptcha) {
      return false;
    }

    try {
      // Generate an invisible token tied to this action.
      const token: string = await new Promise((resolve, reject) => {
        window.grecaptcha!.ready(() => {
          window
            .grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action: "contact" })
            .then(resolve)
            .catch(reject);
        });
      });

      // Verify server-side (secret key stays on the server).
      const resp = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await resp.json()) as { ok?: boolean };
      return !!data?.ok;
    } catch {
      // Any error → treat as bot. Real users on a working browser
      // essentially never hit this path.
      return false;
    }
  };

  /**
   * Submit handler:
   *  - honeypot check (bot filled the invisible field)
   *  - minimum time-on-page check (bot submitted too fast)
   *  - reCAPTCHA v3 verification (async, server-side scored)
   *  - required-field check
   *  - submit using the hidden iframe trick so Google Form's lack
   *    of CORS headers doesn't break the request
   *  - reset the form on success
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the native form-post — we now do async work first and
    // will trigger the actual submit programmatically if we pass.
    e.preventDefault();

    // Bot check 1 — honeypot. If filled, silently pretend success.
    if (honeypot.trim() !== "") {
      setStatus("success");
      return;
    }

    // Bot check 2 — the submission happened too fast to be human.
    const elapsed = Date.now() - mountedAtRef.current;
    if (elapsed < MIN_FILL_MS) {
      setStatus("success"); // silent success — bots don't learn
      return;
    }

    // Human validation — required fields.
    if (!firstName || !lastName || !email || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    // Bot check 3 — reCAPTCHA v3 score check.
    const ok = await passesRecaptcha();
    if (!ok) {
      // Silent success for bots. They shouldn't learn they were caught.
      setStatus("success");
      return;
    }

    // Passed all gates — fire the native form submit (Google Form
    // via the hidden iframe). Then reset UI state.
    formRef.current?.submit();

    window.setTimeout(() => {
      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setTopic("");
      setMessage("");
    }, 800);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 lg:py-28 bg-[#faf8fd]"
    >
      {/*
       * Load reCAPTCHA v3 script only when a site key exists.
       * `next/script` handles injection + Next.js hydration cleanly.
       * `strategy="afterInteractive"` waits until the page is usable
       * so it never blocks first paint.
       */}
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      {/* GRID + decoration */}
      <div className="contact-grid-lines" />
      <div className="contact-glow" />
      <div className="contact-box box-1" />
      <div className="contact-box box-2" />
      <div className="contact-box box-3" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10 items-start">
          {/* LEFT — copy + info cards + side image */}
          <div>
            {/* EYEBROW (CMS) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.05 }}
              className="inline-flex items-center gap-3 rounded-full border border-[#dfd4f5] bg-[#f3effe] px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#4E2F8E]"
            >
              <div className="w-2 h-2 rounded-full bg-[#6040a8]" />
              {contact.eyebrow}
            </motion.div>

            {/* TITLE (CMS, pipe-split) */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: false, amount: 0.05 }}
              className="mt-8 text-[40px] sm:text-[52px] leading-[0.95] tracking-[-0.05em] text-[#1a0f30] lg:text-[88px] font-black"
            >
              {t1}
              <br />
              <span className="italic text-[#6040a8]">{t2}</span>
              <br />
              {t3}
            </motion.h2>

            {/* DESCRIPTION (CMS) */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, amount: 0.05 }}
              className="mt-8 max-w-[420px] text-base sm:text-lg leading-[1.9] text-[#1a0f30]/65"
            >
              {contact.description}
            </motion.p>

            {/* INFO CARDS (CMS array) */}
            <div className="mt-10 sm:mt-12 space-y-5 sm:space-y-6">
              {(contact.infoCards ?? []).map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: false, amount: 0.05 }}
                  className="contact-info-card"
                >
                  <div className="contact-info-icon">{item.icon}</div>
                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-value">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SIDE image (CMS) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: false, amount: 0.05 }}
              className="contact-image-wrap"
            >
              <Image
                fill
                src={resolveImage(
                  contact.sideImage,
                  "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1200&q=80"
                )}
                alt={contact.sideImage?.alt ?? "Team working"}
                className="object-cover"
              />
              <div className="contact-image-overlay" />
            </motion.div>
          </div>

          {/* RIGHT — form card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: false, amount: 0.05 }}
            className="contact-form-card"
          >
            <h3 className="contact-form-title">{contact.formTitle}</h3>

            {/*
             * GOOGLE-FORM POSTING
             * --------------------------------------------------
             * We POST directly to the form's `formResponse` URL.
             * `target="hidden_iframe"` swallows Google's response
             * so the browser does not navigate away.
             */}
            <form
              ref={formRef}
              className="mt-8 sm:mt-10 space-y-5 sm:space-y-6"
              action={settings.googleFormActionUrl}
              method="POST"
              target="hidden_iframe"
              onSubmit={handleSubmit}
            >
              {/*
               * HONEYPOT — invisible to humans, catnip for bots.
               * ----------------------------------------------
               * - Positioned off-screen with `-9999px` (works even
               *   with CSS disabled, unlike `display: none` which
               *   some bots skip).
               * - `tabIndex={-1}` + `autoComplete="off"` so keyboard
               *   users never focus it.
               * - `aria-hidden` so screen readers ignore it.
               * - `name` deliberately looks like a normal field
               *   ("website") — bots love form fields called this.
               * - We do NOT give it a Google Form entry ID, so
               *   even if a submission slips through, Google Sheets
               *   never records this field.
               */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: "auto",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor="website-url">
                  Website (leave this empty)
                </label>
                <input
                  id="website-url"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* First / last name row */}
              <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                <div className="contact-field">
                  <label htmlFor="firstName">First name</label>
                  <input
                    id="firstName"
                    name={settings.gfFirstNameEntry}
                    type="text"
                    placeholder="Rahul"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    id="lastName"
                    name={settings.gfLastNameEntry}
                    type="text"
                    placeholder="Sharma"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="contact-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name={settings.gfEmailEntry}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Topic dropdown */}
              <div className="contact-field">
                <label htmlFor="topic">I&apos;m interested in</label>
                <select
                  id="topic"
                  name={settings.gfTopicEntry}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option value="">Select a topic</option>
                  {(contact.topics ?? []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="contact-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name={settings.gfMessageEntry}
                  placeholder="Tell us about your project or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {/* SUBMIT button — state-aware copy */}
              <button
                type="submit"
                className="contact-submit-btn"
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Sent ✓"
                  : contact.submitLabel}
              </button>

              {/* Inline status messages — friendly + accessible */}
              {status === "success" && (
                <p
                  role="status"
                  className="text-sm text-[#2d6a4f] mt-2 font-semibold"
                >
                  Thanks! Your message has been recorded.
                </p>
              )}
              {status === "error" && (
                <p
                  role="status"
                  className="text-sm text-red-600 mt-2 font-semibold"
                >
                  Please fill in all required fields and try again.
                </p>
              )}

              {/*
               * reCAPTCHA v3 legal notice — required by Google's
               * Terms of Service when using the invisible version.
               * Only shown when the feature is actually active.
               */}
              {RECAPTCHA_SITE_KEY && (
                <p className="text-[11px] leading-[1.6] text-[#1a0f30]/50 mt-3">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline hover:text-[#4E2F8E]"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline hover:text-[#4E2F8E]"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
              )}
            </form>

            {/*
             * Hidden iframe — swallows Google Forms's redirect so
             * the user stays on this page after submitting.
             * `name` MUST match the form's `target` attribute.
             */}
            <iframe
              name="hidden_iframe"
              title="hidden-iframe"
              style={{ display: "none" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
