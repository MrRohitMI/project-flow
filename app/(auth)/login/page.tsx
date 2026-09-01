import LoginForm from "@/components/auth/login-form";
import AuthCard from "@/components/auth/auth-card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <AuthCard
        title="Welcome back"
        description="Sign in to continue to your workspace."
        footerText="Don't have an account?"
        footerLink="Register"
        footerHref="/register"
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
