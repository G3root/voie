import Link from "next/link";

export type NavItemProps = {
  href: string;
  label: string;
  active?: boolean;
};

export const NavLink: React.FC<{ item: NavItemProps }> = ({ item }) => {
  return <Link href={item.href}>{item.label}</Link>;
};
