export type EventItem = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  createdAt: string;
};

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

type EventsParams = {
  limit?: number;
  type?: string;
  search?: string;
};

// Fetches upcoming events (nearest date first) from the server
export async function getEvents(params: EventsParams = {}): Promise<EventItem[]> {
  const query = new URLSearchParams();
  if (params.limit) query.set("limit", String(params.limit));
  if (params.type) query.set("type", params.type);
  if (params.search) query.set("search", params.search);

  try {
    const res = await fetch(`${API_URL}/api/events?${query.toString()}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return (await res.json()) as EventItem[];
  } catch {
    return [];
  }
}

// Fetches one event by id. Returns null if it does not exist.
export async function getEvent(id: string): Promise<EventItem | null> {
  try {
    const res = await fetch(`${API_URL}/api/events/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as EventItem;
  } catch {
    return null;
  }
}