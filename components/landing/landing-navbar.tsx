import Image from "next/image";
import Link from "next/link";

export default function LandingNavbar() {
  return (
    <header>
      <nav className="flex items-center justify-between bg-blue-600">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={80} height={80} />
          </Link>
        </div>

        <div className="flex items-center gap-2 px-4">
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
