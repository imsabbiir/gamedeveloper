/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import { useState } from "react";
import {
  RiFolder3Fill,
  RiMailFill,
  RiPhoneFill,
  RiArrowDownSLine,
  RiStarFill,
} from "react-icons/ri";
import { Terminal, ScanFace, Gamepad } from "lucide-react";
import Link from "next/link";

const ABOUT_DATA = {
  bio: {
    title: "bio",
    lines: [
      "/**",
      " * @about Me",
      " * I am a Full Stack Developer with 5+ years",
      " * of expertise in the React ecosystem.",
      " * My journey began with a curiosity for ",
      " * how pixels become interfaces, which evolved",
      " * into a passion for building robust backends.",
      " * ",
      " * I specialize in bridging the gap between",
      " * complex engineering and intuitive design.",
      " * Outside of coding, I'm an avid tech blogger",
      " * and a weekend hiker.",
      " */",
    ],
  },
  interests: {
    title: "interests",
    lines: [
      "/**",
      " * @interests & Tech Stack",
      " * ",
      " * [Main Focus]",
      " * - System Architecture & Scalability",
      " * - Interactive UI/UX Animations",
      " * - Real-time Data Visualization",
      " * ",
      " * [Tech Stack]",
      " * Frontend: Next.js, React, Tailwind, Framer",
      " * Backend: Node.js, PostgreSQL, Redis, Go",
      " * Tools: Docker, AWS, Figma",
      " */",
    ],
  },
  education: {
    title: "education",
    lines: [
      "/**",
      " * @education",
      " * ",
      " * [Degrees]",
      " * - B.Sc. Computer Science & Engineering",
      " * University of Excellence (2018 - 2022)",
      " * ",
      " * [Certifications]",
      " * - AWS Certified Solutions Architect",
      " * - Advanced React Patterns (Frontend Masters)",
      " * - UI/UX Design Professional (Google)",
      " */",
    ],
  },
  experience: {
    title: "experience",
    lines: [
      "/**",
      " * @experience Career Path",
      " * ",
      " * Senior Frontend Engineer @ TechFlow",
      " * (2022 - Present)",
      " * - Led migration of monolithic app to Next.js",
      " * - Mentored 5+ junior developers",
      " * ",
      " * Web Developer @ CreativeScale",
      " * (2020 - 2022)",
      " * - Built 20+ responsive custom websites",
      " * - Integrated Headless CMS solutions",
      " */",
    ],
  },
};

export default function AboutPage() {
  const [activeFile, setActiveFile] = useState<keyof typeof ABOUT_DATA>("bio");
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-104px)] overflow-y-auto lg:overflow-hidden font-mono text-[#607B96] bg-[#011627]">
      {/* 1. ACTIVITY BAR */}
      <aside className="hidden lg:flex w-16 border-r border-[#1E2D3D] flex-col items-center py-4 gap-8 shrink-0">
        <ScanFace size={26} className="text-white cursor-pointer" />
        <Link href={"/ui-components"}>
          <Terminal size={26} className="cursor-pointer hover:text-white" />
        </Link>
        <Link href={"games"}>
          <Gamepad size={26} className="cursor-pointer hover:text-white" />
        </Link>
      </aside>

      {/* 2. SIDEBAR */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-[#1E2D3D] flex flex-col shrink-0">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-4 border-b border-[#1E2D3D] text-white flex items-center gap-2 text-sm italic w-full text-left"
        >
          <RiArrowDownSLine
            className={`transition-transform ${isMenuOpen ? "" : "-rotate-90"}`}
          />
          personal-info
        </button>

        {isMenuOpen && (
          <div className="p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {Object.keys(ABOUT_DATA).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFile(key as any)}
                className={`flex items-center gap-2 w-full p-2 rounded transition-all ${activeFile === key ? "bg-[#1E2D3D] text-white" : "hover:text-white"}`}
              >
                <RiFolder3Fill
                  className={
                    key === "bio"
                      ? "text-[#E99287]"
                      : key === "interests"
                        ? "text-[#43D9AD]"
                        : "text-[#4D5BCE]"
                  }
                />
                <span className="text-sm">{key}</span>
              </button>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-[#1E2D3D] hidden lg:block mt-auto">
          <div className="text-white mb-3 text-xs opacity-60">contacts</div>
          <div className="space-y-2 text-[11px]">
            <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
              <RiMailFill className="text-white opacity-40" /> user@gmail.com
            </div>
            <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
              <RiPhoneFill className="text-white opacity-40" /> +3598246359
            </div>
          </div>
        </div>
      </aside>

      {/* 3. MAIN CONTENT */}
      <main className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-[#1E2D3D]">
        <div className="flex border-b border-[#1E2D3D] h-10 bg-[#011627]">
          <div className="px-4 flex items-center border-r border-[#1E2D3D] text-white bg-[#1e2d3d]/30 text-sm whitespace-nowrap">
            {activeFile}.js{" "}
            <span className="ml-4 text-[10px] opacity-40">×</span>
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-8 overflow-y-auto flex">
          <div className="pr-4 lg:pr-6 text-right select-none opacity-20 text-xs md:text-sm border-r border-[#1E2D3D] mr-4 lg:mr-6">
            {ABOUT_DATA[activeFile].lines.map((_, i) => (
              <div key={i} className="leading-6 lg:leading-7">
                {i + 1}
              </div>
            ))}
          </div>

          <div className="text-[14px] lg:text-[16px] leading-6 lg:leading-7 wrap-break-word whitespace-pre-wrap flex-1 min-w-0">
            {ABOUT_DATA[activeFile].lines.map((line, index) => (
              <p
                key={index}
                className="hover:bg-[#1e2d3d]/20 transition-colors"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </main>

      {/* 4. RIGHT SECTION: Showcase */}
      <section className="w-full lg:w-1/3 p-4 lg:p-8 bg-[#011627] overflow-y-auto">
        <h3 className="text-white mb-6 text-sm">// {activeFile} showcase</h3>

        <div className="space-y-6">
          {/* Top Display - Now uses real image placeholder logic */}
          <div className="border border-[#1E2D3D] rounded-xl overflow-hidden bg-[#011221] shadow-2xl transition-transform hover:scale-[1.02]">
            <img
              src={`https://picsum.photos/seed/${activeFile}/400/300`}
              alt={`${activeFile} visual`}
              className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Dynamic Code Snippets based on activeFile */}
          <div className="bg-[#011221] border border-[#1E2D3D] rounded-xl p-4 text-[11px] font-mono leading-relaxed relative group">
            <div className="absolute top-2 right-2 text-[10px] opacity-20 group-hover:opacity-100 transition-opacity text-white">
              JavaScript
            </div>

            {activeFile === "bio" && (
              <>
                <p className="text-[#607B96]">// Auto-generated summary</p>
                <p className="text-[#C98BDF]">
                  const <span className="text-[#43D9AD]">profile</span> = {"{"}
                </p>
                <p className="pl-4 text-[#607B96]">
                  role: <span className="text-[#FEA55F]">"Engineer"</span>,
                </p>
                <p className="pl-4 text-[#607B96]">
                  status: <span className="text-[#FEA55F]">"Building"</span>,
                </p>
                <p className="pl-4 text-[#607B96]">
                  coffee: <span className="text-[#FEA55F]">"Unlimited"</span>
                </p>
                <p className="text-[#C98BDF]">{"};"}</p>
              </>
            )}

            {activeFile === "interests" && (
              <>
                <p className="text-[#607B96]">// Skill distribution</p>
                <p className="text-[#C98BDF]">
                  while (<span className="text-[#43D9AD]">learning</span>) {"{"}
                </p>
                <p className="pl-4 text-[#607B96]">
                  explore(<span className="text-[#FEA55F]">"New Tech"</span>);
                </p>
                <p className="pl-4 text-[#607B96]">push_limits();</p>
                <p className="text-[#C98BDF]">{"}"}</p>
              </>
            )}

            {activeFile === "experience" && (
              <>
                <p className="text-[#607B96]">// Career statistics</p>
                <p className="text-[#C98BDF]">
                  export function{" "}
                  <span className="text-[#43D9AD]">getMetrics</span>() {"{"}
                </p>
                <p className="pl-4 text-[#607B96]">return career.impact;</p>
                <p className="text-[#C98BDF]">{"}"}</p>
              </>
            )}

            {activeFile === "education" && (
              <>
                <p className="text-[#607B96]">// Learning path</p>
                <p className="text-[#C98BDF]">
                  const <span className="text-[#43D9AD]">path</span> = [
                </p>
                <p className="pl-4 text-[#FEA55F]">"Core CS"</p>
                <p className="pl-4 text-[#FEA55F]">"Design Theory"</p>
                <p className="text-[#C98BDF]">];</p>
              </>
            )}
          </div>

          {/* Social Proof Footer */}
          <div className="flex justify-between items-center px-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <RiStarFill key={i} className="text-[#FEA55F] text-xs" />
              ))}
            </div>
            <span className="text-[10px] opacity-40">Verified Skillset</span>
          </div>
        </div>
      </section>
    </div>
  );
}
