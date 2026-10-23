"use client";

import { motion } from "motion/react";
import { certificates } from "@/lib/constanst";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const Page = () => {
  return (
    <div className="relative min-h-screen text-white bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-100 h-100 md:w-125 md:h-125 bg-sky-500/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-100 h-100 md:w-125 md:h-125 bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

      <Navbar />

      <div className="pt-24 md:pt-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-20">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 md:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              My{" "}
              <span className="bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                Certificates
              </span>
            </h1>

            <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl">
              Professional certifications validating my expertise in AI,
              development, and modern technologies.
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300"
              >
                {/* Certificate Image */}
                <div className="h-40 sm:h-48 md:h-52 overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold">
                    {cert.title}
                  </h3>

                  <div className="mt-4 md:mt-6">
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 md:px-5 py-2 text-sm md:text-base rounded-lg bg-linear-to-r from-sky-500 to-blue-600 hover:scale-105 transition inline-block"
                    >
                      View Certificate
                    </a>
                  </div>
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
