import type { Metadata } from "next";
import type { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Memberships",
  description:
    "Compare monthly and annual membership options and find the support that fits your training.",
};
export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
