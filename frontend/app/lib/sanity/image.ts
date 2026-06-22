/**
 * SANITY IMAGE HELPER
 * --------------------------------------------------------------
 * `urlFor()` keeps the existing API working for raw Sanity images.
 * `resolveImage()` is a NEW helper that understands our shared
 * `imageOrUrl` object type and gracefully returns a usable src for
 * either case (uploaded asset OR pasted URL), with an optional
 * fallback when neither is set.
 */
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

// Build a Sanity CDN URL for a raw Sanity image reference.
export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * resolveImage()
 * Accepts our `imageOrUrl` object shape:
 *   { image?: SanityImage, url?: string, alt?: string }
 * It first tries the uploaded Sanity asset, falls back to the
 * raw URL, then to the supplied fallback. This means components
 * can use one helper regardless of how the editor filled the
 * field, and never produce a broken <Image>.
 */
export function resolveImage(
  source: any,
  fallback: string = ""
): string {
  // Plain string passthrough (legacy).
  if (typeof source === "string") return source || fallback;

  // imageOrUrl with an uploaded asset.
  if (source?.image?.asset) {
    try {
      return urlFor(source.image).url();
    } catch {
      // ignore — fall through
    }
  }

  // imageOrUrl with a pasted external URL.
  if (source?.url) return source.url;

  // Raw Sanity image (no wrapper).
  if (source?.asset) {
    try {
      return urlFor(source).url();
    } catch {
      // ignore — fall through
    }
  }

  return fallback;
}
