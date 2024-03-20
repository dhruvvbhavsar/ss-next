import { CheckIcon } from "lucide-react";
import { QR } from "./Payment";
import { getPageSession } from "@/lib/lucia";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function Pricing() {
  let session = await getPageSession();
  const { firstName, lastName, email, mobile } = session.user;
  return (
    <div key="1" className="text-white py-12 px-4 bg-red-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Simple, transparent pricing</h1>
        <p className="text-xl mb-12">
          Get started on our free plan and upgrade when you are ready.
        </p>
        <div className="bg-zinc-50 text-black p-6 rounded-lg flex justify-between items-center mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">
              What's included in the PRO plan
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
            {session.user.isPaid && (
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
              <QR email={email} name={firstName+ ' ' + lastName} mobile={mobile} />
            )}
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="col-span-full text-2xl font-bold mb-4">Add ons</h2>
          {data.astro.map((a, i) => {
            return (
              <Card key={i} className="w-full">
                <CardHeader>
                  <CardTitle>{a.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    alt="Additional Users"
                    className="  object-contain h-48 object-center w-full  mb-4"
                    src={a.url}
                  />
                  <CardDescription>{a.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-xl font-semibold">₹500</span>
                  <Button>Buy</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div> */}
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
  astro: [
    {
      name: "Ravi Jyotishi",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnWP1CpBVFC7l0ES7S5D7tUsmu-gfZdfu0Kw&usqp=CAU",
      description:
        "Ravi is a renowned Indian astrologer, well-versed in Vedic astrology. His predictions, rooted in ancient Indian traditions, provide spiritual insights and guidance for a harmonious life journey.",
    },
    {
      name: "Priya Nakshatra",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnqzWHgXAw-W6-EGfXq-ArISp8_vbcA_reqw&usqp=CAU",
      description:
        "Priya, a skilled astrologer in Indian classical astrology, specializes in nakshatra analysis. Her readings unfold the cosmic story of individuals, helping them align with their destinies.",
    },
    {
      name: "Guru Bhaskar",
      url: "https://img.etimg.com/thumb/msid-93827549,width-1200,height-900,imgsize-45932,resizemode-8,quality-100/news/india/the-humble-astrologer-has-gone-online-and-is-thriving.jpg",
      description:
        "Guru Bhaskar, a Vastu and Jyotish expert, combines the principles of Vedic astrology with spatial energies. His holistic approach aims at creating balance and positive vibrations in personal and living spaces.",
    },
  ],
};
