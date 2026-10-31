import Link from "next/link";
import { ArrowRight, CalendarX2 } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { buttonVariants } from "@/components/ui/button";
import { getEvents } from "@/lib/events";
import { cn } from "@/lib/utils";

export async function RecentEvents() {
  const events = await getEvents({ limit: 6 });

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Recent upcoming events
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            The next drives happening around Dhaka. Pick one and show up.
          </p>
        </div>
        <Link
          href="/events"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 rounded-full px-6 font-semibold"
          )}
        >
          View all events
          <ArrowRight className="size-4" />
        </Link>
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
          <h3 className="mt-4 text-xl font-semibold">No upcoming events yet</h3>
          <p className="mt-2 max-w-md text-muted-foreground">
            Be the first to start something good in your neighbourhood.
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