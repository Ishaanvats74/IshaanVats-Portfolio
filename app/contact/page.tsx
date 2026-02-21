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
        "YOUR_SERVICE_ID", // replace
        "YOUR_TEMPLATE_ID", // replace
        form.current!,
        "YOUR_PUBLIC_KEY", // replace
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
      <div className="pt-32">
        <Navbar/>
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              Get In{" "}
              <span className="bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-sky-500/40 transition-all duration-300"
            >
              <form
                ref={form}
                onSubmit={sendEmail}
                className="flex flex-col gap-6"
              >
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  required
                  className="bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition"
                />

                <input
                  type="email"
                  name="from_email"
                  placeholder="Your Email"
                  required
                  className="bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition"
                />

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition"
                />

                <button
                  type="submit"
                  className="cursor-pointer px-6 py-3 rounded-lg bg-linear-to-r from-sky-500 to-blue-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-sky-500/20"
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
  className="flex flex-col gap-8"
>
  {/* EMAIL */}
  <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
    <h3 className="text-xl font-semibold mb-4">Email</h3>
    <Link
      href="https://mail.google.com/mail/?view=cm&fs=1&to=404ishaan@gmail.com"
      rel="noopener noreferrer"
      target="_blank"
      className="text-sky-400 hover:underline"
    >
      404ishaan@gmail.com
    </Link>
  </div>

  {/* LINKEDIN */}
  <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
    <h3 className="text-xl font-semibold mb-4">LinkedIn</h3>
    <Link
      href="https://www.linkedin.com/in/ishaan-vats-565069334/"
      rel="noopener noreferrer"
      target="_blank"
      className="text-sky-400 hover:underline"
    >
      linkedin.com/in/Ishaan-vats
    </Link>
  </div>

  {/* GITHUB */}
  <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
    <h3 className="text-xl font-semibold mb-4">GitHub</h3>
    <Link
      href="https://github.com/Ishaanvats74"
      rel="noopener noreferrer"
      target="_blank"
      className="text-sky-400 hover:underline"
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
