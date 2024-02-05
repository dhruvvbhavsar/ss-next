"use client";
import { Country, State, City } from "country-state-city";
import { ZodError, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const personalSchema = z
  .object({
    currentCountry: z.string({ required_error: "Please select a country" }),
    currentState: z.string({ required_error: "Please select a state" }),
    currentCity: z.string({ required_error: "Please select a city" }),
    isCurrentAddressPermanent: z.boolean(),
    permanentCountry: z.string().optional(),
    permanentState: z.string().optional(),
    permanentCity: z.string().optional(),
    citizenShipStatus: z.string({
      required_error: "Please select a citizen status",
    }),
    otherCitizenShipStatus: z.string().optional(),
    dualCitizenShip: z.boolean(),
    dualCitizenShipCountries: z.array(z.string()).optional(),
    bloodGroup: z.string({ required_error: "Please select a blood group" }),
    diet: z.string({ required_error: "Please select a diet" }),
    otherDiet: z.string().optional(),
    maritalStatus: z.string({
      required_error: "Please select a marital status",
    }),
    haveChildren: z.boolean(),
    childrenCount: z.string().optional(),
    category: z.string({ required_error: "Please select a category" }),
    caste: z.string({ required_error: "Please select a caste" }),
    motherTongue: z.string({ required_error: "Please select a mother tongue" }),
    otherMotherTongue: z.string().optional(),
    height: z.string({ required_error: "Please select a height" }),
    weight: z.string({ required_error: "Please select a weight" }),
    isPwd: z.boolean(),
    pwdType: z.string().optional(),
    otherPwdType: z.string().optional(),
    pwdRelation: z.string().optional(),
    otherPwdRelation: z.string().optional(),
    pwdRelationName: z.string().optional(),
    pwdRelationNumber: z.string().optional(),
    bio: z.string({ required_error: "Please provide a bio" }),
  })
  .refine((data) => {
    if (!data.isCurrentAddressPermanent) {
      if (!data.permanentCountry) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide permanent country",
            path: ["permanentCountry"],
          },
        ]);
      }
      if (!data.permanentState) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide permanent state",
            path: ["permanentState"],
          },
        ]);
      }
      if (!data.permanentCity) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide permanent city",
            path: ["permanentCity"],
          },
        ]);
      }
    } else {
      data.permanentCountry = data.currentCountry;
      data.permanentState = data.currentState;
      data.permanentCity = data.currentCity;
    }

    if (data.citizenShipStatus === "others") {
      if (!data.otherCitizenShipStatus) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide other citizenship status",
            path: ["otherCitizenShipStatus"],
          },
        ]);
      }
    }

    if (data.dualCitizenShip) {
      if (
        !data.dualCitizenShipCountries ||
        data.dualCitizenShipCountries.length === 0
      ) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide dual citizenship countries",
            path: ["dualCitizenShipCountries"],
          },
        ]);
      }
    }

    if (data.diet === "others") {
      if (!data.otherDiet) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide other diet",
            path: ["otherDiet"],
          },
        ]);
      }
    }

    if (data.haveChildren) {
      if (!data.childrenCount) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide children count",
            path: ["childrenCount"],
          },
        ]);
      }
    }

    if (data.motherTongue === "others") {
      if (!data.otherMotherTongue) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide other mother tongue",
            path: ["otherMotherTongue"],
          },
        ]);
      }
    }

    if (data.isPwd) {
      if (!data.pwdType) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide pwd type",
            path: ["pwdType"],
          },
        ]);
      }

      if (data.pwdType === "others") {
        if (!data.otherPwdType) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please provide other pwd type",
              path: ["otherPwdType"],
            },
          ]);
        }
      }

      if (!data.pwdRelation) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide pwd relation",
            path: ["pwdRelation"],
          },
        ]);
      }

      if (data.pwdRelation === "others") {
        if (!data.otherPwdRelation) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please provide other pwd relation",
              path: ["otherPwdRelation"],
            },
          ]);
        }
      }

      if (!data.pwdRelationName) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide pwd relation name",
            path: ["pwdRelationName"],
          },
        ]);
      }

      if (!data.pwdRelationNumber) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide pwd relation number",
            path: ["pwdRelationNumber"],
          },
        ]);
      }
    }

    // Return true if no errors were found
    return true;
  });

export default function PersonalDetails() {
  const router = useRouter();
  const form = useForm<z.infer<typeof personalSchema>>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      dualCitizenShip: false,
      isPwd: false,
      haveChildren: false,
      isCurrentAddressPermanent: false,
      dualCitizenShipCountries: [],
    },
  });

  function onSubmit(values: z.infer<typeof personalSchema>) {
    toast.success("Saved");
    router.push("/dashboard/plus-form/medical");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="countries" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Country.getAllCountries().map((country) => (
                    <SelectItem key={country.isoCode} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription>
                This is your current country of residence.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("currentCountry") && (
          <FormField
            control={form.control}
            name="currentState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current State</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="states" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {State.getStatesOfCountry(
                      Country.getAllCountries().filter(
                        (country) =>
                          country.name === form.watch("currentCountry")
                      )[0].isoCode
                    ).map((state) => (
                      <SelectItem key={state.isoCode} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormDescription>
                  This is your current state of residence.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.watch("currentState") && (
          <FormField
            control={form.control}
            name="currentCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current City</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="cities" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {City.getCitiesOfState(
                      Country.getAllCountries().filter(
                        (country) =>
                          country.name === form.watch("currentCountry")
                      )[0].isoCode,
                      State.getStatesOfCountry(
                        Country.getAllCountries().filter(
                          (country) =>
                            country.name === form.watch("currentCountry")
                        )[0].isoCode
                      ).filter(
                        (state) => state.name === form.watch("currentState")
                      )[0].isoCode
                    ).map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormDescription>
                  This is your current city of residence.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="isCurrentAddressPermanent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is your current address permanent?</FormLabel>
                <FormDescription>
                  If your current address is permanent, check this box.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {!form.watch("isCurrentAddressPermanent") && (
          <FormField
            control={form.control}
            name="permanentCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permanent Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="countries" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Country.getAllCountries().map((country) => (
                      <SelectItem key={country.isoCode} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormDescription>
                  This is your permanent country of residence.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!form.watch("isCurrentAddressPermanent") &&
          form.watch("permanentCountry") && (
            <FormField
              control={form.control}
              name="permanentState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent State</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="states" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {State.getStatesOfCountry(
                        Country.getAllCountries().filter(
                          (country) =>
                            country.name === form.watch("permanentCountry")
                        )[0].isoCode
                      ).map((state) => (
                        <SelectItem key={state.isoCode} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    This is your permanent state of residence.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

        {!form.watch("isCurrentAddressPermanent") &&
          form.watch("permanentState") && (
            <FormField
              control={form.control}
              name="permanentCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permanent City</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="cities" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {City.getCitiesOfState(
                        Country.getAllCountries().filter(
                          (country) =>
                            country.name === form.watch("permanentCountry")
                        )[0].isoCode,
                        State.getStatesOfCountry(
                          Country.getAllCountries().filter(
                            (country) =>
                              country.name === form.watch("permanentCountry")
                          )[0].isoCode
                        ).filter(
                          (state) => state.name === form.watch("permanentState")
                        )[0].isoCode
                      ).map((city) => (
                        <SelectItem key={city.name} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This is your permanent city of residence.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

        <FormField
          control={form.control}
          name="citizenShipStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Citizenship Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="citizenship status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Indian">Indian</SelectItem>
                  <SelectItem value="Nri">
                    NRI (Non Residential Indian)
                  </SelectItem>
                  <SelectItem value="Overseas Citizenship of India">
                    Overseas Citizenship of India
                  </SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This is your citizenship status.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("citizenShipStatus") === "others" && (
          <FormField
            control={form.control}
            name="otherCitizenShipStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Citizenship Status</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please provide your other citizenship status.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="dualCitizenShip"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Do you have dual citizenship?</FormLabel>
                <FormDescription>
                  If you have dual citizenship, check this box.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {form.watch("dualCitizenShip") && (
          <FormField
            control={form.control}
            name="dualCitizenShipCountries"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Dual Citizenship Countries</FormLabel>
                  <FormDescription>
                    Please select the countries you have dual citizenship with.
                  </FormDescription>
                </div>
                <ScrollArea className="h-32">
                  {Country.getAllCountries().map((country) => (
                    <FormField
                      key={country.isoCode}
                      control={form.control}
                      name="dualCitizenShipCountries"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={country.isoCode}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(country.name)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        country.name,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== country.name
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {country.name}
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
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="blood group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This is your blood group.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diet</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="diet" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="Non Vegetarian">Non Vegetarian</SelectItem>
                  <SelectItem value="Eggetarian">Eggetarian</SelectItem>
                  <SelectItem value="Vegan">Vegan</SelectItem>
                  <SelectItem value="Jain">
                    Jain (no root vegetables)
                  </SelectItem>
                  <SelectItem value="Sattvik">
                    Sattvik (no onion/garlic)
                  </SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This is your diet.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("diet") === "others" && (
          <FormField
            control={form.control}
            name="otherDiet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Diet</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please provide your other diet.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="maritalStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marital Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="marital status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Never Married">Never Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                  <SelectItem value="Awaiting Divorce">
                    Awaiting Divorce
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This is your marital status.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="haveChildren"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Do you have children?</FormLabel>
                <FormDescription>
                  If you have children, check this box.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {form.watch("haveChildren") && (
          <FormField
            control={form.control}
            name="childrenCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Children Count</FormLabel>
                <Input {...field} type="number" />
                <FormDescription>
                  Please provide the count of your children.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="OBC">OBC</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="ST">ST</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This is your category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caste"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caste</FormLabel>
              <Input {...field} />
              <FormDescription>This is your caste.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="motherTongue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother Tongue</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="mother tongue" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Hindi",
                    "Bengali",
                    "Telugu",
                    "Marathi",
                    "Tamil",
                    "Urdu",
                    "Gujarati",
                    "Kannada",
                    "Odia",
                    "Malayalam",
                    "Punjabi",
                    "Sindhi",
                    "Assamese",
                    "Sanskrit",
                    "others",
                  ].map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>This is your mother tongue.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("motherTongue") === "others" && (
          <FormField
            control={form.control}
            name="otherMotherTongue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Mother Tongue</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please provide your other mother tongue.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="height" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Less than 4 feet (122 cm)">
                    Less than 4 feet (122 cm)
                  </SelectItem>
                  <SelectItem value="Less than 5 feet (152 cm)">
                    Less than 5 feet (152 cm)
                  </SelectItem>
                  <SelectItem value="5 feet to 5 feet 5 inches (152 cm to 165 cm)">
                    5 feet to 5 feet 5 inches (152 cm to 165 cm)
                  </SelectItem>
                  <SelectItem value="5 feet 6 inches to 5 feet 10 inches (168 cm to 178 cm)">
                    5 feet 6 inches to 5 feet 10 inches (168 cm to 178 cm)
                  </SelectItem>
                  <SelectItem value="5 feet 11 inches to 6 feet 2 inches (180 cm to 188 cm)">
                    5 feet 11 inches to 6 feet 2 inches (180 cm to 188 cm)
                  </SelectItem>
                  <SelectItem value="6 feet 3 inches or taller (191 cm+)">
                    6 feet 3 inches or taller (191 cm+)
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This is your height.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="weight" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="<40 kgs">{"<40 kgs"}</SelectItem>
                  <SelectItem value="40-50 kgs">40-50 kgs</SelectItem>
                  <SelectItem value="51-60 kgs">51-60 kgs</SelectItem>
                  <SelectItem value="61-70 kgs">61-70 kgs</SelectItem>
                  <SelectItem value="71-80 kgs">71-80 kgs</SelectItem>
                  <SelectItem value="81-90 kgs">81-90 kgs</SelectItem>
                  <SelectItem value=">90 kgs">{">90 kgs"}</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This is your weight.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPwd"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Do you have a physical disability?</FormLabel>
                <FormDescription>
                  If you have a physical disability, check this box.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {form.watch("isPwd") && (
          <FormField
            control={form.control}
            name="pwdType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Disability Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="physical disability type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Orthopedic">Orthopedic</SelectItem>
                    <SelectItem value="Hearing Impaired">
                      Hearing Impaired
                    </SelectItem>
                    <SelectItem value="Visually Impaired">
                      Visually Impaired
                    </SelectItem>
                    <SelectItem value="Speech Impaired">
                      Speech Impaired
                    </SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This is your physical disability type.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.watch("pwdType") === "others" && (
          <FormField
            control={form.control}
            name="otherPwdType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Physical Disability Type</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please provide your other physical disability type.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.watch("isPwd") && (
          <FormField
            control={form.control}
            name="pwdRelation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Disability Relation</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="physical disability relation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Self">Self</SelectItem>
                    <SelectItem value="Son">Son</SelectItem>
                    <SelectItem value="Daughter">Daughter</SelectItem>
                    <SelectItem value="Brother">Brother</SelectItem>
                    <SelectItem value="Sister">Sister</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  This is your physical disability relation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.watch("pwdRelation") === "others" && (
          <FormField
            control={form.control}
            name="otherPwdRelation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Physical Disability Relation</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please provide your other physical disability relation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.watch("pwdRelation") && (
          <FormField
            control={form.control}
            name="pwdRelationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Disability Relation Name</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please provide your physical disability relation name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {form.watch("pwdRelation") && (
          <FormField
            control={form.control}
            name="pwdRelationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Disability Relation Number</FormLabel>
                <Input {...field} type="number" />
                <FormDescription>
                  Please provide your physical disability relation number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <Textarea
                {...field}
                placeholder="Describe yourself in less than 200 words"
              />
              <FormDescription>
                Please provide a short bio about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mx-auto" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
