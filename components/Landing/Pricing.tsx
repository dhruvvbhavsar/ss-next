import { CheckIcon } from "lucide-react";
import { QR } from "./Payment";
import { getPageSession } from "@/lib/lucia";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import a from "@/public/anand.jpeg";
import s from "@/public/sachin.jpeg";
import { ScrollArea } from "../ui/scroll-area";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="col-span-full text-2xl font-bold mb-4">Marriage Counsellors</h2>
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
                <CardFooter className="flex justify-center">
                  {/* <span className="text-xl font-semibold">₹500</span> */}
                  <BioDialog astroData={a} />
                </CardFooter>
              </Card>
            );
          })}
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
  astro: [
    {
      name: "Sachin Saxena",
      url: s.src,
      description:
        "Born into a pious Hindu family, Sachin Saxena is not your typical astrologer. His journey into the ocean of astrology began with the visit of a saint to his childhood home—an encounter that ignited a lifelong fascination with the mysteries of the cosmos. In pursuit of the art and science of astrology, Sachin has ventured beyond the conventional, breaking stereotypes along the way.",
    },

    {
      name: "Anand Vardhan",
      url: a.src,
      description:
        "Prof. Abhijeet Rane, hailing from a devout Hindu family, has delved into the intricate realms of Vedic Astrology. Guided by revered astrologers and the benevolence of Lord Krishna, he has honed his skills. His expertise lies in Birth Time Rectification, a crucial factor for precise astrological predictions, meticulously crafted using birth details.",
    },
  ],
};

const anand = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Prof. Abhijeet Rane: The Vedic Astrologer
      </h1>
      <p className="text-lg text-center mb-8">
        BE, M. Tech (CAD/CAM & Robotics)
      </p>
      <div className="prose lg:prose-xl">
        <section>
          <h2 className="text-2xl font-bold mb-4">Shubh Muhurt</h2>
          <p className="mb-4">
            Shubh Muhurt ensures that your endeavors are aligned with the most
            auspicious cosmic energies for the following auspicious events:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              Stepping into your new home, the <em>Grah Pravesh</em>,
            </li>
            <li>
              Breaking ground on a property as the stars align to bless the
              foundations.
            </li>
            <li>Purchasing of Vehicle</li>
            <li>Marriage & Engagement.</li>
          </ul>
          <p className="mb-4">
            It's a moment in time that is impeccably aligned with the cosmos, a
            golden window where the planets themselves seem to hum in harmony,
            ensuring the most auspicious beginning for any venture.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Nadi Astrology</h2>
          <p className="mb-4">
            Through Nadi Astrology Abhijeet ensures that auspicious cosmic
            energies align with significant life events. Whether it’s stepping
            into a new home, breaking ground on a property, purchasing a
            vehicle, or celebrating a marriage or engagement, Shubh Muhurt
            ensures an auspicious beginning.
          </p>
          <p className="mb-4">
            Abhijeet offers enlightening insights through personalized horoscope
            readings. Nadi Astrology, renowned for its precision and depth,
            reveals intricate planetary positions at the time of your birth.
            These insights are further validated through Palmistry and Vedic
            Numerology. Additionally, his knowledge of Medical Astrology
            provides pre-emptive insights into an individual’s health.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Kundali Milan (Matrimonial Matchmaking)
          </h2>
          <p className="mb-4">
            In Holistic Astrology, Abhijeet believes in a comprehensive and
            detailed approach to Kundli analysis, focusing on critical aspects
            that lay the foundation for a happy and lasting partnership.
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              The Longevity and Robust Health of the prospective partners,
              essential elements for a lasting relationship.
            </li>
            <li>
              Nature - a deep understanding and benevolent disposition are key
              to navigating the ebb and flow of married life.
            </li>
            <li>
              The horoscope's influence on Childbearing Prospects is
              meticulously analyzed, ensuring the couple's desires for family
              life are aligned with celestial blessings.
            </li>
            <li>
              Character and Personality hold paramount importance in our
              assessments.
            </li>
            <li>
              Additionally, the prospects of Professional Success and Financial
              Stability are closely examined, recognizing their role in
              providing a secure and prosperous environment for the couple.
            </li>
          </ul>
          <p className="mb-4">
            In essence, Abhijeet’s approach is to combine ancient wisdom with
            contemporary insights, ensuring a harmonious blend of tradition and
            modernity to guide couples towards a joyful and prosperous married
            life.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Abhijeet’s areas of expertise:
          </h2>
          <ul className="list-disc pl-8 mb-4">
            <li>Bhrigu Nandi Nadi Jyotish</li>
            <li>Parashari Jyotish</li>
            <li>Prashna Jyotish (Horary Astrology)</li>
            <li>Vedic Ankh Jyotish (Vedic Numerology)</li>
            <li>Hast Rekha Shastra (Palmistry)</li>
            <li>Krishnamurti Paddhati Jyotish</li>
            <li>Ramal Vidya</li>
            <li>Vedic Cards</li>
            <li>Tarot Card Reading</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

const sachin = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Sachin Saxena: The Unconventional Astrologer
      </h1>
      <p className="text-lg text-center mb-8">
        Breaking Stereotypes, Illuminating Paths
      </p>
      <div className="prose lg:prose-xl">
        <section>
          <h2 className="text-2xl font-bold mb-4">Ethical Foundation</h2>
          <p className="mb-4">
            His consultations are more than just readings; they are a journey to
            the root causes of the challenges faced by his clients. The ethical
            foundation Sachin upholds in his practice is deeply rooted in the
            values instilled by his loving parents. Their influence is not just
            seen in his consultations; it's the compass guiding his journey in
            this profound realm.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Diverse Expertise</h2>
          <p className="mb-4">
            Beyond astrology, Sachin is an Akashic Records Reader, Reiki Healer,
            and a Spiritual Guide to individuals scattered across the globe. His
            knowledge has touched the lives of business leaders, young
            professionals, married couples, and children alike.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Bespoke Consultations</h2>
          <p className="mb-4">
            Sachin's Kundali (Chart) readings transcend the surface, delving
            into the intricacies of the birth chart. Each consultation is a
            bespoke experience, providing tailored guidance to unveil the unique
            tapestry of your life.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Mission and Beliefs</h2>
          <p className="mb-4">
            He credits his success in astrology to the blessings of his Gurus
            and the mercy of Supreme God. He firmly believes that through
            astrology, we tap into the wisdom of the universe, gaining insights
            to make informed decisions and embrace our true potential. Sachin's
            mission is to decode the language of the Nakshatras
            (Constellations), aligning our lives with the cosmic map we were
            born under.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Kundali Milan (Matrimonial Matchmaking)
          </h2>
          <p className="mb-4">
            In Kundali Milan (Matrimonial Matchmaking), Sachin considers the
            following critical aspects while matching the Kundalis:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>
              Overall personalities of both (prospective bride and groom) and
              their emotional compatibility
            </li>
            <li>Compatibility on aspects like marital bliss and childbirth</li>
            <li>Dasha (time period) of both and timing of marriage</li>
            <li>
              Influence of certain planets like Mars, Venus, and House denoting
              marriage in a Kundali
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

const BioDialog = ({ astroData }:{astroData: any}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Read More</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <ScrollArea className="h-[800px]">
            {astroData.name === 'Anand Vardhan' ? anand() : sachin()}
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

