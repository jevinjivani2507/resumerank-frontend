"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useContext, useEffect } from "react";
import { useState } from "react";
// import { DocsSearch } from "@/components/docs/search";
import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
// import { siteConfig } from "@/config/site";
import { useScroll } from "@/components/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { UserAccountNav } from "./user-account-nav";
import { usePathname } from "next/navigation";
import API_CONSTANTS from "@/utils/apiConstants";
import useSWRMutation from "swr/mutation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { genericMutationFetcher } from "@/utils/helpers/swr.helpers";
import { useToast } from "@/components/ui/use-toast";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
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

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  const [userId, setUserId, removeUserId] = useLocalStorage<string>("user_id");
  const [token, setToken] = useLocalStorage<string>("token");

  const { trigger: googleLogin, isMutating: isLoggingIn } = useSWRMutation(
    API_CONSTANTS.GOOGLE_LOGIN,
    genericMutationFetcher
  );

  const scrolled = useScroll(50);
  // const { data: session, status } = useSession();
  const session = null;
  const { setShowSignInModal } = useContext(ModalContext);

  const selectedLayout = useSelectedLayoutSegment();
  const dashBoard = selectedLayout === "dashboard";
  const documentation = selectedLayout === "docs";
  const links = [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
    // {
    //   title: "Support",
    //   href: "/support",
    //   disabled: true,
    // },
  ];

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

  const handleLogout = () => {
    removeUserId();
    router.push("/");
  };

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
      }`}
    >
      <MaxWidthWrapper
        className="flex h-14 items-center justify-between py-4"
        large={documentation}
      >
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo />
            <span className="font-urban text-xl font-bold">
              {/* {siteConfig.name} */}
              <span className="text-primary">Resume</span> Rank
            </span>
          </Link>

          {/* {links && links.length > 0 ? (
            <nav className="hidden gap-6 md:flex">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  prefetch={true}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    item.href.startsWith(`/${selectedLayout}`)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null} */}
        </div>

        <div className="flex items-center space-x-3">
          {/* right header for docs */}
          {documentation ? (
            <div className="hidden flex-1 items-center space-x-4 sm:justify-end lg:flex">
              <div className="hidden lg:flex lg:grow-0">
                {/* <DocsSearch /> */}
              </div>
              <div className="flex lg:hidden">
                <Icons.search className="size-6 text-muted-foreground" />
              </div>
              <div className="flex space-x-4">
                {/* <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.gitHub className="size-7" />
                  <span className="sr-only">GitHub</span>
                </Link> */}
              </div>
            </div>
          ) : null}

          {/* {session ? (
            <>
              {dashBoard ? (
                <UserAccountNav user={session?.user} />
              ) : (
                <Link href="/dashboard" className="hidden md:block">
                  <Button
                    className="gap-2 px-4"
                    variant="default"
                    size="sm"
                    rounded="full"
                  >
                    <span>Dashboard</span>
                  </Button>
                </Link>
              )}
            </>
          ) : status === "unauthenticated" ? (
            <Button
              className="hidden gap-2 px-4 md:flex"
              variant="default"
              size="sm"
              rounded="full"
              onClick={() => setShowSignInModal(true)}
            >
              <span>Sign In</span>
              <Icons.arrowRight className="size-4" />
            </Button>
          ) : (
            <div className="hidden lg:flex">
              {dashBoard ? (
                <Skeleton className="size-9 rounded-full" />
              ) : (
                <Skeleton className="h-9 w-24 rounded-full" />
              )}
            </div>
          )} */}

          {pathname === "/" ? (
            <>
              {/* <Button
                id="login"
                className="hidden gap-2 px-4 md:flex rounded-full"
                variant="outline"
                size="sm"
                rounded="full"
                onClick={() => router.push("/login")}
              >
                <span>Login</span>
              </Button>
              <Button
                id="signup"
                className="hidden gap-2 px-4 md:flex rounded-full"
                variant="default"
                size="sm"
                rounded="full"
                onClick={() => router.push("/signup")}
              >
                <span>Sign up</span>
                <Icons.arrowRight className="size-4" />
              </Button> */}
              <Button
                id="signup"
                className="hidden gap-2 px-4 md:flex rounded-full"
                variant="default"
                size="sm"
                rounded="full"
                onClick={googleSignIn}
              >
                <span>Google Login</span>
                <Icons.arrowRight className="size-4" />
              </Button>
            </>
          ) : (
            (pathname === "/jobs" || pathname === "/upload-resume") && (
              <>
                <Button
                  id="upload-resume"
                  className="hidden gap-2 px-4 md:flex rounded-full"
                  variant="outline"
                  size="sm"
                  rounded="full"
                  onClick={() => router.push("/upload-resume")}
                >
                  <span>Upload Resume</span>
                </Button>
                <Button
                  id="logout"
                  className="hidden gap-2 px-4 md:flex rounded-full"
                  variant="default"
                  size="sm"
                  rounded="full"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </Button>
              </>
            )
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
