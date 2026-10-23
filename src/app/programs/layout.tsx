import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Programs & weekly schedule",
  description:
    "Explore strength, conditioning, boxing, and mobility sessions at IronForge.",
};
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
