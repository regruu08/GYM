"use client";

import React from "react";
import Link from "next/link";
import { MembershipTier } from "@/types";
import { Check, X, ArrowRight, Shield } from "lucide-react";

interface PricingCardProps {
  tier: MembershipTier;
  isAnnual: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier, isAnnual }) => {
  const price = isAnnual ? tier.annualPriceMonthly : tier.monthlyPrice;
  const savings = Math.round(
    (tier.monthlyPrice - tier.annualPriceMonthly) * 12,
  );

  return (
    <div
      className={`membership-card relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
        tier.isPopular
          ? "glass-panel bg-[#11161c]/85 border-2 border-[#756247] shadow-2xl shadow-black/40 lg:-translate-y-2 relative"
          : "glass-panel bg-[#11161c]/60 border border-[#dce3e7]/10 hover:border-[#756247]/40 hover:bg-[#11161c]/80"
      }`}
    >
      {/* Popular Tier Accent Header */}
      {tier.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#c6af87] text-[#090c10] text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 border border-[#e7d7b8]/40">
          <Shield className="w-3.5 h-3.5 fill-current" />
          <span>Most popular</span>
        </div>
      )}

      <div>
        {/* Tier Name & Badge */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-black text-[#f6f4ef] uppercase tracking-tight">
            {tier.name}
          </h3>
          {tier.badge && !tier.isPopular && (
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#756247]/20 text-[#dce3e7] border border-[#756247]/35">
              {tier.badge}
            </span>
          )}
        </div>

        <p className="text-sm text-[#a3adb7] mb-6 min-h-[40px] leading-relaxed">
          {tier.tagline}
        </p>

        {/* Pricing Display */}
        <div className="mb-6 p-5 rounded-2xl bg-[#0d1218]/80 border border-[#dce3e7]/10">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-[#a3adb7]">$</span>
            <span className="text-5xl font-black tracking-tight text-[#f6f4ef]">
              {price}
            </span>
            <span className="text-sm font-semibold text-[#a3adb7]">/month</span>
          </div>

          <div className="mt-2 text-xs">
            {isAnnual ? (
              <span className="text-[#c6af87] font-semibold">
                Billed annually (${tier.annualBilledTotal}/yr) • Save ${savings}
                /yr
              </span>
            ) : (
              <span className="text-[#a3adb7]">
                Billed monthly • Cancel anytime with 14-day notice
              </span>
            )}
          </div>
        </div>

        {/* Feature Checkmarks List */}
        <div className="space-y-3 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#a3adb7] block mb-3">
            What is included:
          </span>
          {tier.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 text-sm text-[#dce3e7]"
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                  tier.isPopular
                    ? "bg-[#756247]/30 text-[#c6af87] border border-[#756247]/50"
                    : "bg-[#756247]/20 text-[#dce3e7] border border-[#756247]/30"
                }`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="leading-snug">{feature}</span>
            </div>
          ))}

          {/* Optional Not Included features */}
          {tier.notIncluded?.map((notInc, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 text-sm text-[#6D827C] opacity-60"
            >
              <div className="mt-0.5 w-4 h-4 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <X className="w-3 h-3" />
              </div>
              <span className="line-through">{notInc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="pt-4 border-t border-[#dce3e7]/10">
        <Link
          href={`/contact?plan=${tier.id}&billing=${isAnnual ? "annual" : "monthly"}`}
          className={`w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${
            tier.isPopular
              ? "bg-gradient-to-r from-[#756247] to-[#8d7755] text-[#f6f4ef] border border-[#dce3e7]/25 shadow-lg shadow-[#756247]/30 hover:border-[#c6af87]/50"
              : "bg-white/5 hover:bg-[#756247]/30 text-[#dce3e7] hover:text-[#f6f4ef] border border-[#dce3e7]/15"
          }`}
        >
          <span>Select {tier.name}</span>
          <ArrowRight className="w-4 h-4 text-[#c6af87]" />
        </Link>
      </div>
    </div>
  );
};
