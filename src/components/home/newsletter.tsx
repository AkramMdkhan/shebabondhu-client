"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
    event.currentTarget.reset();
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28">
      <div className="flex flex-col gap-8 rounded-[28px] border border-border bg-card p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <span className="bg-brand/10 flex size-12 items-center justify-center rounded-xl text-brand">
            <Mail className="size-6" />
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Never miss a drive
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            Get new events in your area in your inbox every week. No spam, just
            ways to help.
          </p>
        </div>

        <div className="w-full lg:max-w-md">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              name="email"
              required
              aria-label="Email address"
              placeholder="you@email.com"
              className="h-12 rounded-full px-5"
            />
            <Button
              type="submit"
              className="bg-brand-gradient h-12 rounded-full px-7 font-semibold text-primary-foreground hover:opacity-90"
            >
              Subscribe
            </Button>
          </form>
          <p
            role="status"
            className="mt-3 min-h-5 text-sm font-medium text-brand"
          >
            {subscribed ? "Thanks! You are on the list." : ""}
          </p>
        </div>
      </div>
    </section>
  );
}