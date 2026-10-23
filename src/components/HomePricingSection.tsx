"use client";

import React, { useState } from "react";
import Link from "next/link";
import { membershipTiers } from "@/data/gymData";
import { PricingCard } from "@/components/PricingCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const HomePricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  return (
    <section className="py-24 bg-[#090c10] relative overflow-hidden">
      {/* Refined subtle ambient teal glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-[#756247]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeader
            badge="03 / MEMBERSHIPS"
            badgeColor="teal"
            title="Make room for"
            titleHighlight="your progress"
            description="Choose the access and support that fit your routine. Compare monthly and annual options below."
          />

          {/* Monthly vs. Annual Toggle Switch */}
          <div className="mt-10 flex items-center justify-center">
            <div className="glass-panel p-1.5 rounded-2xl flex flex-wrap justify-center items-center gap-2 shadow-inner border border-[#dce3e7]/15">
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
        </ScrollReveal>

        {/* 3 Tier Cards Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {membershipTiers.map((tier, idx) => (
            <ScrollReveal key={tier.id} delayMs={idx * 120}>
              <PricingCard tier={tier} isAnnual={isAnnual} />
            </ScrollReveal>
          ))}
        </div>

        {/* Guarantee Banner & Full Comparison Link */}
        <ScrollReveal delayMs={200}>
          <div className="mt-14 max-w-3xl mx-auto p-5 rounded-2xl glass-panel flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#756247]/35">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#756247]/25 text-[#dce3e7] border border-[#756247]/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#c6af87]" />
              </div>
              <div>
                <p className="text-sm font-black text-[#f6f4ef] uppercase tracking-tight">
                  Find the right fit
                </p>
                <p className="text-xs text-[#a3adb7]">
                  Have questions about a plan? Talk to the team before you join.
                </p>
              </div>
            </div>

            <Link
              href="/pricing"
              className="shrink-0 text-xs font-bold uppercase tracking-wider text-[#c6af87] hover:text-[#e7d7b8] flex items-center gap-1.5 group"
            >
              <span>View Full Comparison</span>
              <ArrowRight className="w-4 h-4 text-[#c6af87] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
