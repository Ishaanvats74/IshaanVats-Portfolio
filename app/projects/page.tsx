"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mlProjects, mobileProjects, webProjects } from "@/lib/constanst";

const Page = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-sky-500/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

      <Navbar />

      <div className="pt-32 px-6 md:px-10 max-w-7xl mx-auto">
        {/* ================= Heading ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            My{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <p className="text-slate-400 mt-6 max-w-2xl">
            A collection of machine learning systems and full-stack web
            applications I’ve built.
          </p>
        </motion.div>

        {/* ================= WEB DEVELOPMENT SECTION ================= */}
        <section className="mt-24">
          <h2 className="text-3xl font-semibold mb-12 bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            Web Development Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {webProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/40 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300"
              >
                <div className="h-[220px] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>

                  <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex gap-4 mt-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border border-sky-500/40 hover:bg-sky-500/10 transition"
                    >
                      GitHub
                    </a>

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:scale-105 transition"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= MACHINE LEARNING SECTION ================= */}
        <section className="mt-28">
          <h2 className="text-3xl font-semibold mb-12 bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent">
            Machine Learning Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {mlProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold">{project.title}</h3>

                <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-6">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg border border-purple-500/40 hover:bg-purple-500/10 transition"
                  >
                    View on GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= MOBILE APPLICATIONS ================= */}
        <section className="mt-28">
          <h2 className="text-3xl font-semibold mb-12 bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
            Mobile Applications
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {mobileProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <div className="h-[220px] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>

                  <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border border-emerald-500/40 hover:bg-emerald-500/10 transition"
                    >
                      GitHub
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
