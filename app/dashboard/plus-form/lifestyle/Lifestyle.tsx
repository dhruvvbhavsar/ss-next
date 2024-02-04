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
import { ScrollArea } from "@/components/ui/scroll-area";
import { hobbies, sportslist } from "@/options";
import { toast } from "sonner";

const lifestyleSchema = z
  .object({
    hobbies: z.array(z.string(), {
      required_error: "Please select at least one hobby",
    }),
    sports: z.array(z.string(), {
      required_error: "Please select at least one sport",
    }),
    doYouExercise: z.string({
      required_error: "Please select if you exercise",
    }),
    otherExercise: z.string().optional(),
    whoDoYouLiveWith: z.string({
      required_error: "Please select who you live with",
    }),
    othersWhoLiveWith: z.string().optional(),
    afterMarriagePlans: z.string({
      required_error: "Please select your plans after marriage",
    }),
    otherAfterMarriagePlans: z.string().optional(),
  })
  .refine((data) => {
    if (data.doYouExercise && !data.otherExercise) {
      throw new ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: "Please specify the exercise you do",
          path: ["otherExercise"],
        },
      ]);
    }

    if (data.whoDoYouLiveWith === "others" && !data.othersWhoLiveWith) {
      throw new ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: "Please specify who you live with",
          path: ["othersWhoLiveWith"],
        },
      ]);
    }

    if (data.afterMarriagePlans === "others" && !data.otherAfterMarriagePlans) {
      throw new ZodError([
        {
          code: z.ZodIssueCode.custom,
          message: "Please specify your plans after marriage",
          path: ["otherAfterMarriagePlans"],
        },
      ]);
    }
    return true;
  });

export default function LifestyleDetails() {
  const form = useForm<z.infer<typeof lifestyleSchema>>({
    resolver: zodResolver(lifestyleSchema),
  });

  function onSubmit(values: z.infer<typeof lifestyleSchema>) {
    console.log(values);
    toast.success("Saved");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="sports"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>
                  What sports do you play or are interested in?
                </FormLabel>
                <FormDescription>
                  Please select at least one sport
                </FormDescription>
              </div>
              <ScrollArea className="h-32">
                {sportslist.map((s) => (
                  <FormField
                    key={s}
                    control={form.control}
                    name="sports"
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
          name="hobbies"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>
                  What hobbies do you have or are interested in?
                </FormLabel>
                <FormDescription>
                  Please select at least one hobby
                </FormDescription>
              </div>
              <ScrollArea className="h-32">
                {hobbies.map((s) => (
                  <FormField
                    key={s}
                    control={form.control}
                    name="hobbies"
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
          name="doYouExercise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you exercise?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Yes, regularly">Yes, regularly</SelectItem>
                  <SelectItem value="Yes, occasionally">
                    Yes, occasionally
                  </SelectItem>
                  <SelectItem value="No, but I plan to start">
                    No, but I plan to start
                  </SelectItem>
                  <SelectItem value="No, and I don't intend to start">
                    No, and I don't intend to start
                  </SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>

              <FormDescription>If yes, please specify</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("doYouExercise") === "others" && (
          <FormField
            control={form.control}
            name="otherExercise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please specify the exercise you do
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="whoDoYouLiveWith"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who do you live with?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="With Parents">With Parents</SelectItem>
                  <SelectItem value="With Siblings">With Siblings</SelectItem>
                  <SelectItem value="With Extended Family">
                    With Extended Family
                  </SelectItem>
                  <SelectItem value="Alone/Independently">
                    Alone/Independently
                  </SelectItem>
                  <SelectItem value="With Roommates/Flatmates/PG">
                    With Roommates/Flatmates/PG
                  </SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                If others, please specify who you live with
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("whoDoYouLiveWith") === "others" && (
          <FormField
            control={form.control}
            name="othersWhoLiveWith"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please specify who you live with
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="afterMarriagePlans"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are your plans after marriage?</FormLabel>
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
                If others, please specify your plans after marriage
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("afterMarriagePlans") === "others" && (
          <FormField
            control={form.control}
            name="otherAfterMarriagePlans"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Please specify</FormLabel>
                <Input {...field} />
                <FormDescription>
                  Please specify your plans after marriage
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
