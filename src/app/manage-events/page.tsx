import type { Metadata } from "next";
import Link from "next/link";
import { CalendarPlus } from "lucide-react";
import { ManageEventsList } from "@/components/events/manage-events-list";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Manage Events",
};

export default function ManageEventsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Manage events
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            The events you created. Update the details or delete an event you
            no longer need.
          </p>
        </div>
        <Link
          href="/create-event"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 rounded-full px-6 font-semibold"
          )}
        >
          <CalendarPlus className="size-4" />
          New event
        </Link>
      </div>

      <ManageEventsList />
    </section>
  );
}