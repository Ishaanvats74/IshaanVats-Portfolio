"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "About", path: "/Home" },
    { name: "Projects", path: "/projects" },
    { name: "Resume", path: "/resume" },
    { name: "Certificate", path: "/certificate" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">
      <div
        className="flex justify-between items-center
        px-4 sm:px-6 md:px-8 py-3 md:py-4
        rounded-2xl
        backdrop-blur-xl
        bg-slate-900/60
        border border-sky-500/20
        shadow-xl shadow-sky-900/30"
      >
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer text-lg md:text-xl font-semibold
          bg-linear-to-r from-sky-400 to-blue-600 
          bg-clip-text text-transparent"
        >
          Ishaan.dev
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`relative text-sm font-medium transition-all duration-300
                ${
                  isActive ? "text-sky-400" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.name}

                <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-full 
                  bg-sky-400 transition-transform duration-300
                  ${isActive ? "scale-x-100" : "scale-x-0"}
                  origin-left`}
                />
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-300 hover:text-white"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden mt-3
          backdrop-blur-xl
          bg-slate-900/80
          border border-sky-500/20
          rounded-2xl
          shadow-lg
          flex flex-col p-4 gap-4"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => {
                  router.push(item.path);
                  setOpen(false);
                }}
                className={`text-left text-sm font-medium transition
                ${
                  isActive ? "text-sky-400" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;
