"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Skeleton } from "@/components/ui/skeleton";
import { authClient, useSession } from "@/lib/auth-client";

const profileSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  photoURL: z.string().trim().url("Please enter a valid photo URL"),
});

type ProfileValues = z.infer<typeof profileSchema>;

type ProfileUser = {
  name: string;
  email: string;
  image?: string | null;
};

function ProfileForm({ user }: { user: ProfileUser }) {
  const router = useRouter();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, photoURL: user.image ?? "" },
  });

  async function onSubmit(values: ProfileValues) {
    const { error } = await authClient.updateUser({
      name: values.name,
      image: values.photoURL,
    });

    if (error) {
      toast.error(error.message || "Could not update your profile");
      return;
    }

    toast.success("Profile updated successfully");
    router.refresh();
  }

  function onInvalid(errors: FieldErrors<ProfileValues>) {
    const firstError = Object.values(errors)[0]?.message;
    if (firstError) toast.error(String(firstError));
  }

  return (
    <Card className="w-full max-w-xl rounded-[28px] p-2 sm:p-4">
      <CardHeader>
        <div className="flex items-center gap-5">
          <Avatar className="size-20 border border-border">
            <AvatarImage
              src={user.image ?? undefined}
              alt={user.name}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className="bg-brand-gradient text-2xl font-semibold text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <CardTitle className="truncate font-heading text-2xl font-bold">
              {user.name}
            </CardTitle>
            <CardDescription className="truncate text-base">
              {user.email}
            </CardDescription>
          </div>
        </div>
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
                  <FieldLabel htmlFor="profile-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="profile-name"
                    autoComplete="name"
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
                  <FieldLabel htmlFor="profile-photo">Photo URL</FieldLabel>
                  <Input
                    {...field}
                    id="profile-photo"
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-xl"
                  />
                  <FieldDescription>
                    Paste a link to your profile picture.
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
            {form.formState.isSubmitting ? "Saving..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function ProfileCard() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <Skeleton className="h-[520px] w-full max-w-xl rounded-[28px]" />;
  }

  if (!session) {
    return (
      <p className="text-muted-foreground">Please log in to see your profile.</p>
    );
  }

  return <ProfileForm user={session.user} />;
}