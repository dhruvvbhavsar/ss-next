"use client";

import { registerSchema } from "@/lib/zod";
import { Country, State, City } from "country-state-city";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const [file, setFile] = React.useState<File>();

  let countries = Country.getAllCountries();

  let c = countries.filter((c) => c.name === form.watch("country"))[0];

  let state = form.watch("state");

  let s = State.getStatesOfCountry(c?.isoCode).filter(
    (s) => s.name === state
  )[0];

  let cities = City.getCitiesOfState(s?.countryCode, s?.isoCode);

  async function uploadPicture() {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      return await response.url;
    }
  }

  async function handleSubmit(values: z.infer<typeof registerSchema>) {
    if (!file) {
      return form.setError("root", {
        message: "Profile picture must be uploaded",
      });
    }

    if (file.size > 1024 * 1024) {
      return form.setError("root", {
        message: "File size must not exceed 1MB.",
      });
    }

    if (values.confirmPassword !== values.passwordHash) {
      return form.setError("confirmPassword", {
        message: "Passwords do not match",
      });
    }

    setLoading(true);

    let url = await uploadPicture();

    let res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ ...values, url }),
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setLoading(false);
      form.setError("root", {
        message: "user already exists with this email address or phone number",
      });
    }
  }

  return (
    <section>
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/5 bg-bottom register" />
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider  capitalize">
              Embark on the Spiritual Journey of Finding Love
            </h1>

            <p className="mt-4 ">
              Welcome to Shubh Sambandh! We are thrilled to have you here and
              excited to assist you in finding your ideal partner. Please
              provide us with some basic information about yourself to create
              your account and begin your search for a life partner. Thank you
              for choosing our website, and we wish you the best of luck in your
              journey.
            </p>
            <div className="flex flex-col my-4 gap-2 items-center relative  justify-center">
              <Input
                type="file"
                className="absolute top-8 z-10 opacity-0"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <Avatar className="h-24 w-24 ">
                <AvatarImage
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://i.stack.imgur.com/l60Hf.png"
                  }
                  className="object-cover hover:opacity-60 cursor-pointer"
                />
              </Avatar>
              <p className="text-xs">
                Tap on the icon above to upload a profile picture
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2"
              >
                {form.formState.errors.root && (
                  <p className="text-sm text-center font-medium text-destructive col-span-full">
                    {form.formState.errors.root.message}
                  </p>
                )}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          className="text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter last name"
                          className="text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter contact number"
                          className="text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <FormControl>
                        <Input type="date" className="text-black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time of Birth</FormLabel>
                      <FormControl>
                        <Input type="time" className="text-black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marital Status</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Marital Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Never married">
                            Never Married
                          </SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
                          <SelectItem value="Separated">Separated</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="caste"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Religon</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Religon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Hindu">Hindu</SelectItem>
                          <SelectItem value="Muslim">Muslim</SelectItem>
                          <SelectItem value="Sikh">Sikh</SelectItem>
                          <SelectItem value="Christian">Christian</SelectItem>
                          <SelectItem value="Buddhist">Buddhist</SelectItem>
                          <SelectItem value="Jain">Jain</SelectItem>
                          <SelectItem value="others">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("caste") === "others" && (
                  <FormField
                    control={form.control}
                    name="other_caste"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify the religon</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Religon"
                            className="text-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((c) => {
                            return (
                              <SelectItem key={c.name} value={c.name}>
                                {c.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        disabled={form.watch("country") === undefined}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {State.getStatesOfCountry(c?.isoCode).map((s) => {
                            return (
                              <SelectItem key={s.name} value={s.name}>
                                {s.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <Select
                        disabled={form.watch("state") === undefined}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities.map((c) => {
                            return (
                              <SelectItem key={c.name} value={c.name}>
                                {c.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordHash"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          className="text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          className="text-black"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
