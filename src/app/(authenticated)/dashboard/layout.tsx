import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

import { NextAuthProvider } from "@/providers/next-auth";
import { SideBar } from "./components/side-bar";

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
      <div className="relative flex flex-col min-h-screen  lg:flex-row ">
        <SideBar />
        <div className="p-4 border-l bg-background border-border lg:w-full lg:p-6 lg:ml-64">
          {children}
        </div>
      </div>
    </NextAuthProvider>
  );
}
