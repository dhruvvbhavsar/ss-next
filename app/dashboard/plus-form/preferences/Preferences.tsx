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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  age_range,
  annual_income,
  devotional_preferences,
  diet,
  education,
  family_background,
  location,
  marital_status,
  occupation,
  rashi,
} from "@/options";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const partnerPreferencesSchema = z
  .object({
    pAgeRange: z.array(z.string(), {
      required_error: "Please select atleast one age range",
    }),
    pAgeDifference: z.string().optional(),
    pMaritalStatus: z.array(z.string(), {
      required_error: "Please select marital status",
    }),
    pEducation: z.array(z.string(), {
      required_error: "Please select education",
    }),
    pOccupation: z.array(z.string(), {
      required_error: "Please select occupation",
    }),
    pIncome: z.array(z.string()).optional(),
    pFamilyBackground: z.array(z.string(), {
      required_error: "Please select family background",
    }),
    pDevotionalPreference: z.array(z.string(), {
      required_error: "Please select devotional preference",
    }),

    //iskcon
    pInitiationStatus: z.string().optional(),
    pChantingStatus: z.string().optional(),

    pLocation: z.array(z.string(), {
      required_error: "Please select location",
    }),
    pDiet: z.array(z.string(), { required_error: "Please select diet" }),
    pPostLiving: z.string({
      required_error: "Please select post living preference",
    }),
    pOtherPostLiving: z.string().optional(),
    pLanguage: z.string({
      required_error: "Please select language preference",
    }),
    pManglik: z.string({ required_error: "Please select manglik preference" }),
    pRashi: z.string({ required_error: "Please select rashi preference" }),
    pSpecificRashi: z.array(z.string()).optional(),
  })
  .refine((data) => {
    if (
      data.pAgeRange.includes("Younger than me") ||
      data.pAgeRange.includes("Older than me")
    ) {
      if (!data.pAgeDifference) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please enter age difference",
            path: ["pAgeDifference"],
          },
        ]);
      }
    }

    if (
      !(
        data.pOccupation.includes("Homemaker") ||
        data.pOccupation.includes("Not employed")
      )
    ) {
      if (!data.pIncome) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please select income preference",
            path: ["pIncome"],
          },
        ]);
      }
    }

    if (data.pDevotionalPreference.includes("Connected to ISKCON")) {
      if (!data.pInitiationStatus) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please select initiation status",
            path: ["pInitiationStatus"],
          },
        ]);
      }

      if (!data.pChantingStatus) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please select chanting status",
            path: ["pChantingStatus"],
          },
        ]);
      }
    }

    if (data.pPostLiving === "others") {
      if (!data.pOtherPostLiving) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please enter post living preference",
            path: ["pOtherPostLiving"],
          },
        ]);
      }
    }

    if (data.pRashi === "Prefer a Specific Rashi") {
      if (!data.pSpecificRashi) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please select specific rashi",
            path: ["pSpecificRashi"],
          },
        ]);
      }
    }

    return true;
  });

export default function PartnerPreferences() {
  const router = useRouter();
  const form = useForm<z.infer<typeof partnerPreferencesSchema>>({
    resolver: zodResolver(partnerPreferencesSchema),
  });

  function onSubmit(values: z.infer<typeof partnerPreferencesSchema>) {
    toast.success("Saved");
    router.push("/dashboard/plus-form/astrology");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="pAgeRange"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Age Range</FormLabel>
                <FormDescription>
                  Select the age range you prefer for your partner
                </FormDescription>
              </div>
              <ScrollArea className="h-32">
                {age_range.map((s) => (
                  <FormField
                    key={s}
                    control={form.control}
                    name="pAgeRange"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={s}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(s)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), s])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== s
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {s}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />
        {form
          .watch("pAgeRange")
          ?.some((ageRange) =>
            ["Younger than me", "Older than me"].includes(ageRange)
          ) && (
          <FormField
            control={form.control}
            name="pAgeDifference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age Difference</FormLabel>
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
                    <SelectItem value="± 0-2 years age difference">
                      ± 0-2 years age difference
                    </SelectItem>
                    <SelectItem value="± 3-5 years age difference">
                      ± 3-5 years age difference
                    </SelectItem>
                    <SelectItem value="± 6-10 years age difference">
                      ± 6-10 years age difference
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the age difference you prefer for your partner
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="pMaritalStatus"
          render={() => (
            <FormItem>
              <FormLabel>Marital Status</FormLabel>
              <FormDescription>
                Select the marital status you prefer for your partner
              </FormDescription>
              <ScrollArea className="h-32">
                {marital_status.map((s) => (
                  <FormField
                    key={s}
                    control={form.control}
                    name="pMaritalStatus"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={s}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(s)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), s])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== s
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {s}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pEducation"
          render={() => (
            <FormItem>
              <FormLabel>Education</FormLabel>
              <FormDescription>
                Select the education you prefer for your partner
              </FormDescription>
              <ScrollArea className="h-32">
                {education.map((s) => (
                  <FormField
                    key={s}
                    control={form.control}
                    name="pEducation"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={s}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(s)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), s])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== s
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {s}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pOccupation"
          render={() => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <FormDescription>
                Select the occupation you prefer for your partner
              </FormDescription>
              <ScrollArea className="h-32">
                {occupation.map((s) => (
                  <FormField
                    key={s}
                    control={form.control}
                    name="pOccupation"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={s}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(s)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), s])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== s
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {s}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />
        {!(
          form.watch("pOccupation")?.includes("Homemaker") ||
          form.watch("pOccupation")?.includes("Not employed")
        ) && (
          <FormField
            control={form.control}
            name="pIncome"
            render={() => (
              <FormItem>
                <FormLabel>Annual Income</FormLabel>
                <FormDescription>
                  Select the income you prefer for your partner
                </FormDescription>
                <ScrollArea className="h-32">
                  {annual_income.map((s) => (
                    <FormField
                      key={s}
                      control={form.control}
                      name="pIncome"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={s}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(s)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        s,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== s
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {s}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </ScrollArea>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="pFamilyBackground"
          render={() => (
            <FormItem>
              <FormLabel>Family Background</FormLabel>
              <FormDescription>
                Select the family background you prefer for your partner
              </FormDescription>
              <ScrollArea className="h-32">
                {family_background.map((s) => (
                  <FormField
                    key={s}
                    control={form.control}
                    name="pFamilyBackground"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={s}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(s)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), s])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== s
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {s}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pDevotionalPreference"
          render={() => (
            <FormItem>
              <FormLabel>Devotional Preference</FormLabel>
              <FormDescription>
                Select the devotional preference you prefer for your partner
              </FormDescription>
              <ScrollArea className="h-32">
                {devotional_preferences.map((s) => (
                  <FormField
                    key={s}
                    control={form.control}
                    name="pDevotionalPreference"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={s}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(s)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), s])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== s
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {s}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />

        {form
          .watch("pDevotionalPreference")
          ?.includes("Connected to ISKCON") && (
          <>
            <FormField
              control={form.control}
              name="pInitiationStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initiation Status</FormLabel>
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
                      <SelectItem value="Should be Initiated">
                        Should be Initiated
                      </SelectItem>
                      <SelectItem value="No specific preference">
                        No specific preference
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the initiation status you prefer for your partner
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pChantingStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chanting Status</FormLabel>
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
                      <SelectItem value="Regularly Chants">
                        Regularly Chants
                      </SelectItem>
                      <SelectItem value="Occasionally Chants">
                        Occasionally Chants
                      </SelectItem>
                      <SelectItem value="Interested but Not Regularly Chanting">
                        Interested but Not Regularly Chanting
                      </SelectItem>
                      <SelectItem value="Not Chanting">Not Chanting</SelectItem>
                      <SelectItem value="No specific preference">
                        No specific preference
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the chanting status you prefer for your partner
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="pLocation"
          render={() => (
            <FormItem>
              <FormLabel>Location Preference</FormLabel>
              <FormDescription>
                Select the location you prefer for your partner
              </FormDescription>
              <ScrollArea className="h-32">
                {location.map((s) => (
                  <FormField
                    key={s}
                    control={form.control}
                    name="pLocation"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={s}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(s)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), s])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== s
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {s}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pDiet"
          render={() => (
            <FormItem>
              <FormLabel>Diet Preference</FormLabel>
              <FormDescription>
                Select the diet preference you prefer for your partner
              </FormDescription>
              <ScrollArea className="h-32">
                {diet.map((s) => (
                  <FormField
                    key={s}
                    control={form.control}
                    name="pDiet"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={s}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(s)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), s])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== s
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {s}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pPostLiving"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Living Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Living with Family">
                    Living with Family
                  </SelectItem>
                  <SelectItem value="Living separately, but nearby to family">
                    Living separately, but nearby to family
                  </SelectItem>
                  <SelectItem value="Living separately, in a different city or region">
                    Living separately, in a different city or region
                  </SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the post living preference you prefer for your partner
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("pPostLiving") === "others" && (
          <FormField
            control={form.control}
            name="pOtherPostLiving"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Other Post Living Preference (if selected others)
                </FormLabel>
                <Input {...field} />
                <FormDescription>
                  Enter the post living preference you prefer for your partner
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="pLanguage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Same mother tongue as me">
                    Same mother tongue as me
                  </SelectItem>
                  <SelectItem value="Different mother tongue but can communicate in my language">
                    Different mother tongue but can communicate in my language
                  </SelectItem>
                  <SelectItem value="No specific language preference">
                    No specific language preference
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the language preference you prefer for your partner
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pManglik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manglik</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                  <SelectItem value="Not preferences">
                    Not preferences
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the manglik preference you prefer for your partner
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pRashi"
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
                  <SelectItem value="Prefer a Specific Rashi">
                    Prefer a Specific Rashi (Please specify)
                  </SelectItem>
                  <SelectItem value="No Specific Rashi Preference">
                    No Specific Rashi Preference
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the rashi preference you prefer for your partner
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("pRashi") === "Prefer a Specific Rashi" && (
          <FormField
            control={form.control}
            name="pSpecificRashi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Rashi</FormLabel>
                <FormDescription>
                  Select the specific rashi you prefer for your partner
                </FormDescription>
                <ScrollArea className="h-32">
                  {rashi.map((s) => (
                    <FormField
                      key={s}
                      control={form.control}
                      name="pSpecificRashi"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={s}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(s)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        s,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== s
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {s}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </ScrollArea>
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
