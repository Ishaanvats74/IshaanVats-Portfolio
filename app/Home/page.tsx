"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TechIcons from "@/components/TechIcons";
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
// import Card from "../../components/Card";
import { Typewriter } from "react-simple-typewriter";

const Page = () => {
  const { scrollYProgress } = useScroll();
  return (
    <div className=" h-screen text-white  ">
        <motion.div
          id="scroll-indicator"
          style={{
            scaleX: scrollYProgress,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            originX: 0,
            backgroundColor: "#38bdf8",
          }}
        />
        {/* <Card/> */}

        <Navbar />
      <div className="">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen max-w-6xl mx-auto px-6 py-24"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hi, I&apos;m <span className="text-sky-400">Ishaan Vats</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl">
            Computer Science undergraduate working in{" "}
            <span className="text-sky-400 font-medium">
              <Typewriter
                cursor
                cursorBlinking
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
          <p className=" text-lg md:text-xl text-slate-300 max-w-3xl">
            {" "}
            I build scalable, real-world applications with a strong focus on
            clean architecture and performance.
          </p>

          <p className="mt-4 text-slate-400">
            B.Sc. (Hons.) Computer Science · SSCBS, University of Delhi
          </p>
          <picture>
            <source
              srcSet="https://camo.githubusercontent.com/4f7dc8ffcb63e93dac939f9c6807282fb2e4422326c5c0b5cedf8bfc70e6d1db/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170693f757365726e616d653d49736861616e7661747337342673686f775f69636f6e733d74727565266c6f63616c653d656e267468656d653d7261646963616c"
              media="(prefers-color-scheme: dark)"
            />

            <img src="https://camo.githubusercontent.com/4f7dc8ffcb63e93dac939f9c6807282fb2e4422326c5c0b5cedf8bfc70e6d1db/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170693f757365726e616d653d49736861616e7661747337342673686f775f69636f6e733d74727565266c6f63616c653d656e267468656d653d7261646963616c" alt=""/>
          </picture>
        </motion.section>

        {/* <!-- TECH STACK --> */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
          className="min-h-screen max-w-6xl mx-auto px-6 py-16 border-t border-slate-800"
        >
          <h2 className="text-3xl font-semibold mb-10">Tech Stack</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Languages */}
            <div>
              <h3 className="text-xl font-medium mb-5 text-sky-400">
                Languages
              </h3>
              <div className="flex flex-wrap gap-4">
                <TechIcons icon={<CPlusPlus size={20} />} label="C++" />
                <TechIcons icon={<JavaScript size={20} />} label="JavaScript" />
                <TechIcons icon={<TypeScript size={20} />} label="TypeScript" />
                <TechIcons icon={<Python size={20} />} label="Python" />
              </div>
            </div>

            {/* AI & GenAI */}
            <div>
              <h3 className="text-xl font-medium mb-5 text-sky-400">
                AI & Generative AI
              </h3>
              <div className="flex flex-wrap gap-4 items-center">
                <TechIcons
                  icon={<StackIcon name="langchain" className="h-5 w-5 " />}
                  label="LangChain"
                />
                <TechIcons
                  icon={<HuggingFace size={20} />}
                  label="Hugging Face"
                />
              </div>
            </div>

            {/* Frontend */}
            <div>
              <h3 className="text-xl font-medium mb-5 text-sky-400">
                Frontend
              </h3>
              <div className="flex flex-wrap gap-4">
                <TechIcons icon={<NextJs size={20} />} label="Next.js" />
                <TechIcons icon={<React size={20} />} label="React.js" />
                <TechIcons
                  icon={<TailwindCSS size={20} />}
                  label="Tailwind CSS"
                />
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-xl font-medium mb-5 text-sky-400">Backend</h3>
              <div className="flex flex-wrap gap-4">
                <TechIcons icon={<NodeJs size={20} />} label="Node.js" />
                <TechIcons
                  icon={<ExpressJsLight size={20} />}
                  label="Express.js"
                />
                <TechIcons icon={<FastAPI size={20} />} label="FastAPI" />
                <TechIcons icon={<Django size={20} />} label="Django" />
                <TechIcons icon={<FlaskLight size={20} />} label="Flask" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* <!-- INTERESTS --> */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-h-screen max-w-6xl mx-auto px-6 py-16 border-t border-slate-800"
        >
          <h2 className="text-3xl font-semibold mb-6">Areas of Interest</h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-sky-500/10 text-sky-400">
              Machine Learning
            </span>
            <span className="px-4 py-2 rounded-full bg-sky-500/10 text-sky-400">
              Generative AI
            </span>
            <span className="px-4 py-2 rounded-full bg-sky-500/10 text-sky-400">
              Full-Stack Development
            </span>
            <span className="px-4 py-2 rounded-full bg-sky-500/10 text-sky-400">
              App Development
            </span>
          </div>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
