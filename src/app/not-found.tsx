import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowRight, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#090c10] px-4 py-20">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl glass-panel border border-[#756247]/40 flex items-center justify-center mx-auto mb-6 text-[#c6af87]">
          <Dumbbell className="w-8 h-8 stroke-[2.2]" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#e7d7b8]">
          Error 404 • Lost in the Facility
        </span>

        <h1 className="mt-2 text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#f6f4ef]">
          Platform Not Found
        </h1>

        <p className="mt-4 text-base text-[#a3adb7] leading-relaxed">
          Looks like this rep got dropped. The workout program or platform you
          were looking for doesn’t exist or has moved to another studio.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#756247] to-[#8d7755] hover:from-[#8d7755] hover:to-[#a18b67] text-[#f6f4ef] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#756247]/20 transition-all border border-[#dce3e7]/20"
          >
            <Home className="w-4 h-4 text-[#c6af87]" />
            <span>Return to Gym Floor</span>
          </Link>

          <Link
            href="/programs"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel hover:bg-white/10 text-[#dce3e7] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#dce3e7]/15 transition-all"
          >
            <Compass className="w-4 h-4 text-[#c6af87]" />
            <span>View Class Schedule</span>
            <ArrowRight className="w-4 h-4 text-[#c6af87]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
