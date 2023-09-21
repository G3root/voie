"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";

import { useRef } from "react";

export function SignInForm() {
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="sign-in"
          onSubmit={(e) => {
            e.preventDefault();

            if (emailRef.current) {
              const email = emailRef.current.value;
              signIn("email", { email });
            }
          }}
        >
          <div className="grid gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                ref={emailRef}
                required
                name="email"
                id="email"
                type="email"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button form="sign-in" type="submit">
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
