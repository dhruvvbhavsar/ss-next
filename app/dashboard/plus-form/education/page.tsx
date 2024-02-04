import { Separator } from "@/components/ui/separator";
import EducationalDetails from "./Education";

export default async function DetailedForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Educational Details</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your educational life
        </p>
      </div>
      <Separator />
      <EducationalDetails />
    </div>
  );
}
