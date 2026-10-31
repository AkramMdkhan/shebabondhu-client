"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="Shebabondhu home"
    >
      <span className="bg-brand-gradient flex size-9 items-center justify-center rounded-[10px] font-heading text-lg font-bold text-primary-foreground">
        S
      </span>
      <span className="font-heading text-[19px] font-bold text-foreground">
        Shebabondhu
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isEventsActive = pathname.startsWith("/events");

  return (
    <header className="sticky top-0 z-50 mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6">
      <nav
        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-3xl border border-border bg-card/80 py-3 pl-5 pr-3 backdrop-blur-md md:rounded-full md:pl-6"
        aria-label="Main navigation"
      >
        <Logo />

        <Link
          href="/events"
          className={cn(
            "order-last w-full text-center text-sm font-medium transition-colors hover:text-brand md:order-none md:w-auto",
            isEventsActive ? "text-brand" : "text-foreground/80"
          )}
        >
          Upcoming Events
        </Link>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/login"
            className={cn(
              buttonVariants(),
              "bg-brand-gradient h-10 rounded-full px-6 text-sm font-semibold text-primary-foreground hover:opacity-90"
            )}
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}