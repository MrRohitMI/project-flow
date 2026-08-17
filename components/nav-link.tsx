"use client";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function NavLink({
  href,
  children,
  icon,
}: {
  href: string;
  children: ReactNode;
  icon: LucideIcon;
}) {
  const path = usePathname();
  const Icon = icon;
  return (
    <li>
      <Link
        href={href}
        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-xl font-bold 
          ${path.startsWith(href) ? "text-white bg-blue-600" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"} `}
      >
        <Icon size={20} />
        {children}
      </Link>
    </li>
  );
}
