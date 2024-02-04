"use client";
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
import { books, initiatingGurus, orgList } from "@/options";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
const spiritualSchema = z
  .object({
    isAffiliated: z.boolean(),
    spiritualOrg: z.string().optional(),
    otherSpiritualOrg: z.string().optional(),
    willingnessToSupport: z.string({
      required_error: "Please select an option",
    }),

    importanceOfSpirituality: z.string({
      required_error: "Please select an option",
    }),

    //iskcon specific fields
    locationOfTemple: z.string().optional(),
    sinceWhenJoined: z.string().optional(),
    haveCounselor: z.boolean().optional(),
    counseslorName: z.string().optional(),
    counselorNumber: z.string().optional(),
    counsellorGuru: z.string().optional(),
    doYouChant: z.boolean().optional(),
    chantFrequency: z.string().optional(),
    chantingRounds: z.string().optional(),
    chantingTimeline: z.string().optional(),
    areYouInvolved: z.string().optional(),
    attendFestivals: z.string().optional(),
    areYouInitiated: z.string().optional(),
    initiatedName: z.string().optional(),
    aspiringToBeInitiatedBy: z.string().optional(),
    understandBhagwatKnowledge: z.string().optional(),
    doYouReadBooks: z.boolean().optional(),
    readBooks: z.array(z.string()).optional(),
    diefPreference: z.string().optional(),
    otherDietPreference: z.string().optional(),
    dietPrasadam: z.string().optional(),
    spiritualCommitment: z.string().optional(),
    adherenceToRegulativePrinciples: z.string().optional(),
    involvementInTempleActivities: z.string().optional(),
    participationInSpiritualPrograms: z.string().optional(),
    willingnessForService: z.string().optional(),
    serviceInterest: z.string().optional(),
    connectionCulture: z.string().optional(),
    otherConnectionCulture: z.string().optional(),
    understandingIskcon: z.string().optional(),
    commitmentReadiness: z.string().optional(),
    childrenWillingness: z.string().optional(),
    chilrenEducation: z.string().optional(),
  })
  .refine((data) => {
    if (data.isAffiliated) {
      if (!data.spiritualOrg) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please select a spiritual organization",
            path: ["spiritualOrg"],
          },
        ]);
      }

      if (data.spiritualOrg === "others") {
        if (!data.otherSpiritualOrg) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please specify the spiritual organization",
              path: ["otherSpiritualOrg"],
            },
          ]);
        }
      }

      if (data.spiritualOrg === "ISKCON") {
        if (!data.locationOfTemple) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please specify the location of the temple",
              path: ["locationOfTemple"],
            },
          ]);
        }

        if (!data.sinceWhenJoined) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please specify since when you joined",
              path: ["sinceWhenJoined"],
            },
          ]);
        }

        if (data.haveCounselor) {
          if (!data.counseslorName) {
            throw new ZodError([
              {
                code: z.ZodIssueCode.custom,
                message: "Please specify the counselor name",
                path: ["counseslorName"],
              },
            ]);
          }

          if (!data.counselorNumber) {
            throw new ZodError([
              {
                code: z.ZodIssueCode.custom,
                message: "Please specify the counselor number",
                path: ["counselorNumber"],
              },
            ]);
          }

          if (!data.counsellorGuru) {
            throw new ZodError([
              {
                code: z.ZodIssueCode.custom,
                message: "Please specify the counselor guru",
                path: ["counsellorGuru"],
              },
            ]);
          }
        }
      }

      if (data.doYouChant) {
        if (!data.chantFrequency) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please specify the chant frequency",
              path: ["chantFrequency"],
            },
          ]);
        }

        if (!data.chantingRounds) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please specify the chanting rounds",
              path: ["chantingRounds"],
            },
          ]);
        }

        if (!data.chantingTimeline) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please specify the chanting timeline",
              path: ["chantingTimeline"],
            },
          ]);
        }
      }

      if (!data.areYouInvolved) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message:
              "Please specify if you are involved in any other activities",
            path: ["areYouInvolved"],
          },
        ]);
      }

      if (!data.attendFestivals) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify if you attend festivals",
            path: ["attendFestivals"],
          },
        ]);
      }

      if (!data.areYouInitiated) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify if you are initiated",
            path: ["areYouInitiated"],
          },
        ]);
      }

      if (data.areYouInitiated === "yes") {
        if (!data.initiatedName) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please specify the initiated name",
              path: ["initiatedName"],
            },
          ]);
        }
      }

      if (data.areYouInitiated === "not yet") {
        if (!data.aspiringToBeInitiatedBy) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message:
                "Please specify the guru you are aspiring to be initiated by",
              path: ["aspiringToBeInitiatedBy"],
            },
          ]);
        }
      }

      if (!data.understandBhagwatKnowledge) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify if you understand Bhagwat knowledge",
            path: ["understandBhagwatKnowledge"],
          },
        ]);
      }

      if (data.doYouReadBooks) {
        if (!data.readBooks?.length) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please specify the books you read",
              path: ["readBooks"],
            },
          ]);
        }
      }

      if (!data.diefPreference) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the diet preference",
            path: ["diefPreference"],
          },
        ]);
      }

      if (data.diefPreference === "others") {
        if (!data.otherDietPreference) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please specify the other diet preference",
              path: ["otherDietPreference"],
            },
          ]);
        }
      }

      if (!data.dietPrasadam) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify if you observe diet prasadam",
            path: ["dietPrasadam"],
          },
        ]);
      }

      if (!data.spiritualCommitment) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the spiritual commitment",
            path: ["spiritualCommitment"],
          },
        ]);
      }

      if (!data.adherenceToRegulativePrinciples) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the adherence to regulative principles",
            path: ["adherenceToRegulativePrinciples"],
          },
        ]);
      }

      if (!data.involvementInTempleActivities) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the involvement in temple activities",
            path: ["involvementInTempleActivities"],
          },
        ]);
      }

      if (!data.participationInSpiritualPrograms) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the participation in spiritual programs",
            path: ["participationInSpiritualPrograms"],
          },
        ]);
      }

      if (!data.willingnessForService) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the willingness for service",
            path: ["willingnessForService"],
          },
        ]);
      }

      if (!data.serviceInterest) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the service interest",
            path: ["serviceInterest"],
          },
        ]);
      }

      if (!data.connectionCulture) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the connection culture",
            path: ["connectionCulture"],
          },
        ]);
      }

      if (data.connectionCulture === "others") {
        if (!data.otherConnectionCulture) {
          throw new ZodError([
            {
              code: z.ZodIssueCode.custom,
              message: "Please specify the other connection culture",
              path: ["otherConnectionCulture"],
            },
          ]);
        }
      }

      if (!data.understandingIskcon) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the understanding of ISKCON",
            path: ["understandingIskcon"],
          },
        ]);
      }

      if (!data.commitmentReadiness) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the commitment readiness",
            path: ["commitmentReadiness"],
          },
        ]);
      }

      if (!data.childrenWillingness) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the children willingness",
            path: ["childrenWillingness"],
          },
        ]);
      }

      if (
        [
          "Completely Willing and Prepared",
          "Willing but Need Guidance",
          "Considering it but Uncertain",
        ].includes(data.childrenWillingness) &&
        !data.chilrenEducation
      ) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please specify the children education",
            path: ["chilrenEducation"],
          },
        ]);
      }
    }
    return true;
  });

export default function SpiritualDetails() {
  const form = useForm<z.infer<typeof spiritualSchema>>({
    resolver: zodResolver(spiritualSchema),
    defaultValues: {
      isAffiliated: false,
      doYouChant: false,
      haveCounselor: false,
      doYouReadBooks: false,
    },
  });

  function onSubmit(values: z.infer<typeof spiritualSchema>) {
    console.log(values);
    toast.success("Saved");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          spiritualSchema.parseAsync(form.getValues());
          form.handleSubmit(onSubmit)();
        }}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="isAffiliated"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Do you have a religious affiliation with any spiritual
                  organization?
                </FormLabel>
                <FormDescription>Please Check the box if yes</FormDescription>
              </div>
            </FormItem>
          )}
        />

        {form.watch("isAffiliated") && (
          <>
            <FormField
              control={form.control}
              name="spiritualOrg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Spirital Organization you are affiliated with
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ISKCON">ISKCON</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    If not listed, please select others and specify in the next
                    field
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("spiritualOrg") === "others" && (
              <FormField
                control={form.control}
                name="otherSpiritualOrg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Please specify the spiritual organization
                    </FormLabel>
                    <Input {...field} />
                    <FormDescription>
                      If not listed, please specify here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {form.watch("spiritualOrg") === "ISKCON" && (
              <>
                <h1 className="text-2xl">For ISKCON Devotees</h1>
                <FormField
                  control={form.control}
                  name="locationOfTemple"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Location of the ISKCON Temple you are connected to
                      </FormLabel>
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
                          {orgList.map((org) => (
                            <SelectItem key={org} value={org}>
                              {org}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        The location of the temple you are connected with
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sinceWhenJoined"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Since when are you connected with ISKCON?
                      </FormLabel>
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
                          <SelectItem value="<1 year">
                            less than a year
                          </SelectItem>
                          <SelectItem value="1-3 years">1-3 years </SelectItem>
                          <SelectItem value="3-5 years">3-5 years </SelectItem>
                          <SelectItem value=">5 years">5 years</SelectItem>
                          <SelectItem value=">10 years">10 years </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        This is the time you have been connected with ISKCON
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="haveCounselor"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Do you have a counselor in ISKCON?
                        </FormLabel>
                        <FormDescription>
                          Please Check the box if yes
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {form.watch("haveCounselor") && (
                  <>
                    <FormField
                      control={form.control}
                      name="counseslorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of the counselor</FormLabel>
                          <Input {...field} />
                          <FormDescription>
                            Please specify the name of the counselor
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="counselorNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact number of the counselor</FormLabel>
                          <Input {...field} />
                          <FormDescription>
                            Please specify the contact number of the counselor
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="counsellorGuru"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of the counselor's guru</FormLabel>
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
                              {initiatingGurus.map((guru) => (
                                <SelectItem key={guru} value={guru}>
                                  {guru}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormDescription>
                            Please specify the name of the counselor's guru
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <h1 className="text-xl">Devotional Practices</h1>
                <FormField
                  control={form.control}
                  name="doYouChant"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Do you chant?</FormLabel>
                        <FormDescription>
                          Please Check the box if yes
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {form.watch("doYouChant") && (
                  <>
                    <FormField
                      control={form.control}
                      name="chantFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chant frequency</FormLabel>
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
                              <SelectItem value="daily">Every day</SelectItem>
                              <SelectItem value="alternate days">
                                Every alternate day
                              </SelectItem>
                              <SelectItem value="once or twice a week">
                                Once or twice a week
                              </SelectItem>
                              <SelectItem value="once a week">
                                Once in a week
                              </SelectItem>
                              <SelectItem value="sometimes">
                                Sometimes
                              </SelectItem>
                              <SelectItem value="only on ekadashi">
                                Only on Ekadashi or festivals
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <FormDescription>
                            Please specify the chant frequency
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="chantingRounds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chanting rounds</FormLabel>
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
                              <SelectItem value="16">16 rounds</SelectItem>
                              <SelectItem value="8">8 rounds</SelectItem>
                              <SelectItem value="4">4 rounds</SelectItem>
                              <SelectItem value="2">2 rounds</SelectItem>
                              <SelectItem value="More than 16">
                                More than 16
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <FormDescription>
                            Please specify the chanting rounds
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="chantingTimeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Since how long have you been chanting?
                          </FormLabel>
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
                              <SelectItem value="<1 year">
                                {"<1 year"}
                              </SelectItem>
                              <SelectItem value="1-3 years">
                                {"1-3 years"}
                              </SelectItem>
                              <SelectItem value="3-5 years">
                                3-5 years{" "}
                              </SelectItem>
                              <SelectItem value=">5 years">
                                {">5 years"}
                              </SelectItem>
                              <SelectItem value=">10 years">
                                {">10 years"}
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <FormDescription>
                            Please specify the chanting timeline
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <FormField
                  control={form.control}
                  name="areYouInvolved"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Are you involved in any other activities of ISKCON?
                      </FormLabel>
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
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="planning">
                            Planning to be Involved
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify if you are involved in any other
                        activities
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attendFestivals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you attend ISKCON festivals?</FormLabel>
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
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="planning">
                            Planning to attend
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify if you attend festivals
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="areYouInitiated"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Are you initiated?</FormLabel>
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
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="not yet">Not Yet</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify if you are initiated
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("areYouInitiated") === "yes" && (
                  <FormField
                    control={form.control}
                    name="initiatedName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name of the initiating guru</FormLabel>
                        <Input {...field} />
                        <FormDescription>
                          Please specify the name of the initiating guru
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {form.watch("areYouInitiated") === "not yet" && (
                  <FormField
                    control={form.control}
                    name="aspiringToBeInitiatedBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name of the guru you are aspiring to be initiated by
                        </FormLabel>
                        <Input {...field} />
                        <FormDescription>
                          Please specify the name of the guru you are aspiring
                          to be initiated by
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="understandBhagwatKnowledge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Understanding and acceptance of the teachings of Srila
                        Prabhupada
                      </FormLabel>
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
                          <SelectItem value="Completely Understand and Accept">
                            Completely Understand and Accept
                          </SelectItem>
                          <SelectItem value="Partially Understand and Accept">
                            Partially Understand and Accept
                          </SelectItem>
                          <SelectItem value="Completely Understand and Do Not Accept">
                            Completely Understand and Do Not Accept
                          </SelectItem>
                          <SelectItem value="Partially Understand and Do Not Accept">
                            Partially Understand and Do Not Accept
                          </SelectItem>
                          <SelectItem value="Do Not Understand">
                            Do Not Understand
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify if you understand Bhagwat knowledge
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doYouReadBooks"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Do you read the Bhagavad Gita/Bhagvatam/Srila
                          Prabhupad's books?
                        </FormLabel>
                        <FormDescription>
                          Please Check the box if yes
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {form.watch("doYouReadBooks") && (
                  <FormField
                    control={form.control}
                    name="readBooks"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>
                            Which books do you read? (Select all that apply)
                          </FormLabel>
                          <FormDescription>
                            Please specify the books you read
                          </FormDescription>
                        </div>
                        <ScrollArea className="h-32">
                          {books.map((book) => (
                            <FormField
                              key={book}
                              control={form.control}
                              name="readBooks"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={book}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(book)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value || []),
                                                book,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== book
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {book}
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

                <h1 className="text-xl">Dietary Preferences</h1>
                <FormField
                  control={form.control}
                  name="diefPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your diet preference?</FormLabel>
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
                          <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="Non-Vegetarian">
                            Non-Vegetarian
                          </SelectItem>
                          <SelectItem value="Vegan">Vegan</SelectItem>
                          <SelectItem value="Eggetarian">Eggetarian</SelectItem>
                          <SelectItem value="Jain">
                            Jain (no root vegetables)
                          </SelectItem>
                          <SelectItem value="Sattvik">
                            Sattvik (no onion/garlic)
                          </SelectItem>
                          <SelectItem value="others">
                            Others (please specify)
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify the diet preference
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("diefPreference") === "others" && (
                  <FormField
                    control={form.control}
                    name="otherDietPreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Please specify the diet preference
                        </FormLabel>
                        <Input {...field} />
                        <FormDescription>
                          Please specify the other diet preference
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="dietPrasadam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Do you observe diet prasadam (food offered to the Lord)?
                      </FormLabel>
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
                          <SelectItem value="Strictly Observe Prasadam">
                            Strictly Observe Prasadam
                          </SelectItem>
                          <SelectItem value="Occasionally Observe Prasadam">
                            Occasionally Observe Prasadam
                          </SelectItem>
                          <SelectItem value="Only at the temple">
                            Only at the temple
                          </SelectItem>
                          <SelectItem value="Not Familiar With Prasadam System">
                            Not Familiar With Prasadam System
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify if you observe diet prasadam
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h1 className="text-xl">Spiritual Values and Lifestyle</h1>

                <FormField
                  control={form.control}
                  name="spiritualCommitment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How committed are you to your spiritual practices?
                      </FormLabel>
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
                          <SelectItem value="Fully Committed">
                            Fully Committed
                          </SelectItem>
                          <SelectItem value="Mostly Committed">
                            Mostly Committed
                          </SelectItem>
                          <SelectItem value="Somewhat Committed">
                            Somewhat Committed
                          </SelectItem>
                          <SelectItem value="Not Committed">
                            Not Committed
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify the spiritual commitment
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adherenceToRegulativePrinciples"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Adherence to the four regulative principles: no meat
                        eating. no gambling, no illicit sex, no intoxication
                      </FormLabel>
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
                          <SelectItem value="Strictly Adhere to All Four Principles">
                            Strictly Adhere to All Four Principles
                          </SelectItem>
                          <SelectItem value="Adhere to Some of the Principles">
                            Adhere to Some of the Principles
                          </SelectItem>
                          <SelectItem value="Occasionally Follow the Principles">
                            Occasionally Follow the Principles
                          </SelectItem>
                          <SelectItem value="Do Not Follow Any of the Principles">
                            Do Not Follow Any of the Principles
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify the adherence to regulative principles
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h1>Connection to ISKCON Community</h1>

                <FormField
                  control={form.control}
                  name="involvementInTempleActivities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How involved are you in temple activities?
                      </FormLabel>
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
                          <SelectItem value="Fully Involved">
                            Fully Involved
                          </SelectItem>
                          <SelectItem value="Mostly Involved">
                            Mostly Involved
                          </SelectItem>
                          <SelectItem value="Somewhat Involved">
                            Somewhat Involved
                          </SelectItem>
                          <SelectItem value="Not Involved">
                            Not Involved
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify the involvement in temple activities
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="participationInSpiritualPrograms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How often do you participate in spiritual programs?
                      </FormLabel>
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
                          <SelectItem value="Actively Participate">
                            Actively Participate
                          </SelectItem>
                          <SelectItem value="Occasionally Participate">
                            Occasionally Participate
                          </SelectItem>
                          <SelectItem value="Interested but Haven't Participated Yet">
                            Interested but Haven't Participated Yet
                          </SelectItem>
                          <SelectItem value="Not Interested">
                            Not Interested
                          </SelectItem>
                          <SelectItem value="Not Aware of Such Group">
                            Not Aware of Such Group
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify the participation in spiritual programs
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h1>Service and Seva</h1>

                <FormField
                  control={form.control}
                  name="willingnessForService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        How willing are you to engage in service and seva?
                      </FormLabel>
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
                          <SelectItem value="Willing and Actively Engaged in Seva">
                            Willing and Actively Engaged in Seva
                          </SelectItem>
                          <SelectItem value="Willing but Not Yet Engaged in Seva">
                            Willing but Not Yet Engaged in Seva
                          </SelectItem>
                          <SelectItem value="Unsure or Undecided about Engaging in Seva">
                            Unsure or Undecided about Engaging in Seva
                          </SelectItem>
                          <SelectItem value="Not Willing to Engage in Seva">
                            Not Willing to Engage in Seva
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify the willingness for service
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serviceInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Interest in specific areas of service, such as deity
                        worship, book distribution, or outreach programs
                      </FormLabel>
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
                          <SelectItem value="Interested and Actively Involved">
                            Interested and Actively Involved
                          </SelectItem>
                          <SelectItem value="Interested but Not Actively Involved Yet">
                            Interested but Not Actively Involved Yet
                          </SelectItem>
                          <SelectItem value="Open to Any Service Provided">
                            Open to Any Service Provided
                          </SelectItem>
                          <SelectItem value="Not Interested in Any Specific Areas of Service">
                            Not Interested in Any Specific Areas of Service
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify the service interest
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h1 className="text-xl">Cultural Background</h1>

                <FormField
                  control={form.control}
                  name="connectionCulture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Connection to Vaishnava culture</FormLabel>
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
                          <SelectItem value="North Indian Vaishnav">
                            North Indian Vaishnav
                          </SelectItem>
                          <SelectItem value="South Indian Vaishnav">
                            South Indian Vaishnav
                          </SelectItem>
                          <SelectItem value="East Indian Vaishnav">
                            East Indian Vaishnav
                          </SelectItem>
                          <SelectItem value="West Indian Vaishnav">
                            West Indian Vaishnav
                          </SelectItem>
                          <SelectItem value="Vaishnav Irrespective of Location">
                            Vaishnav Irrespective of Location
                          </SelectItem>
                          <SelectItem value="Not connected to Vaishnava culture">
                            Not connected to Vaishnava culture
                          </SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify the connection culture
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("connectionCulture") === "others" && (
                  <FormField
                    control={form.control}
                    name="otherConnectionCulture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Please specify the connection culture
                        </FormLabel>
                        <Input {...field} />
                        <FormDescription>
                          Please specify the other connection culture
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="understandingIskcon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Understanding of ISKCON</FormLabel>
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
                          <SelectItem value="Deep Understanding and Strict Adherence">
                            Deep Understanding and Strict Adherence
                          </SelectItem>
                          <SelectItem value="Deep Understanding and Some Adherence">
                            Deep Understanding and Some Adherence
                          </SelectItem>
                          <SelectItem value="Moderate Understanding and Strict Adherence">
                            Moderate Understanding and Strict Adherence
                          </SelectItem>
                          <SelectItem value="Moderate Understanding and Some Adherence">
                            Moderate Understanding and Some Adherence
                          </SelectItem>
                          <SelectItem value="Familiar with Customs and Etiquette but Not Strictly Adherent">
                            Familiar with Customs and Etiquette but Not Strictly
                            Adherent
                          </SelectItem>
                          <SelectItem value="Not Familiar with Customs and Etiquette">
                            Not Familiar with Customs and Etiquette
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify the understanding of ISKCON
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="commitmentReadiness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Personal commitment to Marriage and Family Life
                      </FormLabel>
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
                          <SelectItem value="Fully Ready and Committed">
                            Fully Ready and Committed
                          </SelectItem>
                          <SelectItem value="Mostly Ready and Committed">
                            Mostly Ready and Committed
                          </SelectItem>
                          <SelectItem value="Considering it but Unsure">
                            Considering it but Unsure
                          </SelectItem>
                          <SelectItem value="Not Ready or Committed">
                            Not Ready or Committed
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify the commitment readiness
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="childrenWillingness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Willingness to have children and raise them in ISKCON
                        culture
                      </FormLabel>
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
                          <SelectItem value="Completely Willing and Prepared">
                            Completely Willing and Prepared
                          </SelectItem>
                          <SelectItem value="Willing but Need Guidance">
                            Willing but Need Guidance
                          </SelectItem>
                          <SelectItem value="Considering it but Uncertain">
                            Considering it but Uncertain
                          </SelectItem>
                          <SelectItem value="Not Willing to Raise Children in Such an Environment">
                            Not Willing to Raise Children in Such an Environment
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormDescription>
                        Please specify the children willingness
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {[
                  "Completely Willing and Prepared",
                  "Willing but Need Guidance",
                  "Considering it but Uncertain",
                ].includes(form.watch("childrenWillingness") ?? "") && (
                  <FormField
                    control={form.control}
                    name="chilrenEducation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What are your preferences for your child's education?
                        </FormLabel>
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
                            <SelectItem value="Homeschooling">
                              Homeschooling{" "}
                            </SelectItem>
                            <SelectItem value="ISKCON Gurukul">
                              ISKCON Gurukul
                            </SelectItem>
                            <SelectItem value="Any other Spiritual Gurukul">
                              Any other Spiritual Gurukul
                            </SelectItem>
                            <SelectItem value="Normal School">
                              Normal School
                            </SelectItem>
                            <SelectItem value="Not Decided Yet">
                              Not Decided Yet
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormDescription>
                          Please specify the children education
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}
          </>
        )}

        <FormField
          control={form.control}
          name="willingnessToSupport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Willingess to support and participate in each other's spiritual
                growth
              </FormLabel>
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
              <FormDescription>
                Please specify the willingness to support
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="importanceOfSpirituality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Importance of spirituality in your life</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Nil">Nil</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Please specify the importance of spirituality
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
