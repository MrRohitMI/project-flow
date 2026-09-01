import Link from "next/link";

export default function LandingHero() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600">
          Simple task management
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Manage your work,
          <span className="block text-blue-600">without the chaos.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
          Organize your projects, track your tasks, and stay focused on what
          matters most.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
