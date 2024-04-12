import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import a from "@/public/anand.jpeg";
import s from "@/public/sachin.jpeg";
import { ScrollArea } from "../ui/scroll-area";

const data = {
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

export default function Astrologers() {
  return (
    <div id="astro" className="bg-white py-4 rounded-lg container  mt-8">
      <h2 className="text-4xl font-bold mb-4">
        Meet Our Astrologers
      </h2>
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-4">
        {data.astro.map((a, i) => {
          return (
            <Card key={i} className="max-w-lg">
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
                <BioDialog astroData={a} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const BioDialog = ({ astroData }: { astroData: any }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Read More</Button>
      </DialogTrigger>
      <DialogContent className="h-5/6 sm:max-w-6xl">
        <ScrollArea className="h-full">
          {astroData.name === "Anand Vardhan" ? anand() : sachin()}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
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
        <section>
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <ul className="list-disc pl-8 mb-4">
            <li>
              Basic kundali matching (per match) -{" "}
              <span className="font-semibold">₹</span>800
            </li>
            <li>
              Longevity & Health Prediction (per match) -{" "}
              <span className="font-semibold">₹</span>500
            </li>
            <li>
              Nature, Character and Personality compatibility Prediction (per
              match) - <span className="font-semibold">₹</span>500
            </li>
            <li>
              Childbearing Prospects (per match) -{" "}
              <span className="font-semibold">₹</span>500
            </li>
            <li>
              Predictions of Professional Success and Financial Stability (per
              match) -<span className="font-semibold">₹</span>500
            </li>
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
        <section>
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="grid grid-cols-2 mb-4">
            <p>
              Whole package, including:
              <ol className="list-decimal text-sm pl-4">
                <li>
                  Overall personalities and couple’s emotional compatibility
                </li>
                <li>Compatibility aspects of marital bliss and childbirth</li>
                <li>Dasha (time period) and timing of marriage</li>
                <li>
                  Analysis of certain planets like Mars, Venus, and House
                  denoting marriage in a Kundali
                </li>
              </ol>
            </p>
            <div className="self-center text-right">
              <span className="font-semibold text-lg">₹2000/-</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
