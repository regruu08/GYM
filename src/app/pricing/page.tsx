"use client";

import React, { useState } from "react";
import Link from "next/link";
import { membershipTiers, featureComparison, faqList } from "@/data/gymData";
import { PricingCard } from "@/components/PricingCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Check,
  X,
  ChevronDown,
  ShieldCheck,
  Shield,
  HelpCircle,
  ArrowRight,
  Info,
} from "lucide-react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    faqList[0]?.id || null,
  );

  const handleToggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#090c10] pt-12 pb-24">
      <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            PAGE HEADER & BILLING TOGGLE
            ======================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#756247]/20 text-[#dce3e7] text-xs font-bold uppercase tracking-wider mb-4 border border-[#756247]/40">
            <Shield className="w-3.5 h-3.5 text-[#c6af87]" />
            <span>Honest Athletic Value</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[#f6f4ef] leading-tight">
            Transparent <span className="text-[#c6af87]">Memberships</span> &
            Pricing
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#a3adb7] leading-relaxed max-w-2xl mx-auto">
            No initiation fees. No hidden equipment enhancement charges. Full
            month-to-month flexibility or save 20% with annual commitment.
          </p>

          {/* Billing Toggle Switch */}
          <div className="mt-10 flex items-center justify-center">
            <div className="glass-panel p-1.5 rounded-md flex flex-wrap justify-center items-center gap-2 shadow-inner border border-[#dce3e7]/15">
              <button
                type="button"
                aria-pressed={!isAnnual}
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  !isAnnual
                    ? "bg-[#756247] text-[#f6f4ef] shadow-md border border-[#dce3e7]/25"
                    : "text-[#a3adb7] hover:text-[#dce3e7]"
                }`}
              >
                Monthly Billing
              </button>

              <button
                type="button"
                aria-pressed={isAnnual}
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  isAnnual
                    ? "bg-[#c6af87] text-[#090c10] shadow-lg shadow-[#c6af87]/20 border border-[#e7d7b8]/40"
                    : "text-[#a3adb7] hover:text-[#c6af87]"
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#090c10] text-[#c6af87]">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            3 TIER CARDS GRID
            ======================================================== */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {membershipTiers.map((tier, idx) => (
              <ScrollReveal key={tier.id} delayMs={idx * 100}>
                <PricingCard tier={tier} isAnnual={isAnnual} />
              </ScrollReveal>
            ))}
          </div>

          {/* Guarantee Banner */}
          <ScrollReveal delayMs={200}>
            <div className="mt-12 max-w-3xl mx-auto p-5 rounded-md glass-panel border border-[#756247]/35 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#756247]/25 text-[#dce3e7] border border-[#756247]/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#c6af87]" />
              </div>
              <div>
                <h4 className="text-sm font-black text-[#f6f4ef] uppercase tracking-tight">
                  Find the right fit
                </h4>
                <p className="text-xs text-[#a3adb7] mt-0.5">
                  Confirm the latest membership terms, cancellation policy, and
                  any trial offers with the team before joining.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================
            SIDE-BY-SIDE FEATURE COMPARISON TABLE (RESPONSIVE)
            ======================================================== */}
        <section className="mb-24">
          <ScrollReveal>
            <SectionHeader
              badge="Deep Feature Breakdown"
              badgeColor="teal"
              title="Side-by-Side Tier"
              titleHighlight="Comparison"
              description="Examine every feature, amenity, and coaching service across our three membership tiers to find your perfect fit."
              align="center"
            />
          </ScrollReveal>

          <ScrollReveal delayMs={150}>
            <div className="mt-12 rounded-lg glass-panel border border-[#dce3e7]/15 overflow-hidden shadow-2xl">
              <div
                className="overflow-x-auto"
                tabIndex={0}
                role="region"
                aria-label="Membership feature comparison, scroll horizontally"
              >
                <table className="w-full text-left text-sm text-[#dce3e7]">
                  {/* Table Header */}
                  <thead className="bg-[#0d1218]/90 text-xs font-black uppercase tracking-wider text-[#f6f4ef] border-b border-[#dce3e7]/10">
                    <tr>
                      <th className="py-5 px-6 min-w-[240px]">
                        Feature & Privilege
                      </th>
                      <th className="py-5 px-6 text-center min-w-[140px]">
                        <div>Iron Starter</div>
                        <div className="text-[11px] text-[#a3adb7] font-bold lowercase">
                          ${isAnnual ? 31 : 39}/mo
                        </div>
                      </th>
                      <th className="py-5 px-6 text-center min-w-[160px] bg-[#756247]/25 border-x border-[#756247]/40">
                        <div className="text-[#c6af87] flex items-center justify-center gap-1">
                          <span>Forge Pro</span>
                          <Shield className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <div className="text-[11px] text-[#dce3e7] font-bold lowercase">
                          ${isAnnual ? 55 : 69}/mo
                        </div>
                      </th>
                      <th className="py-5 px-6 text-center min-w-[140px]">
                        <div>Titan Elite</div>
                        <div className="text-[11px] text-[#a3adb7] font-bold lowercase">
                          ${isAnnual ? 95 : 119}/mo
                        </div>
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-[#dce3e7]/10">
                    {featureComparison.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-white/[0.03] transition-colors"
                      >
                        {/* Feature Name & Optional Tooltip */}
                        <td className="py-4 px-6 font-semibold text-[#f6f4ef] flex items-center gap-2">
                          <span>{row.feature}</span>
                          {row.tooltip && (
                            <span
                              title={row.tooltip}
                              className="text-[#a3adb7] hover:text-[#dce3e7] cursor-help"
                            >
                              <Info className="w-3.5 h-3.5 text-[#c6af87]" />
                            </span>
                          )}
                        </td>

                        {/* Starter Value */}
                        <td className="py-4 px-6 text-center text-xs">
                          {typeof row.starter === "boolean" ? (
                            row.starter ? (
                              <Check className="w-5 h-5 text-[#756247] mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-[#6D827C] mx-auto opacity-50" />
                            )
                          ) : (
                            <span className="font-semibold text-[#a3adb7]">
                              {row.starter}
                            </span>
                          )}
                        </td>

                        {/* Pro Value (Highlighted column) */}
                        <td className="py-4 px-6 text-center text-xs bg-[#756247]/15 border-x border-[#756247]/30">
                          {typeof row.pro === "boolean" ? (
                            row.pro ? (
                              <Check className="w-5 h-5 text-[#c6af87] mx-auto stroke-[3]" />
                            ) : (
                              <X className="w-5 h-5 text-[#6D827C] mx-auto opacity-50" />
                            )
                          ) : (
                            <span className="font-black text-[#f6f4ef]">
                              {row.pro}
                            </span>
                          )}
                        </td>

                        {/* Elite Value */}
                        <td className="py-4 px-6 text-center text-xs">
                          {typeof row.elite === "boolean" ? (
                            row.elite ? (
                              <Check className="w-5 h-5 text-[#e7d7b8] mx-auto stroke-[3]" />
                            ) : (
                              <X className="w-5 h-5 text-[#6D827C] mx-auto opacity-50" />
                            )
                          ) : (
                            <span className="font-bold text-[#e7d7b8]">
                              {row.elite}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================
            EXPANDABLE FAQ ACCORDION SECTION
            ======================================================== */}
        <section className="max-w-4xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              badge="Direct Answers"
              badgeColor="teal"
              title="Frequently Asked"
              titleHighlight="Questions"
              description="Everything you need to know about pass terms, facility access, guest privileges, and cancellation policies."
              align="center"
            />
          </ScrollReveal>

          <div className="mt-12 space-y-4">
            {faqList.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;

              return (
                <ScrollReveal key={faq.id} delayMs={idx * 60}>
                  <div className="rounded-md glass-panel border border-[#dce3e7]/10 overflow-hidden transition-all duration-200">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${faq.id}`}
                      onClick={() => handleToggleFaq(faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors focus:outline-none"
                    >
                      <span className="font-bold text-base sm:text-lg text-[#f6f4ef] flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-[#c6af87] shrink-0" />
                        <span>{faq.question}</span>
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#a3adb7] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#c6af87]" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-${faq.id}`}
                        className="px-5 sm:px-6 pb-6 pt-2 text-sm text-[#dce3e7]/85 leading-relaxed border-t border-[#dce3e7]/10 animate-fade-up"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Quick Help Banner */}
          <ScrollReveal delayMs={200}>
            <div className="mt-12 text-center p-8 rounded-lg glass-panel border border-[#756247]/35">
              <h4 className="text-xl font-black text-[#f6f4ef] uppercase tracking-tight">
                Still have questions?
              </h4>
              <p className="text-xs sm:text-sm text-[#a3adb7] mt-2 max-w-md mx-auto">
                Speak directly with an IronForge coach or visit our desk for an
                in-person walkthrough.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#756247] to-[#8d7755] hover:from-[#8d7755] hover:to-[#a18b67] text-[#f6f4ef] font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-md shadow-[#756247]/20 border border-[#dce3e7]/20"
                >
                  <span>Contact Front Desk</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c6af87]" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
