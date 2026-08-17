import type { Metadata } from "next";
import ConsultClient from "./ConsultClient";

export const metadata: Metadata = {
  title: "Compliance Consult - Private Regulatory AI | Avidara",
  description:
    "A secure, private regulatory thinking partner for South African compliance questions - classification, claims, labelling, and market entry - grounded in the applicable frameworks, without exposing confidential product detail to a public AI tool.",
  alternates: { canonical: "https://www.avidara.co.za/consult" },
};

export default function ConsultPage() {
  return <ConsultClient />;
}
