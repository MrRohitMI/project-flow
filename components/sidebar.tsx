"use client"
import { Folder, LayoutDashboard, ListChecks } from "lucide-react";
import NavLink from "./nav-link";
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Tasks", href: "/tasks", icon: ListChecks },
];
export default function Sidebar() {
  return (
    <aside className="col-span-2 bg-gray-200">
      <ul
        className="mt-3 space-y-1 px-2"
      >
        {navigation.map((nav) => (
          <NavLink href={nav.href} key={nav.name} icon={nav.icon}>
            {nav.name}
          </NavLink>
        ))}
      </ul>
    </aside>
  );
}
