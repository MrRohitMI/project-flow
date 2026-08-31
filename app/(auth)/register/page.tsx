import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">Create Account</h1>

        <RegisterForm />
      </div>
    </main>
  );
}
