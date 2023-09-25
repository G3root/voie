"use client";
import { NavItemProps } from "./nav-link";
import { useSelectedLayoutSegment } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const NavList = () => {
  const segments = useSelectedLayoutSegment();
  const navigation: NavItemProps[] = [
    {
      href: "/admin/job",
      label: "Job",
      active: segments === "job",
    },
  ];

  return (
    <nav className="flex gap-x-2 lg:flex-col lg:gap-x-0 lg:gap-y-1">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            item.active
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
