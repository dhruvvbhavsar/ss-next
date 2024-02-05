"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Button } from "@/components/ui/button";
import { rashi } from "@/options";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const astrologySchema = z
  .object({
    manglik: z.string({ required_error: "Are you Manglik?" }),
    rashi: z.string({ required_error: "Rashi is required" }),
    horoscopeMatchPreference: z.string({
      required_error: "Horoscope Match Preference is required",
    }),
    astrologicalCompatibility: z.string({
      required_error: "Astrological Compatibility is required",
    }),
    astrologicalConsultation: z.string({
      required_error: "Astrological Consultation is required",
    }),
    pAstrolger: z.string({ required_error: "Astrologer is required" }),
    pOtherAstrologer: z.string().optional(),
  })
  .refine((data) => {
    if (
      data.pAstrolger === "I Have a Preferred Astrologer/Method" &&
      !data.pOtherAstrologer
    ) {
      throw new ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: "Please specify your astrologer",
          path: ["pOtherAstrologer"],
        },
      ]);
    }
    return true;
  });

export default function AstrologyDetails() {
  const router = useRouter();
  const form = useForm<z.infer<typeof astrologySchema>>({
    resolver: zodResolver(astrologySchema),
  });

  function onSubmit(values: z.infer<typeof astrologySchema>) {
    toast.success("Saved");
    router.push("/dashboard/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="manglik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are you Manglik?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Not Sure">Not Sure</SelectItem>
                </SelectContent>
              </Select>

              <FormDescription>This is a required field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rashi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rashi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rashi.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription>This is a required field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="horoscopeMatchPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horoscope Match Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Important for me">
                    Important for me
                  </SelectItem>
                  <SelectItem value="Preferable but not essential">
                    Preferable but not essential
                  </SelectItem>
                  <SelectItem value="Not important to me">
                    Not important to me
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormDescription>This is a required field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="astrologicalCompatibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Astrological Compatibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="It's Important for Me to Consider Astrological Compatibility">
                    It's Important for Me to Consider Astrological Compatibility
                  </SelectItem>
                  <SelectItem value="I Consider It to Some Extent, but It's Not a Major Factor">
                    I Consider It to Some Extent, but It's Not a Major Factor
                  </SelectItem>
                  <SelectItem value="Astrological Compatibility is Not Important to Me">
                    Astrological Compatibility is Not Important to Me
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormDescription>This is a required field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="astrologicalConsultation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Astrological Consultation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="I Seek Astrological Consultation Regularly">
                    I Seek Astrological Consultation Regularly
                  </SelectItem>
                  <SelectItem value="I Seek Astrological Consultation Occasionally">
                    I Seek Astrological Consultation Occasionally
                  </SelectItem>
                  <SelectItem value="I Don't Seek Astrological Consultation">
                    I Don't Seek Astrological Consultation
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormDescription>This is a required field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pAstrolger"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Astrologer/Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="I Have a Preferred Astrologer/Method">
                    I Have a Preferred Astrologer/Method (Please specify)
                  </SelectItem>
                  <SelectItem value="No Specific Preference">
                    No Specific Preference
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormDescription>This is a required field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("pAstrolger") ===
          "I Have a Preferred Astrologer/Method" && (
          <FormField
            control={form.control}
            name="pOtherAstrologer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify your astrologer</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please specify your astrologer
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.watch("pAstrolger") === "No Specific Preference" && (
          <h1 className="text-xl font-semibold">
            Stay Tuned! we soon will be starting our own Astrology Consultation
            Services!
          </h1>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
