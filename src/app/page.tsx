"use client";

import { Button } from "@/components/ui/button";
import { SparklesText, AnimatedShinyText } from "@/components/texts";
import { DotPattern } from "@/components/dot-pattern";
const Home = () => {
  return (
    <div>
      <DotPattern />
      {/* <SparklesText text="Hello, world!" /> */}
      <AnimatedShinyText>Streamline Your Search</AnimatedShinyText>
      {/* <Button>Click me</Button> */}
    </div>
  );
};

export default Home;
