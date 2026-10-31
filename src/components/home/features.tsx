import { CalendarPlus, ListChecks, SquarePen, UserPlus } from "lucide-react";

const features = [
  {
    icon: CalendarPlus,
    title: "Create events",
    text: "Post a drive with its type, place, date and thumbnail in a minute.",
  },
  {
    icon: UserPlus,
    title: "Join in one click",
    text: "Reserve your spot at any upcoming event once you are logged in.",
  },
  {
    icon: ListChecks,
    title: "Track what you joined",
    text: "See every event you joined, sorted by date, on one page.",
  },
  {
    icon: SquarePen,
    title: "Manage your own",
    text: "Update or delete the events you created, and only your own.",
  },
];

export function Features() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to help
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Four simple tools that take you from an idea to a real event in your
          neighbourhood.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }, index) => (
          <article
            key={title}
            className="flex h-full flex-col rounded-[20px] border border-border bg-card p-6 transition-colors hover:border-brand/50"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="size-5" />
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}