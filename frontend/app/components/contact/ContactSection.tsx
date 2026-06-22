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

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { ContactData, SiteSettings } from "@/app/lib/sanity/types";
import {
  contactFallback,
  siteSettingsFallback,
  withFallback,
} from "@/app/lib/sanity/fallbacks";
import { resolveImage } from "@/app/lib/sanity/image";
import { splitTitle } from "@/app/lib/util";

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

  // UX states for the submit button.
  // idle | sending | success | error
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const formRef = useRef<HTMLFormElement | null>(null);

  /**
   * Submit handler:
   *  - simple required-field check
   *  - submit using the hidden iframe trick so Google's lack of
   *    CORS headers doesn't break the request
   *  - reset the form on success
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!firstName || !lastName || !email || !message) {
      e.preventDefault();
      setStatus("error");
      return;
    }

    // Let the native form post to the hidden iframe.
    setStatus("sending");

    // After the iframe loads we count it as success.
    // Use setTimeout because Google returns an opaque response we
    // can't actually read.
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
