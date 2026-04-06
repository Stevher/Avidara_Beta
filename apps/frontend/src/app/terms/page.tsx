import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Avidara",
  description: "Terms and conditions governing the use of Avidara's website and services.",
};

const sections = [
  {
    heading: "1. Acceptance of terms",
    body: `By accessing or using the Avidara website (avidara.co.za) or any services provided by Avidara (Pty) Ltd ("Avidara", "we", "us"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.`,
  },
  {
    heading: "2. Services",
    body: `Avidara provides regulatory intelligence and compliance review services for life sciences and related industries. The specific scope, deliverables, and terms of any engagement are governed by a separate written agreement between Avidara and the client.\n\nInformation on this website is provided for general informational purposes only and does not constitute legal, regulatory, or professional advice.`,
  },
  {
    heading: "3. Use of the website",
    body: `You agree to use this website only for lawful purposes. You must not:\n\n• Use the site in any way that breaches applicable laws or regulations.\n• Transmit unsolicited commercial communications.\n• Attempt to gain unauthorised access to any part of the site or its related systems.\n• Use automated tools to scrape or extract content from the site without our prior written consent.`,
  },
  {
    heading: "4. Intellectual property",
    body: `All content on this website, including text, graphics, logos, and software, is the property of Avidara or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.`,
  },
  {
    heading: "5. Disclaimer of warranties",
    body: `This website and its content are provided "as is" without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. We make no warranties regarding the accuracy, completeness, or suitability of any content for a particular purpose.`,
  },
  {
    heading: "6. Limitation of liability",
    body: `To the fullest extent permitted by law, Avidara shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the website or services. Our total liability in any matter arising from these terms shall not exceed the amount paid by you to us in the three months preceding the claim.`,
  },
  {
    heading: "7. Third-party links",
    body: `Our website may contain links to third-party websites. These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.`,
  },
  {
    heading: "8. Privacy",
    body: `Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference. Please review our Privacy Policy at avidara.co.za/privacy.`,
  },
  {
    heading: "9. Changes to these terms",
    body: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes your acceptance of the revised terms.`,
  },
  {
    heading: "10. Governing law",
    body: `These Terms of Service are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the South African courts.`,
  },
  {
    heading: "11. Contact",
    body: `For any questions regarding these terms, contact us at:\n\nAvidara (Pty) Ltd\nEmail: hello@avidara.co.za`,
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
          <p className="text-sm" style={{ color: "var(--t2)" }}>
            Last updated: April 2025 · Governed by the laws of the Republic of South Africa
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
