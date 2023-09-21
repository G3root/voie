import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

export type SigInDashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function SigInDashboardLayout({
  children,
}: SigInDashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
