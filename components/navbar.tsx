import Image from "next/image";
import { Menu } from "lucide-react";
import Button from "./ui/button";

export default function Navbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header>
      <nav className="flex items-center bg-blue-600 px-3">
        <Button
          variant="ghost"
          className="text-white sm:hidden"
          onClick={onMenuClick}
        >
          <Menu />
        </Button>

        <Image
          src="/images/logo.png"
          alt="logo"
          width={80}
          height={80}
        />
      </nav>
    </header>
  );
}