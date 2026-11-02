"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { eventTypes } from "@/components/events/event-form";
import { Input } from "@/components/ui/input";

export function EventsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const type = searchParams.get("type") ?? "all";

  function applyFilters(next: { search?: string; type?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    const nextSearch = (next.search ?? search).trim();
    const nextType = next.type ?? type;

    if (nextSearch) params.set("search", nextSearch);
    else params.delete("search");

    if (nextType !== "all") params.set("type", nextType);
    else params.delete("type");

    const query = params.toString();
    router.replace(query ? `/events?${query}` : "/events", { scroll: false });
  }

  // Wait until the visitor stops typing, then update the address
  useEffect(() => {
    const current = searchParams.get("search") ?? "";
    if (search.trim() === current) return;

    const timer = setTimeout(() => applyFilters({ search }), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search events by title"
          aria-label="Search events by title"
          className="h-12 rounded-full pl-11"
        />
      </div>

      <select
        value={type}
        onChange={(event) => applyFilters({ type: event.target.value })}
        aria-label="Filter by event type"
        className="h-12 rounded-full border border-input bg-background px-5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring sm:w-56"
      >
        <option value="all">All event types</option>
        {eventTypes.map((eventType) => (
          <option key={eventType} value={eventType}>
            {eventType}
          </option>
        ))}
      </select>
    </div>
  );
}