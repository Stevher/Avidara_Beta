import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - Avidara",
  description: "How Avidara collects, uses, and protects your personal information in accordance with POPIA.",
  alternates: { canonical: "https://www.avidara.co.za/privacy" },
};

const sections = [
  {
    heading: "1. Who we are",
    body: `Avidara (Pty) Ltd (registration number 2026/260157/07, registered address 6 The Homesteads, Vergesig, Durbanville, Cape Town, Western Cape, 7500, South Africa) ("Avidara", "we") operates the Avidara regulatory compliance review platform at app.avidara.co.za. This Privacy Policy explains what personal information we collect, why, and your rights over it. It applies to everyone who registers for or uses the Service, and forms part of our Terms of Service.`,
  },
  {
    heading: "2. Information we collect",
    body: `2.1 Account information - name, work email, organisation/company name, and password (stored hashed by AWS Cognito, never in plain text).\n\n2.2 Documents you upload - the primary and reference documents you submit for review, and any supporting files. These may contain personal information if you choose to include it (for example, a named contact on a label or a study document).\n\n2.3 Billing information - processed by our payment processor, Paystack. We receive and retain transaction records (amount, date, status) but do not store your full card number.\n\n2.4 Usage and log data - IP address, browser/device information, pages visited, and API usage, collected for security, rate limiting, and abuse prevention.\n\n2.5 Contact form and chat messages on this marketing website (avidara.co.za) - if you submit our contact form, we collect your name, email, company, phone number, subject, and message, and send it directly to our team to respond to your enquiry. If you use the chat assistant on this website, we retain your messages and a hashed (non-reversible) form of your IP address to maintain conversation history and improve our responses.`,
  },
  {
    heading: "3. How we use it",
    body: `• To provide the Service - running reviews, storing your review history, generating reports;\n• To operate your account - authentication, billing, support, and service communications (e.g. a review-complete notification, which you can opt out of in Settings);\n• To maintain security - rate limiting, fraud/abuse detection, and access control;\n• Where you have not opted out, to improve our review checklists using anonymised finding metadata (service type and finding category - never your document text or identity) stored for this purpose for up to 1 year.\n\nWe do not sell your personal information, and we do not use your uploaded document content to train any AI model.`,
  },
  {
    heading: "4. Legal basis for processing",
    body: `We process your personal information under the Protection of Personal Information Act 4 of 2013 (POPIA) on the basis of: performance of a contract (providing the Service you signed up for), your consent (e.g. optional email notifications), and our legitimate interests (security, fraud prevention, and service improvement), balanced against your rights.`,
  },
  {
    heading: "5. Who we share it with",
    body: `5.1 We share personal information only with the sub-processors below, each engaged solely to help provide the Service or operate this website, under contractual data-protection obligations:\n\nPlatform (app.avidara.co.za):\n• Amazon Web Services (AWS) - cloud infrastructure: compute, storage, database, authentication, AI inference - eu-west-1 (Ireland); WAF metadata in us-east-1\n• PDFShift - HTML-to-PDF report rendering (report findings only, not document text) - EU\n• AWS SES - transactional email: review-complete notifications, account emails - eu-west-1 (Ireland)\n• Paystack - payment processing - South Africa\n\nThis website (avidara.co.za):\n• Resend - delivers contact form submissions and new-chat alerts to our team by email\n• Upstash - short-lived IP-based rate limiting for the contact form, and storage of chat conversation history (see clause 7)\n\n5.2 We do not sell or rent personal information to third parties, and we disclose it beyond this list only where required by law or with your consent.`,
  },
  {
    heading: "6. Where your data is processed",
    body: `Your data is processed and stored in AWS's eu-west-1 (Ireland) region. We chose this region specifically for EU data residency and because it does not leave AWS's infrastructure. Where data is transferred outside South Africa (e.g. to our EU infrastructure), we rely on the adequacy and contractual safeguards required under POPIA.`,
  },
  {
    heading: "7. How long we keep it",
    body: `• Uploaded documents - auto-deleted 90 days after upload, or sooner on request\n• Review records (findings only, not document text) - kept for your Review History until you request deletion or close your account\n• Account data - until account deletion\n• Billing records - 5 years (financial record-keeping obligations)\n• Chat conversations on this website - retained for up to 180 days\n• Contact form rate-limiting data - a short-lived IP-based counter, cleared automatically within hours\n\nBackups may retain deleted data for up to 35 days as a technical maximum. If you request deletion, we process it within 30 days and confirm in writing.`,
  },
  {
    heading: "8. How we protect it",
    body: `Technical and organisational measures include: encryption at rest (AES-256 / AWS-managed KMS) and in transit (TLS 1.2+); authentication via AWS Cognito with optional MFA; hashed API keys, never stored or shown after creation; least-privilege AWS IAM roles with no long-lived credentials; a Web Application Firewall and rate limiting in front of the platform; and isolated, serverless compute (no shared server access between customers).`,
  },
  {
    heading: "9. Your rights",
    body: `Under POPIA, you have the right to: access the personal information we hold about you; request correction of inaccurate information; request deletion; object to processing based on legitimate interest; and lodge a complaint with the Information Regulator of South Africa.\n\nTo exercise any of these rights, contact our Information Officer at hello@avidara.co.za.`,
  },
  {
    heading: "10. Cookies",
    body: `We use a session cookie on the Avidara platform (app.avidara.co.za) strictly to keep you signed in. This marketing website (avidara.co.za) does not set cookies of its own; page-view analytics here are collected without cookies. We do not use third-party advertising or tracking cookies on either site.`,
  },
  {
    heading: "11. Children",
    body: `The Service is intended for business and professional use and is not directed at children. We do not knowingly collect personal information from anyone under 18.`,
  },
  {
    heading: "12. Changes to this policy",
    body: `We may update this Privacy Policy from time to time. Material changes will be notified by email or an in-app notice before they take effect.`,
  },
  {
    heading: "13. Contact",
    body: `Questions or requests: hello@avidara.co.za`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--indigo-light)" }}>
            Legal
          </p>
          <h1 className="mb-3 text-4xl font-bold" style={{ color: "var(--t)" }}>
            Privacy Policy
          </h1>
          <p className="mb-3 text-sm" style={{ color: "var(--t2)" }}>
            Effective date: 24 August 2026 · Version 1.0-draft · Status: draft, pending legal review · Governed by the Protection of Personal Information Act (POPIA), South Africa
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
            This Policy also covers this marketing website (avidara.co.za), in addition to the Avidara platform (app.avidara.co.za) described below.
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
