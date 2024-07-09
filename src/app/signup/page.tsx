"use client";

import Link from "next/link";
import { useState } from "react";
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

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useLocalStorage("token");
  const [userId, setUserId] = useLocalStorage<string>("user_id");

  const { trigger: signup, isMutating: isLoggingIn } = useSWRMutation(
    API_CONSTANTS.SIGNUP,
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

    signup({
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
        setUserId(res.data.user_id);
        toast({
          title: "Signup Successful",
        });
        router.push("/jobs");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Signup Failed",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="pt-20">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
