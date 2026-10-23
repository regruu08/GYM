import Link from "next/link";
import { gymInfo } from "@/data/gymData";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            IRONFORGE
          </Link>
          <p>
            A stronger everyday.
            <br />
            Built together.
          </p>
        </div>
        <div>
          <h2>Find your way</h2>
          <Link href="/programs">Programs & schedule</Link>
          <Link href="/trainers">Meet the coaches</Link>
          <Link href="/pricing">Memberships</Link>
        </div>
        <div>
          <h2>Start here</h2>
          <Link href="/first-visit">Your first visit</Link>
          <Link href="/tools">Fitness tools</Link>
          <Link href="/contact">Get in touch</Link>
        </div>
        <div>
          <h2>Let’s talk training</h2>
          <a href={`mailto:${gymInfo.email}`}>{gymInfo.email}</a>
          <p>
            Questions about joining?
            <br />
            We’ll help you find your starting point.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} IronForge Fitness</span>
        <Link href="/privacy">Privacy & website information</Link>
        <span>SHOW UP. BUILD SOMETHING.</span>
      </div>
    </footer>
  );
}
