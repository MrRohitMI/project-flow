"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

type CurrentUser = {
  userId: string;
  name: string;
  email: string;
};

export default function AppShell({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: CurrentUser;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
        currentUser={currentUser}
      />

      <section className="grid min-h-screen grid-cols-12">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="col-span-12 bg-white sm:col-span-10">{children}</main>
      </section>
    </>
  );
}
