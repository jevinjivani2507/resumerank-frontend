"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";

import { ModeToggle } from "./mode-toggle";

export function NavMobile() {
  const [open, setOpen] = useState(false);
  const selectedLayout = useSelectedLayoutSegment();
  const dashBoard = selectedLayout === "dashboard";
  const documentation = selectedLayout === "docs";
  const links = [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ];

  // prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  // const { data: session } = useSession();

  const session = null;

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed right-2 top-2.5 z-50 rounded-full p-2 transition-colors duration-200 hover:bg-muted focus:outline-none active:bg-muted md:hidden",
          open && "hover:bg-muted active:bg-muted"
        )}
      >
        {open ? (
          <X className="size-5 text-muted-foreground" />
        ) : (
          <Menu className="size-5 text-muted-foreground" />
        )}
      </button>

      <nav
        className={cn(
          "fixed inset-0 z-20 hidden w-full overflow-auto bg-background px-5 py-16 lg:hidden",
          open && "block"
        )}
      >
        <ul className="grid divide-y divide-muted">
          {links.map(({ title, href }: { title: string; href: string }) => (
            <li key={href} className="py-3">
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="flex w-full font-medium capitalize"
              >
                {title}
              </Link>
            </li>
          ))}

          {session ? (
            <li className="py-3">
              <Link
                href="/dashboard"
                className="flex w-full font-medium capitalize"
              >
                Dashboard
              </Link>
            </li>
          ) : (
            <>
              <li className="py-3">
                <Link
                  href="/login"
                  className="flex w-full font-medium capitalize"
                >
                  Login
                </Link>
              </li>

              <li className="py-3">
                <Link
                  href="/register"
                  className="flex w-full font-medium capitalize"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="mt-5 flex items-center justify-end space-x-4">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Icons.gitHub className="size-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </>
  );
}
