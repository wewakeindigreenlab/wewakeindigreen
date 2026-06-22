/**
 * TICKER
 * --------------------------------------------------------------
 * Auto-scrolling factoid strip. Items come from Sanity (`ticker`
 * document). Falls back to a default list of facts when empty.
 *
 * Items are duplicated in render so the CSS marquee can loop
 * seamlessly without a JS frame loop.
 */
import { TickerData } from "@/app/lib/sanity/types";
import { tickerFallback, withFallback } from "@/app/lib/sanity/fallbacks";

type Props = { data?: TickerData | null };

export default function Ticker({ data }: Props) {
  const t = withFallback(data, tickerFallback);
  const items = t.items ?? [];

  return (
    <section className="ticker-wrap">
      {/* LEFT FADE */}
      <div className="ticker-fade-left" />

      {/* RIGHT FADE */}
      <div className="ticker-fade-right" />

      {/* TRACK — items duplicated to allow looped marquee */}
      <div className="ticker-track">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="ticker-item">
            <span className="ticker-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
