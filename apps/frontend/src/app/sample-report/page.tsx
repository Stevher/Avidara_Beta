import type { Metadata } from "next";
import SampleReportClient from "./SampleReportClient";

export const metadata: Metadata = {
  title: "Sample Regulatory Review Report | Avidara",
  description:
    "See exactly what you receive from an Avidara Document Review — a structured gap analysis report with Critical, Major, and Minor findings, regulatory references, and recommended actions.",
};

export default function SampleReportPage() {
  return <SampleReportClient />;
}
