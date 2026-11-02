import type { Metadata } from "next";
import { JoinedEventsList } from "@/components/events/joined-events-list";

export const metadata: Metadata = {
  title: "Joined Events",
};

export default function JoinedEventsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Joined events
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Every drive you signed up for, in date order, so you never miss one.
        </p>
      </div>

      <JoinedEventsList />
    </section>
  );
}