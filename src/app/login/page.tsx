import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl justify-center px-4 py-16 sm:px-6 lg:py-24">
      <Suspense
        fallback={<Skeleton className="h-[520px] w-full max-w-md rounded-[28px]" />}
      >
        <LoginForm />
      </Suspense>
    </section>
  );
}