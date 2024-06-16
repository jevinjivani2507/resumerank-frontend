"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/texts";
import ShineBorder from "@/components/shine-border";
const Home = () => {
  return (
    <>
      <MaxWidthWrapper>
        <nav className="w-full flex justify-between">
          <div className="text-3xl font-semibold">
            <span className="text-gradient">Resume</span>Link
          </div>
          <Button className="bg-primary-gradient">Login</Button>
        </nav>
        <section className="h-full flex justify-center items-center">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-3 text-center items-center">
              <ShineBorder
                className="text-center capitalize"
                color={["#4c4ff6", "#7c88fd"]}
              >
                <div>Streamline Your Search</div>
              </ShineBorder>
              <h1 className="text-6xl font-bold text-balance text-center">
                Your Career Path, <br />
                Optimized by <SparklesText text="Algorithms" />
              </h1>
              <h3 className="text-2xl font-medium text-balance text-center opacity-40">
                Transform your resume into a keyword-rich tool and <br />
                receive daily job alerts tailored to you.
              </h3>
            </div>
            <Button className="bg-primary-gradient w-fit">Get Started</Button>
          </div>
        </section>
      </MaxWidthWrapper>
    </>
  );
};

export default Home;
