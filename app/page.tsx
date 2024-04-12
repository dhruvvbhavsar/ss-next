import About from "@/components/Landing/About";
import Blog from "@/components/Landing/Blog";
import FAQ from "@/components/Landing/Faq";
import Features from "@/components/Landing/Features";
import Footer from "@/components/Landing/Footer";
import Hero from "@/components/Landing/Hero";
import Team from "./dashboard/plus-form/spiritual/Team";
import Astrologers from "@/components/Landing/Astro";
import Media from "@/components/Landing/Media";


const members = [
  {
    name: "Sunil Thakur",
    role: "Leader",
    image: "/team/sunil.jpeg",
  },
  {
    name: "Dhruv Bhavsar",
    role: "Web Developer",
    image: "/team/dhruv.jpg",
  },
  {
    name: "Saloni Bhardwaj",
    role: "Content Writer",
    image: "/team/saloni.jpeg",
  }
];

const Page = () => {
  return (
    <div className="bg-red-900">
    <Hero />
	  <About />
	  <Features />
    <Media />
    <Team team={members} />
    <Astrologers />
	  <Blog />
	  <FAQ />
	  <Footer />
    </div>
  );
};

export default Page;
