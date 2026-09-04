import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTA from "@/components/landing/CTA";

export const metadata: Metadata = {
  title: "Pricing - Avidara",
  description:
    "Avidara is priced per review, not per seat - a credit-based model where you only pay for the documents you run. No licences, no minimum team size. Subscription arrangements available on request.",
  alternates: { canonical: "https://www.avidara.co.za/pricing" },
};

const howItWorks = [
  {
    title: "Buy credits",
    body: "Credits are purchased through our payment processor, Paystack, at the rate published on the platform at the time you buy them.",
  },
  {
    title: "Spend them on reviews",
    body: "Each review consumes credits at the rate published when you run it. Nothing is charged until you actually submit a document.",
  },
  {
    title: "No seats, no minimums",
    body: "There's no per-user licence and no minimum team size. Invite as many people on your account as you need - you only pay for the reviews you run.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar alwaysOpaque />
      <main className="min-h-screen pt-28 pb-4 px-6" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
              <span className="block h-0.5 w-5 rounded-full" style={{ background: "var(--emerald)" }} />
              Pricing
            </p>
            <h1
              className="mb-4 text-4xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--t)" }}
            >
              Priced per review. Not per seat.
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed" style={{ color: "var(--t2)" }}>
              No licences, no per-user fees, no minimum team size. You pay for the documents you run - nothing else.
            </p>
          </div>

          {/* How it works */}
          <div className="mb-14 grid gap-4 sm:grid-cols-3">
            {howItWorks.map((s, i) => (
              <div
                key={s.title}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
              >
                <div
                  className="mb-3 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                  style={{ backgroundColor: "rgba(79,70,229,.12)", color: "var(--indigo-light)" }}
                >
                  {i + 1}
                </div>
                <h3 className="mb-1.5 text-sm font-bold" style={{ color: "var(--t)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* Subscriptions */}
          <div
            className="mb-14 rounded-xl border p-6"
            style={{ borderColor: "var(--b)", backgroundColor: "var(--bg2)" }}
          >
            <h2 className="mb-2 text-base font-bold" style={{ color: "var(--t)" }}>Consistent volume? Ask about a subscription.</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
              If your team runs reviews regularly, a subscription arrangement can be scoped around your typical
              usage instead of one-off credit purchases. Subscription models can be requested when you book a
              call below - tell us your volume and we'll work out whether it makes sense.
            </p>
          </div>

          {/* No minimum commitment */}
          <div className="mb-4 text-center">
            <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
              Only need a single, once-off review? That's exactly what the platform is built for - create an
              account, buy the credits you need, run the review. No minimum commitment, no retainer required.
              Want to see exactly what you'll get first? <a href="/sample-report" className="underline hover:opacity-80" style={{ color: "var(--indigo-light)" }}>See a sample report</a>.
            </p>
          </div>
        </div>
      </main>
      <CTA />
      <Footer />
    </>
  );
}
