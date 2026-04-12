/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { 
  RiArrowLeftSLine, 
  RiGithubFill, 
  RiExternalLinkLine, 
  RiInformationLine,
  RiCodeSSlashLine,
  RiTerminalBoxLine
} from "react-icons/ri";
import { useRouter } from "next/navigation";

// Mock Data for the specific project
const PROJECT_DETAILS = {
  title: "_cryptoverse-dashboard",
  category: "React; Next.js",
  heroImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  tags: ["TypeScript", "TailwindCSS", "Recharts", "Framer Motion"],
  stats: {
    commits: "124",
    stars: "48",
    forks: "12"
  },
  content: [
    "/**",
    " * @project Cryptoverse",
    " * A high-performance dashboard for tracking ",
    " * real-time cryptocurrency data and global markets.",
    " *",
    " * Key Features:",
    " * - Real-time Price Tracking via WebSocket",
    " * - Interactive Candle Charts",
    " * - Wallet Portfolio Simulation",
    " * - Dark/Light Theme Support",
    " */",
    "",
    "export const TechStack = () => {",
    "  return [",
    "    'React Query for state management',",
    "    'CoinGecko API integration',",
    "    'Tailwind for responsive design'",
    "  ];",
    "};"
  ]
};

export default function page() {
  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-104px)] overflow-hidden font-mono text-[#607B96] bg-[#011627]">
      
      {/* 1. LEFT SIDEBAR: Nav & Info */}
      <aside className="w-full lg:w-64 border-r border-[#1E2D3D] flex flex-col shrink-0">
        <button 
          onClick={() => router.back()}
          className="p-4 border-b border-[#1E2D3D] text-white flex items-center gap-2 text-sm hover:text-[#43D9AD] transition-colors"
        >
          <RiArrowLeftSLine size={20} /> back-to-projects
        </button>

        <div className="p-4 space-y-6">
          <div>
            <p className="text-white text-xs mb-3 flex items-center gap-2 uppercase tracking-widest">
              <RiInformationLine className="text-[#43D9AD]" /> about-project
            </p>
            <p className="text-[11px] leading-relaxed">
              This application was built to solve the fragmentation of crypto data across multiple exchanges.
            </p>
          </div>

          <div>
            <p className="text-white text-xs mb-3 flex items-center gap-2 uppercase tracking-widest">
              <RiCodeSSlashLine className="text-[#4D5BCE]" /> stack
            </p>
            <div className="flex flex-wrap gap-2">
              {PROJECT_DETAILS.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-1 bg-[#1E2D3D] rounded-md text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-[#1E2D3D] space-y-3">
           <a href="#" className="flex items-center gap-2 text-xs text-white hover:underline">
             <RiGithubFill /> view-source-code
           </a>
           <a href="#" className="flex items-center gap-2 text-xs text-[#FEA55F] hover:underline">
             <RiExternalLinkLine /> live-demo
           </a>
        </div>
      </aside>

      {/* 2. MAIN CONTENT: Image & Code View */}
      <main className="flex-1 flex flex-col overflow-y-auto border-r border-[#1E2D3D]">
        {/* Tab Header */}
        <div className="flex border-b border-[#1E2D3D] h-10 bg-[#011627] shrink-0 sticky top-0 z-10">
          <div className="px-4 flex items-center border-r border-[#1E2D3D] text-white bg-[#1e2d3d]/30 text-sm">
            {PROJECT_DETAILS.title}.md <span className="ml-4 text-[10px] opacity-40">×</span>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-6 lg:p-10 space-y-10">
          {/* Hero Section */}
          <div className="relative group rounded-2xl overflow-hidden border border-[#1E2D3D] shadow-2xl">
            <img 
              src={PROJECT_DETAILS.heroImage} 
              alt={PROJECT_DETAILS.title}
              className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#011627] via-transparent to-transparent opacity-60" />
          </div>

          {/* Code Editor Style Description */}
          <div className="flex gap-6">
             <div className="hidden md:block text-right opacity-20 text-sm select-none border-r border-[#1E2D3D] pr-4">
                {PROJECT_DETAILS.content.map((_, i) => (
                  <div key={i} className="leading-7">{i + 1}</div>
                ))}
             </div>
             <div className="text-[15px] leading-7 font-mono flex-1">
                {PROJECT_DETAILS.content.map((line, i) => (
                  <div key={i} className={line.startsWith(' *') ? 'text-[#607B96]' : 'text-[#43D9AD]'}>
                    {line || <br />}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </main>

      {/* 3. RIGHT SECTION: Metrics */}
      <aside className="hidden xl:flex w-72 flex-col p-6 space-y-8 bg-[#011221]">
        <h3 className="text-white text-sm italic font-bold">// project-metrics</h3>
        
        <div className="space-y-4">
           <div className="bg-[#011627] p-4 rounded-xl border border-[#1E2D3D] flex justify-between items-center">
              <span className="text-xs">Commits</span>
              <span className="text-[#43D9AD] font-bold">{PROJECT_DETAILS.stats.commits}</span>
           </div>
           <div className="bg-[#011627] p-4 rounded-xl border border-[#1E2D3D] flex justify-between items-center">
              <span className="text-xs">Stars</span>
              <span className="text-[#FEA55F] font-bold">{PROJECT_DETAILS.stats.stars}</span>
           </div>
        </div>

        <div className="p-4 border border-[#1E2D3D] rounded-xl bg-[#011627]/50">
           <p className="text-[10px] text-[#4D5BCE] mb-4 flex items-center gap-2">
             <RiTerminalBoxLine /> deployment-status
           </p>
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#43D9AD] animate-pulse" />
              <span className="text-white text-xs">Production Live</span>
           </div>
           <p className="text-[9px] mt-4 opacity-50">Last deployed: 2 days ago</p>
        </div>
      </aside>
    </div>
  );
}