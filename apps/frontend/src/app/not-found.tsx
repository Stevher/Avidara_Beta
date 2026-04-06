import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p
          className="mb-4 font-fraunces text-8xl font-bold"
          style={{ color: "var(--b2)", fontFamily: "var(--font-fraunces)" }}
        >
          404
        </p>
        <h1 className="mb-3 text-2xl font-semibold" style={{ color: "var(--t)" }}>
          Page not found
        </h1>
        <p className="mb-8 max-w-sm text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="rounded-lg bg-[var(--indigo)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--indigo-deep)]"
        >
          Back to home
        </a>
      </main>
      <Footer />
    </>
  );
}
