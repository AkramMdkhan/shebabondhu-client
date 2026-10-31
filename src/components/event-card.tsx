import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EventItem } from "@/lib/events";

export function formatEventDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-brand/50">
      <div className="relative aspect-[16/10] bg-muted">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-black/80 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-primary">
          {event.eventType}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="flex items-center gap-1.5 font-mono text-xs uppercase text-brand">
          <CalendarDays className="size-3.5" />
          {formatEventDate(event.eventDate)}
        </span>
        <h3 className="line-clamp-2 min-h-[3.25rem] text-xl font-semibold leading-snug">
          {event.title}
        </h3>
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          <span className="line-clamp-1">{event.location}</span>
        </p>

        <Link
          href={`/events/${event._id}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-auto h-11 w-full rounded-full font-semibold"
          )}
        >
          View Event
        </Link>
      </div>
    </article>
  );
}