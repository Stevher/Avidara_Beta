"use client";

import { useState } from "react";

const categories = [
  { id: "services", label: "About & Services" },
  { id: "pharma", label: "Regulatory & Compliance" },
  { id: "ai", label: "AI & Technology" },
  { id: "security", label: "Data Security" },
  { id: "engage", label: "Engagement & Pricing" },
];

const faqs = [
  {
    category: "services",
    q: "What is Avidara and what do you actually do?",
    a: "Avidara is a compliance intelligence platform serving regulated industries in South Africa. We function as an independent external review layer — identifying what internal teams miss before regulators do. Our work spans pharmaceuticals, medical devices, consumer health products, veterinary medicines, and the transport of dangerous goods. What distinguishes us is the depth of experience behind the work: approximately 20 years of regulatory expertise, applied through a methodology that is consistent across industries but calibrated to each sector's specific rulebook.",
  },
  {
    category: "services",
    q: "What specific services does Avidara offer?",
    a: "Our core services include: regulatory document development and review (product labelling, package inserts, leaflets, and equivalent documentation across regulated product categories); document comparison and gap analysis (structured review of existing documentation against current applicable standards, with annotated change tracking and a prioritised remediation roadmap); promotional and marketing materials review (verifying that content aligns with approved labelling and applicable codes of conduct); compliance audits (assessing whether products, systems, or materials meet current regulatory requirements); and sector-specific advisory work (guidance on frameworks applicable to your particular product category and market). The specific deliverables vary by industry and engagement — the methodology is consistent.",
  },
  {
    category: "services",
    q: "Who typically works with Avidara?",
    a: "Our clients span multiple regulated sectors. In pharmaceuticals and medical devices, we work with manufacturers, importers, and distributors managing SAHPRA portfolios and labelling obligations. In consumer health, we work with companies in nutraceuticals, cosmetics, and OTC medicines navigating overlapping regulatory frameworks. In veterinary, we work with registrants and distributors of veterinary medicines and complementary products. In transport and dangerous goods, we work with logistics companies, freight forwarders, shippers, and consignors who need to stay current with ADR, IATA, IMDG, and the National Road Traffic Act. The common thread is teams that need external specialist support — either because internal capacity is stretched, or because the stakes of non-compliance are high enough to warrant a second set of expert eyes.",
  },
  {
    category: "services",
    q: "We already have internal regulatory staff. Why would we need Avidara?",
    a: "Internal compliance and regulatory teams are often managing broad portfolios across multiple functions simultaneously. Document development, labelling review, and materials compliance is detail-intensive work that benefits from dedicated focus and an external perspective. Engaging Avidara as an external specialist means your internal team retains bandwidth for priority work, while compliance documentation is handled by someone whose entire day is structured around exactly that. We function as a seamless extension of your team, not a replacement for it.",
    callout: "Many of our engagements start when a client's regulatory or compliance manager is heading into a high-pressure quarter and needs specialist overflow capacity — not a generalist contractor.",
  },
  {
    category: "pharma",
    q: "Which regulatory frameworks and markets do you work within?",
    a: "Our primary context is South Africa. For pharmaceuticals and medical devices this means SAHPRA. For consumer health products it includes the Foodstuffs, Cosmetics and Disinfectants Act and applicable SAHPRA categories. For veterinary products it includes the Stock Remedies Act and related frameworks. For dangerous goods transport it includes ADR (road), IATA DGR (air), IMDG (sea), and the National Road Traffic Act. Beyond South Africa, we assist clients navigating SADC, NAFDAC (Nigeria), and other anglophone African markets. For multinational clients, we can adapt EU/UK SmPC-based documents to SAHPRA requirements and vice versa.",
  },
  {
    category: "pharma",
    q: "How do you ensure documents meet current SAHPRA requirements?",
    a: "Regulatory requirements evolve — guidance documents, codes, and legislation are all subject to updates across every sector we serve. Staying current is built into how we operate: we monitor regulatory communications, published guidance documents, and industry body correspondence on an ongoing basis. For every project, we work from the most current applicable guidelines and flag any areas where regulatory interpretation is ambiguous or in transition. We are transparent about that ambiguity rather than presenting it as resolved, because your legal and regulatory accountability depends on clarity, not assumptions.",
  },
  {
    category: "pharma",
    q: "Can Avidara guarantee that a submitted document will be approved by SAHPRA?",
    a: "No — and any service provider that makes that claim should be treated with caution. SAHPRA's evaluation process involves assessors exercising independent professional judgment, and outcomes are not within the control of any third-party service provider. What we can guarantee is that every document we produce or review is structured, worded, and evidenced to the highest achievable standard relative to current guidance. We aim to give your submission the strongest possible foundation, and we engage transparently with the client throughout the process so there are no surprises on submission.",
    callout: "What we can commit to: thorough work, current regulatory alignment, and honest professional judgement at every step.",
  },
  {
    category: "pharma",
    q: "What is a regulatory gap analysis and when would I need one?",
    a: "A gap analysis involves reviewing your existing regulatory documentation against the current applicable standard — whether that is a SAHPRA guideline, an ICH requirement, or a reference SmPC. The output identifies specific deficiencies, their relative risk or urgency, and a remediation pathway. Companies typically commission a gap analysis when a product has been on the market for several years without a full labelling review, when preparing for a lifecycle management submission, when inheriting a portfolio through acquisition, or in response to a query or observation from a regulator. It is a diagnostic exercise that gives your regulatory team a clear and prioritised picture of what needs to be addressed.",
  },
  {
    category: "pharma",
    q: "How does your promotional materials review service work in practice?",
    a: "You provide us with the promotional piece alongside the current approved PI and any relevant reference material. We review for claims accuracy, indication alignment, fair balance, and compliance with applicable codes (including the IPASA Code of Marketing Practice and SAHPRA advertising regulations). Our output includes a structured annotated review identifying any non-compliant or at-risk statements, with suggested corrective wording where applicable. We can work across formats including detail aids, journal advertisements, patient-facing materials, and digital content. Turnaround times are agreed upfront and we are able to accommodate urgent review cycles.",
  },
  {
    category: "ai",
    q: "Does Avidara use AI in its work?",
    a: "Yes, and we are transparent about it. Avidara uses AI tools — specifically enterprise-grade large language models — as part of a structured, expert-supervised workflow. AI assists with tasks like drafting initial document structures, performing systematic document comparisons, and flagging potential content inconsistencies. Every output generated with AI assistance is reviewed, verified, and approved by an experienced regulatory professional before it reaches you. AI accelerates certain aspects of the work and improves consistency — it does not replace the expert judgment that every regulatory document ultimately requires.",
    callout: "You are not buying AI output. You are buying expert regulatory work that uses AI thoughtfully as one of several professional tools.",
  },
  {
    category: "ai",
    q: "How do you prevent AI from introducing errors into regulatory documents?",
    a: "Our workflow is designed so that AI never produces a final document independently. All AI-assisted outputs pass through a multi-stage human review process: first for factual accuracy against source material (approved labelling, clinical evidence, reference documents), then for regulatory compliance against applicable guidelines, and finally for language, formatting, and internal consistency. We maintain documented internal SOPs for AI-assisted document development, including defined checkpoints where human sign-off is mandatory. AI-generated content that cannot be verified against a specific source is flagged and either replaced or escalated for expert input.",
  },
  {
    category: "ai",
    q: "Will using AI in regulatory work eventually undermine professional standards in the industry?",
    a: "It is a legitimate concern, and one that serious practitioners need to engage with honestly. The risk is not AI itself — it is unsupervised AI, used by people without the expertise to identify what it gets wrong. Regulatory documentation sits at the intersection of patient safety, legal liability, and scientific accuracy. That is not a context where blind automation is appropriate. Avidara's position is that AI, used responsibly within a rigorous human-oversight framework, improves the quality and consistency of regulatory documents — not by lowering the standard, but by reducing the kinds of errors that arise from fatigue, missed references, or version confusion in manual processes. The professional standard remains unchanged. The tools that support it evolve.",
  },
  {
    category: "ai",
    q: "What if my company has a policy against the use of AI in regulatory processes?",
    a: "We accommodate client requirements. If your company's governance framework requires that regulatory documents are produced without AI assistance, we can deliver services on that basis. This may affect turnaround timelines and pricing for some project types. We will never apply AI tools to your documents without your knowledge — our engagement process includes upfront disclosure of our intended approach for each project, and we welcome client-specific requirements to be documented in our service agreement. Transparency about methodology is not optional for us.",
  },
  {
    category: "security",
    q: "What is Zero Data Retention and does Avidara have it?",
    a: "Zero Data Retention (ZDR) is a contractual commitment from an AI provider that data submitted through their API is not stored, logged, or used to train models — not even temporarily beyond the duration of the API call. Avidara operates under Anthropic's Zero Data Retention agreement. This means that when your documents are processed by Avidara's AI layer, Anthropic does not retain any of that content after the response is returned. Nothing you submit through Avidara is stored by the AI provider, accessed by Anthropic staff, or used to improve any model. This is not a default setting — it is a specific contractual arrangement that must be applied for and approved by Anthropic, and Avidara holds this agreement as a non-negotiable operational requirement.",
    callout: "ZDR is the only acceptable standard for processing regulated industry documents. It is not optional, and it is not a future roadmap item — it is in place now.",
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
    q: "How does an engagement with Avidara typically begin?",
    a: "Most engagements begin with a scoping conversation — either by email or a brief call — in which we understand your project, timeline, and requirements. From there, we provide a clear written quote outlining scope, deliverables, timelines, and pricing. Once the quote is accepted and the NDA and service agreement are in place, we begin work. For straightforward projects, this process can typically be completed within a few business days. For portfolio retainer arrangements, the onboarding process is slightly more involved and includes a portfolio briefing session to establish baseline context before work begins.",
  },
  {
    category: "engage",
    q: "How does Avidara charge for its services?",
    a: "We offer three engagement structures. Project-based pricing is used for defined, once-off deliverables — you receive a fixed quote before work begins and pay for the defined scope. Portfolio retainer agreements are available for companies with ongoing documentation needs, providing agreed monthly capacity at a preferential rate with defined deliverable types included. Advisory and training engagements are priced on a day-rate or session basis. All pricing is quoted in South African Rand and is provided in writing before any work commences. We do not charge for the initial scoping conversation.",
  },
  {
    category: "engage",
    q: "What are your typical turnaround times?",
    a: "Turnaround depends on project complexity. A promotional materials review for a single piece typically takes two to three business days. A document comparison or gap analysis for a single product takes three to five business days depending on document length and complexity. A full PI/PIL development from draft to first submission-ready version typically takes seven to fifteen business days, depending on the indication, the amount of source material, and the number of review iterations. Urgent turnaround requests are accommodated where operationally possible and are indicated in the quote. All turnaround commitments are specified in writing before work commences.",
  },
  {
    category: "engage",
    q: "Do you work with companies outside South Africa?",
    a: "Yes. While our operational base is South Africa and our primary regulatory focus is South Africa and the broader African market, we work with international clients whose products are registered or being registered in these territories. This includes multinational pharmaceutical companies using Avidara as their local South African regulatory documentation partner, and companies based in other African markets requiring English-language regulatory document expertise. All client engagements are conducted remotely, which means geography is not a constraint to working together.",
  },
  {
    category: "engage",
    q: "What if I only have a single product or a once-off request — is that too small for Avidara?",
    a: "Not at all. We are specifically structured to serve both ongoing clients and companies with a single, well-defined project need. A once-off PI review, a single promotional piece sign-off, or a gap analysis for one product in your portfolio — all of these are projects we take seriously and deliver at the same standard as larger engagements. The best partnerships often begin with a small once-off project, and we are happy for that to be the starting point.",
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
