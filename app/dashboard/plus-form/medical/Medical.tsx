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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateDetails } from "../actions";

const MedicalScema = z
  .object({
    haveMedicalCondition: z.boolean({
      required_error: "Please select an option",
    }),
    currentMedicalInfo: z.string().optional(),
    otherMedicalInfo: z.string().optional(),
    hadMedicalCondition: z.boolean({
      required_error: "Please select an option",
    }),
    previousMedicalInfo: z.string().optional(),
    otherPreviousMedicalInfo: z.string().optional(),
    takingMedication: z.boolean({ required_error: "Please select an option" }),
    howLongMedication: z.string().optional(),
  })
  .refine((data) => {
    if (data.haveMedicalCondition) {
      if (!data.currentMedicalInfo) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide information",
            path: ["currentMedicalInfo"],
          },
        ]);
      }
    }

    if (data.hadMedicalCondition) {
      if (!data.previousMedicalInfo) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide information",
            path: ["previousMedicalInfo"],
          },
        ]);
      }
    }

    if (data.takingMedication) {
      if (!data.howLongMedication) {
        throw new ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Please provide information",
            path: ["howLongMedication"],
          },
        ]);
      }
    }
    return true;
  });

const diseases = [
  "allergy",
  "chronic pain",
  "digestive disorders",
  "mental health",
  "others",
];

export default function MedicalDetails() {
  const router = useRouter();
  const form = useForm<z.infer<typeof MedicalScema>>({
    resolver: zodResolver(MedicalScema),
    defaultValues: {
      haveMedicalCondition: false,
      hadMedicalCondition: false,
      takingMedication: false,
    },
  });

  async function onSubmit(values: z.infer<typeof MedicalScema>) {
    let res = await updateDetails("medical_details",values);

    if (res) {
      toast.success("Saved");
      router.push("/dashboard/plus-form/spiritual");
    } else {
      toast.error("Error");
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="haveMedicalCondition"
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
                  Do you have any pre-existing medical disease?
                </FormLabel>
                <FormDescription>
                  If yes, please check the box and provide details
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {form.watch("haveMedicalCondition") && (
          <FormField
            control={form.control}
            name="currentMedicalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Please select from the below list any condtion/allergy that
                  applies to you
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
                    <SelectItem value="allergy">
                      Allergies (please specify in the provided text box)
                    </SelectItem>
                    <SelectItem value="asthama">Asthma</SelectItem>

                    <SelectItem value="chronic pain">
                      Chronic pain conditions (please specify in the provided
                      text box)
                    </SelectItem>
                    <SelectItem value="diabetes">Diabetes</SelectItem>
                    <SelectItem value="digestive disorders">
                      Digestive disorders (please specify in the provide text
                      box)
                    </SelectItem>
                    <SelectItem value="epilepsy">Epilepsy</SelectItem>
                    <SelectItem value="high blood pressure">
                      High Blood Pressure{" "}
                    </SelectItem>
                    <SelectItem value="heart disease">
                      Heart disease{" "}
                    </SelectItem>
                    <SelectItem value="mental health">
                      Mental health conditions (please specify in the provided
                      text box)
                    </SelectItem>
                    <SelectItem value="thyroid disorders">
                      Thyroid disorders
                    </SelectItem>
                    <SelectItem value="others">
                      Others (please specify)
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormDescription>
                  If you have any other medical condition, please provide
                  details
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {diseases.includes(form.watch("currentMedicalInfo") ?? "") && (
          <FormField
            control={form.control}
            name="otherMedicalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>your pre-existing disease</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please specify your pre-existing disease
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="hadMedicalCondition"
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
                  Did you have any medical condition in the past that is now
                  completely cured?
                </FormLabel>
                <FormDescription>
                  If yes, please check the box and provide details
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {form.watch("hadMedicalCondition") && (
          <FormField
            control={form.control}
            name="previousMedicalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Please select from the below list any condtion/allergy that
                  applies to you
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
                    <SelectItem value="allergy">
                      Allergies (please specify in the provided text box)
                    </SelectItem>
                    <SelectItem value="asthama">Asthma</SelectItem>

                    <SelectItem value="chronic pain">
                      Chronic pain conditions (please specify in the provided
                      text box)
                    </SelectItem>
                    <SelectItem value="diabetes">Diabetes</SelectItem>
                    <SelectItem value="digestive disorders">
                      Digestive disorders (please specify in the provide text
                      box)
                    </SelectItem>
                    <SelectItem value="epilepsy">Epilepsy</SelectItem>
                    <SelectItem value="high blood pressure">
                      High Blood Pressure{" "}
                    </SelectItem>
                    <SelectItem value="heart disease">
                      Heart disease{" "}
                    </SelectItem>
                    <SelectItem value="mental health">
                      Mental health conditions (please specify in the provided
                      text box)
                    </SelectItem>
                    <SelectItem value="thyroid disorders">
                      Thyroid disorders
                    </SelectItem>
                    <SelectItem value="others">
                      Others (please specify)
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormDescription>
                  If you have any other medical condition, please provide
                  details
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {diseases.includes(form.watch("previousMedicalInfo") ?? "") && (
          <FormField
            control={form.control}
            name="otherPreviousMedicalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify about your condition</FormLabel>
                <Input {...field} />
                <FormDescription>Please specify</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="takingMedication"
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
                  Are you currently taking any medications for the
                  treatment/management of any disease?
                </FormLabel>
                <FormDescription>
                  If yes, please check the box and provide details
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {form.watch("takingMedication") && (
          <FormField
            control={form.control}
            name="howLongMedication"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Please select from the below list any condtion/allergy that
                  applies to you
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
                    <SelectItem value="<3 months">{"<3 months"}</SelectItem>
                    <SelectItem value="3-6 months">{"3-6 months"}</SelectItem>
                    <SelectItem value="6-12 months">{"6-12 months"}</SelectItem>
                    <SelectItem value=">1 year">{">1 year"}</SelectItem>
                    <SelectItem value=">3 years">{">3 years"}</SelectItem>
                    <SelectItem value=">5 years">{">5 years"}</SelectItem>
                  </SelectContent>
                </Select>

                <FormDescription>
                  If you have any other medical condition, please provide
                  details
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
