export type IntensityLevel = "Low" | "Moderate" | "High" | "Extreme";

export type ProgramCategory =
  "All" | "Strength" | "Cardio & HIIT" | "Mind & Mobility" | "Combat";

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type UnitSystem = "metric" | "imperial";

export type Gender = "male" | "female";

export type ActivityLevel =
  "sedentary" | "light" | "moderate" | "very_active" | "athlete";

export type FitnessGoal = "fat_loss" | "maintenance" | "muscle_gain";

export interface SocialLinks {
  instagram: string;
  youtube: string;
  twitter: string;
  facebook: string;
}

export interface GymAddress {
  street: string;
  district: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  full: string;
}

export interface GymOperatingHours {
  weekdays: string;
  weekends: string;
  holidays: string;
}

export interface GymInfo {
  name: string;
  legalName: string;
  tagline: string;
  mission: string;
  email: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  whatsappUrl: string;
  address: GymAddress;
  hours: GymOperatingHours;
  social: SocialLinks;
}

export interface StatMetric {
  id: string;
  value: string;
  label: string;
  subtext: string;
  iconName: string;
}

export interface Amenity {
  id: string;
  title: string;
  badge: string;
  description: string;
  iconName: string;
  imageUrl: string;
  features: string[];
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  category: ProgramCategory;
  tagline: string;
  description: string;
  duration: string;
  intensity: IntensityLevel;
  caloriesBurned: string;
  targetAudience: string;
  highlights: string[];
  imageUrl: string;
  iconName: string;
}

export interface ScheduleItem {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  programId: string;
  programName: string;
  category: ProgramCategory;
  trainerId: string;
  trainerName: string;
  studio: string;
  openSpots: number;
  maxSpots: number;
  intensity: IntensityLevel;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  certifications: string[];
  experienceYears: number;
  bio: string;
  philosophy: string;
  specialties: string[];
  imageUrl: string;
  emailContactSlug: string;
  social: {
    instagram: string;
    linkedin: string;
  };
}

export interface MembershipTier {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  monthlyPrice: number;
  annualPriceMonthly: number; // discounted monthly price when paid annually
  annualBilledTotal: number;
  description: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  highlightColor?: string;
}

export interface FeatureComparisonRow {
  feature: string;
  category: "Access" | "Amenities" | "Coaching" | "Perks";
  starter: boolean | string;
  pro: boolean | string;
  elite: boolean | string;
  tooltip?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  profession: string;
  programUsed: string;
  duration: string;
  stats: {
    label: string;
    value: string;
  }[];
  quote: string;
  rating: number;
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Memberships" | "Classes" | "Facilities";
}

export interface CalculatorState {
  system: UnitSystem;
  gender: Gender;
  age: number;
  heightCm: number;
  heightFt: number;
  heightIn: number;
  weightKg: number;
  weightLbs: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
}

export interface MacroSplit {
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
}

export interface CalculatorResults {
  bmi: number;
  bmiCategory: "Underweight" | "Normal Weight" | "Overweight" | "Obese";
  bmiColorClass: string;
  bmr: number;
  tdee: number;
  targetCalories: number;
  calorieAdjustment: number;
  macros: MacroSplit;
  recommendedProgramId: string;
  recommendedProgramName: string;
}

export interface FreeTrialFormData {
  fullName: string;
  email: string;
  phone: string;
  inquiryType:
    "3-day-free-pass" | "personal-training" | "group-classes" | "general";
  preferredDate: string;
  preferredTimeSlot: "morning" | "afternoon" | "evening";
  trainerPreference: string;
  programPreference: string;
  fitnessGoal: string;
  experienceLevel: "beginner" | "intermediate" | "advanced";
  message: string;
}
