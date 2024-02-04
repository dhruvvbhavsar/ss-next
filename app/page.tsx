import About from "@/components/Landing/About";
import Blog from "@/components/Landing/Blog";
import FAQ from "@/components/Landing/Faq";
import Features from "@/components/Landing/Features";
import Footer from "@/components/Landing/Footer";
import Hero from "@/components/Landing/Hero";
import Pricing from "@/components/Landing/Pricing";

const Page = () => {
  return (
    <>
    <Hero />
	  <About />
	  <Features />
	  <Blog />
	  <FAQ />
	  <Footer />
    </>
  );
};

export default Page;
