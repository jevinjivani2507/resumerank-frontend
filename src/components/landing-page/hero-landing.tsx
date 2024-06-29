import Link from "next/link";
import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const HeroLanding = () => {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        {/* Want animations? Check here: https://github.com/mickasmt/next-saas-stripe-starter/blob/76eb9f2b70b29c7a734ff0e5b047796ed2dac28d/app/(marketing)/page.tsx */}
        <Link
          href="https://twitter.com/miickasmt/status/1719892161095745801"
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "sm",
              rounded: "full",
            }),
            "px-4"
          )}
          target="_blank"
        >
          <span className="mr-3">🎉</span> Introducing on{" "}
          <Icons.twitter className="ml-2 size-3.5" />
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Tailored{" "}
          <span className="text-gradient font-extrabold">
            Job Recommendations
          </span>{" "}
          to Fit Your Career Goals
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Receive daily job recommendations straight to your inbox, ensuring you
          never miss an opportunity.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/pricing"
            prefetch={true}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2"
            )}
          >
            <span>Get started</span>
            <Icons.arrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroLanding;
