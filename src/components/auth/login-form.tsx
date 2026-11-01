// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff } from "lucide-react";
// import { Controller, useForm, type FieldErrors } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { signIn } from "@/lib/auth-client";

// const loginSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(1, "Please enter your password"),
// });

// type LoginValues = z.infer<typeof loginSchema>;

// export function LoginForm() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//   const form = useForm<LoginValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { email: "", password: "" },
//   });

//   async function onSubmit(values: LoginValues) {
//     const { error } = await signIn.email({
//       email: values.email,
//       password: values.password,
//     });

//     if (error) {
//       toast.error(error.message || "Invalid email or password");
//       return;
//     }

//     toast.success("Logged in successfully. Welcome back!");
//     router.push("/");
//     router.refresh();
//   }

//   function onInvalid(errors: FieldErrors<LoginValues>) {
//     const firstError = Object.values(errors)[0]?.message;
//     if (firstError) toast.error(String(firstError));
//   }

//   return (
//     <Card className="w-full max-w-md rounded-[28px] p-2 sm:p-4">
//       <CardHeader>
//         <CardTitle className="font-heading text-3xl font-bold tracking-tight">
//           Welcome back
//         </CardTitle>
//         <CardDescription className="text-base">
//           Login to create, join and manage events.
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <form
//           noValidate
//           onSubmit={form.handleSubmit(onSubmit, onInvalid)}
//           className="space-y-6"
//         >
//           <FieldGroup>
//             <Controller
//               name="email"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="login-email">Email</FieldLabel>
//                   <Input
//                     {...field}
//                     id="login-email"
//                     type="email"
//                     autoComplete="email"
//                     placeholder="you@email.com"
//                     aria-invalid={fieldState.invalid}
//                     className="h-11 rounded-xl"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="password"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="login-password">Password</FieldLabel>
//                   <div className="relative">
//                     <Input
//                       {...field}
//                       id="login-password"
//                       type={showPassword ? "text" : "password"}
//                       autoComplete="current-password"
//                       placeholder="Your password"
//                       aria-invalid={fieldState.invalid}
//                       className="h-11 rounded-xl pr-11"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((value) => !value)}
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="size-4" />
//                       ) : (
//                         <Eye className="size-4" />
//                       )}
//                     </button>
//                   </div>
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} />
//                   )}
//                 </Field>
//               )}
//             />
//           </FieldGroup>

//           <Button
//             type="submit"
//             disabled={form.formState.isSubmitting}
//             className="bg-brand-gradient h-12 w-full rounded-full font-semibold text-primary-foreground hover:opacity-90"
//           >
//             {form.formState.isSubmitting ? "Logging in..." : "Login"}
//           </Button>
//         </form>

//         <p className="mt-6 text-center text-sm text-muted-foreground">
//           New to Shebabondhu?{" "}
//           <Link
//             href="/register"
//             className="font-semibold text-brand hover:underline"
//           >
//             Create an account
//           </Link>
//         </p>
//       </CardContent>
//     </Card>
//   );
// }


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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    const { error } = await signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }

    toast.success("Logged in successfully. Welcome back!");
    router.push("/");
    router.refresh();
  }

  function onInvalid(errors: FieldErrors<LoginValues>) {
    const firstError = Object.values(errors)[0]?.message;
    if (firstError) toast.error(String(firstError));
  }

  return (
    <Card className="w-full max-w-md rounded-[28px] p-2 sm:p-4">
      <CardHeader>
        <CardTitle className="font-heading text-3xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription className="text-base">
          Login to create, join and manage events.
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="login-email"
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
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Your password"
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
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <GoogleButton />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to Shebabondhu?{" "}
          <Link
            href="/register"
            className="font-semibold text-brand hover:underline"
          >
            Create an account
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}