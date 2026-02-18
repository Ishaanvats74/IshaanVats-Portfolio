"use client";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "About", path: "/Home" },
    { name: "Projects", path: "/projects" },
    { name: "Resume", path: "/resume" },
    { name: "Certificate", path: "/certificate" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 
      z-50 w-[90%] max-w-6xl">

      <div className="flex justify-between items-center
        px-8 py-4
        rounded-2xl
        backdrop-blur-xl
        bg-slate-900/60
        border border-sky-500/20
        shadow-2xl shadow-sky-900/30">

        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer text-xl font-semibold 
          bg-linear-to-r from-sky-400 to-blue-600 
          bg-clip-text text-transparent">
          Ishaan.dev
        </div>

        {/* Nav Items */}
        <div className="flex gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`relative text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "text-sky-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.name}

                {/* Animated underline */}
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

      </div>
    </div>
  );
};

export default Navbar;
