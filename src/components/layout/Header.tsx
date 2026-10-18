"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Locale, localizedHref } from "@/lib/i18n";
import { CONTACT } from "@/lib/seo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { QuoteCta } from "@/components/providers/QuickQuote";

const navLinks = [
  { en: "Buy LED", sv: "Köpa LED", href: "/sales/" },
  { en: "Rent LED", sv: "Hyra LED", href: "/rental/" },
  { en: "Projects", sv: "Projekt", href: "/projects/" },
  { en: "Service", sv: "Service", href: "/service/" },
  { en: "About IM Vision", sv: "Om IM Vision", href: "/about/" },
  { en: "Contact", sv: "Kontakt", href: "/contact/" },
];

export function Header({
  locale = "en",
  variant = "dark",
}: {
  locale?: Locale;
  variant?: "dark" | "light";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const suppressFocusRestore = useRef(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const panel = mobilePanelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => el.offsetParent !== null);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      // Focus trap: the menu is a modal dialog, so Tab must not reach the page
      // behind it. Wrap from the last focusable element back to the first.
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Remember where focus came from and give it back on close.
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => focusables()[0]?.focus(), 60);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      if (!suppressFocusRestore.current) opener?.focus?.();
      suppressFocusRestore.current = false;
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[700ms] ease-[cubic-bezier(.22,.61,.36,1)]",
          variant === "light"
            ? cn(
                "theme-light bg-white",
                scrolled
                  ? "border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                  : "border-black/[0.08]"
              )
            : scrolled
              ? cn("theme-dark border-white/[.06] bg-[#070807]/88 backdrop-blur-2xl")
              : "theme-dark border-transparent bg-transparent"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1600px] items-center justify-between px-4 transition-[height] duration-[250ms] ease-[cubic-bezier(.22,.61,.36,1)] sm:px-8 lg:px-12 xl:px-16",
            scrolled ? "h-[62px]" : "h-[78px]"
          )}
        >
          {/* prefetch disabled: static export has no RSC segment endpoints, so
              Next's Link prefetch would 404 (navigation falls back to full load). */}
          <Link href={localizedHref(locale, "/")} prefetch={false} aria-label={locale === "sv" ? "IM Vision startsida" : "IM Vision home"} className="tap relative z-50">
            <Image
              src="/logo.png"
              alt="IM Vision"
              width={128}
              height={35}
              className="h-7 w-auto"
              loading="eager"
            />
          </Link>

          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.en}
                href={localizedHref(locale, link.href)}
                prefetch={false}
                aria-current={isActive(localizedHref(locale, link.href)) ? "page" : undefined}
                className={cn(
                  "relative py-3 text-[13px] font-medium tracking-[0.01em] transition-colors duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)] after:absolute after:bottom-1 after:left-0 after:h-px after:transition-[width,background-color] after:duration-[700ms] after:ease-[cubic-bezier(.22,.61,.36,1)]",
                  isActive(localizedHref(locale, link.href))
                    ? "text-text-primary after:w-full after:bg-accent"
                    : "text-text-secondary after:w-0 after:bg-accent/70 hover:text-text-primary hover:after:w-full"
                )}
              >
                {link[locale]}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${CONTACT.phoneE164}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-[12px_4px_12px_12px] border border-accent/40 bg-accent/10 px-3.5 text-[13px] font-medium text-text-primary transition-colors hover:border-accent hover:bg-accent/20"
              aria-label={locale === "sv" ? `Ring oss på ${CONTACT.phone}` : `Call us on ${CONTACT.phone}`}
            >
              <Phone size={15} className="text-accent" strokeWidth={1.75} />
              <span className="hidden xl:inline">{CONTACT.phone}</span>
              <span className="xl:hidden">{locale === "sv" ? "Ring" : "Call"}</span>
            </a>
            {/* One primary CTA across the whole site: it opens the quick
                enquiry panel in place (on /contact/ it scrolls to the form,
                which is already on screen). */}
            <QuoteCta
              locale={locale}
              source="header"
              className="group/cta min-h-11 gap-1.5 rounded-[12px_4px_12px_12px] px-4 text-[13px] shadow-[0_8px_24px_rgba(0,0,0,.18)] hover:shadow-[0_12px_32px_rgba(0,0,0,.24)]"
              icon={<ArrowRight size={14} strokeWidth={2} className="transition-transform duration-[500ms] group-hover/cta:translate-x-[2px]" />}
            />
            <LanguageSwitcher locale={locale} />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className={cn(
              "relative z-50 grid h-12 w-12 place-items-center rounded-[14px_5px_14px_14px] border text-text-primary lg:hidden",
              variant === "light"
                ? "theme-dark border-white/10 bg-[#070807]/55"
                : "border-white/10 bg-[#070807]/55"
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className="h-px w-full overflow-hidden bg-white/5">
          <motion.div
            aria-hidden
            className="h-full w-full origin-left photon-seam"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobilePanelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={locale === "sv" ? "Meny" : "Menu"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[#070807] px-4 pt-28 lg:hidden"
          >
            <nav className="mx-auto flex min-h-full max-w-xl flex-col pb-8" aria-label="Mobile navigation">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-accent">IM / {locale === "sv" ? "Meny" : "Menu"}</p>
                <div className="flex items-center gap-2">
                  <LanguageSwitcher locale={locale} />
                </div>
              </div>
              <div className="mt-10 divide-y divide-border-subtle border-y border-border-subtle">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.en}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    <Link
                      href={localizedHref(locale, link.href)}
                      prefetch={false}
                      onClick={() => {
                    // The quick-quote panel manages its own focus; returning
                    // focus to the hamburger would fight it.
                    suppressFocusRestore.current = true;
                    setMobileOpen(false);
                  }}
                      className="flex min-h-14 items-center justify-between py-5 text-3xl font-medium tracking-[-0.04em] text-text-primary"
                    >
                      {link[locale]}
                      <span className="font-mono text-xs text-text-muted">0{index + 1}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto space-y-4 pt-8">
                <QuoteCta
                  locale={locale}
                  source="mobile_menu"
                  onClick={() => {
                    // The quick-quote panel manages its own focus; returning
                    // focus to the hamburger would fight it.
                    suppressFocusRestore.current = true;
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-[14px_5px_14px_14px] px-5 py-4 text-base shadow-[0_10px_30px_rgba(0,0,0,.24)]"
                  icon={<ArrowRight size={17} strokeWidth={2} />}
                />
                <a
                  href={`tel:${CONTACT.phoneE164}`}
                  onClick={() => {
                    // The quick-quote panel manages its own focus; returning
                    // focus to the hamburger would fight it.
                    suppressFocusRestore.current = true;
                    setMobileOpen(false);
                  }}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-[14px_5px_14px_14px] border border-accent/40 bg-accent/10 px-5 py-4 text-base font-medium text-text-primary transition-colors hover:border-accent hover:bg-accent/20"
                >
                  <Phone size={17} className="text-accent" strokeWidth={1.75} />
                  {CONTACT.phone}
                </a>
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
                  Jönköping · Saltsjö-Boo
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
