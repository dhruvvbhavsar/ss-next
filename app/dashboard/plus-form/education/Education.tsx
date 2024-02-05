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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const educationSchema = z
  .object({
    qualification: z.string({ required_error: "Qualification is required" }),
    otherQualification: z.string().optional(),
  })
  .refine((data) => {
    if (data.qualification === "others" && !data.otherQualification) {
      throw new ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: "Please specify your qualification",
          path: ["otherQualification"],
        },
      ]);
    }
    return true;
  });

export default function EducationalDetails() {
  const router = useRouter();
  const form = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
  });

  function onSubmit(values: z.infer<typeof educationSchema>) {
    toast.success("Saved");
    router.push("/dashboard/plus-form/family");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="qualification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Highest Qualification</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Lower Primary (Class I-V)">
                    Lower Primary (Class I-V)
                  </SelectItem>
                  <SelectItem value="Middle/Higher Primary (Class VI-VIII)">
                    Middle/Higher Primary (Class VI-VIII)
                  </SelectItem>
                  <SelectItem value="Secondary (Class IX-X)">
                    Secondary (Class IX-X)
                  </SelectItem>
                  <SelectItem value="Senior Secondary (Class XII)">
                    Senior Secondary (Class XII)
                  </SelectItem>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                  <SelectItem value="PG Diploma">PG Diploma</SelectItem>
                  <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                  <SelectItem value="Doctorate">Doctorate</SelectItem>
                  <SelectItem value="Post Doctorate">Post Doctorate</SelectItem>
                  <SelectItem value="Illiterate">Illiterate</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>

              <FormDescription>
                Please select your highest qualification
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("qualification") === "others" && (
          <FormField
            control={form.control}
            name="otherQualification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify your other qualification</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please specify your other qualification
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
