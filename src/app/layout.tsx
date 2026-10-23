import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { gymInfo } from "@/data/gymData";

export const metadata: Metadata = {
  title: {
    default: `${gymInfo.name} | ${gymInfo.tagline}`,
    template: `%s | ${gymInfo.name}`,
  },
  description:
    "Strength training, conditioning, and coaching at IronForge Fitness. Explore programs, compare memberships, and plan your first visit.",
  keywords: [
    "Strength training",
    "Olympic Weightlifting",
    "HIIT MetCon Classes",
    "Personal Training",
    "CSCS Strength Coach",
    "Infrared Sauna Cold Plunge",
    "IronForge Fitness",
  ],
  authors: [{ name: gymInfo.legalName, url: "https://ironforgefitness.com" }],
  creator: gymInfo.legalName,
  openGraph: {
    title: `${gymInfo.name} | Elite Strength, Conditioning & Recovery`,
    description: gymInfo.mission,
    url: "https://ironforgefitness.com",
    siteName: gymInfo.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#090c10] text-[#dce3e7] antialiased selection:bg-[#756247] selection:text-[#dce3e7]">
        {/* Persistent Sticky Translucent Header */}
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Persistent Multi-Column Footer */}
        <Footer />
      </body>
    </html>
  );
}
