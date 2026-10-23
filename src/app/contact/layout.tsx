import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Plan your visit",
  description:
    "Prepare an enquiry for the IronForge team and arrange your first visit.",
};
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
