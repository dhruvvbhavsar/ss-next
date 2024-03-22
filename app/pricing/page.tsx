import Footer from "@/components/Landing/Footer";
import Pricing from "@/components/Landing/Pricing";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Pricing />
      <Footer />
    </Suspense>
  );
}
