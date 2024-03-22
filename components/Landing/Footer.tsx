import logo from "@/public/logo.png";
import { Home, Mail, PhoneCall } from "lucide-react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

const Footer = () => {
  return (
    <footer className="bg-red-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="md:flex md:-mx-3 md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight md:mx-3 xl:text-2xl text-white">
            Let us end your search for marriage here.
          </h1>

          <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
            <a
              href="/Register"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm text-black duration-300 bg-white rounded-lg gap-x-3 hover:bg-red-700 hover:text-white focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              <span>Sign Up Now</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>

        <hr className="my-6 md:my-10 border-white" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <p className="font-semibold text-white">Quick Link</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="/docs/privacy"
                className=" transition-colors duration-300 text-white hover:text-red-400 hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="/docs/tnc"
                className=" transition-colors duration-300 text-white hover:text-red-400 hover:underline"
              >
                Terms and Conditions
              </a>
              <a
                href="/docs/cancellation"
                className=" transition-colors duration-300 text-white hover:text-red-400 hover:underline"
              >
                Cancellation Policy
              </a>
            </div>
          </div>

          {/* <!-- <div>
				<p className="font-semibold text-white">Industries</p>

				<div className="flex flex-col items-start mt-5 space-y-2">
					<a
						href="#"
						className=" transition-colors duration-300 text-white hover:text-red-400 hover:underline"
						>Retail & E-Commerce</a
					>
					<a
						href="#"
						className=" transition-colors duration-300 text-white hover:text-red-400 hover:underline"
						>Information Technology</a
					>
					<a
						href="#"
						className=" transition-colors duration-300 text-white hover:text-red-400 hover:underline"
						>Finance & Insurance</a
					>
				</div>
			</div>

			<div>
				<p className="font-semibold text-white">Services</p>

				<div className="flex flex-col items-start mt-5 space-y-2">
					<a
						href="#"
						className=" transition-colors duration-300 text-white hover:text-red-400 hover:underline"
						>Translation</a
					>
					<a
						href="#"
						className=" transition-colors duration-300 text-white hover:text-red-400 hover:underline"
						>Proofreading & Editing</a
					>
					<a
						href="#"
						className=" transition-colors duration-300 text-white hover:text-red-400 hover:underline"
						>Content Creation</a
					>
				</div>
			</div> --> */}

          <div>
            <p className="font-semibold text-white">Contact Us</p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <div>
                <p className="text-white flex gap-1 items-center">
                  <span>Contact Number</span>
                  <PhoneCall size={14} />
                  <SiWhatsapp size={14} />
                </p>
                <p className=" transition-colors duration-300 text-white/80 ">
                  +91 9324258593
                </p>
              </div>
              <div>
                <p className="text-white flex gap-1 items-center">
                  <span>Email</span>
                  <Mail size={14} />
                </p>
                <p className=" transition-colors duration-300 text-white/80 ">
                  care@shubhsambandh.com
                </p>
              </div>
              <div>
                <p className="text-white flex gap-1 items-center">
                  <span>Registered Office</span>
                  <Home size={14} />
                </p>
                <pre className="transition-colors duration-300 text-white/80 whitespace-pre-line">
                  49/B2, Bombay Cotton Mills, Dattaram Lad Marg, Kalachowki,
                  Mumbai: 400033, Maharashtra, India
                </pre>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 md:my-10 border-white" />

        <div className="flex flex-col items-center justify-between sm:flex-row">
          <a href="/">
            <img src={logo.src} width="60px" alt="" />
          </a>

          <p className="mt-4 text-sm sm:mt-0 text-white">
            © Copyright 2023. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
