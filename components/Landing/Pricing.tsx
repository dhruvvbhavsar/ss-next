import { CheckIcon } from "lucide-react";
import { QR } from "./Payment";
import { getPageSession } from "@/lib/lucia";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function Pricing() {
  let session = await getPageSession();
  let firstName, lastName, email, mobile;
  if (session) {
    firstName = session.user.firstName;
    lastName = session.user.lastName;
    email = session.user.email;
    mobile = session.user.mobile;
  }
  return (
    <div key="1" className="text-white py-12 px-4 bg-red-900">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-50 text-black p-6 rounded-lg flex justify-between items-center mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">
              Services included in Shubh Sambandh Plus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              {data.pro.map((d) => {
                return (
                  <div key={d} className="flex items-center">
                    <CheckIcon className="text-green-500 mr-2" />
                    <span>{d}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-center ml-6">
            <div className="text-6xl font-bold mb-2">₹500</div>
            <div className="text-gray-600 mb-4">Billed Yearly</div>
            {session && session.user.isPaid && (
              <Link
                href="/dashboard"
                className="bg-red-900 text-white p-2 rounded-sm"
              >
                Subscribed!
              </Link>
            )}
            {!session && (
              <Link href="/auth/login">
                <Button>Get Started</Button>
              </Link>
            )}
            {session && !session.user.isPaid && (
              <QR
                email={email}
                name={firstName + " " + lastName}
                mobile={mobile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const data = {
  pro: [
    "Verified Profiles",
    "Recommended Matches",
    "AI Based Match Making",
    "Unlimited Connect Requests",
    "Access too  all profiles",
  ],
};
