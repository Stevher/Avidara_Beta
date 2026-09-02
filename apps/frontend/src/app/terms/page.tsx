import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Terms of Service - Avidara",
  description: "Terms and conditions governing the use of the Avidara platform and website.",
  alternates: { canonical: "https://www.avidara.co.za/terms" },
};

const sections = [
  {
    heading: "1. Acceptance of these Terms",
    body: `1.1 These Terms of Service ("Terms") govern access to and use of the Avidara platform at app.avidara.co.za and any related API (together, the "Service"), operated by Avidara (Pty) Ltd, a company registered in South Africa ("Avidara", "we", "us"). Registration number: 2026/260157/07. Registered address: 6 The Homesteads, Vergesig, Durbanville, Cape Town, Western Cape, 7500, South Africa.\n\n1.2 By checking the acceptance box at registration, or by otherwise accessing or using the Service, you ("Customer", "you") agree to be bound by these Terms. If you are accepting on behalf of an organisation, you confirm you have authority to bind that organisation, and "Customer" refers to that organisation.\n\n1.3 If Avidara and the Customer have signed a separate Master Services Agreement (and associated Data Processing Agreement / Service Level Agreement), that signed agreement governs the relationship and takes precedence over these Terms to the extent of any conflict. These Terms apply to every other Customer - self-serve, pay-per-review, and credit-purchase accounts.`,
  },
  {
    heading: "2. The Service",
    body: `2.1 Avidara is a decision-support tool. The Service compares documents you upload against an applicable regulatory framework or reference document and returns AI-generated findings, severity ratings, and a downloadable report.\n\n2.2 Avidara flags; it does not decide. The Service proposes findings and recommendations for a qualified human reviewer to evaluate. It does not issue regulatory approvals, submit filings, release products or batches, or take any other action with a real-world legal or regulatory effect. A human always initiates every review by uploading a document and starting it - the Service never autonomously selects or reviews content it was not given.\n\n2.3 The Service does not constitute legal, regulatory, medical, or other professional advice, and a report - including a report with no findings - is not a substitute for professional sign-off. See clause 6 (Client Responsibility).`,
  },
  {
    heading: "3. Eligibility and accounts",
    body: `3.1 You must be at least 18 years old and able to form a binding contract to register. The Service is intended for business and professional use, not for consumer or personal use.\n\n3.2 You are responsible for the accuracy of your registration details, for keeping your password confidential, and for all activity under your account. Notify us immediately at hello@avidara.co.za of any unauthorised use.\n\n3.3 Where your organisation has a tenant administrator, that administrator may invite, manage, and remove other users on the account; you are responsible for who you invite and what access you grant them.`,
  },
  {
    heading: "4. Fees, payment, and credits",
    body: `4.1 The Service is priced on a credit basis. Credits are purchased through our payment processor (Paystack) and consumed when a review is run, at the rate published on the platform at the time you run it. Prices are subject to change; a change does not affect credits already purchased.\n\n4.2 Payment is processed by Paystack under its own terms; Avidara does not store your full card details. See the Privacy Policy for what payment-related data we do hold.\n\n4.3 Credits are non-transferable between accounts and are not redeemable for cash except where required by applicable law. Except as required by law or as Avidara agrees in its discretion, fees for reviews already run are non-refundable.\n\n4.4 Where a review job fails due to a fault in the Service (rather than, for example, an unreadable or unsupported document you supplied), Avidara will credit the consumed amount back to your balance.`,
  },
  {
    heading: "5. Acceptable use",
    body: `5.1 You will not, and will not permit any user on your account to:\n\n• use the Service for any unlawful purpose, or to process content you do not have the right to upload;\n• attempt to circumvent rate limits, credit metering, or access controls, or interfere with the Service's operation or security;\n• reverse engineer, scrape, or resell the Service or its output as a standalone product without Avidara's prior written consent;\n• upload malicious files, or content containing another person's confidential or personal information without a lawful basis to share it with us;\n• represent an Avidara-generated finding, recommendation, or report as a regulatory approval, legal advice, or a decision Avidara made on your behalf.\n\n5.2 We may suspend or terminate an account that breaches this clause, with notice where reasonably practicable.`,
  },
  {
    heading: "6. Client responsibility; no legal or regulatory advice",
    body: `6.1 Findings and recommendations are based solely on the documents you provide and are generated using AI-assisted analysis. Avidara does not warrant that a review identifies every applicable compliance issue, and a report - including one with no findings - is not a guarantee of compliance or regulatory acceptance.\n\n6.2 You are responsible for reviewing every finding, exercising your own professional judgement, and making any resulting decision your own. You bear full legal and regulatory accountability for anything acted upon, submitted, released, or distributed on the basis of a review. This report does not constitute legal or regulatory advice.\n\n6.3 A review is an independent, fresh analysis of the document supplied at the time it is run. Re-reviewing a revised document may surface findings not present in a prior report, including in sections that were not amended - this reflects a new independent analysis, not a defect in the prior report.`,
  },
  {
    heading: "7. Intellectual property",
    body: `7.1 You retain all rights in the documents you upload and in the findings and reports generated from them for your account. You grant Avidara a licence to process your documents solely to provide the Service to you (including, where you have opted in, to improve the Service's checklists using anonymised finding metadata - see the Privacy Policy).\n\n7.2 Avidara retains all rights in the Service itself - the platform, software, prompts, checklists, and underlying technology. Nothing in these Terms transfers any such right to you.`,
  },
  {
    heading: "8. Data protection",
    body: `8.1 Avidara processes personal information in accordance with the Privacy Policy, which forms part of these Terms.\n\n8.2 Where you are an enterprise Customer with a signed Data Processing Agreement, that DPA governs the processing of personal information on your behalf in addition to the Privacy Policy.`,
  },
  {
    heading: "9. Confidentiality",
    body: `9.1 Each party will keep the other's confidential information confidential and use it only to perform its obligations under these Terms, except where disclosure is required by law or by a regulator with jurisdiction.`,
  },
  {
    heading: "10. Disclaimers",
    body: `10.1 The Service is provided "as is" and "as available". To the fullest extent permitted by law, Avidara disclaims all warranties, express or implied, including any warranty of merchantability, fitness for a particular purpose, or that the Service will be uninterrupted, error-free, or that findings will be complete or accurate.\n\n10.2 Nothing in this clause excludes a warranty that cannot lawfully be excluded.`,
  },
  {
    heading: "11. Limitation of liability",
    body: `11.1 Neither party is liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, loss of data, or business interruption, arising from these Terms or use of the Service.\n\n11.2 Avidara's total aggregate liability to you for any cause arising in a 12-month period will not exceed the greater of (a) the fees you paid to Avidara in the 12 months preceding the event giving rise to the claim, or (b) ZAR 5,000.\n\n11.3 The exclusions and cap in this clause do not apply to death or personal injury caused by a party's negligence, fraud or wilful misconduct, or a party's data protection obligations under applicable law.`,
  },
  {
    heading: "12. Termination",
    body: `12.1 You may stop using the Service and close your account at any time by contacting hello@avidara.co.za.\n\n12.2 Avidara may suspend or terminate an account for breach of these Terms, non-payment, or suspected fraudulent or abusive use, with notice where reasonably practicable.\n\n12.3 Clauses 6 (Client Responsibility), 7 (Intellectual Property), 9 (Confidentiality), 10 (Disclaimers), and 11 (Limitation of Liability) survive termination.`,
  },
  {
    heading: "13. Changes to these Terms",
    body: `13.1 Avidara may update these Terms from time to time. Material changes will be notified by email or an in-app notice before they take effect. Continued use of the Service after a change takes effect constitutes acceptance of the updated Terms.`,
  },
  {
    heading: "14. Governing law and disputes",
    body: `14.1 These Terms are governed by the laws of the Republic of South Africa.\n\n14.2 The parties will first attempt to resolve any dispute through good-faith negotiation. If unresolved within 20 business days, either party may refer the dispute to the courts of South Africa having jurisdiction.`,
  },
  {
    heading: "15. Contact",
    body: `Questions about these Terms: hello@avidara.co.za`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--indigo-light)" }}>
            Legal
          </p>
          <h1 className="mb-3 text-4xl font-bold" style={{ color: "var(--t)" }}>
            Terms of Service
          </h1>
          <p className="mb-3 text-sm" style={{ color: "var(--t2)" }}>
            Effective date: 24 August 2026 · Version 1.0-draft · Status: draft, pending legal review · Governed by the laws of the Republic of South Africa
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
            These Terms also govern your use of this marketing website (avidara.co.za), in addition to the Avidara platform (app.avidara.co.za) described below.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--t)" }}>
                {s.heading}
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}