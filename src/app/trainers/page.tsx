import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { trainers } from "@/data/gymData";
import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { InstagramIcon, LinkedInIcon } from "@/components/SocialIcons";
import {
  Award,
  ArrowRight,
  ShieldCheck,
  Quote,
  Target,
  Flame,
  CheckCircle2,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Certified Coaches & Our Story",
  description:
    "Meet the elite strength coaches, Olympic weightlifters, and physical therapists behind IronForge Fitness. CSCS, USAW, and NASM credentials.",
};

export default function TrainersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#090c10] pt-12 pb-24">
      <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            PAGE HEADER & GYM ORIGIN STORY
            ======================================================== */}
        <section className="mb-24">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#756247]/20 text-[#dce3e7] text-xs font-bold uppercase tracking-wider mb-4 border border-[#756247]/40">
              <Shield className="w-3.5 h-3.5 text-[#c6af87]" />
              <span>MEET YOUR COACHES</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[#f6f4ef] leading-tight">
              Forged In Iron: <span className="text-[#c6af87]">Our Story</span>{" "}
              & Staff
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#a3adb7] leading-relaxed max-w-2xl mx-auto">
              We founded IronForge Fitness with a single premise: remove the
              gimmicks, ban the commercial fluff, and build a place for focused,
              consistent training.
            </p>
          </div>

          {/* Philosophy / Story Feature Card */}
          <ScrollReveal>
            <div className="rounded-lg glass-panel border border-[#756247]/35 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#c6af87]">
                    The IronForge Manifesto
                  </span>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-medium tracking-tight text-[#f6f4ef]">
                    Built by Lifters. Tested Under Heavy Steel.
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-[#dce3e7]/85 leading-relaxed">
                    Our approach starts with the basics: good movement,
                    thoughtful programming, and the support to keep going.
                  </p>
                  <p className="mt-3 text-sm sm:text-base text-[#dce3e7]/85 leading-relaxed">
                    Whether you are learning your first lift or working towards
                    a new personal best, we make room for your experience, your
                    goals, and your pace.
                  </p>

                  {/* 3 Pillars */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#dce3e7]/10">
                    <div className="p-4 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/10">
                      <Target className="w-5 h-5 text-[#c6af87] mb-2" />
                      <h3 className="text-xs font-black uppercase text-[#f6f4ef]">
                        1. Scientific Overload
                      </h3>
                      <p className="text-[11px] text-[#a3adb7] mt-1">
                        Periodized training blocks backed by exercise
                        physiology.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/10">
                      <Flame className="w-5 h-5 text-[#e7d7b8] mb-2" />
                      <h3 className="text-xs font-black uppercase text-[#f6f4ef]">
                        2. Relentless Grit
                      </h3>
                      <p className="text-[11px] text-[#a3adb7] mt-1">
                        Intensity without ego. An inspiring floor where PRs are
                        celebrated.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/10">
                      <ShieldCheck className="w-5 h-5 text-[#756247] mb-2" />
                      <h3 className="text-xs font-black uppercase text-[#f6f4ef]">
                        3. Total Longevity
                      </h3>
                      <p className="text-[11px] text-[#a3adb7] mt-1">
                        Physical therapy guidance, saunas, and joint
                        decompression.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Founder / Gym Interior Visual with 4:3 Aspect Ratio */}
                <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden border border-[#dce3e7]/15 shadow-2xl bg-[#0d1218]">
                  <Image
                    src="/images/photo-1540497077202-7c8a3999166f.jpg"
                    alt="IronForge gym floor and athletes training"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090c10] via-transparent to-black/20" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-[#dce3e7]/15">
                    <p className="text-xs font-bold text-[#dce3e7]">
                      &ldquo;Our promise: You will never be just a barcode
                      number here. Every coach knows your name and your
                      numbers.&rdquo;
                    </p>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-[#c6af87] mt-1">
                      — Marcus Vance, Founder & Head Coach
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================
            PART 2: 6 CERTIFIED COACH PROFILE CARDS (PROPORTIONAL 4:5 ASPECT RATIO)
            ======================================================== */}
        <section>
          <ScrollReveal>
            <SectionHeader
              badge="Gold-Standard Credentials"
              badgeColor="teal"
              title="The IronForge"
              titleHighlight="Coaching Staff"
              description="Our coaches hold Master’s degrees in exercise physiology, national Olympic weightlifting titles, and doctorate credentials in physical therapy."
            />
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, idx) => (
              <ScrollReveal key={trainer.id} delayMs={idx * 100}>
                <div className="group rounded-lg glass-panel glass-panel-hover border border-[#dce3e7]/10 overflow-hidden flex flex-col justify-between shadow-xl">
                  <div>
                    {/* Coach Photo with Proportional 4:5 Aspect Ratio */}
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0d1218]">
                      <Image
                        src={trainer.imageUrl}
                        alt={trainer.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11161c] via-transparent to-black/30" />

                      {/* Years of Experience Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0d1218]/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#dce3e7] border border-[#756247]/40 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#c6af87]" />
                        <span>{trainer.experienceYears} Yrs Experience</span>
                      </div>

                      {/* Social Handles */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5">
                        <a
                          href={trainer.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-[#0d1218]/80 backdrop-blur-md text-[#dce3e7] hover:text-[#c6af87] flex items-center justify-center border border-white/10 transition-colors"
                          aria-label={`${trainer.name} Instagram`}
                        >
                          <InstagramIcon size={14} />
                        </a>
                        <a
                          href={trainer.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-[#0d1218]/80 backdrop-blur-md text-[#dce3e7] hover:text-[#c6af87] flex items-center justify-center border border-white/10 transition-colors"
                          aria-label={`${trainer.name} LinkedIn`}
                        >
                          <LinkedInIcon size={14} />
                        </a>
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6">
                      <h3 className="text-2xl font-black text-[#f6f4ef] uppercase tracking-tight">
                        {trainer.name}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#c6af87] mt-0.5">
                        {trainer.role}
                      </p>

                      {/* Certifications Pills */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {trainer.certifications.map((cert, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-[#dce3e7] border border-[#dce3e7]/10"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>

                      {/* Bio */}
                      <p className="mt-4 text-xs sm:text-sm text-[#a3adb7] leading-relaxed">
                        {trainer.bio}
                      </p>

                      {/* Philosophy Quote */}
                      <div className="mt-4 p-3.5 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/10 relative">
                        <Quote className="w-4 h-4 text-[#756247]/60 absolute top-2 right-2" />
                        <p className="text-xs italic text-[#dce3e7]/90 pr-4">
                          &ldquo;{trainer.philosophy}&rdquo;
                        </p>
                      </div>

                      {/* Specialties */}
                      <div className="mt-4 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a3adb7] block">
                          Specialties:
                        </span>
                        {trainer.specialties.map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-center gap-2 text-xs text-[#dce3e7]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#756247] shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Deep-Linked 1-on-1 Consult Booking CTA */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/contact?trainer=${encodeURIComponent(trainer.name)}`}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#756247] to-[#8d7755] hover:from-[#8d7755] hover:to-[#a18b67] text-[#f6f4ef] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#756247]/20 transition-all duration-200 border border-[#dce3e7]/20 active:scale-[0.98]"
                    >
                      <span>
                        Book Consult with {trainer.name.split(" ")[0]}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#c6af87]" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
