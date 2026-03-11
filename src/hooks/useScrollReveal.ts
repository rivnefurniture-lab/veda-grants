"use client";

import { useCallback, useRef } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  delay?: number;
}

/**
 * Scroll-reveal hook using useCallback ref pattern.
 * Returns a ref callback — attach it to the container element.
 * Each child with class `.reveal` will get `.visible` when it enters the viewport.
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.15 } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { threshold }
      );

      // Observe all `.reveal` children
      const revealElements = node.querySelectorAll(".reveal");
      revealElements.forEach((el) => {
        observerRef.current?.observe(el);
      });

      // Also observe the node itself if it has `.reveal`
      if (node.classList.contains("reveal")) {
        observerRef.current.observe(node);
      }
    },
    [threshold]
  );

  return ref;
}
