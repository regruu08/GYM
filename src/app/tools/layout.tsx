import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Fitness calculator",
  description:
    "Explore adult energy estimates using metric or imperial measurements.",
};
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
