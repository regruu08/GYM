"use client";
import { useEffect, useRef, type ReactNode } from "react";

export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "down" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animation = element.animate(
          [
            {
              opacity: 0,
              transform: `translateY(${direction === "none" ? 0 : direction === "down" ? -16 : 16}px)`,
            },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 650,
            delay: Math.min(delayMs, 240),
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "backwards",
          },
        );
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [delayMs, direction]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
