"use client";

import { useState } from "react";

const categories = [
  { id: "services", label: "About & Services" },
  { id: "pharma", label: "Regulatory & Compliance" },
  { id: "industries", label: "Industries" },
  { id: "ai", label: "AI & Technology" },
  { id: "security", label: "Data Security" },
  { id: "engage", label: "Engagement & Pricing" },
];

const faqs = [
  {
    category: "services",
    q: "What is Avidara and what do you actually do?",
    a: "Avidara is a compliance intelligence platform serving regulated industries in South Africa. We function as an independent external review layer — identifying what internal teams miss before regulators do. Our work spans pharmaceuticals, medical devices, consumer health products, veterinary medicines, and the transport of dangerous goods. What distinguishes us is a methodology that is consistent across industries but calibrated to each sector's specific rulebook.",
  },
  {
    category: "services",
    q: "What specific services does Avidara offer?",
    a: "Our core services include: regulatory document review and advisory (product labelling, package inserts, leaflets, and equivalent documentation across regulated product categories); document comparison and gap analysis (structured review of existing documentation against current applicable standards, with annotated change tracking and a prioritised remediation roadmap); promotional and marketing materials review (verifying that content aligns with approved labelling and applicable codes of conduct); compliance audits (assessing whether products, systems, or materials meet current regulatory requirements); and sector-specific advisory work (guidance on frameworks applicable to your particular product category and market). The specific deliverables vary by industry and engagement — the methodology is consistent.",
  },
  {
    category: "services",
    q: "Who typically works with Avidara?",
    a: "Avidara serves anyone responsible for regulated documents — regulatory affairs managers, compliance officers, legal teams, marketing teams working in regulated sectors, and business owners who need a structured compliance check before submission, print approval, or client distribution. If your document sits inside a regulatory framework, Avidara can review it.",
  },
  {
    category: "services",
    q: "We already have internal regulatory staff. Why would we need Avidara?",
    a: "Avidara runs independently of your team's internal pressures, timelines, and commercial considerations. It answers only to the regulatory rulebook. Internal teams are often reviewing documents they also helped create — Avidara provides the independent external layer that finds what proximity misses. It doesn't replace your team. It gives them a second set of eyes that never gets tired, never feels the launch pressure, and never skips a reference check.",
  },
  {
    category: "pharma",
    q: "Which regulatory frameworks and markets do you work within?",
    a: "Our primary context is South Africa. For pharmaceuticals and medical devices this means SAHPRA. For consumer health products it includes the Foodstuffs, Cosmetics and Disinfectants Act and applicable SAHPRA categories. For dangerous goods transport it includes ADR (road), IATA DGR (air), IMDG (sea), and the National Road Traffic Act. Beyond South Africa, our dossier bridging service supports outbound registration into five African markets: Morocco (DMP/AMMPS), Ghana (FDA Ghana), Kenya (PPB), Nigeria (NAFDAC), and multi-country SADC submissions via ZAZIBONA. For multinational clients, we bridge EU/UK SmPC-based dossiers into SAHPRA requirements and SAHPRA-registered dossiers into African destination markets.",
  },
  {
    category: "pharma",
    q: "How do you ensure documents meet current SAHPRA requirements?",
    a: "Regulatory requirements evolve — guidance documents, codes, and legislation are all subject to updates across every sector Avidara serves. The platform's regulatory ruleset is maintained and updated as frameworks change, so every review runs against current requirements, not yesterday's guidelines.",
  },
  {
    category: "pharma",
    q: "Can Avidara guarantee that a submitted document will be approved by SAHPRA?",
    a: "No — and any service provider that makes that claim should be treated with caution. Regulatory assessors exercise independent professional judgment, and outcomes are not within the control of any third-party service provider. What we can guarantee is that every review assessment and recommendation we deliver is grounded in current guidance, structured for the highest achievable standard, and evidenced against the applicable regulatory framework. We aim to give your submission the strongest possible foundation, and we engage transparently with the client throughout the process so there are no surprises on submission.",
    callout: "What we can commit to: thorough work, current regulatory alignment, and honest professional judgement at every step.",
  },
  {
    category: "pharma",
    q: "What is a regulatory gap analysis and when would I need one?",
    a: "A gap analysis involves reviewing your existing regulatory documentation or compliance posture against the current applicable standard — whether that is a SAHPRA guideline, an ICH requirement, a reference SmPC, or an ADR/IATA framework. The output identifies specific deficiencies, their relative risk or urgency, and a remediation pathway. Companies typically commission a gap analysis when documentation has not been reviewed for several years, when preparing for a submission or inspection, when inheriting a portfolio through acquisition, or in response to a query or observation from a regulator. It is a diagnostic exercise that gives your team a clear, prioritised picture of what needs to be addressed.",
  },
  {
    category: "pharma",
    q: "How does your promotional materials review service work in practice?",
    a: "You provide us with the material alongside the current approved reference documentation (labelling, approved indication or specification, applicable code of conduct). We review for claims accuracy, indication or specification alignment, fair balance, and compliance with applicable codes and regulations. Our output is a structured annotated review identifying any non-compliant or at-risk elements, with suggested corrective wording where applicable. We work across formats including promotional materials, patient-facing materials, training documents, and digital content. Turnaround times are agreed upfront and we can accommodate urgent review cycles.",
  },
  {
    category: "industries",
    q: "What does Avidara do for pharmaceutical companies?",
    a: "For pharmaceutical companies, our services span the full regulatory lifecycle. We review and advise on package inserts (PIs), patient information leaflets (PILs), and SmPCs; review promotional materials and scientific publications (manuscripts, congress abstracts, CME content) for MLR compliance; assess dossiers against SAHPRA eCTD requirements before submission; advise on post-registration variations (Type IA/IB/II); and support dossier bridging — both bringing products into South Africa from markets including the EU, US, and UK, and taking SAHPRA-registered products into African markets such as Morocco, Ghana, Kenya, Nigeria, and ZAZIBONA SADC territories.",
  },
  {
    category: "industries",
    q: "How does Avidara help companies in the medical devices sector?",
    a: "For medical devices, we assist with labelling compliance against SAHPRA's medical devices framework, gap analyses on Instructions for Use (IFU) and technical documentation against current applicable standards, and review of promotional and marketing materials for claims compliance. Whether you are working with Class A, B, C, or D devices, the core requirement is that your documentation accurately reflects your registration dossier and meets current regulatory expectations — that is where we add value.",
  },
  {
    category: "industries",
    q: "What does Avidara offer for consumer health products — nutraceuticals, cosmetics, and OTC medicines?",
    a: "Consumer health sits at the intersection of multiple regulatory frameworks, which is where compliance gaps most commonly arise. For nutraceuticals and health supplements, we assist with label compliance, claims substantiation, and product categorisation guidance. For cosmetics, we review labelling and marketing claims. For OTC medicines, we provide the same PI/PIL review and advisory services we offer for prescription products. We help clients navigate the sometimes ambiguous boundaries between complementary medicine, foodstuffs, and scheduled medicines categories.",
  },
  {
    category: "industries",
    q: "Does Avidara work with veterinary product companies?",
    a: "Yes. Avidara offers veterinary product review across labelling, promotional materials, and dossier submissions. This covers both SAHPRA-regulated veterinary medicines and Act 36 of 1947 stock remedies — including withdrawal period compliance, species-specific dosing, and scheduling declarations. Get in touch at hello@avidara.co.za or book a review to discuss your specific product.",
  },
  {
    category: "industries",
    q: "What does Avidara offer for transport and logistics companies handling dangerous goods?",
    a: "For companies operating in the transport of dangerous goods — whether by road, air, or sea — compliance documentation is both technically demanding and safety-critical. Avidara assists with: classification and labelling compliance against ADR (road), IATA DGR (air), and IMDG (sea); review of dangerous goods documentation including shipping papers, emergency response information, and safety data sheets; compliance audits of internal procedures and documentation systems; and training material review. Non-compliance in this sector carries significant liability — an external review before an incident is considerably less costly than a regulatory response after one.",
    callout: "Dangerous goods non-compliance can result in criminal liability, not just regulatory penalties. The cost of getting it wrong is not administrative.",
  },
  {
    category: "ai",
    q: "Does Avidara use AI?",
    a: "Yes — Avidara is an AI-powered platform. When you upload your documents, the platform applies the encoded regulatory ruleset for your industry and returns a structured findings report. There is no human reviewer from Avidara in the loop. The findings are produced by the platform. Your team reviews, validates, and owns every decision.",
  },
  {
    category: "ai",
    q: "How accurate is the AI review?",
    a: "The platform is built on enterprise-grade large language models specifically configured for each regulatory framework. It cross-references every element of your document against the applicable ruleset — consistently, exhaustively, and without fatigue. Like any tool, it works best when the inputs are clear. Always review findings with your own regulatory judgement before acting on them. Avidara flags and analyses. Your team decides.",
  },
  {
    category: "ai",
    q: "What if the AI misses something or gets something wrong?",
    a: "No review tool — human or AI — guarantees 100% coverage. Avidara is designed as an independent external layer that finds what internal teams miss, not as a replacement for professional regulatory judgement. Always have a qualified person review the output before submission or release. The report supports your compliance decision. It does not substitute for it.",
  },
  {
    category: "ai",
    q: "What AI models does Avidara use?",
    a: "Avidara uses enterprise-tier large language models under agreements that include explicit zero data retention provisions and prohibit the use of submitted data for model training. Your documents are never used to train any AI model — by contractual terms and by architecture.",
  },
  {
    category: "ai",
    q: "What if my company has a policy restricting AI in regulatory processes?",
    a: "Avidara is an AI platform — that is fundamental to how it works. If your governance framework prohibits the use of AI tools in regulatory document review, Avidara may not be the right fit. If you have questions about how the platform works technically, contact us at hello@avidara.co.za and we'll give you a straight answer.",
  },
  {
    category: "security",
    q: "What is Zero Data Retention and does Avidara have it?",
    a: "All AI processing runs within Avidara's private cloud infrastructure. Your documents are never transmitted outside that environment, never stored after processing, and never used to train any model — by contractual terms and by architecture. This is not a policy — it is how the system is built.",
    callout: "Private cloud infrastructure is the only acceptable standard for processing regulated industry documents. It is not optional, and it is not a future roadmap item — it is in place now.",
  },
  {
    category: "security",
    q: "How does Avidara protect the confidential information I share with you?",
    a: "Confidentiality is fundamental to what we do — pharmaceutical companies share commercially sensitive, legally significant, and often competitively critical information with us. Our approach includes: NDA agreements as a standard part of every engagement; restricted access to client materials (limited to the individuals working on your project); use of enterprise-grade tools with zero data retention and data processing agreements in place with third-party providers; and secure document handling practices throughout the project lifecycle. We treat your data with the same level of care we would expect applied to our own.",
  },
  {
    category: "security",
    q: "Is Avidara POPIA compliant?",
    a: "Yes. Avidara operates in full compliance with the Protection of Personal Information Act (POPIA). We have a registered Information Officer, a documented AI Usage Policy, and internal standard operating procedures governing how personal information is collected, processed, stored, and disposed of. Where our work involves personal information as defined under POPIA, we operate as an operator under your instruction, and our service agreements include the required data processing clauses. We maintain records of processing activities and can provide clients with the necessary operator documentation for their own compliance requirements.",
  },
  {
    category: "security",
    q: "Do you use AI platforms that might train on my data?",
    a: "No. Avidara uses only enterprise-tier AI tools operated under agreements that include explicit zero data retention provisions and prohibit the use of submitted data for model training. We do not use consumer-tier AI applications for client work. Our AI tool stack is covered by Data Processing Agreements, and where required for client compliance, we can provide documentation of those agreements. The short answer: nothing you send us is used to train any AI model.",
    callout: "This is a non-negotiable part of our data handling standard, not a selective policy applied only to sensitive clients.",
  },
  {
    category: "security",
    q: "Will you sign an NDA?",
    a: "Yes — a mutual NDA is a standard part of our onboarding process. You do not need to request it separately. We also include data processing clauses within our service agreement to address both confidentiality and POPIA obligations in a single document framework. If your organisation uses a preferred NDA template, we are equally comfortable working from that, and we will raise any material concerns with the terms directly and professionally.",
  },
  {
    category: "security",
    q: "What happens to my documents and data once an engagement ends?",
    a: "Retention and disposal terms are specified in our service agreement. As a default, we retain working files for a defined period following project completion to allow for any follow-up queries, after which client-specific material is securely disposed of. We do not archive your confidential documents indefinitely. If you require a specific retention period — shorter or longer than our default — that can be agreed in writing as part of the engagement terms. On request, we can provide written confirmation that disposal has been completed.",
  },
  {
    category: "engage",
    q: "How do I get started?",
    a: "Create an account at app.avidara.co.za. No sales call, no onboarding process. You can run your first review the same day.",
  },
  {
    category: "engage",
    q: "How does Avidara charge for reviews?",
    a: "Avidara runs on a credit-based model. You purchase credits and spend them on reviews. For pricing details, contact us at hello@avidara.co.za or visit the platform.",
  },
  {
    category: "engage",
    q: "How long does a review take?",
    a: "Standard documents are reviewed and reported in under two minutes. Larger or image-heavy files may take up to three minutes. Results are ready when the upload is complete.",
  },
  {
    category: "engage",
    q: "Do you work with companies outside South Africa?",
    a: "Yes. The platform is accessible from anywhere. Our regulatory ruleset is built around South African frameworks, with dossier bridging coverage across African markets and major international authorities. Geography is not a constraint.",
  },
  {
    category: "engage",
    q: "What if I only have a single document or a once-off review?",
    a: "That is exactly what the platform is built for. Create an account, purchase the credits you need, run the review. No minimum commitment, no retainer required.",
  },
  {
    category: "engage",
    q: "Can I get a sample report before committing?",
    a: "Yes — a sample report is available at avidara.co.za/sample-report so you can see exactly what you receive before running your first review.",
  },
];

export default function FAQ({ standalone = false }: { standalone?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <section id="faq" className="px-6 py-16" style={{ backgroundColor: "var(--bg2)" }}>
      <div className="mx-auto max-w-3xl">
        {/* Header — only shown when embedded on homepage */}
        {!standalone && (
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--indigo-light)" }}>
              FAQ
            </p>
            <h2
              className="mb-4 text-4xl font-bold leading-tight"
              style={{ color: "var(--t)", fontFamily: "var(--font-fraunces)" }}
            >
              Everything you need to know
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed" style={{ color: "var(--t2)" }}>
              From how we work and what we charge, to how we handle AI, data security, and confidentiality.
            </p>
          </div>
        )}

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className="rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors"
            style={{
              borderColor: filter === "all" ? "var(--indigo)" : "var(--b2)",
              backgroundColor: filter === "all" ? "var(--indigo)" : "transparent",
              color: filter === "all" ? "#fff" : "var(--t2)",
            }}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className="rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors"
              style={{
                borderColor: filter === c.id ? "var(--indigo)" : "var(--b2)",
                backgroundColor: filter === c.id ? "var(--indigo)" : "transparent",
                color: filter === c.id ? "#fff" : "var(--t2)",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="divide-y" style={{ borderColor: "var(--b)" }}>
          {filtered.map((item, i) => {
            const key = `${item.category}-${i}`;
            const isOpen = active === key;
            return (
              <div key={key} style={{ borderColor: "var(--b)" }}>
                <button
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  onClick={() => setActive(isOpen ? null : key)}
                >
                  <span className="text-sm font-semibold leading-relaxed" style={{ color: "var(--t)" }}>
                    {item.q}
                  </span>
                  <span
                    className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all"
                    style={{
                      borderColor: isOpen ? "var(--indigo)" : "var(--b2)",
                      backgroundColor: isOpen ? "var(--indigo)" : "transparent",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d={isOpen ? "M2 5h6" : "M5 2v6M2 5h6"}
                        stroke={isOpen ? "#fff" : "var(--t3)"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-6">
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                      {item.a}
                    </p>
                    {item.callout && (
                      <div
                        className="mt-4 rounded-r-lg border-l-2 px-4 py-3 text-sm italic leading-relaxed"
                        style={{
                          borderColor: "var(--indigo)",
                          backgroundColor: "color-mix(in srgb, var(--indigo) 8%, transparent)",
                          color: "var(--t2)",
                        }}
                      >
                        {item.callout}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-sm" style={{ color: "var(--t2)" }}>
            Still have questions?
          </p>
          <a
            href="mailto:hello@avidara.co.za"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ borderColor: "var(--b2)", color: "var(--t)" }}
          >
            Email us at hello@avidara.co.za
          </a>
        </div>
      </div>
    </section>
  );
}
