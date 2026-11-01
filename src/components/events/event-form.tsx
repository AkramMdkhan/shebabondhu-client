"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { authFetch } from "@/lib/api";

export const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Drive",
  "Health Camp",
  "Education",
  "Other",
];

// Today's date in UTC, the same way the server checks it
const todayString = () => new Date().toISOString().slice(0, 10);

const eventSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters"),
  eventType: z
    .string()
    .refine((value) => eventTypes.includes(value), "Please choose an event type"),
  thumbnail: z.string().trim().url("Please enter a valid image URL"),
  location: z.string().trim().min(3, "Please enter the event location"),
  eventDate: z
    .string()
    .min(1, "Please pick the event date")
    .refine((value) => value > todayString(), "Event date must be in the future"),
});

export type EventFormValues = z.infer<typeof eventSchema>;

type EventFormProps = {
  eventId?: string;
  initialValues?: EventFormValues;
};

const emptyValues: EventFormValues = {
  title: "",
  description: "",
  eventType: "",
  thumbnail: "",
  location: "",
  eventDate: "",
};

const selectClass =
  "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive";

export function EventForm({ eventId, initialValues }: EventFormProps) {
  const router = useRouter();
  const isEdit = Boolean(eventId);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialValues ?? emptyValues,
  });

  async function onSubmit(values: EventFormValues) {
    try {
      const res = await authFetch(
        isEdit ? `/api/events/${eventId}` : "/api/events",
        {
          method: isEdit ? "PATCH" : "POST",
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        toast.error(body?.message || "Something went wrong. Please try again.");
        return;
      }

      toast.success(
        isEdit ? "Event updated successfully" : "Event created successfully"
      );
      router.push(isEdit ? "/manage-events" : "/events");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not reach the server"
      );
    }
  }

  function onInvalid(errors: FieldErrors<EventFormValues>) {
    const firstError = Object.values(errors)[0]?.message;
    if (firstError) toast.error(String(firstError));
  }

  return (
    <Card className="w-full max-w-2xl rounded-[28px] p-2 sm:p-4">
      <CardHeader>
        <CardTitle className="font-heading text-3xl font-bold tracking-tight">
          {isEdit ? "Update event" : "Create an event"}
        </CardTitle>
        <CardDescription className="text-base">
          {isEdit
            ? "Change the details of your event."
            : "Start a drive and let your neighbours join."}
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
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="event-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="event-title"
                    placeholder="Winter Clothes Distribution"
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
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="event-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="event-description"
                    rows={5}
                    placeholder="Tell volunteers what the event is about and what to bring."
                    aria-invalid={fieldState.invalid}
                    className="rounded-xl"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <Controller
                name="eventType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="event-type">Event type</FieldLabel>
                    <select
                      {...field}
                      id="event-type"
                      aria-invalid={fieldState.invalid}
                      className={selectClass}
                    >
                      <option value="">Select a type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="eventDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="event-date">Event date</FieldLabel>
                    <Input
                      {...field}
                      id="event-date"
                      type="date"
                      aria-invalid={fieldState.invalid}
                      className="h-11 rounded-xl"
                    />
                    <FieldDescription>Pick a future date.</FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="event-location">Location</FieldLabel>
                  <Input
                    {...field}
                    id="event-location"
                    placeholder="Mirpur 10, Dhaka"
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
              name="thumbnail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="event-thumbnail">
                    Thumbnail image URL
                  </FieldLabel>
                  <Input
                    {...field}
                    id="event-thumbnail"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-xl"
                  />
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
            {form.formState.isSubmitting
              ? "Saving..."
              : isEdit
                ? "Update Event"
                : "Create Event"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}