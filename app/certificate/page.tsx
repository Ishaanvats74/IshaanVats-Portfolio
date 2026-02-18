"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const certificates = [
  {
    title: "Machine Learning Certification",
    image: "/certificates/ml.jpg",
  },
  {
    title: "Full Stack Development",
    image: "/certificates/fullstack.jpg",
  },
  {
    title: "Generative AI Certification",
    image: "/certificates/genai.jpg",
  },
  {
    title: "Cloud Computing Certification",
    image: "/certificates/cloud.jpg",
  },
  {
    title: "Python Programming Certification",
    image: "/certificates/python.jpg",
  },
];

const Page = () => {
  return (
    <div className="relative min-h-screen text-white bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">

      {/* Background Glow (Same as Home) */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-sky-500/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

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
              <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                Certificates
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 max-w-2xl">
              Professional certifications validating my expertise in AI,
              development, and modern technologies.
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

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
                <div className="h-[220px] overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold">
                    {cert.title}
                  </h3>

                  <div className="mt-6">
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:scale-105 transition inline-block"
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

      <Footer />
    </div>
  );
};

export default Page;
