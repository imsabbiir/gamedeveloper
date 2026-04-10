/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import { useState } from "react";
import {  
  RiFolder3Fill, 
  RiMailFill, 
  RiPhoneFill, 
  RiArrowDownSLine,
  RiStarFill
} from "react-icons/ri";
import { Terminal, ScanFace, Gamepad } from "lucide-react";

const ABOUT_DATA = {
  bio: {
    title: "bio",
    lines: [
      "/**",
      " * About me",
      " * I have 5 years of experience in web",
      " * development. I focus on creating clean",
      " * and efficient code to solve complex",
      " * digital problems and build high",
      " * performance web applications.",
      " *",
      " * I am passionate about UI/UX and",
      " * turning creative ideas into reality",
      " * using the latest web technologies.",
      " */",
    ],
  },
  interests: {
    title: "interests",
    lines: [
      "/**",
      " * Interests & Skills",
      " * - Creative Coding & Animations",
      " * - UI/UX Design Systems",
      " * - Game Development (Next.js/Canvas)",
      " * - Open Source Contribution",
      " *",
      " * Tech Stack:",
      " * React, Next.js, TypeScript, Tailwind",
      " */",
    ],
  },
  education: {
    title: "education",
    lines: [
      "/**",
      " * Education",
      " * Bachelor of Science in CSE",
      " * University of Technology",
      " *",
      " * Relevant Courses:",
      " * - Data Structures & Algorithms",
      " * - Software Architecture",
      " */",
    ],
  },
  experience: {
    title: "experience",
    lines: [
      "/**",
      " * Experience",
      " * Frontend Lead @ StartupX",
      " * (2022 - Present)",
      " *",
      " * - Built scalable component libraries",
      " * - Improved SEO performance by 40%",
      " */",
    ],
  }
};

export default function AboutPage() {
  const [activeFile, setActiveFile] = useState<keyof typeof ABOUT_DATA>("bio");
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-104px)] overflow-y-auto lg:overflow-hidden font-mono text-[#607B96] bg-[#011627]">
      
      {/* 1. ACTIVITY BAR */}
      <aside className="hidden lg:flex w-16 border-r border-[#1E2D3D] flex-col items-center py-4 gap-8 shrink-0">
        <Terminal size={26} className="cursor-pointer hover:text-white" />
        <ScanFace size={26} className="text-white cursor-pointer" />
        <Gamepad size={26} className="cursor-pointer hover:text-white" />
      </aside>

      {/* 2. SIDEBAR - COLLAPSIBLE MENU */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-[#1E2D3D] flex flex-col shrink-0">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-4 border-b border-[#1E2D3D] text-white flex items-center gap-2 text-sm italic w-full text-left"
        >
          <RiArrowDownSLine className={`transition-transform ${isMenuOpen ? "" : "-rotate-90"}`} /> 
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
                <RiFolder3Fill className={key === "bio" ? "text-[#E99287]" : key === "interests" ? "text-[#43D9AD]" : "text-[#4D5BCE]"} />
                <span className="text-sm">{key}</span>
              </button>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-[#1E2D3D] hidden lg:block mt-auto">
          <div className="text-white mb-3 text-xs opacity-60">contacts</div>
          <div className="space-y-2 text-[11px]">
            <div className="flex items-center gap-2"><RiMailFill /> user@gmail.com</div>
            <div className="flex items-center gap-2"><RiPhoneFill /> +3598246359</div>
          </div>
        </div>
      </aside>

      {/* 3. MAIN CONTENT (The Editor) */}
      <main className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-[#1E2D3D]">
        <div className="flex border-b border-[#1E2D3D] h-10 bg-[#011627]">
          <div className="px-4 flex items-center border-r border-[#1E2D3D] text-white bg-[#1e2d3d]/30 text-sm whitespace-nowrap">
            {activeFile} <span className="ml-4 text-[10px] opacity-40">×</span>
          </div>
        </div>
        
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto flex">
          {/* Line Numbers */}
          <div className="pr-4 lg:pr-6 text-right select-none opacity-20 text-xs md:text-sm border-r border-[#1E2D3D] mr-4 lg:mr-6">
            {ABOUT_DATA[activeFile].lines.map((_, i) => (
              <div key={i} className="leading-6 lg:leading-7">{i + 1}</div>
            ))}
          </div>
          
          {/* Text Content - FIXED OVERFLOW */}
          <div className="text-[14px] lg:text-[17px] leading-6 lg:leading-7 wrap-break-word whitespace-pre-wrap flex-1 min-w-0">
            {ABOUT_DATA[activeFile].lines.map((line, index) => (
              <p key={index}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </main>

      {/* 4. RIGHT SECTION: Showcase */}
      <section className="w-full lg:w-1/3 p-4 lg:p-8 bg-[#011627]">
        <h3 className="text-white mb-6 text-sm">// {activeFile} showcase</h3>
        
        {activeFile === "bio" && (
          <div className="border border-[#1E2D3D] rounded-xl overflow-hidden bg-[#011221] p-4">
            <div className="aspect-square bg-[#1E2D3D] rounded-lg flex items-center justify-center text-xs italic">
                [Your Profile Photo]
            </div>
          </div>
        )}

        {activeFile === "experience" && (
          <div className="bg-[#011221] border border-[#1E2D3D] rounded-xl p-4 text-[11px] font-mono leading-tight">
             <p className="text-[#C98BDF]">export function <span className="text-[#43D9AD]">getExperience</span>() {"{"}</p>
             <p className="pl-4 text-[#607B96]">return career.history;</p>
             <p className="text-[#C98BDF]">{"}"}</p>
          </div>
        )}
      </section>
    </div>
  );
}