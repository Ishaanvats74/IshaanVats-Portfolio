"use client";

import { motion } from "motion/react";

const Page = () => {
  return (
    <div className="relative min-h-screen text-white bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Glow (Same as Home) */}
      <div className="absolute -top-50 -left-50 w-125 h-125 bg-sky-500/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-50 -right-50 w-125 h-125 bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="pt-32">
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          {/* Heading */}
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

            <p className="mt-6 text-lg text-slate-400 max-w-2xl">
              Have a project idea, collaboration opportunity, or just want to
              connect? I’d love to hear from you.
            </p>
          </motion.div>

          {/* Contact Section */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-sky-500/40 transition-all duration-300"
            >
              <form className="flex flex-col gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition"
                />

                <textarea
                  placeholder="Your Message"
                  rows={5}
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

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-sky-500/40 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4">Email</h3>
                <a
                  href="mailto:ishaan.24589@sscbs.du.ac.in"
                  className="text-sky-400 hover:underline"
                >
                  ishaan.24589@sscbs.du.ac.in
                </a>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-sky-500/40 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4">LinkedIn</h3>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  linkedin.com/in/yourprofile
                </a>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-sky-500/40 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4">GitHub</h3>
                <a
                  href="https://github.com/Ishaanvats74"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  github.com/Ishaanvats74
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
