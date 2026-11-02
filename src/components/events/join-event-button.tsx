"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

type JoinEventButtonProps = {
  eventId: string;
  isPast: boolean;
};

export function JoinEventButton({ eventId, isPast }: JoinEventButtonProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const email = session?.user?.email;

  // If the user is logged in, check whether they already joined this event
  useEffect(() => {
    if (!email) return;
    let ignore = false;

    authFetch(`/api/joins/status/${eventId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!ignore && data?.joined) setJoined(true);
      })
      .catch(() => {});

    return () => {
      ignore = true;
    };
  }, [email, eventId]);

  async function handleJoin() {
    // Logged-out visitors must log in first, then come back to this event
    if (!session) {
      toast.info("Please log in to join this event");
      router.push(`/login?redirect=${encodeURIComponent(`/events/${eventId}`)}`);
      return;
    }

    setLoading(true);
    try {
      const res = await authFetch("/api/joins", {
        method: "POST",
        body: JSON.stringify({ eventId }),
      });
      const body = await res.json().catch(() => null);

      if (res.ok) {
        setJoined(true);
        toast.success("You joined this event. See you there!");
        router.refresh();
      } else if (res.status === 409) {
        setJoined(true);
        toast.info(body?.message || "You have already joined this event");
      } else {
        toast.error(body?.message || "Could not join this event");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not reach the server"
      );
    } finally {
      setLoading(false);
    }
  }

  if (isPast) {
    return (
      <Button disabled className="mt-8 h-12 w-full rounded-full font-semibold">
        This event has passed
      </Button>
    );
  }

  if (joined) {
    return (
      <Button
        disabled
        variant="outline"
        className="mt-8 h-12 w-full rounded-full font-semibold"
      >
        <CheckCircle2 className="size-5 text-brand" />
        You joined this event
      </Button>
    );
  }

  return (
    <Button
      type="button"
      onClick={handleJoin}
      disabled={isPending || loading}
      className="bg-brand-gradient mt-8 h-12 w-full rounded-full font-semibold text-primary-foreground hover:opacity-90"
    >
      <HeartHandshake className="size-5" />
      {loading ? "Joining..." : "Join Event"}
    </Button>
  );
}