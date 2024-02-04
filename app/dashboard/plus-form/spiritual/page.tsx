import { Separator } from "@/components/ui/separator";
import SpiritualDetails from "./Spiritual";
export default async function DetailedForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Spiritual Details</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your spiritual beliefs
        </p>
      </div>
      <Separator />
      <SpiritualDetails />
    </div>
  );
}
