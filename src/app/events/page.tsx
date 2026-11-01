import type { Metadata } from "next";
import Link from "next/link";
import { CalendarX2 } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { buttonVariants } from "@/components/ui/button";
import { getEvents } from "@/lib/events";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Upcoming Events",
};

type EventsPageProps = {
  searchParams: Promise<{ type?: string; search?: string }>;
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { type, search } = await searchParams;
  const events = await getEvents({ type, search });

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Upcoming events
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Every drive happening around Dhaka, nearest date first. Past events
          are not shown.
        </p>
      </div>

      {events.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-border px-6 py-16 text-center">
          <CalendarX2 className="size-10 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold">No upcoming events found</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Nothing matches right now. Try again later or start an event
            yourself.
          </p>
          <Link
            href="/create-event"
            className={cn(
              buttonVariants(),
              "bg-brand-gradient mt-6 h-11 rounded-full px-6 font-semibold text-primary-foreground hover:opacity-90"
            )}
          >
            Create an Event
          </Link>
        </div>
      )}
    </section>
  );
}