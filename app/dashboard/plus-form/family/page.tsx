import { Separator } from "@/components/ui/separator";
import FamilyDetails from "./Family";
export default async function DetailedForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Family Details</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your family
        </p>
      </div>
      <Separator />
      <FamilyDetails />
    </div>
  );
}
