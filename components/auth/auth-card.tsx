import Link from "next/link";

interface AuthCardProps {
  title: string;
  description: string;
  footerText: string;
  footerLink: string;
  footerHref: string;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  description,
  footerText,
  footerLink,
  footerHref,
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>

      {children}

      <p className="mt-6 text-center text-sm text-gray-500">
        {footerText}{" "}
        <Link
          href={footerHref}
          className="font-medium text-blue-600 hover:underline"
        >
          {footerLink}
        </Link>
      </p>
    </div>
  );
}
