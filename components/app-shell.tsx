"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />

      <section className="grid min-h-screen grid-cols-12">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="col-span-12 bg-white sm:col-span-10">{children}</main>
      </section>
    </>
  );
}
