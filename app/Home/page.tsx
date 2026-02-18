"use client";

import TechIcons from "@/components/TechIcons";
import ProfileCard from "@/components/ProfileCard";
import { motion, useScroll } from "motion/react";
import {
  CPlusPlus,
  Django,
  ExpressJsLight,
  FastAPI,
  FlaskLight,
  HuggingFace,
  JavaScript,
  NextJs,
  NodeJs,
  Python,
  React,
  TailwindCSS,
  TypeScript,
} from "developer-icons";
import StackIcon from "tech-stack-icons";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";
import { certificates, featuredProjects } from "@/lib/constanst";

const Page = () => {
  const { scrollYProgress } = useScroll();
  const router = useRouter();

  return (
    <div className="relative min-h-screen text-white bg-linear-to-br` from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* ================= Background Glow ================= */}
      <div className="absolute -top-50 -left-50 w-125 h-125 bg-sky-500/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-50 -right-50 w-125 h-125 bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

      {/* ================= Scroll Progress ================= */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-sky-400 via-blue-500 to-indigo-600 shadow-lg shadow-sky-500/40 origin-left z-50"
      />

      <div className="pt-32">
        {/* ================= HERO ================= */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 min-h-[90vh] grid md:grid-cols-2 items-center gap-16">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              Hi, I&apos;m{" "}
              <span className="bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                Ishaan Vats
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl">
              Computer Science undergraduate working in{" "}
              <span className="text-sky-400 font-medium">
                <Typewriter
                  cursor
                  cursorStyle="_"
                  delaySpeed={1500}
                  deleteSpeed={25}
                  loop={0}
                  typeSpeed={75}
                  words={[
                    "Full-Stack Development",
                    "Machine Learning",
                    "Generative AI",
                    "App Development",
                  ]}
                />
              </span>
              .
            </p>

            <p className="mt-4 text-lg text-slate-400 max-w-xl">
              I build scalable, real-world applications with a strong focus on
              clean architecture and performance.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex gap-6">
              <button
                onClick={() => router.push("/projects")}
                className="cursor-pointer px-6 py-3 rounded-lg bg-linear-to-r from-sky-500 to-blue-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-sky-500/30"
              >
                View Projects
              </button>

              <button
                onClick={() => router.push("/contact")}
                className="cursor-pointer px-6 py-3 rounded-lg border border-sky-500/30 hover:bg-sky-500/10 transition-all duration-300"
              >
                Contact Me
              </button>
            </div>

            {/* Stats Section */}
          </motion.div>

          {/* RIGHT SIDE — PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hidden md:flex justify-center items-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-95"
            >
              <ProfileCard
                name="Ishaan Vats"
                title="Software Engineer"
                handle="ishaanvats74"
                status="Open to Work"
                contactText="Contact Me"
                avatarUrl="/photo.jpg"
                miniAvatarUrl="/photo.jpg"
                iconUrl="/icon.png"
                showUserInfo
                enableTilt
                enableMobileTilt
                onContactClick={() => router.push("/contact")}
                behindGlowColor="rgba(56, 189, 248, 0.7)"
                behindGlowSize={"650"}
                behindGlowEnabled
                innerGradient="linear-gradient(145deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 100%)"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-sky-500/40 to-transparent my-16" />

        {/* ================= PROJECTS ================= */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 overflow-hidden">
          <h2 className="text-3xl font-semibold mb-12 bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            Projects
          </h2>

          <div className="relative w-full ">
            <motion.div
              className="flex gap-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
            >
              {[...featuredProjects, ...featuredProjects].map(
                (project, index) => (
                  <div
                    key={index}
                    onClick={() => router.push(project.link)}
                    className="min-w-85 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/40 hover:scale-[1.05] transition-all duration-300 cursor-pointer"
                  >
                    <div className="h-50 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-110 transition duration-500"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mt-4 text-sky-400 text-sm font-medium">
                        View Project →
                      </div>
                    </div>
                  </div>
                ),
              )}
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-sky-500/40 to-transparent my-16" />

        {/* ================= CERTIFICATIONS ================= */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 overflow-hidden">
          <h2 className="text-3xl font-semibold mb-12 bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            Certifications
          </h2>

          <div className="relative w-full">
            <motion.div
              className="flex gap-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
            >
              {[...certificates, ...certificates].map((certificate, index) => (
                <div
                  key={index}
                  onClick={() => window.open(certificate.link, "_blank")}
                  className="min-w-85 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/40 hover:scale-[1.05] transition-all duration-300 cursor-pointer"
                >
                  <div className="h-50 overflow-hidden">
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white">
                      {certificate.title}
                    </h3>

                    <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                      {certificate.description}
                    </p>

                    <div className="mt-4 text-sky-400 text-sm font-medium">
                      View Certificate →
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-sky-500/40 to-transparent my-16" />

        {/* ================= TECH STACK ================= */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <h2 className="text-3xl font-semibold mb-12 bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            Tech Stack
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Languages",
                icons: [
                  <TechIcons
                    key="cpp"
                    icon={<CPlusPlus size={20} />}
                    label="C++"
                  />,
                  <TechIcons
                    key="js"
                    icon={<JavaScript size={20} />}
                    label="JavaScript"
                  />,
                  <TechIcons
                    key="ts"
                    icon={<TypeScript size={20} />}
                    label="TypeScript"
                  />,
                  <TechIcons
                    key="py"
                    icon={<Python size={20} />}
                    label="Python"
                  />,
                ],
              },
              {
                title: "AI & Generative AI",
                icons: [
                  <TechIcons
                    key="lc"
                    icon={<StackIcon name="langchain" className="h-5 w-5" />}
                    label="LangChain"
                  />,
                  <TechIcons
                    key="hf"
                    icon={<HuggingFace size={20} />}
                    label="Hugging Face"
                  />,
                ],
              },
              {
                title: "Frontend",
                icons: [
                  <TechIcons
                    key="next"
                    icon={<NextJs size={20} />}
                    label="Next.js"
                  />,
                  <TechIcons
                    key="react"
                    icon={<React size={20} />}
                    label="React.js"
                  />,
                  <TechIcons
                    key="tail"
                    icon={<TailwindCSS size={20} />}
                    label="Tailwind CSS"
                  />,
                ],
              },
              {
                title: "Backend",
                icons: [
                  <TechIcons
                    key="node"
                    icon={<NodeJs size={20} />}
                    label="Node.js"
                  />,
                  <TechIcons
                    key="express"
                    icon={<ExpressJsLight size={20} />}
                    label="Express.js"
                  />,
                  <TechIcons
                    key="fastapi"
                    icon={<FastAPI size={20} />}
                    label="FastAPI"
                  />,
                  <TechIcons
                    key="django"
                    icon={<Django size={20} />}
                    label="Django"
                  />,
                  <TechIcons
                    key="flask"
                    icon={<FlaskLight size={20} />}
                    label="Flask"
                  />,
                ],
              },
            ].map((section, index) => (
              <div
                key={index}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-sky-500/40 transition-all duration-300"
              >
                <h3 className="text-xl font-medium mb-6 text-sky-400">
                  {section.title}
                </h3>
                <div className="flex flex-wrap gap-4">{section.icons}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
