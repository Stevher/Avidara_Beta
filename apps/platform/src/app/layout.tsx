import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avidara Platform",
  description: "Compliance intelligence platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
