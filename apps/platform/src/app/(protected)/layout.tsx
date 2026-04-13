import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AppShell from "@/components/AppShell";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <AppShell user={session.user}>
      {children}
    </AppShell>
  );
}
