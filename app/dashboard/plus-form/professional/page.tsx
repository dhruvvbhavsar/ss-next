import { Separator } from "@/components/ui/separator";
import ProfessionalDetails from "./Professional";

export default async function DetailedForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Professional Details</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your professional life
        </p>
      </div>
      <Separator />
      <ProfessionalDetails />
    </div>
  );
}
