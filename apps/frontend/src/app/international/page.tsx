import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import InternationalClient from "./InternationalClient";

export const metadata: Metadata = {
  title: "International & Enterprise | Avidara",
  description:
    "Avidara's regulatory review platform is live today across 20+ verticals in South Africa and the SADC region. We're now working with select international enterprises to extend that same depth into new regulatory frameworks.",
  alternates: { canonical: "https://www.avidara.co.za/international" },
};

export default function InternationalPage() {
  return (
    <>
      <Navbar alwaysOpaque />
      <InternationalClient />
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
