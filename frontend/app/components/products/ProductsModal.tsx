"use client";

/**
 * PRODUCT DETAIL MODAL
 * --------------------------------------------------------------
 * Renders the impact stats + manufacturing process for the
 * product the user clicked on. Data comes from the CMS via the
 * Product type. Closes when:
 *   - the X button is clicked
 *   - the dark overlay is clicked
 *   - the Escape key is pressed (added in useEffect)
 *
 * Body scroll is locked while the modal is open so the page
 * behind doesn't jitter on iOS.
 */

import { useEffect } from "react";
import Image from "next/image";
import { Product } from "@/app/lib/sanity/types";
import { resolveImage } from "@/app/lib/sanity/image";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
};

export default function ProductModal({
  open,
  onClose,
  product,
}: ProductModalProps) {
  // Lock body scroll while the modal is open, restore on close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Esc → close.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !product) return null;

  return (
    <div
      className="product-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Inner card — stop propagation so clicks inside don't close */}
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HERO image + title */}
        <div className="product-modal-hero">
          <Image
            fill
            src={resolveImage(
              product.modalImage ?? product.images?.[0] ?? product.legacyImage,
              "/images/farmer.jpg"
            )}
            alt={product.modalTitle ?? product.title ?? "Product"}
            className="object-cover"
          />

          <div className="product-modal-overlay-bg" />

          <div className="product-modal-hero-content">
            <h2 className="product-modal-title">
              {product.modalTitle ?? product.title}
            </h2>
            <p className="product-modal-subtitle">
              {product.modalSubtitle ?? product.subtitle}
            </p>
          </div>

          {/* CLOSE button */}
          <button
            type="button"
            className="product-modal-close"
            onClick={onClose}
            aria-label="Close product detail"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="product-modal-body">
          {/* IMPACT GRID */}
          <div className="product-modal-label">
            Real-World Environmental Impact
          </div>
          <div className="product-impact-grid">
            {(product.modalImpact ?? []).map((item, index) => (
              <div key={index} className="product-impact-card">
                <div className="impact-value">{item.value}</div>
                <div className="impact-key">{item.key}</div>
              </div>
            ))}
          </div>

          {/* MANUFACTURING STEPS */}
          <div className="product-modal-label mt-14">
            Manufacturing Process
          </div>
          <div className="product-steps">
            {(product.modalSteps ?? []).map((step, index) => (
              <div key={index} className="process-step">
                <div className="process-number">{step.number}</div>
                <div>
                  <h3 className="process-title">{step.title}</h3>
                  <p className="process-description">{step.description}</p>
                  <div className="process-highlight">{step.highlight}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
