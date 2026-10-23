"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  ["Programs", "/programs"],
  ["Our coaches", "/trainers"],
  ["Memberships", "/pricing"],
  ["Fitness tools", "/tools"],
];
export function Navbar() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPath(null);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label="IronForge home"
          onClick={() => setOpenPath(null)}
        >
          <span className="brand-symbol" aria-hidden="true">
            IF
          </span>
          <span>
            IRONFORGE<small>STRENGTH & CONDITIONING</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([name, href]) => (
            <Link
              aria-current={pathname === href ? "page" : undefined}
              href={href}
              key={href}
            >
              {name}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-cta">
          Visit the club <ArrowUpRight size={16} />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {[
          ...links,
          ["Your first visit", "/first-visit"],
          ["Contact", "/contact"],
        ].map(([name, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            onClick={() => setOpenPath(null)}
          >
            {name}
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
