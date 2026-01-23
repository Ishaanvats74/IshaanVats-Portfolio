"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TechPill from "@/components/TechPill";
import { CPlusPlus, Django, ExpressJsLight, FastAPI, FlaskLight, HuggingFace, JavaScript, NextJs, NodeJs, Python, React, TailwindCSS, TypeScript } from "developer-icons";
import StackIcon from "tech-stack-icons";

const Page = () => {
  return (
    <div className=" h-screen text-white  ">
      <div className="">
        <Navbar />
      </div>
      <div className="">
        <section className="max-w-6xl mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hi, I&apos;m <span className="text-sky-400">Ishaan Vats</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl">
            Computer Science undergraduate working in{" "}
            <span className="text-sky-400 font-medium">
              Full-Stack Development, Machine Learning, and Generative AI
            </span>
            . I build scalable, real-world applications with a strong focus on
            clean architecture and performance.
          </p>

          <p className="mt-4 text-slate-400">
            B.Sc. (Hons.) Computer Science · SSCBS, University of Delhi
          </p>
        </section>


        {/* <!-- TECH STACK --> */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800">
  <h2 className="text-3xl font-semibold mb-10">Tech Stack</h2>

  <div className="grid md:grid-cols-2 gap-12">

    {/* Languages */}
    <div>
      <h3 className="text-xl font-medium mb-5 text-sky-400">Languages</h3>
      <div className="flex flex-wrap gap-4">
        <TechPill icon={<CPlusPlus size={20}/>} label="C++" />
        <TechPill icon={<JavaScript size={20}/>} label="JavaScript" />
        <TechPill icon={<TypeScript size={20}/>} label="TypeScript" />
        <TechPill icon={<Python size={20}/>} label="Python" />
      </div>
    </div>

    {/* AI & GenAI */}
    <div>
      <h3 className="text-xl font-medium mb-5 text-sky-400">
        AI & Generative AI
      </h3>
      <div className="flex flex-wrap gap-4 items-center">
        <TechPill
          icon={<StackIcon name="langchain" className="h-5 w-5 " />}
          label="LangChain"
        />
        <TechPill
          icon={<HuggingFace size={20}/> }
          label="Hugging Face"
        />
      </div>
    </div>

    {/* Frontend */}
    <div>
      <h3 className="text-xl font-medium mb-5 text-sky-400">Frontend</h3>
      <div className="flex flex-wrap gap-4">
        <TechPill icon={<NextJs size={20}/>} label="Next.js" />
        <TechPill icon={<React size={20}/>} label="React.js" />
        <TechPill icon={<TailwindCSS size={20}/>} label="Tailwind CSS" />
      </div>
    </div>

    {/* Backend */}
    <div>
      <h3 className="text-xl font-medium mb-5 text-sky-400">Backend</h3>
      <div className="flex flex-wrap gap-4">
        <TechPill icon={<NodeJs size={20}/>} label="Node.js" />
        <TechPill icon={<ExpressJsLight size={20}/>} label="Express.js" />
        <TechPill icon={<FastAPI size={20}/>} label="FastAPI" />
        <TechPill icon={<Django size={20}/>} label="Django" />
        <TechPill icon={<FlaskLight size={20}/>} label="Flask" />
      </div>
    </div>

  </div>
</section>


        {/* <!-- INTERESTS --> */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800">
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
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
