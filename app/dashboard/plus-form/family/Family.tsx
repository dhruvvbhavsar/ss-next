"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodError, string, z } from "zod";
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

const familySchema = z
  .object({
    familyType: z.string({ required_error: "Family type is required" }),
    doYouOwnHouse: z.string({ required_error: "Do you own a house?" }),
    housingStatus: z.string().optional(),
    otherHousingStatus: z.string().optional(),
    familyValue: z.string({ required_error: "Family value is required" }),
    otherFamilyValue: z.string().optional(),
    fatherName: z.string({ required_error: "Father's name is required" }),
    fatherOccupation: z.string({
      required_error: "Father's occupation is required",
    }),
    otherFatherOccupation: z.string().optional(),
    motherName: z.string({ required_error: "Mother's name is required" }),
    motherOccupation: z.string({
      required_error: "Mother's occupation is required",
    }),
    otherMotherOccupation: z.string().optional(),
    haveSiblings: z.string({ required_error: "Do you have siblings?" }),
    siblingsCount: z.string().optional(),
    familyDevotionalDetails: z.string({
      required_error: "Family devotional details is required",
    }),
  })
  .refine((data) => {
    if (data.doYouOwnHouse === "no") {
      if (!data.housingStatus) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Housing status is required",
            path: ["housingStatus"],
          },
        ]);
      }

      if (data.housingStatus === "others") {
        if (!data.otherHousingStatus) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Other housing status is required",
              path: ["otherHousingStatus"],
            },
          ]);
        }
      }
    }

    if (data.familyValue === "others") {
      if (!data.otherFamilyValue) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Other family value is required",
            path: ["otherFamilyValue"],
          },
        ]);
      }
    }

    if (
      ["Working", "Self-employed", "Business owner"].includes(
        data.fatherOccupation
      )
    ) {
      if (!data.otherFatherOccupation) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Other father's occupation is required",
            path: ["otherFatherOccupation"],
          },
        ]);
      }
    }

    if (
      ["Working", "Self-employed", "Business owner"].includes(
        data.motherOccupation
      )
    ) {
      if (!data.otherMotherOccupation) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Other mother's occupation is required",
            path: ["otherMotherOccupation"],
          },
        ]);
      }
    }

    if (data.haveSiblings === "Yes") {
      if (!data.siblingsCount) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Siblings count is required",
            path: ["siblingsCount"],
          },
        ]);
      }
    }

    return true;
  });

export default function FamilyDetails() {
  const router = useRouter();
  const form = useForm<z.infer<typeof familySchema>>({
    resolver: zodResolver(familySchema),
  });

  function onSubmit(values: z.infer<typeof familySchema>) {
    toast.success("Saved");
    router.push("/dashboard/plus-form/preferences");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit)();
          familySchema.parse(form.getValues());
        }}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="familyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your family type?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Joint Family">Joint Family</SelectItem>
                  <SelectItem value="Nuclear Family">Nuclear Family</SelectItem>
                  <SelectItem value="Extended Family">
                    Extended Family
                  </SelectItem>
                  <SelectItem value="Alone/Independent">
                    Alone/Independent
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This will help us understand your family structure better
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doYouOwnHouse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you own a house?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This will help us understand your housing situation better
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("doYouOwnHouse") === "no" && (
          <FormField
            control={form.control}
            name="housingStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your housing status?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Rented Apartment/House">
                      Rented Apartment/House
                    </SelectItem>
                    <SelectItem value="Living in Company Provided Accommodation">
                      Living in Company Provided Accommodation
                    </SelectItem>
                    <SelectItem value="Paying Guest">Paying Guest</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This will help us understand your housing status better
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.watch("housingStatus") === "others" && (
          <FormField
            control={form.control}
            name="otherHousingStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Please specify your housing status if others
                </FormLabel>
                <Input {...field} />
                <FormDescription>
                  This will help us understand your housing status better
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="familyValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What are the values that your family believes in?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Traditional and Conservative">
                    Traditional and Conservative
                  </SelectItem>
                  <SelectItem value="Modern and Open-minded">
                    Modern and Open-minded
                  </SelectItem>
                  <SelectItem value="Balanced mix of Traditional and Modern Values">
                    Balanced mix of Traditional and Modern Values
                  </SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This will help us understand your family values better
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("familyValue") === "others" && (
          <FormField
            control={form.control}
            name="otherFamilyValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Please specify your family values if others
                </FormLabel>
                <Input {...field} />
                <FormDescription>
                  This will help us understand your family values better
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Name</FormLabel>
              <Input {...field} />
              <FormDescription>Enter your father's name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fatherOccupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your father's occupation?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Retired">Retired</SelectItem>
                  <SelectItem value="Not staying with us">
                    Not staying with us
                  </SelectItem>
                  <SelectItem value="Working">
                    Working (Please specify the occupation briefly)
                  </SelectItem>
                  <SelectItem value="Self-employed">
                    Self-employed (Please specify the occupation briefly)
                  </SelectItem>
                  <SelectItem value="Business owner">
                    Business owner (Please specify the type of business briefly)
                  </SelectItem>
                  <SelectItem value="Deceased">Deceased</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This will help us understand your father's occupation better
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {["Working", "Self-employed", "Business owner"].includes(
          form.watch("fatherOccupation")
        ) && (
          <FormField
            control={form.control}
            name="otherFatherOccupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify your father's occupation</FormLabel>
                <Input {...field} />
                <FormDescription>
                  This will help us understand your father's occupation better
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="motherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Name</FormLabel>
              <Input {...field} />
              <FormDescription>Enter your mother's name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="motherOccupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is your mother's occupation?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Retired">Retired</SelectItem>
                  <SelectItem value="Housewife">Housewife</SelectItem>
                  <SelectItem value="Not staying with us">
                    Not staying with us
                  </SelectItem>
                  <SelectItem value="Working">
                    Working (Please specify the occupation briefly)
                  </SelectItem>
                  <SelectItem value="Self-employed">
                    Self-employed (Please specify the occupation briefly)
                  </SelectItem>
                  <SelectItem value="Business owner">
                    Business owner (Please specify the type of business briefly)
                  </SelectItem>
                  <SelectItem value="Deceased">Deceased</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This will help us understand your mother's occupation better
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {["Working", "Self-employed", "Business owner"].includes(
          form.watch("motherOccupation")
        ) && (
          <FormField
            control={form.control}
            name="otherMotherOccupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify your mother's occupation</FormLabel>
                <Input {...field} />
                <FormDescription>
                  This will help us understand your mother's occupation better
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="haveSiblings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you have siblings?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This will help us understand your family structure better
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("haveSiblings") === "Yes" && (
          <FormField
            control={form.control}
            name="siblingsCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How many siblings do you have?</FormLabel>
                <Input {...field} type="number" />
                <FormDescription>
                  This will help us understand your family structure better
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="familyDevotionalDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Devotional details of family members</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Strongly Devotional">
                    Strongly Devotional
                  </SelectItem>
                  <SelectItem value="Moderately Devotional">
                    Moderately Devotional
                  </SelectItem>
                  <SelectItem value="Occasionally Participate">
                    Occasionally Participate
                  </SelectItem>
                  <SelectItem value="Not Devotional">Not Devotional</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This will help us understand your family's devotional details
                better
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
