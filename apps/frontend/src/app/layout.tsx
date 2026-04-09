import type { Metadata } from "next";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avidara.co.za";
const title = "Avidara — Pharmaceutical Regulatory Document Services | South Africa";
const description =
  "Avidara provides expert PI/PIL development, regulatory gap analysis, artwork review, and promotional materials review for pharmaceutical, medical device, and life sciences companies in South Africa. SAHPRA-aligned, AI-assisted, human-verified.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Avidara",
  },
  description,
  keywords: [
    "pharmaceutical regulatory services South Africa",
    "SAHPRA compliance",
    "PI PIL development",
    "regulatory gap analysis",
    "artwork review pharmaceutical",
    "promotional materials review",
    "medical device compliance South Africa",
    "regulatory document review",
    "pharma compliance South Africa",
    "SAHPRA submission",
    "package insert development",
    "patient information leaflet",
  ],
  metadataBase: new URL(siteUrl),
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
