import Link from "next/link";
import { Logo } from "@/components/navbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const exploreLinks = [
  { label: "Upcoming Events", href: "/events" },
  { label: "Create Event", href: "/create-event" },
  { label: "Manage Events", href: "/manage-events" },
  { label: "Joined Events", href: "/joined-events" },
];

const socials = [
  { label: "Shebabondhu on Facebook", href: "https://facebook.com", text: "f" },
  { label: "Shebabondhu on LinkedIn", href: "https://linkedin.com", text: "in" },
];

function XLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[18px] fill-current"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialClass =
  "flex size-10 items-center justify-center rounded-full border border-border text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6">
      <div className="bg-brand-gradient flex flex-col gap-6 rounded-[32px] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to lend a hand?
          </h2>
          <p className="mt-3 text-lg text-primary-foreground/80">
            Join a drive this week or start one in your own neighbourhood.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/events"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-full bg-[#0c0d0f] px-7 font-semibold text-[#bef264] hover:bg-[#0c0d0f]/90"
            )}
          >
            Explore Events
          </Link>
          <Link
            href="/create-event"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-full border-2 border-[#0c0d0f] bg-transparent px-7 font-semibold text-[#0c0d0f] hover:bg-[#0c0d0f]/10"
            )}
          >
            Create Event
          </Link>
        </div>
      </div>

      <div className="grid gap-10 px-2 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
            A community platform for social service events in Dhaka.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="font-semibold">Explore</h3>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li>Mirpur 10, Dhaka</li>
            <li>
              <a
                href="mailto:hello@shebabondhu.example"
                className="transition-colors hover:text-brand"
              >
                hello@shebabondhu.example
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Follow us</h3>
          <div className="mt-4 flex gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Shebabondhu on X"
              className={socialClass}
            >
              <XLogo />
            </a>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={socialClass}
              >
                {social.text}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3 border-t border-border px-2 pt-6 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Shebabondhu. All rights reserved.</p>
        <p>Made with care in Dhaka</p>
      </div>
    </footer>
  );
}