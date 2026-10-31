import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl justify-center px-4 py-16 sm:px-6 lg:py-24">
      <RegisterForm />
    </section>
  );
}