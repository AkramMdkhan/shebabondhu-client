"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [checkedEmail, setCheckedEmail] = useState<string | null>(null);
  const email = session?.user?.email;

  // Still working out who the visitor is, or whether they already joined
  const checking = isPending || (Boolean(email) && checkedEmail !== email);

  // If the user is logged in, check whether they already joined this event
  useEffect(() => {
    if (!email) return;
    let ignore = false;

    authFetch(`/api/joins/status/${eventId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!ignore && data?.joined) setJoined(true);
      })
      .catch(() => {})
      .finally(() => {
        if (!ignore) setCheckedEmail(email);
      });

    return () => {
      ignore = true;
    };
  }, [email, eventId]);

  async function handleJoin() {
    // Logged-out visitors must log in first, then come back to this event.
    // The login page shows the "please log in" message.
    if (!session) {
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

  if (checking) {
    return <Skeleton className="mt-8 h-12 w-full rounded-full" />;
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
      disabled={loading}
      className="bg-brand-gradient mt-8 h-12 w-full rounded-full font-semibold text-primary-foreground hover:opacity-90"
    >
      <HeartHandshake className="size-5" />
      {loading ? "Joining..." : "Join Event"}
    </Button>
  );
}