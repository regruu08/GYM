"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import {
  gymInfo,
  trainers,
  programs,
  membershipTiers,
  weeklySchedule,
} from "@/data/gymData";
import { sanitizeEmail, sanitizePhone, stripCrlf } from "@/lib/security";

function EnquiryForm() {
  const params = useSearchParams();
  const trainer =
    trainers.find((t) => t.name === params.get("trainer"))?.name ?? "";
  const program =
    programs.find((p) => p.id === params.get("program"))?.name ?? "";
  const session = weeklySchedule.find((s) => s.id === params.get("session"));
  const plan =
    membershipTiers.find((p) => p.id === params.get("plan"))?.name ?? "";
  const [draft, setDraft] = useState<{ url: string; body: string } | null>(
    null,
  );
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = stripCrlf(String(fields.get("name") ?? "")).trim();
    const email = sanitizeEmail(String(fields.get("email") ?? ""));
    const phone = String(fields.get("phone") ?? "").trim();
    if (
      name.length < 2 ||
      name.length > 100 ||
      !email.isValid ||
      (phone && !sanitizePhone(phone).isValid)
    ) {
      setError(
        "Check your name, email and phone number. Phone numbers should contain 7–15 digits.",
      );
      return;
    }
    const body = `Hello IronForge,\n\nI would like to arrange a visit.\n\nName: ${name}\nEmail: ${email.sanitized}\nPhone: ${phone || "Not provided"}\nInterest: ${String(fields.get("interest")).slice(0, 150)}\nBilling preference: ${plan ? (params.get("billing") === "annual" ? "Annual" : "Monthly") : "Not selected"}\nRequested class: ${session ? `${session.programName}, ${session.day} at ${session.startTime}` : "No preference"}\nCoach: ${String(fields.get("coach")).slice(0, 100) || "No preference"}\n\n${String(fields.get("message") ?? "").slice(0, 1000)}\n\nPlease let me know the next steps.`;
    setDraft({
      body,
      url: `mailto:${gymInfo.email}?subject=${encodeURIComponent(`Visit enquiry — ${name}`)}&body=${encodeURIComponent(body)}`,
    });
    setError("");
  }
  return (
    <div className="enquiry-grid">
      <aside>
        <span className="editorial-label">A GOOD PLACE TO START</span>
        <h2>
          Let’s talk about
          <br />
          your training.
        </h2>
        <p>
          Tell us what you’re looking for. Whether you’re starting fresh or
          building on years of training, we’ll help you find the right fit.
        </p>
        <a className="contact-email" href={`mailto:${gymInfo.email}`}>
          <Mail size={18} />
          {gymInfo.email}
        </a>
        <div className="contact-note">
          <h3>What happens next?</h3>
          <ol>
            <li>Fill in a few details about your interests.</li>
            <li>Review your enquiry and send it from your email app.</li>
            <li>The team will confirm availability and arrange your visit.</li>
          </ol>
        </div>
        <Link href="/first-visit" className="inline-link">
          Read our first-visit guide <ArrowUpRight size={16} />
        </Link>
      </aside>
      <div className="enquiry-panel">
        <form onSubmit={prepare} hidden={!!draft}>
          <h2>Make your first move.</h2>
          <p className="form-intro">
            No payment details. No commitment. Just a conversation.
          </p>
          {session && (
            <p className="form-intro">
              Requested class: {session.programName} · {session.day},{" "}
              {session.startTime}. The team will confirm availability.
            </p>
          )}
          <div className="form-pair">
            <label htmlFor="name">
              Full name
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
                minLength={2}
                maxLength={100}
              />
            </label>
            <label htmlFor="email">
              Email address
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                maxLength={254}
              />
            </label>
          </div>
          <label htmlFor="phone">
            Phone <span>(optional)</span>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={25}
              placeholder="Include your country code"
            />
          </label>
          <label htmlFor="interest">
            I’m interested in
            <select
              id="interest"
              name="interest"
              defaultValue={program || plan || "A first visit"}
            >
              <option>A first visit</option>
              {programs.map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
              {membershipTiers.map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
          <label htmlFor="coach">
            Preferred coach
            <select id="coach" name="coach" defaultValue={trainer}>
              <option value="">No preference — help me choose</option>
              {trainers.map((t) => (
                <option key={t.id}>{t.name}</option>
              ))}
            </select>
          </label>
          <label htmlFor="message">
            Anything else? <span>(optional)</span>
            <textarea
              id="message"
              name="message"
              maxLength={1000}
              rows={4}
              placeholder="Your goals, preferred days, or questions for the team. Please leave out sensitive health information."
            />
          </label>
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <button className="solid-button" type="submit">
            Review my enquiry <ArrowUpRight size={18} />
          </button>
          <p className="form-footnote">
            Your details stay in this page until you choose to send an email.{" "}
            <Link href="/privacy">Privacy information</Link>
          </p>
        </form>
        {draft && (
          <section aria-live="polite">
            <Check className="text-[#e7d7b8]" size={32} />
            <h2>Your enquiry is ready.</h2>
            <p className="form-intro">
              Nothing has been sent or booked yet. Review the details below,
              then send the email to request your visit.
            </p>
            <pre className="enquiry-preview">{draft.body}</pre>
            <a href={draft.url} className="solid-button">
              Open email to send <ArrowUpRight size={18} />
            </a>
            <div className="draft-actions">
              <button
                type="button"
                onClick={() => {
                  setDraft(null);
                  setCopied(false);
                }}
              >
                Edit details
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(draft.body);
                    setCopied(true);
                  } catch {
                    setError(
                      "Copy isn’t available. Select the enquiry text and copy it manually.",
                    );
                  }
                }}
              >
                {copied ? "Copied" : "Copy enquiry"}
              </button>
            </div>
            {error && <p role="alert">{error}</p>}
            <p className="form-footnote">
              No email app? Copy the enquiry into your preferred email service
              and send it to {gymInfo.email}. Your visit is confirmed only after
              the team replies.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
function ContactContent() {
  const params = useSearchParams();
  return <EnquiryForm key={params.toString()} />;
}
export default function ContactPage() {
  return (
    <div className="editorial-page">
      <div className="editorial-heading">
        <span className="editorial-label">COME AS YOU ARE</span>
        <h1>
          Every strong start
          <br />
          begins with <em>hello.</em>
        </h1>
        <p>Meet the space. Meet your people. Find your next step.</p>
      </div>
      <Suspense fallback={<p role="status">Loading enquiry form…</p>}>
        <ContactContent />
      </Suspense>
    </div>
  );
}
