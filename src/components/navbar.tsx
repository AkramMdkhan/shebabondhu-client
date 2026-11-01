// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ThemeToggle } from "@/components/theme-toggle";
// import { buttonVariants } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// export function Logo() {
//   return (
//     <Link
//       href="/"
//       className="flex items-center gap-2.5"
//       aria-label="Shebabondhu home"
//     >
//       <span className="bg-brand-gradient flex size-9 items-center justify-center rounded-[10px] font-heading text-lg font-bold text-primary-foreground">
//         S
//       </span>
//       <span className="font-heading text-[19px] font-bold text-foreground">
//         Shebabondhu
//       </span>
//     </Link>
//   );
// }

// export function Navbar() {
//   const pathname = usePathname();
//   const isEventsActive = pathname.startsWith("/events");

//   return (
//     <header className="sticky top-0 z-50 mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6">
//       <nav
//         className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-3xl border border-border bg-card/80 py-3 pl-5 pr-3 backdrop-blur-md md:rounded-full md:pl-6"
//         aria-label="Main navigation"
//       >
//         <Logo />

//         <Link
//           href="/events"
//           className={cn(
//             "order-last w-full text-center text-sm font-medium transition-colors hover:text-brand md:order-none md:w-auto",
//             isEventsActive ? "text-brand" : "text-foreground/80"
//           )}
//         >
//           Upcoming Events
//         </Link>

//         <div className="flex items-center gap-2.5">
//           <ThemeToggle />
//           <Link
//             href="/login"
//             className={cn(
//               buttonVariants(),
//               "bg-brand-gradient h-10 rounded-full px-6 text-sm font-semibold text-primary-foreground hover:opacity-90"
//             )}
//           >
//             Login
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarPlus, ListChecks, SquarePen } from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/auth-client";
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

const menuLinks = [
  { label: "Create Event", href: "/create-event", icon: CalendarPlus },
  { label: "Manage Events", href: "/manage-events", icon: SquarePen },
  { label: "Joined Events", href: "/joined-events", icon: ListChecks },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const isEventsActive = pathname.startsWith("/events");
  const user = session?.user;

  async function handleLogout() {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6">
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

          {isPending ? (
            <>
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </>
          ) : user ? (
            <>
              <div className="group relative">
                <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                  <DropdownMenuTrigger
                    aria-label="Open profile menu"
                    className="rounded-full outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Avatar className="size-10 border border-border">
                      <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                      />
                      <AvatarFallback className="bg-brand-gradient font-semibold text-primary-foreground">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    {menuLinks.map(({ label, href, icon: Icon }) => (
                      <DropdownMenuItem
                        key={href}
                        className="cursor-pointer"
                        onClick={() => router.push(href)}
                      >
                        <Icon className="size-4" />
                        {label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <span
                  role="tooltip"
                  className={cn(
                    "pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background opacity-0 transition-opacity",
                    !menuOpen && "group-hover:opacity-100"
                  )}
                >
                  {user.name}
                </span>
              </div>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="h-10 rounded-full px-5 text-sm font-semibold"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants(),
                "bg-brand-gradient h-10 rounded-full px-6 text-sm font-semibold text-primary-foreground hover:opacity-90"
              )}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}