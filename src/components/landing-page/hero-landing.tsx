"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import API_CONSTANTS from "@/utils/apiConstants";
import useSWRMutation from "swr/mutation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { genericMutationFetcher } from "@/utils/helpers/swr.helpers";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { useRouter } from "next/navigation";

const firebaseConfig = {
  apiKey: "AIzaSyAiNiXfAGomM_syROGSoUBie042uzeHbcI",
  authDomain: "resume-link-8d4d7.firebaseapp.com",
  projectId: "resume-link-8d4d7",
  storageBucket: "resume-link-8d4d7.appspot.com",
  messagingSenderId: "695942916654",
  appId: "1:695942916654:web:9146aca10c504e264dcdbf",
  measurementId: "G-ZT7K3ZS85M",
  databaseURL: "",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const HeroLanding = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [userId, setUserId, removeUserId] = useLocalStorage<string>("user_id");
  const [token, setToken] = useLocalStorage<string>("token");

  const { trigger: googleLogin, isMutating: isLoggingIn } = useSWRMutation(
    API_CONSTANTS.GOOGLE_LOGIN,
    genericMutationFetcher
  );

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      console.log(user);

      const idToken = await user.getIdToken();
      console.log(idToken);

      axios.defaults.headers.common["Authorization"] = "Bearer " + idToken;

      googleLogin({
        type: "post",
      })
        .then((res) => {
          console.log(res);
          setToken(res.data.token);
          setUserId(res.data.user_id);
          toast({
            title: "Login Successful",
          });
          router.push("/jobs");
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Invalid credentials",
            variant: "destructive",
          });
        });
      // Optionally, handle ID tokens here
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here, such as displaying them to the user
    }
  };

  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        {/* Want animations? Check here: https://github.com/mickasmt/next-saas-stripe-starter/blob/76eb9f2b70b29c7a734ff0e5b047796ed2dac28d/app/(marketing)/page.tsx */}
        <Link
          href="/#"
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
          <span className="mr-3">🎉</span> Introducing ResumeRank
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
          <Button
            onClick={googleSignIn}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2"
            )}
          >
            <span>Get started</span>
            <Icons.arrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroLanding;
