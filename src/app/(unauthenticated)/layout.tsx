import { NavBar } from "@/components/common/navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <NavBar />
      {children}
    </main>
  );
}
