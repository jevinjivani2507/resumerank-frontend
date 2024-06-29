"use client";

import { infos } from "@/config/landing";
import {
  HeroLanding,
  PreviewLanding,
  SiteFooter,
  InfoLanding,
  HowItWorks,
} from "@/components/landing-page";

const Home = () => {
  return (
    <>
      <HeroLanding />
      <PreviewLanding />
      <InfoLanding data={infos[0]} reverse={true} />
      <HowItWorks />
      <SiteFooter />
    </>
  );
};

export default Home;
