import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { EventForm } from "@/components/events/event-form";
import { auth } from "@/lib/auth";
import { getEvent } from "@/lib/events";

export const metadata: Metadata = {
  title: "Update Event",
};

type UpdateEventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UpdateEventPage({
  params,
}: UpdateEventPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  // Only the creator may open this page
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect(`/login?redirect=/update-event/${id}`);
  }

  if (session.user.email !== event.creatorEmail) {
    redirect("/manage-events");
  }

  return (
    <section className="mx-auto flex w-full max-w-7xl justify-center px-4 py-16 sm:px-6 lg:py-24">
      <EventForm
        eventId={event._id}
        initialValues={{
          title: event.title,
          description: event.description,
          eventType: event.eventType,
          thumbnail: event.thumbnail,
          location: event.location,
          eventDate: event.eventDate.slice(0, 10),
        }}
      />
    </section>
  );
}