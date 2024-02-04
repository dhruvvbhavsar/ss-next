import { Separator } from "@/components/ui/separator";
import PartnerPreferences from "./Preferences";

export default async function DetailedForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Partner Preferences</h3>
        <p className="text-sm text-muted-foreground">
            Tell us about your partner preferences
        </p>
      </div>
      <Separator />
      <PartnerPreferences  />
    </div>
  );
}
