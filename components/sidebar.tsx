"use client";
import { Folder, LayoutDashboard, ListChecks, X } from "lucide-react";
import NavLink from "./nav-link";
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Tasks", href: "/tasks", icon: ListChecks },
];
type SidebarProps = {
  open: boolean;
  onClose: () => void;
};
export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 sm:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-200 transition-transform 
          sm:static sm:col-span-2 sm:block sm:w-auto sm:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      > <div className="flex justify-end p-2 sm:hidden">
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <ul className="mt-3 space-y-1 px-2">
          {navigation.map((nav) => (
            <NavLink href={nav.href} key={nav.name} icon={nav.icon}>
              {nav.name}
            </NavLink>
          ))}
        </ul>
      </aside>
    </>
  );
}
