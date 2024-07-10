"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { genericMutationFetcher } from "@/utils/helpers/swr.helpers";
import API_CONSTANTS from "@/utils/apiConstants";
import useSWRMutation from "swr/mutation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useToast } from "@/components/ui/use-toast";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  const [token, setToken] = useLocalStorage<string>("token");
  const [userId, setUserId] = useLocalStorage<string>("user_id");

  useEffect(() => {
    if (userId) {
      router.push("/jobs");
    }
  }, [userId]);

  const { trigger: login, isMutating: isLoggingIn } = useSWRMutation(
    API_CONSTANTS.LOGIN,
    genericMutationFetcher
  );

  const handleSubmit = () => {
    if (email === "" || password === "") {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    // handle error

    login({
      type: "post",
      rest: [
        {
          email,
          password,
        },
      ],
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
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      console.log(user);

      const idToken = await user.getIdToken();
      console.log(idToken);
      // Optionally, handle ID tokens here
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here, such as displaying them to the user
    }
  };

  return (
    <div className="pt-20">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </div>
          <Button className="w-full mt-4" onClick={googleSignIn}>
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link className="underline" href="/signup">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
