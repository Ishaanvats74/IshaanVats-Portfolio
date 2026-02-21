"use client";

import Navbar from "@/components/Navbar";
import { resumes } from "@/lib/constanst";
import { motion } from "motion/react";

const Page = () => {
  return (
    <div className="relative min-h-screen text-white bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Glow (Same as Home) */}
      <div className="absolute -top-50 l-left-50 w-125 h-125 bg-sky-500/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-50 -right-50 w-125 h-125 bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />
      <Navbar/>
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
              My{" "}
              <span className="bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                Resume
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 max-w-2xl">
              Choose the resume version that best fits your requirement.
            </p>
          </motion.div>

          {/* Resume Cards */}
          <div className="grid md:grid-cols-2 gap-12">
            {resumes.map((resume, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold">{resume.title}</h3>

                <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                  {resume.description}
                </p>

                {/* Buttons */}
                <div className="flex gap-4 mt-8">
                  {/* View Button */}
                  <a
                    href={resume.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-lg border border-sky-500/40 hover:bg-sky-500/10 transition"
                  >
                    View
                  </a>

                  {/* Download Button */}
                  <a
                    href={resume.file}
                    download
                    className="px-5 py-2 rounded-lg bg-linear-to-r from-sky-500 to-blue-600 hover:scale-105 transition"
                  >
                    Download
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
