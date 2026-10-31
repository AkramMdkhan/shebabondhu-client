"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";

type Values = {
  name: string;
  email: string;
  photoURL: string;
  password: string;
};

type Errors = Partial<Record<keyof Values, string>>;

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.length < 2) {
    errors.name = "Please enter your full name";
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!isValidUrl(values.photoURL)) {
    errors.photoURL = "Please enter a valid photo URL";
  }
  if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Password must have an uppercase letter";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Password must have a lowercase letter";
  }

  return errors;
}

export function RegisterForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const values: Values = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      photoURL: String(form.get("photoURL") ?? "").trim(),
      password: String(form.get("password") ?? ""),
    };

    const found = validate(values);
    setErrors(found);

    const firstError = Object.values(found)[0];
    if (firstError) {
      toast.error(firstError);
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.photoURL,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not create your account");
      return;
    }

    toast.success("Account created successfully. Welcome to Shebabondhu!");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-8 sm:p-10">
      <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
      <p className="mt-2 text-muted-foreground">
        Join Shebabondhu and start helping your neighbourhood.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={!!errors.name}
            className="h-11 rounded-xl"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            aria-invalid={!!errors.email}
            className="h-11 rounded-xl"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="photoURL">Photo URL</Label>
          <Input
            id="photoURL"
            name="photoURL"
            type="url"
            placeholder="https://example.com/your-photo.jpg"
            aria-invalid={!!errors.photoURL}
            className="h-11 rounded-xl"
          />
          {errors.photoURL && (
            <p className="text-sm text-destructive">{errors.photoURL}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min 6 characters, upper and lower case"
              aria-invalid={!!errors.password}
              className="h-11 rounded-xl pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-brand-gradient h-12 w-full rounded-full font-semibold text-primary-foreground hover:opacity-90"
        >
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}