"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { GoogleButton } from "@/components/auth/google-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  photoURL: z.string().trim().url("Please enter a valid photo URL"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must have an uppercase letter")
    .regex(/[a-z]/, "Password must have a lowercase letter"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", photoURL: "", password: "" },
  });

  async function onSubmit(values: RegisterValues) {
    const { error } = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.photoURL,
    });

    if (error) {
      toast.error(error.message || "Could not create your account");
      return;
    }

    toast.success("Account created successfully. Welcome to Shebabondhu!");
    router.push("/");
    router.refresh();
  }

  function onInvalid(errors: FieldErrors<RegisterValues>) {
    const firstError = Object.values(errors)[0]?.message;
    if (firstError) toast.error(String(firstError));
  }

  return (
    <Card className="w-full max-w-md rounded-[28px] p-2 sm:p-4">
      <CardHeader>
        <CardTitle className="font-heading text-3xl font-bold tracking-tight">
          Create your account
        </CardTitle>
        <CardDescription className="text-base">
          Join Shebabondhu and start helping your neighbourhood.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="register-name"
                    autoComplete="name"
                    placeholder="Your full name"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-xl"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-xl"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="photoURL"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-photo">Photo URL</FieldLabel>
                  <Input
                    {...field}
                    id="register-photo"
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-xl"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a password"
                      aria-invalid={fieldState.invalid}
                      className="h-11 rounded-xl pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  <FieldDescription>
                    At least 6 characters, with an uppercase and a lowercase
                    letter.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-brand-gradient h-12 w-full rounded-full font-semibold text-primary-foreground hover:opacity-90"
          >
            {form.formState.isSubmitting ? "Creating account..." : "Register"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <GoogleButton />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand hover:underline"
          >
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}