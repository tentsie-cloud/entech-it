"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border bg-background/70 shadow-[inset_0_1px_0_var(--border-strong)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-extrabold tracking-tight text-foreground"
        >
          ENTECH<span className="text-accent">IT</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/services"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground sm:inline-block"
          >
            Services &amp; pricing
          </Link>
          <a
            href="#book"
            className="rounded-full bg-accent-button px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-button-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Book a Repair
          </a>
        </div>
      </div>
    </header>
  );
}
