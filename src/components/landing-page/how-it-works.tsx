import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MedalIcon,
  MapIcon,
  PlaneIcon,
  GiftIcon,
} from "@/components/shared/icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Upload Your Resume",
    description:
      "Drag and drop your resume or upload it in one click. Let us take care of parsing your skills and experience effortlessly.",
  },
  {
    icon: <GiftIcon />,
    title: "Get Your Keywords",
    description:
      "Our AI-powered engine dives deep into your resume, extracting powerful keywords that reflect your unique skills and expertise.",
  },
  {
    icon: <PlaneIcon />,
    title: "Receive Job Matches",
    description:
      "Experience precise, handpicked job matches tailored to your profile. Get exclusive job listings straight to your inbox.",
  },
  //   {
  //     icon: <MapIcon />,
  //     title: "Gamification",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  //   },
];

const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
