import { Separator } from "@/components/ui/separator";
import AstrologyDetails from "./Astrology";

export default async function DetailedForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Astrology Details</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your astrology
        </p>
      </div>
      <Separator />
      <AstrologyDetails />
    </div>
  );
}
