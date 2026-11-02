"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarX2 } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authFetch } from "@/lib/api";
import type { EventItem } from "@/lib/events";
import { cn } from "@/lib/utils";

type JoinedItem = {
  _id: string;
  joinedAt: string;
  event: EventItem;
};

export function JoinedEventsList() {
  const [items, setItems] = useState<JoinedItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    authFetch("/api/joins/mine")
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load your joined events");
        return (await res.json()) as JoinedItem[];
      })
      .then((data) => {
        if (!ignore) setItems(data);
      })
      .catch((err) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (error) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-destructive/50 px-6 py-12 text-center">
        <p className="font-semibold text-destructive">{error}</p>
        <p className="mt-2 text-muted-foreground">
          Please refresh the page or log in again.
        </p>
      </div>
    );
  }

  if (items === null) {
    return (
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-[380px] rounded-3xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-border px-6 py-16 text-center">
        <CalendarX2 className="size-10 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">
          You have not joined any events yet
        </h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          Find a drive near you and sign up. It takes one click.
        </p>
        <Link
          href="/events"
          className={cn(
            buttonVariants(),
            "bg-brand-gradient mt-6 h-11 rounded-full px-6 font-semibold text-primary-foreground hover:opacity-90"
          )}
        >
          Explore Upcoming Events
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <EventCard key={item._id} event={item.event} />
      ))}
    </div>
  );
}