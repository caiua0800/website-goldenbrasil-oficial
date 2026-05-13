"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const links = [
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/produtos", label: "Produtos" },
  { href: "/depoimentos", label: "Depoimentos" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
        scrolled
          ? "border-b border-[color:var(--color-gold-800)]/15 bg-[#f3eee2]/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10"
        aria-label="Principal"
      >
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors duration-500 text-[color:var(--color-gold-900)]"
          data-cursor="hover"
          aria-label="Golden Brasil — Início"
        >
          <span className="font-display text-lg font-semibold tracking-tight md:text-xl">
            <span className="text-[color:var(--color-gold-800)]">Golden</span> Brasil
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "link-underline text-[13px] uppercase tracking-[0.15em] transition-colors duration-500",
                    active
                      ? "text-[color:var(--color-gold-900)]"
                      : "text-[color:var(--color-gold-900)]/70 hover:text-[color:var(--color-gold-900)]",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <MagneticButton
            href="https://wa.link/2ukykr"
            className="rounded-full border border-[color:var(--color-gold-800)]/40 bg-[color:var(--color-gold-800)]/5 px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-[color:var(--color-gold-900)] transition-colors duration-500 hover:border-[color:var(--color-gold-800)] hover:bg-[color:var(--color-gold-800)]/10"
          >
            Fale Conosco
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "block h-px w-6 bg-[color:var(--color-gold-900)] transition-all duration-300",
              open && "translate-y-[3px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-[color:var(--color-gold-900)] transition-all duration-300",
              open && "-translate-y-[3px] -rotate-45",
            )}
          />
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-[color:var(--color-gold-800)]/15 transition-[max-height,opacity] duration-500 ease-out md:hidden",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 bg-[#f3eee2]/95 px-6 py-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-3 text-sm uppercase tracking-[0.18em] text-[color:var(--color-gold-900)]/70 transition-colors hover:text-[color:var(--color-gold-900)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://wa.link/2ukykr"
              className="mt-3 block rounded-full border border-[color:var(--color-gold-800)]/40 bg-[color:var(--color-gold-800)]/5 px-5 py-3 text-center text-xs uppercase tracking-[0.2em] text-[color:var(--color-gold-900)]"
            >
              Fale Conosco
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
