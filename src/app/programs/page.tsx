"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { programs, weeklySchedule } from "@/data/gymData";
import { ProgramCategory, DayOfWeek } from "@/types";
import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Calendar,
  Clock,
  Flame,
  Users,
  CheckCircle2,
  ArrowRight,
  Filter,
  Dumbbell,
  Swords,
  HeartHandshake,
  Zap,
  Shield,
} from "lucide-react";

const categories: ProgramCategory[] = [
  "All",
  "Strength",
  "Cardio & HIIT",
  "Mind & Mobility",
  "Combat",
];

const daysOfWeek: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProgramCategory>("All");
  const [activeDay, setActiveDay] = useState<DayOfWeek>("Monday");

  const filteredPrograms = useMemo(() => {
    if (selectedCategory === "All") return programs;
    return programs.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const dailySchedule = useMemo(() => {
    return weeklySchedule.filter((item) => item.day === activeDay);
  }, [activeDay]);

  const renderCategoryIcon = (category: ProgramCategory) => {
    switch (category) {
      case "Strength":
        return <Dumbbell className="w-4 h-4" />;
      case "Cardio & HIIT":
        return <Flame className="w-4 h-4" />;
      case "Combat":
        return <Swords className="w-4 h-4" />;
      case "Mind & Mobility":
        return <HeartHandshake className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#090c10] pt-12 pb-24">
      <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            PAGE HEADER
            ======================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#756247]/20 text-[#dce3e7] text-xs font-bold uppercase tracking-wider mb-4 border border-[#756247]/40">
            <Shield className="w-3.5 h-3.5 text-[#c6af87]" />
            <span>FIND YOUR PRACTICE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[#f6f4ef] leading-tight">
            Programs & <span className="text-[#c6af87]">Weekly Timetable</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#a3adb7] leading-relaxed max-w-2xl mx-auto">
            From your first lift to your next challenge, find a session that
            fits. Explore strength, conditioning, boxing, and mobility.
          </p>
        </div>

        {/* ========================================================
            PART 1: INTERACTIVE CATEGORY FILTER & PROGRAMS GRID
            ======================================================== */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-[#dce3e7]/10">
            <div className="flex items-center gap-2 text-[#f6f4ef] font-bold uppercase tracking-wider text-xs">
              <Filter className="w-4 h-4 text-[#c6af87]" />
              <span>Filter by Discipline:</span>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={selectedCategory === cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#756247] text-[#f6f4ef] shadow-lg shadow-[#756247]/30 border border-[#dce3e7]/20"
                        : "glass-panel text-[#a3adb7] hover:text-[#dce3e7] hover:bg-white/5 border border-[#dce3e7]/10"
                    }`}
                  >
                    {renderCategoryIcon(cat)}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Programs Grid with Perfect Aspect Ratio */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, idx) => (
              <ScrollReveal key={program.id} delayMs={idx * 80}>
                <div
                  id={program.id}
                  className="group rounded-lg glass-panel glass-panel-hover border border-[#dce3e7]/10 overflow-hidden flex flex-col justify-between shadow-xl"
                >
                  <div>
                    {/* Image Banner with 16:10 Aspect Ratio */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0d1218]">
                      <Image
                        src={program.imageUrl}
                        alt={program.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11161c] via-transparent to-black/30" />

                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0d1218]/85 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#dce3e7] border border-[#756247]/40 flex items-center gap-1.5">
                        {renderCategoryIcon(program.category)}
                        <span>{program.category}</span>
                      </div>

                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#c6af87]/90 text-[#090c10] text-[10px] font-black uppercase tracking-wider">
                        {program.intensity}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-black text-[#f6f4ef] uppercase tracking-tight group-hover:text-[#c6af87] transition-colors">
                        {program.name}
                      </h3>

                      <p className="mt-2 text-sm text-[#a3adb7] leading-relaxed">
                        {program.tagline}
                      </p>

                      {/* Stats strip */}
                      <div className="mt-5 grid grid-cols-2 gap-3 p-3.5 rounded-md bg-[#0d1218]/80 border border-[#dce3e7]/10 text-xs">
                        <div>
                          <span className="text-[#a3adb7] block text-[9px] uppercase font-bold">
                            Class Duration
                          </span>
                          <span className="font-extrabold text-[#f6f4ef] flex items-center gap-1 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-[#c6af87]" />
                            {program.duration}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#a3adb7] block text-[9px] uppercase font-bold">
                            Est. Output
                          </span>
                          <span className="font-extrabold text-[#c6af87] flex items-center gap-1 mt-0.5">
                            <Flame className="w-3.5 h-3.5" />
                            {program.caloriesBurned}
                          </span>
                        </div>
                      </div>

                      {/* Highlights bullet points */}
                      <div className="mt-5 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#a3adb7] block">
                          Curriculum Highlights:
                        </span>
                        {program.highlights.map((h, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-center gap-2 text-xs text-[#dce3e7]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#756247] shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/contact?program=${program.id}`}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#756247] to-[#8d7755] hover:from-[#8d7755] hover:to-[#a18b67] text-[#f6f4ef] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 border border-[#dce3e7]/20"
                    >
                      <span>Try In 3-Day Free Pass</span>
                      <ArrowRight className="w-4 h-4 text-[#c6af87]" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ========================================================
            PART 2: INTERACTIVE MONDAY–SUNDAY WEEKLY TIMETABLE
            ======================================================== */}
        <section className="rounded-lg glass-panel border border-[#756247]/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <SectionHeader
              badge="Weekly class schedule"
              badgeColor="teal"
              title="Weekly Class"
              titleHighlight="Schedule"
              description="Browse the weekly schedule and enquire about a session. Times and availability are confirmed by the team."
              align="center"
            />

            {/* Day Selector Tabs Strip */}
            <div className="mt-10 flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
              {daysOfWeek.map((day) => {
                const isActive = activeDay === day;
                return (
                  <button
                    key={day}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveDay(day)}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 shrink-0 ${
                      isActive
                        ? "bg-[#c6af87] text-[#090c10] shadow-lg shadow-[#c6af87]/25 border border-[#e7d7b8]/40"
                        : "bg-[#0d1218]/80 text-[#a3adb7] hover:text-[#dce3e7] hover:bg-white/5 border border-[#dce3e7]/10"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Timetable Session Cards */}
            <div className="mt-8 space-y-4">
              {dailySchedule.length === 0 ? (
                <div className="p-12 text-center text-[#a3adb7] bg-[#0d1218]/60 rounded-md border border-[#dce3e7]/10">
                  <Calendar className="w-10 h-10 mx-auto text-[#a3adb7] mb-3" />
                  <p className="text-base font-bold text-[#f6f4ef]">
                    No coached classes scheduled for this day.
                  </p>
                  <p className="text-xs text-[#a3adb7] mt-1">
                    Open gym and recovery saunas remain open 24/7 for members.
                  </p>
                </div>
              ) : (
                dailySchedule.map((session, sIdx) => (
                  <ScrollReveal key={session.id} delayMs={sIdx * 60}>
                    <div className="p-5 sm:p-6 rounded-md bg-[#0d1218]/70 border border-[#dce3e7]/10 hover:border-[#756247]/40 transition-all duration-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Time & Class Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="sm:w-36 shrink-0">
                          <div className="text-lg font-black text-[#f6f4ef] tracking-tight flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#c6af87]" />
                            <span>{session.startTime}</span>
                          </div>
                          <div className="text-xs text-[#a3adb7]">
                            Ends at {session.endTime}
                          </div>
                        </div>

                        <div className="border-l-2 border-[#756247]/40 pl-0 sm:pl-6">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#756247]/20 text-[#dce3e7]">
                              {session.category}
                            </span>
                            <span className="text-[10px] font-medium text-[#a3adb7]">
                              {session.studio}
                            </span>
                          </div>

                          <h4 className="text-xl font-black text-[#f6f4ef] uppercase tracking-tight">
                            {session.programName}
                          </h4>

                          <div className="mt-1 flex items-center gap-2 text-xs text-[#a3adb7]">
                            <span>Lead Coach:</span>
                            <span className="font-bold text-[#dce3e7]">
                              {session.trainerName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Open Spots & Action Button */}
                      <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#dce3e7]/10">
                        <div className="text-right">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#dce3e7]">
                            <Users className="w-3.5 h-3.5 text-[#c6af87]" />
                            <span>Ask about availability</span>
                          </div>
                          <span className="text-[10px] text-[#a3adb7]">
                            Max cap: {session.maxSpots} athletes
                          </span>
                        </div>

                        <Link
                          href={`/contact?session=${session.id}&program=${session.programId}`}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#756247] to-[#8d7755] hover:from-[#8d7755] hover:to-[#a18b67] text-[#f6f4ef] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#756247]/20 active:scale-[0.98] transition-all border border-[#dce3e7]/20"
                        >
                          <span>Enquire</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#c6af87]" />
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
