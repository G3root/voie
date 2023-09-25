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
      <div className="p-10">
        <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-12 lg:gap-y-0">
          <SideBar />
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </NextAuthProvider>
  );
}
