"use client";

import { motion } from "motion/react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import Navbar from "@/components/Navbar";

const Page = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      .then(() => {
        alert("Message Sent Successfully!");
        (e.target as HTMLFormElement).reset();
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to send message.");
      });
  };

  return (
    <div className="relative min-h-screen text-white bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <Navbar />

      <div className="pt-24 md:pt-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-20">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 md:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Get In{" "}
              <span className="bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {/* CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 sm:p-6 md:p-8 hover:border-sky-500/40 transition-all duration-300"
            >
              <form
                ref={form}
                onSubmit={sendEmail}
                className="flex flex-col gap-4 md:gap-6"
              >
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  required
                  className="bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:border-sky-500 transition"
                />

                <input
                  type="email"
                  name="from_email"
                  placeholder="Your Email"
                  required
                  className="bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:border-sky-500 transition"
                />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 text-sm md:text-base focus:outline-none focus:border-sky-500 transition resize-none"
                />

                <button
                  type="submit"
                  className="cursor-pointer px-5 py-3 text-sm md:text-base rounded-lg bg-linear-to-r from-sky-500 to-blue-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-sky-500/20"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 md:gap-8"
            >
              {/* EMAIL */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 sm:p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
                  Email
                </h3>
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=404ishaan@gmail.com"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-sky-400 text-sm md:text-base break-all hover:underline"
                >
                  404ishaan@gmail.com
                </Link>
              </div>

              {/* LINKEDIN */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 sm:p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
                  LinkedIn
                </h3>
                <Link
                  href="https://www.linkedin.com/in/ishaan-vats-565069334/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-sky-400 text-sm md:text-base break-all hover:underline"
                >
                  linkedin.com/in/Ishaan-vats
                </Link>
              </div>

              {/* GITHUB */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 sm:p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">
                  GitHub
                </h3>
                <Link
                  href="https://github.com/Ishaanvats74"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-sky-400 text-sm md:text-base break-all hover:underline"
                >
                  github.com/Ishaanvats74
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
