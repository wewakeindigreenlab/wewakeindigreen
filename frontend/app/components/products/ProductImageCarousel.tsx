"use client";

/**
 * PRODUCT CARD IMAGE CAROUSEL
 * --------------------------------------------------------------
 * Fills the product card's image slot. Crossfades between the
 * CMS `images` array on a timer, with prev/next arrows and dot
 * indicators when there's more than one slide. Arrow/dot clicks
 * stop propagation so they don't trigger the card's "open modal"
 * click handler.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Slide = { src: string; alt: string };

type Props = {
  images: Slide[];
};

const AUTO_ADVANCE_MS = 4000;

export default function ProductImageCarousel({ images }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [images.length]);

  const step = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation();
    setIndex((i) => (i + delta + images.length) % images.length);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            fill
            src={images[index].src}
            alt={images[index].alt}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className="product-carousel-arrow product-carousel-arrow-left"
            onClick={(e) => step(e, -1)}
          >
            <ChevronLeftIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="product-carousel-arrow product-carousel-arrow-right"
            onClick={(e) => step(e, 1)}
          >
            <ChevronRightIcon sx={{ fontSize: 18 }} />
          </button>

          <div className="product-carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show image ${i + 1}`}
                className={`product-carousel-dot ${i === index ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
