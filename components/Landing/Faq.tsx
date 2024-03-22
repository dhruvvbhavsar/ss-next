"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="bg-red-900" id="faqs">
      <div className="container px-6 py-12 mx-auto">
        <h1 className="text-2xl font-semibold lg:text-3xl text-white">FAQs</h1>
        <Accordion type="single" collapsible className="w-full mt-4">
          {faq.map((f) => {
            return (
              <AccordionItem key={f.question} value={f.question}>
                <AccordionTrigger className="text-xl text-left font-semibold text-white">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-white">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;

const faq = [
  {
    question: "What is Shubh Sambandh?",
    answer:
      "Shubh Sambandh is an online platform designed to help individuals find their ideal life partners for marriage. It provides a convenient and secure way to connect with potential matches and build meaningful relationships.",
  },
  {
    question: "How does Shubh Sambandh work?",
    answer:
      "Shubh Sambandh operates as a matchmaking service, utilizing advanced algorithms to suggest compatible matches based on users' preferences and compatibility factors. Users can create profiles, search for potential partners, and communicate with them through secure messaging.",
  },
  {
    question: "Is Shubh Sambandh only for arranged marriages?",
    answer:
      "No, Shubh Sambandh caters to individuals seeking both arranged marriages and love marriages. Our platform respects the diverse preferences and choices of users, allowing them to find partners according to their own preferences.",
  },
  {
    question: "Is Shubh Sambandh available globally?",
    answer:
      "Yes, Shubh Sambandh is accessible worldwide. We have a wide user base from various countries and cultures, providing users with the opportunity to connect with potential partners from different parts of the world.",
  },
  {
    question: "How do I create a profile on Shubh Sambandh?",
    answer:
      "To create a profile on Shubh Sambandh, simply visit our website and sign up using your email or social media account. Fill in the required details, such as personal information, partner preferences, and add photos to enhance your profile. Once completed, you can start exploring potential matches.",
  },
];
