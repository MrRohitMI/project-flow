import AppShell from "@/components/app-shell";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function AppLayout({ children }: LayoutProps<"/">) {
  const currentUser = await getCurrentUser()
  if(!currentUser) {
    redirect("/login")
  }
  return <AppShell currentUser={currentUser}>{children}</AppShell>;
}
