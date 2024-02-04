import { Separator } from "@/components/ui/separator";
import PersonalDetails from "./Personal";

export default async function DetailedForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Personal Details</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about yourself
        </p>
      </div>
      <Separator />
      <PersonalDetails />
    </div>
  );
}
