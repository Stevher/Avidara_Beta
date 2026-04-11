import type { Metadata } from "next";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avidara.co.za";
const title = "Avidara — Regulatory Documentation & Compliance Intelligence | South Africa";
const description =
  "Independent regulatory documentation review for pharmaceutical, medical device, consumer health, veterinary, and transport companies in South Africa. PI/PIL development, artwork review, dossier gap analysis, and compliance documentation — SAHPRA-aligned, same-day turnaround.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Avidara",
  },
  description,
  keywords: [
    "regulatory documentation South Africa",
    "pharmaceutical regulatory documentation",
    "regulatory document review South Africa",
    "regulatory compliance documentation",
    "SAHPRA regulatory documentation",
    "pharmaceutical regulatory affairs South Africa",
    "PI PIL development South Africa",
    "package insert development",
    "patient information leaflet",
    "regulatory gap analysis",
    "artwork review pharmaceutical",
    "promotional materials review",
    "medical device regulatory documentation",
    "pharma compliance South Africa",
    "SAHPRA submission",
    "dossier gap analysis",
    "labelling compliance South Africa",
    "regulatory document services",
  ],
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: { type: "website", url: siteUrl, title, description, siteName: "Avidara" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Plus+Jakarta+Sans:ital,wght@0,300..700;1,300..700&display=swap"
        rel="stylesheet"
      />
      <body className="min-h-full flex flex-col bg-base text-main" {...(nonce ? { "data-nonce": nonce } : {})}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
