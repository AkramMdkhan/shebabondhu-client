import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Create an event",
    text: "Post a drive with its type, place, date and photo.",
  },
  {
    title: "Neighbours join",
    text: "Volunteers reserve their spot with one click.",
  },
  {
    title: "Track your impact",
    text: "See every event you joined, sorted by date.",
  },
];

export function Banner() {
  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
      <div>
        <span className="font-mono text-sm text-brand">
          {"// community-driven events"}
        </span>
        <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Turn free time into{" "}
          <span className="text-brand-gradient">real impact.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Create, discover and join local service events, from winter clothes
          drives in Mirpur to blanket distribution in Mohammadpur and tree
          plantations across Dhaka.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/events"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-brand-gradient h-12 rounded-full px-7 font-semibold text-primary-foreground hover:opacity-90"
            )}
          >
            Explore Upcoming Events
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/create-event"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-full px-7 font-semibold"
            )}
          >
            Create an Event
          </Link>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <div className="w-full max-w-md rounded-[28px] border border-brand/40 bg-card p-7 shadow-[0_0_70px_-10px] shadow-brand/30">
          <span className="font-mono text-xs tracking-wider text-brand">
            HOW IT WORKS
          </span>
          <h2 className="mt-3 text-2xl font-bold leading-snug">
            Three steps to make a difference
          </h2>

          <ol className="mt-6 space-y-5">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="bg-brand-gradient flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}