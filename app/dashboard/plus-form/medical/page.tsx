import { Separator } from "@/components/ui/separator";
import MedicalDetails from "./Medical";

export default async function DetailedForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Medical Details</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your medical history
        </p>
      </div>
      <Separator />
      <MedicalDetails />
    </div>
  );
}
