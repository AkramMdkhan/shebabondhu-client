"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarX2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { EventCard } from "@/components/event-card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authFetch } from "@/lib/api";
import type { EventItem } from "@/lib/events";
import { cn } from "@/lib/utils";

export function ManageEventsList() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let ignore = false;

    authFetch("/api/events/mine")
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load your events");
        return (await res.json()) as EventItem[];
      })
      .then((data) => {
        if (!ignore) setEvents(data);
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

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await authFetch(`/api/events/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        toast.error(body?.message || "Could not delete this event");
        return;
      }

      setEvents((current) =>
        (current ?? []).filter((event) => event._id !== deleteTarget._id)
      );
      toast.success("Event deleted successfully");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not reach the server"
      );
    } finally {
      setDeleting(false);
    }
  }

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

  if (events === null) {
    return (
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-[440px] rounded-3xl" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-border px-6 py-16 text-center">
        <CalendarX2 className="size-10 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">
          You have not created any events yet
        </h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          Start a drive and let your neighbours join.
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
    );
  }

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event._id} className="flex flex-col gap-3 [&>article]:flex-1">
            <EventCard event={event} />
            <div className="grid grid-cols-2 gap-3">
              <Link
                href={`/update-event/${event._id}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-11 rounded-full font-semibold"
                )}
              >
                <Pencil className="size-4" />
                Update
              </Link>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteTarget(event)}
                className="h-11 rounded-full font-semibold text-destructive hover:text-destructive"
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this event?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `"${deleteTarget.title}" will be removed for everyone who joined it. This cannot be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? "Deleting..." : "Yes, delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}