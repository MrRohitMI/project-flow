import Image from "next/image";
import { Menu } from "lucide-react";
import Button from "./ui/button";
import { logoutUser } from "@/app/actions/auth";
import UserMenu from "./user-menu";

type NavbarProps = {
  currentUser: {
    userId: string;
    name: string;
    email: string;
  };
  onMenuClick: () => void;
};
export default function Navbar({ onMenuClick, currentUser }: NavbarProps) {
  return (
    <header>
      <nav className="flex items-center bg-blue-600 justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="text-white sm:hidden"
            onClick={onMenuClick}
          >
            <Menu />
          </Button>

          <Image src="/images/logo.png" alt="logo" width={80} height={80} />
        </div>
        <UserMenu name={currentUser.name} email={currentUser.email}/>
      </nav>
    </header>
  );
}
