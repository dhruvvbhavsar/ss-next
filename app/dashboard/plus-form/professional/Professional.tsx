"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { careers } from "@/options";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateDetails } from "../actions";

const professionalSchema = z.object({
  profession: z.string({ required_error: "Professional is required" }),
  designation: z.string({ required_error: "Designation is required" }),
  employer: z.string({ required_error: "Employer is required" }),
  income: z.string({ required_error: "Income is required" }),
});

export default function ProfessionalDetails() {
  const router = useRouter();
  const form = useForm<z.infer<typeof professionalSchema>>({
    resolver: zodResolver(professionalSchema),
  });

  async function onSubmit(values: z.infer<typeof professionalSchema>) {
    let res = await updateDetails("professional_details", values);

    if (res) {
      toast.success("Saved");
      router.push("/dashboard/plus-form/education");
    } else {
      toast.error("Error");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your profession?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {careers.map((career) => (
                    <SelectItem key={career} value={career}>
                      {career}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                select the profession you are currently working in
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What is your designation in the current profession?
              </FormLabel>
              <Input {...field} />
              <FormDescription>
                Enter the designation you are currently working in
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who is your current employer?</FormLabel>
              <Input {...field} />
              <FormDescription>
                Enter the name of your current employer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your current annual income?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Less than 1,00,000">
                    Less than 1,00,000
                  </SelectItem>
                  <SelectItem value="1,00,000-3,00,000">
                    1,00,000-3,00,000
                  </SelectItem>
                  <SelectItem value="3,00,001-5,00,000">
                    3,00,001-5,00,000
                  </SelectItem>
                  <SelectItem value="5,00,001-8,00,000">
                    5,00,001-8,00,000
                  </SelectItem>
                  <SelectItem value="8,00,001-12,00,000">
                    8,00,001-12,00,000
                  </SelectItem>
                  <SelectItem value="12,00,001-15,00,000">
                    12,00,001-15,00,000
                  </SelectItem>
                  <SelectItem value="15,00,001-20,00,000">
                    15,00,001-20,00,000
                  </SelectItem>
                  <SelectItem value="20,00,001-25,00,000">
                    20,00,001-25,00,000
                  </SelectItem>
                  <SelectItem value="Greater than 25,00,000">
                    Greater than 25,00,000
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Your annual income is required to find a suitable match for you
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}
