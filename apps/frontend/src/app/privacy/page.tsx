import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Avidara",
  description: "How Avidara collects, uses, and protects your personal information in accordance with POPIA.",
};

const sections = [
  {
    heading: "1. Who we are",
    body: `Avidara (Pty) Ltd ("Avidara", "we", "us") is a South African company providing regulatory intelligence services. We are the responsible party for personal information processed through this website and our services. You can reach us at hello@avidara.co.za.`,
  },
  {
    heading: "2. Information we collect",
    body: `We may collect the following categories of personal information:\n\n• Contact details you provide voluntarily (name, email address, company name, phone number) when you submit an enquiry, book a review, or contact us by email.\n• Usage data collected automatically when you visit our website, including IP address, browser type, pages visited, and time spent on pages.\n• Communications you send us, including emails and chat messages submitted through our website assistant.`,
  },
  {
    heading: "3. How we use your information",
    body: `We use your personal information to:\n\n• Respond to your enquiries and provide the services you request.\n• Send you information about Avidara's services where you have consented or where we have a legitimate interest.\n• Improve our website and services.\n• Comply with legal obligations.\n\nWe do not sell your personal information to third parties.`,
  },
  {
    heading: "4. Legal basis for processing",
    body: `We process your personal information on the following grounds:\n\n• Your consent, where you have provided it.\n• The performance of a contract or steps taken at your request prior to entering a contract.\n• Our legitimate interests in operating and improving our business, where these are not overridden by your rights.\n• Compliance with a legal obligation.`,
  },
  {
    heading: "5. Sharing of information",
    body: `We may share your personal information with:\n\n• Service providers who assist us in operating our website and delivering our services (such as hosting providers and email platforms), bound by confidentiality obligations.\n• Professional advisers such as lawyers and accountants where necessary.\n• Regulatory authorities or law enforcement where required by law.\n\nAll third parties are required to handle your information securely and in accordance with applicable law.`,
  },
  {
    heading: "6. Data retention",
    body: `We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, or reporting obligations. When information is no longer needed, we securely delete or anonymise it.`,
  },
  {
    heading: "7. Your rights under POPIA",
    body: `Under the Protection of Personal Information Act 4 of 2013 (POPIA), you have the right to:\n\n• Know what personal information we hold about you.\n• Request access to your personal information.\n• Request correction of inaccurate or incomplete information.\n• Request deletion of your personal information in certain circumstances.\n• Object to the processing of your personal information.\n• Lodge a complaint with the Information Regulator of South Africa.\n\nTo exercise any of these rights, contact us at hello@avidara.co.za.`,
  },
  {
    heading: "8. Cookies",
    body: `Our website uses cookies and similar technologies to ensure the site functions correctly and to understand how visitors use it. You may control cookie settings through your browser. Disabling certain cookies may affect the functionality of the site.`,
  },
  {
    heading: "9. Security",
    body: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    heading: "10. Changes to this policy",
    body: `We may update this Privacy Policy from time to time. The date of the most recent revision appears at the bottom of this page. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    heading: "11. Contact us",
    body: `For any privacy-related queries, requests, or complaints:\n\nAvidara (Pty) Ltd\nEmail: hello@avidara.co.za\n\nInformation Regulator (South Africa)\nWebsite: www.inforegulator.org.za`,
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
          <p className="text-sm" style={{ color: "var(--t2)" }}>
            Last updated: April 2025 · Governed by the Protection of Personal Information Act (POPIA), South Africa
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
