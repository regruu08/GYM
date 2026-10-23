"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { UnitSystem, Gender, ActivityLevel, FitnessGoal } from "@/types";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Calculator,
  Activity,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Shield,
} from "lucide-react";

export default function FitnessToolsPage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<number>(28);

  // Height inputs
  const [heightCm, setHeightCm] = useState<number>(178);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(10);

  // Weight inputs
  const [weightKg, setWeightKg] = useState<number>(78);
  const [weightLbs, setWeightLbs] = useState<number>(172);

  // Activity & Goal
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<FitnessGoal>("fat_loss");

  const handleUnitToggle = (system: UnitSystem) => {
    if (system === unitSystem) return;
    if (system === "imperial") {
      const totalInches = Math.round(heightCm / 2.54);
      setHeightFt(Math.floor(totalInches / 12));
      setHeightIn(totalInches % 12);
      setWeightLbs(Math.round(weightKg * 2.20462));
    } else {
      const totalInches = heightFt * 12 + heightIn;
      setHeightCm(Math.round(totalInches * 2.54));
      setWeightKg(Math.round(weightLbs / 2.20462));
    }
    setUnitSystem(system);
  };

  const validInputs =
    Number.isFinite(age) &&
    age >= 18 &&
    age <= 90 &&
    (unitSystem === "metric"
      ? Number.isFinite(weightKg) &&
        weightKg >= 35 &&
        weightKg <= 250 &&
        Number.isFinite(heightCm) &&
        heightCm >= 120 &&
        heightCm <= 230
      : Number.isFinite(weightLbs) &&
        weightLbs >= 77 &&
        weightLbs <= 551 &&
        Number.isInteger(heightFt) &&
        Number.isFinite(heightIn) &&
        heightIn >= 0 &&
        heightIn < 12 &&
        heightFt * 12 + heightIn >= 47.24 &&
        heightFt * 12 + heightIn <= 90.56);

  const calculations = useMemo(() => {
    let heightInMeters: number;
    let heightForBmrCm: number;
    if (unitSystem === "metric") {
      heightInMeters = heightCm / 100;
      heightForBmrCm = heightCm;
    } else {
      const totalInches = heightFt * 12 + heightIn;
      heightInMeters = (totalInches * 2.54) / 100;
      heightForBmrCm = totalInches * 2.54;
    }

    let weightForCalcKg: number;
    if (unitSystem === "metric") {
      weightForCalcKg = weightKg;
    } else {
      weightForCalcKg = weightLbs / 2.20462;
    }

    const rawBmi =
      heightInMeters > 0
        ? weightForCalcKg / (heightInMeters * heightInMeters)
        : 22;
    const bmi = Number(rawBmi.toFixed(1));

    let bmiCategory: "Underweight" | "Normal Weight" | "Overweight" | "Obese" =
      "Normal Weight";
    let bmiColorClass = "text-[#dce3e7] bg-[#756247]/20 border-[#756247]/40";
    let bmiProgressPercent = 50;

    if (bmi < 18.5) {
      bmiCategory = "Underweight";
      bmiColorClass = "text-[#e7d7b8] bg-[#e7d7b8]/15 border-[#e7d7b8]/30";
      bmiProgressPercent = Math.min(Math.max((bmi / 18.5) * 25, 5), 25);
    } else if (bmi <= 24.9) {
      bmiCategory = "Normal Weight";
      bmiColorClass = "text-[#dce3e7] bg-[#756247]/30 border-[#756247]/50";
      bmiProgressPercent = 25 + ((bmi - 18.5) / (24.9 - 18.5)) * 25;
    } else if (bmi <= 29.9) {
      bmiCategory = "Overweight";
      bmiColorClass = "text-[#c6af87] bg-[#c6af87]/15 border-[#c6af87]/30";
      bmiProgressPercent = 50 + ((bmi - 25) / (29.9 - 25)) * 25;
    } else {
      bmiCategory = "Obese";
      bmiColorClass = "text-[#e7d7b8] bg-[#e7d7b8]/20 border-[#e7d7b8]/40";
      bmiProgressPercent = Math.min(75 + ((bmi - 30) / 15) * 25, 100);
    }

    // BMR Calculation (Mifflin-St Jeor Formula)
    let bmr = 10 * weightForCalcKg + 6.25 * heightForBmrCm - 5 * age;
    bmr += gender === "male" ? 5 : -161;
    bmr = Math.round(bmr);

    // Harris-Benedict TDEE
    const activityMultipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very_active: 1.725,
      athlete: 1.9,
    };
    const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.55));

    let targetCalories = tdee;
    let calorieAdjustment = 0;
    if (goal === "fat_loss") {
      targetCalories = Math.max(tdee - 500, gender === "male" ? 1500 : 1200);
      calorieAdjustment = targetCalories - tdee;
    } else if (goal === "muscle_gain") {
      calorieAdjustment = 300;
      targetCalories = tdee + 300;
    }

    let proteinPct = 30;
    let carbsPct = 45;
    let fatPct = 25;

    if (goal === "fat_loss") {
      proteinPct = 35;
      carbsPct = 35;
      fatPct = 30;
    } else if (goal === "muscle_gain") {
      proteinPct = 25;
      carbsPct = 55;
      fatPct = 20;
    }

    const proteinCalories = Math.round(targetCalories * (proteinPct / 100));
    const carbsCalories = Math.round(targetCalories * (carbsPct / 100));
    const fatCalories = Math.round(targetCalories * (fatPct / 100));

    const proteinGrams = Math.round(proteinCalories / 4);
    const carbsGrams = Math.round(carbsCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);

    let recommendedProgram = {
      id: "metcon-shred",
      name: "MetCon Velocity HIIT",
      reason:
        "Optimal for fat oxidation, elevated excess post-exercise oxygen consumption (EPOC), and metabolic stamina.",
      coach: "Darius Cole, NASM-CPT",
    };

    if (goal === "muscle_gain") {
      recommendedProgram = {
        id: "iron-hypertrophy",
        name: "Iron Hypertrophy & Barbell Strength",
        reason:
          "Caloric surplus paired with progressive barbell overload unlocks rapid myofibrillar hypertrophy and pure strength.",
        coach: "Marcus Vance, CSCS",
      };
    } else if (goal === "maintenance") {
      recommendedProgram = {
        id: "athletic-conditioning",
        name: "Hybrid Athletic Conditioning",
        reason:
          "Maintains lean body mass while expanding rotational power, agility ladder mechanics, and peak cardiovascular health.",
        coach: "Jaxson Reed & Elena Rostova",
      };
    }

    return {
      bmi,
      bmiCategory,
      bmiColorClass,
      bmiProgressPercent,
      bmr,
      tdee,
      targetCalories,
      calorieAdjustment,
      macros: {
        proteinGrams,
        carbsGrams,
        fatGrams,
        proteinCalories,
        carbsCalories,
        fatCalories,
        proteinPct,
        carbsPct,
        fatPct,
      },
      recommendedProgram,
    };
  }, [
    unitSystem,
    gender,
    age,
    heightCm,
    heightFt,
    heightIn,
    weightKg,
    weightLbs,
    activityLevel,
    goal,
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#090c10] pt-12 pb-24">
      <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            PAGE HEADER & CALCULATOR INTRODUCTION
            ======================================================== */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#756247]/20 text-[#dce3e7] text-xs font-bold uppercase tracking-wider mb-4 border border-[#756247]/40">
            <Calculator className="w-3.5 h-3.5 text-[#c6af87]" />
            <span>YOUR TRAINING, IN NUMBERS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[#f6f4ef] leading-tight">
            BMI, Calorie &{" "}
            <span className="text-[#c6af87]">TDEE Calculator</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#a3adb7] leading-relaxed max-w-2xl mx-auto">
            Explore an estimate of your daily energy needs. Adjust your
            measurements, activity level, and goal to see how the numbers
            change.
          </p>

          {/* Unit System Toggle (Metric vs Imperial) */}
          <div className="mt-8 flex items-center justify-center">
            <div className="glass-panel p-1.5 rounded-md border border-[#dce3e7]/15 flex items-center gap-2">
              <button
                type="button"
                aria-pressed={unitSystem === "metric"}
                onClick={() => handleUnitToggle("metric")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  unitSystem === "metric"
                    ? "bg-[#756247] text-[#f6f4ef] shadow-md border border-[#dce3e7]/25"
                    : "text-[#a3adb7] hover:text-[#dce3e7]"
                }`}
              >
                Metric (kg / cm)
              </button>
              <button
                type="button"
                aria-pressed={unitSystem === "imperial"}
                onClick={() => handleUnitToggle("imperial")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  unitSystem === "imperial"
                    ? "bg-[#756247] text-[#f6f4ef] shadow-md border border-[#dce3e7]/25"
                    : "text-[#a3adb7] hover:text-[#dce3e7]"
                }`}
              >
                Imperial (lbs / ft-in)
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            CALCULATOR MAIN GRID: INPUTS (LEFT) & RESULTS (RIGHT)
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: INTERACTIVE INPUT FORM (7 Cols) */}
          <ScrollReveal className="lg:col-span-7">
            <div className="rounded-lg glass-panel border border-[#dce3e7]/15 p-6 sm:p-8 shadow-2xl space-y-6">
              <h2 className="text-xl font-medium tracking-tight text-[#f6f4ef] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#c6af87]" />
                <span>1. Enter Your Biometrics</span>
              </h2>

              {/* Gender Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#a3adb7] mb-2">
                  Biological Sex (for BMR calculation)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    aria-pressed={gender === "male"}
                    onClick={() => setGender("male")}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all ${
                      gender === "male"
                        ? "bg-[#756247] text-[#f6f4ef] font-bold shadow-md border border-[#dce3e7]/25"
                        : "bg-[#0d1218]/80 text-[#a3adb7] hover:bg-white/5 border border-[#dce3e7]/10"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    aria-pressed={gender === "female"}
                    onClick={() => setGender("female")}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all ${
                      gender === "female"
                        ? "bg-[#756247] text-[#f6f4ef] font-bold shadow-md border border-[#dce3e7]/25"
                        : "bg-[#0d1218]/80 text-[#a3adb7] hover:bg-white/5 border border-[#dce3e7]/10"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age & Weight Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#a3adb7] mb-2">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="90"
                    aria-label="Age in years"
                    value={Number.isFinite(age) ? age : ""}
                    onChange={(e) => setAge(e.target.valueAsNumber)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/15 text-[#f6f4ef] font-bold focus:outline-none focus:border-[#756247] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#a3adb7] mb-2">
                    Weight ({unitSystem === "metric" ? "Kilograms" : "Pounds"})
                  </label>
                  {unitSystem === "metric" ? (
                    <input
                      type="number"
                      min="35"
                      max="250"
                      aria-label="Weight in kilograms"
                      value={Number.isFinite(weightKg) ? weightKg : ""}
                      onChange={(e) => setWeightKg(e.target.valueAsNumber)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/15 text-[#f6f4ef] font-bold focus:outline-none focus:border-[#756247] transition-colors"
                    />
                  ) : (
                    <input
                      type="number"
                      min="77"
                      max="551"
                      aria-label="Weight in pounds"
                      value={Number.isFinite(weightLbs) ? weightLbs : ""}
                      onChange={(e) => setWeightLbs(e.target.valueAsNumber)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/15 text-[#f6f4ef] font-bold focus:outline-none focus:border-[#756247] transition-colors"
                    />
                  )}
                </div>
              </div>

              {/* Height Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#a3adb7] mb-2">
                  Height (
                  {unitSystem === "metric" ? "Centimeters" : "Feet & Inches"})
                </label>
                {unitSystem === "metric" ? (
                  <input
                    type="number"
                    min="120"
                    max="230"
                    aria-label="Height in centimeters"
                    value={Number.isFinite(heightCm) ? heightCm : ""}
                    onChange={(e) => setHeightCm(e.target.valueAsNumber)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/15 text-[#f6f4ef] font-bold focus:outline-none focus:border-[#756247] transition-colors"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="number"
                        min="3"
                        max="7"
                        aria-label="Height in feet"
                        value={Number.isFinite(heightFt) ? heightFt : ""}
                        onChange={(e) => setHeightFt(e.target.valueAsNumber)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/15 text-[#f6f4ef] font-bold focus:outline-none focus:border-[#756247]"
                      />
                      <span className="absolute right-3 top-3 text-xs text-[#a3adb7] font-bold">
                        ft
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="11"
                        aria-label="Additional inches"
                        value={Number.isFinite(heightIn) ? heightIn : ""}
                        onChange={(e) => setHeightIn(e.target.valueAsNumber)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/15 text-[#f6f4ef] font-bold focus:outline-none focus:border-[#756247]"
                      />
                      <span className="absolute right-3 top-3 text-xs text-[#a3adb7] font-bold">
                        in
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Activity Level Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#a3adb7] mb-2">
                  Daily Physical Activity Level
                </label>
                <select
                  aria-label="Activity level"
                  value={activityLevel}
                  onChange={(e) =>
                    setActivityLevel(e.target.value as ActivityLevel)
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#0d1218]/90 border border-[#dce3e7]/15 text-[#dce3e7] font-semibold focus:outline-none focus:border-[#756247] transition-colors"
                >
                  <option value="sedentary">
                    Sedentary (Desk job, minimal daily movement: 1.2x)
                  </option>
                  <option value="light">
                    Light Activity (1-3 gym sessions or light cardio per week:
                    1.375x)
                  </option>
                  <option value="moderate">
                    Moderate Activity (3-5 intense lifting / class sessions:
                    1.55x)
                  </option>
                  <option value="very_active">
                    Very Active (6-7 intense training sessions per week: 1.725x)
                  </option>
                  <option value="athlete">
                    Elite Athlete (Daily high-intensity double-sessions / heavy
                    labor: 1.9x)
                  </option>
                </select>
              </div>

              {/* Primary Fitness Goal Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#a3adb7] mb-2">
                  Primary Goal Target
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    aria-pressed={goal === "fat_loss"}
                    onClick={() => setGoal("fat_loss")}
                    className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all flex flex-col items-center gap-1 ${
                      goal === "fat_loss"
                        ? "bg-[#756247] text-[#f6f4ef] font-bold shadow-md border border-[#dce3e7]/30"
                        : "bg-[#0d1218]/80 text-[#a3adb7] hover:text-[#dce3e7] border border-[#dce3e7]/10"
                    }`}
                  >
                    <TrendingDown className="w-4 h-4 text-[#c6af87]" />
                    <span>Fat loss</span>
                  </button>

                  <button
                    type="button"
                    aria-pressed={goal === "maintenance"}
                    onClick={() => setGoal("maintenance")}
                    className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all flex flex-col items-center gap-1 ${
                      goal === "maintenance"
                        ? "bg-[#756247] text-[#f6f4ef] font-bold shadow-md border border-[#dce3e7]/30"
                        : "bg-[#0d1218]/80 text-[#a3adb7] hover:text-[#dce3e7] border border-[#dce3e7]/10"
                    }`}
                  >
                    <RefreshCw className="w-4 h-4 text-[#c6af87]" />
                    <span>Maintain</span>
                  </button>

                  <button
                    type="button"
                    aria-pressed={goal === "muscle_gain"}
                    onClick={() => setGoal("muscle_gain")}
                    className={`py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all flex flex-col items-center gap-1 ${
                      goal === "muscle_gain"
                        ? "bg-[#756247] text-[#f6f4ef] font-bold shadow-md border border-[#dce3e7]/30"
                        : "bg-[#0d1218]/80 text-[#a3adb7] hover:text-[#dce3e7] border border-[#dce3e7]/10"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 text-[#e7d7b8]" />
                    <span>Build muscle</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: REAL-TIME RESULTS & TAILORED PROGRAM (5 Cols) */}
          <ScrollReveal delayMs={120} className="lg:col-span-5 space-y-6">
            <p className="text-sm text-[#dce3e7] leading-relaxed">
              General estimates for adults, not an individual nutrition
              prescription. BMI does not distinguish muscle from body fat.
            </p>
            {!validInputs && (
              <p role="alert" className="p-6 border border-[#c6af87]">
                Enter an age of 18–90, weight of 35–250 kg (77–551 lb), and
                height of 120–230 cm (about 3 ft 11.25 in–7 ft 6.5 in) to see
                estimates.
              </p>
            )}
            <div hidden={!validInputs} className="space-y-6">
              {/* Real-Time Results Card */}
              <div className="rounded-lg glass-panel border border-[#756247]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <h2 className="text-xl font-medium tracking-tight text-[#f6f4ef] flex items-center justify-between">
                  <span>Calculated Profile</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#756247]/20 text-[#dce3e7] border border-[#756247]/40 font-bold uppercase">
                    Real-Time
                  </span>
                </h2>

                {/* BMI Section */}
                <div className="mt-6 p-4 rounded-md bg-[#0d1218]/80 border border-[#dce3e7]/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#a3adb7] uppercase">
                      Body Mass Index (BMI)
                    </span>
                    <span
                      className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${calculations.bmiColorClass}`}
                    >
                      {calculations.bmiCategory}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-[#f6f4ef]">
                    {calculations.bmi}
                  </div>

                  {/* Visual Progress Gauge */}
                  <div className="mt-3 w-full bg-white/10 h-2.5 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#c6af87] via-[#756247] to-[#e7d7b8] transition-all duration-300 rounded-full"
                      style={{ width: `${calculations.bmiProgressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#a3adb7] font-bold mt-1">
                    <span>18.5 (Under)</span>
                    <span>24.9 (Normal)</span>
                    <span>29.9 (Over)</span>
                    <span>35+ (Obese)</span>
                  </div>
                </div>

                {/* BMR vs TDEE vs Target Calories */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/10">
                    <span className="text-[#a3adb7] block text-[10px] uppercase font-bold">
                      Basal Metabolic Rate
                    </span>
                    <span className="text-xl font-black text-[#f6f4ef] mt-1 block">
                      {calculations.bmr}{" "}
                      <span className="text-xs font-normal text-[#a3adb7]">
                        kcal
                      </span>
                    </span>
                    <span className="text-[10px] text-[#a3adb7]">
                      Resting baseline
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0d1218]/80 border border-[#dce3e7]/10">
                    <span className="text-[#a3adb7] block text-[10px] uppercase font-bold">
                      Daily TDEE Burn
                    </span>
                    <span className="text-xl font-black text-[#f6f4ef] mt-1 block">
                      {calculations.tdee}{" "}
                      <span className="text-xs font-normal text-[#a3adb7]">
                        kcal
                      </span>
                    </span>
                    <span className="text-[10px] text-[#a3adb7]">
                      With physical activity
                    </span>
                  </div>
                </div>

                {/* Target Calories Big Metric */}
                <div className="mt-4 p-5 rounded-md bg-gradient-to-r from-[#0d1218] to-[#11161c] border border-[#756247]/40 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#c6af87] block mb-1">
                    Recommended Daily Caloric Target
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-[#f6f4ef] tracking-tight">
                    {calculations.targetCalories}{" "}
                    <span className="text-base font-bold text-[#a3adb7] uppercase">
                      kcal/day
                    </span>
                  </div>
                  <span className="text-xs text-[#a3adb7] mt-1 block">
                    {calculations.calorieAdjustment === 0
                      ? "Targeting healthy body recomposition & energy maintenance"
                      : calculations.calorieAdjustment < 0
                        ? `${Math.abs(calculations.calorieAdjustment)} kcal below estimated maintenance`
                        : `${calculations.calorieAdjustment} kcal above estimated maintenance`}
                  </span>
                </div>

                {/* Daily Macronutrient Distribution */}
                <div className="mt-6 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f6f4ef] block">
                    Target Daily Macronutrients:
                  </span>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {/* Protein */}
                    <div className="p-3 rounded-xl bg-[#756247]/20 border border-[#756247]/35">
                      <span className="text-[10px] uppercase font-black text-[#dce3e7] block">
                        Protein
                      </span>
                      <span className="text-lg font-black text-[#f6f4ef] mt-0.5 block">
                        {calculations.macros.proteinGrams}g
                      </span>
                      <span className="text-[10px] text-[#a3adb7]">
                        {calculations.macros.proteinPct}%
                      </span>
                    </div>

                    {/* Carbs */}
                    <div className="p-3 rounded-xl bg-[#c6af87]/15 border border-[#c6af87]/30">
                      <span className="text-[10px] uppercase font-black text-[#c6af87] block">
                        Carbs
                      </span>
                      <span className="text-lg font-black text-[#f6f4ef] mt-0.5 block">
                        {calculations.macros.carbsGrams}g
                      </span>
                      <span className="text-[10px] text-[#a3adb7]">
                        {calculations.macros.carbsPct}%
                      </span>
                    </div>

                    {/* Fats */}
                    <div className="p-3 rounded-xl bg-[#e7d7b8]/15 border border-[#e7d7b8]/30">
                      <span className="text-[10px] uppercase font-black text-[#e7d7b8] block">
                        Fats
                      </span>
                      <span className="text-lg font-black text-[#f6f4ef] mt-0.5 block">
                        {calculations.macros.fatGrams}g
                      </span>
                      <span className="text-[10px] text-[#a3adb7]">
                        {calculations.macros.fatPct}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TAILORED IRONFORGE PROGRAM RECOMMENDATION */}
              <div className="rounded-lg glass-panel border border-[#756247]/40 p-6 sm:p-8 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#c6af87] mb-2">
                  <Shield className="w-4 h-4 text-[#c6af87]" />
                  <span>Personalized IronForge Match</span>
                </div>

                <h3 className="text-2xl font-black text-[#f6f4ef] uppercase tracking-tight">
                  {calculations.recommendedProgram.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#a3adb7] leading-relaxed">
                  {calculations.recommendedProgram.reason}
                </p>

                <div className="mt-4 pt-4 border-t border-[#dce3e7]/10 flex items-center justify-between text-xs text-[#a3adb7]">
                  <span>Lead Coach:</span>
                  <span className="font-bold text-[#dce3e7]">
                    {calculations.recommendedProgram.coach}
                  </span>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/contact?program=${calculations.recommendedProgram.id}&goal=${goal}`}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#756247] to-[#8d7755] hover:from-[#8d7755] hover:to-[#a18b67] text-[#f6f4ef] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#756247]/20 active:scale-[0.98] transition-all border border-[#dce3e7]/25"
                  >
                    <span>Book Free Trial For This Program</span>
                    <ArrowRight className="w-4 h-4 text-[#c6af87]" />
                  </Link>

                  <Link
                    href={`/programs#${calculations.recommendedProgram.id}`}
                    className="py-3 px-4 rounded-xl glass-panel hover:bg-white/10 text-[#dce3e7] font-semibold text-xs uppercase tracking-wider flex items-center justify-center border border-[#dce3e7]/15"
                  >
                    Curriculum
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
