import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

import { NextAuthProvider } from "@/providers/next-auth";

export type AuthenticatedDashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthenticatedDashboardLayout({
  children,
}: AuthenticatedDashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <NextAuthProvider session={session}>
      <main>{children}</main>
    </NextAuthProvider>
  );
}
