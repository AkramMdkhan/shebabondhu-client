import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Tag } from "lucide-react";
import { formatEventDate } from "@/components/event-card";
import { JoinEventButton } from "@/components/events/join-event-button";
import { getEvent } from "@/lib/events";

type EventDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: EventDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvent(id);
  return { title: event ? event.title : "Event not found" };
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const startOfToday = new Date();
  startOfToday.setUTCHours(0, 0, 0, 0);
  const isPast = new Date(event.eventDate) < startOfToday;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
      >
        <ArrowLeft className="size-4" />
        Back to upcoming events
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 65vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-black/80 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-primary">
              {event.eventType}
            </span>
          </div>

          <h1 className="mt-8 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {event.title}
          </h1>
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </div>

        <aside className="h-fit rounded-[28px] border border-border bg-card p-7 lg:sticky lg:top-28">
          <h2 className="text-xl font-semibold">Event details</h2>

          <ul className="mt-6 space-y-5">
            <li className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <CalendarDays className="size-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-semibold">
                  {formatEventDate(event.eventDate)}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <MapPin className="size-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">{event.location}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Tag className="size-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">Event type</p>
                <p className="font-semibold">{event.eventType}</p>
              </div>
            </li>
          </ul>

          <JoinEventButton eventId={event._id} isPast={isPast} />
        </aside>
      </div>
    </section>
  );
}