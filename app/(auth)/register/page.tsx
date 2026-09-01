import RegisterForm from "@/components/auth/register-form";
import AuthCard from "@/components/auth/auth-card";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <AuthCard
        title="Create your account"
        description="Start organizing your projects and tasks."
        footerText="Already have an account?"
        footerLink="Login"
        footerHref="/login"
      >
        <RegisterForm />
      </AuthCard>
    </main>
  );
}