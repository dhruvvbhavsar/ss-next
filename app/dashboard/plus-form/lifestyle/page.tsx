import { Separator } from "@/components/ui/separator";
import LifestyleDetails from "./Lifestyle";

export default async function DetailedForm() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Lifestyle Details</h3>
          <p className="text-sm text-muted-foreground">
            Tell us about your lifestyle
          </p>
        </div>
        <Separator />
        <LifestyleDetails />
      </div>
    );
  }