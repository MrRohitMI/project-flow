"use client";

import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { logoutUser } from "@/app/actions/auth";
import Button from "./ui/button";

type UserMenuProps = {
  name: string;
  email: string;
};

export default function UserMenu({ name, email }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="text-white hover:text-blue-600"
        onClick={() => setOpen((prev) => !prev)}
      >
        {name}
        <ChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border bg-white p-2 shadow-lg">
          <div className="border-b px-3 py-2">
            <p className="font-medium text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>

          <form action={logoutUser}>
            <button
              type="submit"
              className="mt-1 w-full rounded-md px-3 py-2 flex gap-2 
              items-center text-left text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut size={20} /> Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
