"use client";

/**
 * PRODUCTS SECTION
 * --------------------------------------------------------------
 * Card grid that opens a detail modal for the selected product.
 *
 * Two CMS sources combined:
 *   1. `productsSection` (eyebrow / title / description)
 *   2. `product` documents (one per card; each carries its own
 *      modal-detail data: impact stats + manufacturing steps)
 *
 * Falls back to the original hard-coded data when Sanity is empty.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import ProductModal from "./ProductsModal";
import ProductImageCarousel from "./ProductImageCarousel";

import { Product, ProductsSection } from "@/app/lib/sanity/types";
import {
  productsFallback,
  productsSectionFallback,
  withFallback,
} from "@/app/lib/sanity/fallbacks";
import { resolveImage } from "@/app/lib/sanity/image";
import { splitTitle } from "@/app/lib/util";

type Props = {
  section?: ProductsSection | null;
  products?: Product[] | null;
};

export default function ProductsSectionCmp({
  section,
  products,
}: Props) {
  // Merge editorial copy + product list with fallbacks.
  const sec = withFallback(section, productsSectionFallback);
  const productList =
    products && products.length > 0 ? products : productsFallback;

  // Which product card is currently open in the modal (or null).
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [t1, t2, t3] = splitTitle(sec.title);

  return (
    <>
      <section
        id="products"
        className="relative overflow-hidden py-20 lg:py-28 bg-[#faf8fd]"
      >
        {/* GRID + decoration */}
        <div className="products-grid-lines" />
        <div className="products-glow" />
        <div className="products-box box-1" />
        <div className="products-box box-2" />
        <div className="products-box box-3" />

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-20">
          {/* INTRO row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-10">
            {/* LEFT — eyebrow + title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false, amount: 0.05 }}
              className="max-w-[700px]"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-[#dfd4f5] bg-[#f3effe] px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#4E2F8E]">
                <div className="w-2 h-2 rounded-full bg-[#6040a8]" />
                {sec.eyebrow}
              </div>

              <h2 className="mt-8 text-[36px] sm:text-[48px] leading-[0.95] tracking-[-0.05em] text-[#1a0f30] lg:text-[84px] font-black">
                {t1}
                <span className="italic text-[#6040a8]">{t2}</span>
                {t3}
              </h2>
            </motion.div>

            {/* RIGHT — description */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: false, amount: 0.05 }}
              className="max-w-[460px] text-base sm:text-lg leading-[1.9] text-[#1a0f30]/60"
            >
              {sec.description}
            </motion.p>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mt-12 lg:mt-20">
            {productList.map((product, index) => (
              <motion.div
                key={product._id ?? product.cardKey ?? index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: false, amount: 0.05 }}
                className="product-card group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {/* IMAGE CAROUSEL */}
                <div className="product-image-wrap">
                  <ProductImageCarousel
                    images={(() => {
                      const slides = product.images && product.images.length > 0
                        ? product.images
                        : product.legacyImage
                        ? [product.legacyImage]
                        : [];
                      return slides.length > 0
                        ? slides.map((img, i) => ({
                            src: resolveImage(img, "/images/farmer.jpg"),
                            alt: img?.alt ?? product.title ?? `Product image ${i + 1}`,
                          }))
                        : [{ src: "/images/farmer.jpg", alt: product.title ?? "Product" }];
                    })()}
                  />
                  <div className="product-image-overlay" />
                  <div className="product-tag">BioMANS</div>
                </div>

                {/* CARD BODY */}
                <div className="product-body">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-subtitle">{product.subtitle}</p>

                  <div className="product-footer">
                    <div className="product-impact">{product.impact}</div>
                    <button
                      type="button"
                      className="product-btn"
                      onClick={(e) => {
                        // Card outer wrap also opens the modal — but
                        // we stop propagation so the explicit click on
                        // the button doesn't trigger it twice.
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                    >
                      How it&apos;s made
                      <ArrowOutwardIcon sx={{ fontSize: 16 }} />
                    </button>
                  </div>
                </div>

                {/* HOVER glow */}
                <div className="product-hover-glow" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL — shows the detail for selectedProduct (or hidden) */}
      <ProductModal
        open={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
