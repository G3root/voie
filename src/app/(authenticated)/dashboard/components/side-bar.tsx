"use client";

import { NavItemProps, NavLink } from "./nav-link";
import { useSelectedLayoutSegment } from "next/navigation";

export const SideBar = () => {
  const segments = useSelectedLayoutSegment();
  const navigation: NavItemProps[] = [
    {
      href: "/dashboard/job",
      label: "APIs",
      active: segments?.at(0) === "job",
    },
  ];

  return (
    <aside className="fixed h-screen inset-y-0 w-64 flex-col px-6 gap-y-5 hidden lg:block">
      <nav className="flex flex-col flex-1 flex-grow">
        <ul role="list" className="flex flex-col flex-1 gap-y-7">
          <li>
            <ul role="list" className="mt-2 -mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
