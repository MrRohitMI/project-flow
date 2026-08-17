import Image from "next/image";

export default function Navbar() {
  return (
    <header>
      <nav className="bg-blue-600">
        <Image src="/images/logo.png" alt="logo" width={80} height={80}></Image>
      </nav>
    </header>
  );
}
