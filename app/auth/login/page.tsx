"use client";
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/public/logo.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function handleSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    let res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      form.setError("root", {
        message: "Incorrect email or password.",
      });
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div>
      <div className="flex justify-center h-screen">
        <div className={`hidden bg-cover lg:block lg:w-2/3 login`}>
          <div className="flex items-center h-full px-20 bg-red-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Shubh Sambandh
              </h2>

              <p className="max-w-xl mt-3 text-white">
                Welcome to Shubh Sambandh! We are delighted to have you here and
                look forward to helping you find your perfect match. Please sign
                in to access your account and begin your journey towards finding
                your life partner.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <a href="/">
                  <Image
                    src={logo.src}
                    alt={"picture"}
                    width={80}
                    height={80}
                  />
                </a>
              </div>

              <p className="mt-3 ">Sign in to access your account</p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-2"
              >
                {form.formState.errors.root && (
                  <p className="text-sm text-center font-medium text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                )}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input className="text-black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={loading} type="submit">
                  {loading ? "loading" : "Submit"}
                </Button>
              </form>
            </Form>

            <p className="mt-6 text-sm text-center ">
              Dont have an account yet?{" "}
              <a
                href="/auth/register"
                className="text-red-500 focus:outline-none focus:underline hover:underline"
              >
                Sign up
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
