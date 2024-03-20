"use client";
import logo from "@/public/logo.png";
import React from "react";
import { ChevronDownCircle, Menu, X } from "lucide-react";

const Hero = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <header className="back h-screen">
        <nav className="container relative flex items-center justify-between px-6 py-4 mx-auto text-white">
          <a href="/">
            <img src={logo.src} width="60px" alt="" />
          </a>

          <button className="md:hidden">
            {open ? (
              <X onClick={() => setOpen(!open)} />
            ) : (
              <Menu onClick={() => setOpen(!open)} />
            )}
          </button>

          <div
            className={`${
              open
                ? "translate-x-0 opacity-100 "
                : "opacity-0 -translate-x-full"
            } absolute font-mono font-black inset-x-0 z-30 px-4 py-8 mt-4 space-y-6 transition-all duration-300 ease-in-out bg-red-900 rounded-md top-16 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:space-y-0 md:-mx-6 md:flex md:items-center`}
          >
            <a
              href="/"
              className="block text-white transition-colors duration-300 md:px-6 hover:text-red-300"
            >
              Home
            </a>
            <a
              href="#about"
              className="block text-white transition-colors duration-300 md:px-6 hover:text-red-300"
            >
              About Us
            </a>
            <a
              href="/pricing"
              className="block text-white transition-colors duration-300 md:px-6 hover:text-red-300"
            >
              Pricing
            </a>
            <a
              href="#features"
              className="block text-white transition-colors duration-300 md:px-6 hover:text-red-300"
            >
              Features
            </a>
            {/* <a
              href="#testimonials"
              className="block text-white transition-colors duration-300 md:px-6 hover:text-red-300"
            >
              Testimonials
            </a> */}
            <a
              href="#blogs"
              className="block text-white transition-colors duration-300 md:px-6 hover:text-red-300"
            >
              Blog
            </a>
            <a
              href="#faqs"
              className="block text-white transition-colors duration-300 md:px-6 hover:text-red-300"
            >
              FAQs
            </a>
            {/* <a
              href="/auth/login"
              className="block text-white transition-colors duration-300 md:px-6 hover:text-red-300"
            >
              Sign In
            </a>
            <a
              href="/auth/register"
              className="block text-white transition-colors duration-300 md:px-6 hover:text-red-300"
            >
              Register
            </a> */}
          </div>
        </nav>

        <section>
          <div className="relative grid w-full h-96 lg:h-[32rem] place-items-center">
            <div className="flex flex-col items-center mx-auto text-center">
              <h1 className="text-4xl font-semibold text-white uppercase md:text-6xl font-serif">
                Shubh Sambandh
              </h1>

              <p
                className="mt-6 text-lg sm:text-2xl leading-5 text-white"
                id="sub-heading"
              >
                Uniting Hearts, With Purpose
              </p>

              <div className="flex gap-2">
                <a
                  href="/auth/register"
                  className="border-2 text-2xl rounded-lg bg-white mt-8 py-2 w-40"
                >
                  Register
                </a>

                <a
                  href="/auth/login"
                  className="border-2 text-2xl rounded-lg bg-white mt-8 py-2 w-40"
                >
                  Login
                </a>
              </div>

              <a href="#about">
                <ChevronDownCircle
                  size={32}
                  className="text-white mt-8 cursor-pointer animate-bounce"
                />
              </a>
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Hero;
