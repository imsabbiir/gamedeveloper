/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState } from "react";
import { 
  RiReactjsLine, RiHtml5Line, 
  RiCss3Line, RiCloseFill, RiFilter3Fill,
  RiTailwindCssLine,
  RiNextjsLine,
  RiJavascriptLine
} from "react-icons/ri";

const PROJECTS = [
  {
    id: 1,
    title: "_cryptoverse-dashboard",
    description: "Real-time cryptocurrency tracking dashboard with interactive Recharts data visualization.",
    tech: "React",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "_task-kanban",
    description: "A productivity tool with drag-and-drop functionality and local storage persistence.",
    tech: "React",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=600&q=80",
  },
  // HTML
  {
    id: 3,
    title: "_static-resume",
    description: "Semantic HTML5 resume optimized for high-performance SEO and accessibility.",
    tech: "HTML",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "_email-templates",
    description: "Collection of cross-client compatible HTML email structures for marketing.",
    tech: "HTML",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
  },
  // CSS
  {
    id: 5,
    title: "_glassmorphism-ui",
    description: "Experimental UI library focused on backdrop filters and advanced CSS grid layouts.",
    tech: "CSS",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "_3d-cube-animation",
    description: "Pure CSS 3D transformation project showcasing perspective and keyframe animation.",
    tech: "CSS",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
  },
  // JavaScript
  {
    id: 7,
    title: "_tetris-classic",
    description: "Classic Tetris game built using the Canvas API and pure JavaScript logic.",
    tech: "JavaScript",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    title: "_weather-pwa",
    description: "Weather application using Fetch API and Service Workers for offline capability.",
    tech: "JavaScript",
    image: "https://images.unsplash.com/photo-1504608510435-9199839831ef?auto=format&fit=crop&w=600&q=80",
  },
  // Tailwind
  {
    id: 9,
    title: "_saas-landing",
    description: "Modern SaaS landing page using Tailwind's JIT engine for ultra-fast performance.",
    tech: "Tailwind",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    title: "_dark-mode-system",
    description: "Design system implementation for automatic OS-based dark/light theme switching.",
    tech: "Tailwind",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=600&q=80",
  },
  // Next.js
  {
    id: 11,
    title: "_blog-engine",
    description: "Markdown-based blog with ISR (Incremental Static Regeneration) for lightning speed.",
    tech: "Next.js",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 12,
    title: "_ecommerce-store",
    description: "Full-stack store utilizing Next.js API routes and server-side rendering for products.",
    tech: "Next.js",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=600&q=80",
  },
];

const TECH_OPTIONS = [
  { name: "HTML", icon: RiHtml5Line },
  { name: "CSS", icon: RiCss3Line },
  { name: "JavaScript", icon: RiJavascriptLine },
  { name: "React", icon: RiReactjsLine },
  { name: "Tailwind", icon: RiTailwindCssLine },
  { name: "Next.js", icon: RiNextjsLine },
];

export default function ProjectsPage() {
  const [filters, setFilters] = useState<string[]>(["React", "Next.js"]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (tech: string) => {
    setFilters(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const selectAll = () => {
    if (filters.length === TECH_OPTIONS.length) {
      setFilters([]);
    } else {
      setFilters(TECH_OPTIONS.map(t => t.name));
    }
  };

  const filteredProjects = PROJECTS.filter(p => filters.includes(p.tech));

  const getTechIcon = (tech: string) => {
    switch (tech) {
      case "React": return <RiReactjsLine className="text-white" />;
      case "HTML": return <RiHtml5Line className="text-white" />;
      case "CSS": return <RiCss3Line className="text-white" />;
      case "JavaScript": return <RiJavascriptLine className="text-white" />;
      case "Tailwind": return <RiTailwindCssLine className="text-white" />;
      case "Next.js": return <RiNextjsLine className="text-white" />;
      default: return <RiFilter3Fill className="text-white" />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-104px)] overflow-hidden font-mono text-[#607B96] bg-[#011627]">
      
      {/* Mobile Filter Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#1E2D3D] text-white">
        <span className="text-sm">_projects</span>
        <button onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? <RiCloseFill size={24} /> : <RiFilter3Fill size={24} />}
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`
        ${showFilters ? "block" : "hidden"} 
        lg:flex w-full lg:w-64 border-r border-[#1E2D3D] flex-col shrink-0 bg-[#011627] z-20
      `}>
        <div className="p-4 border-b border-[#1E2D3D] text-white hidden lg:flex items-center gap-2 text-sm italic">
          <span className="transform rotate-90">▾</span> projects
        </div>
        
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button 
            onClick={selectAll}
            className="flex items-center gap-3 w-full p-2 text-xs hover:text-white transition-colors border-b border-[#1E2D3D] pb-4 mb-2"
          >
            <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${filters.length === TECH_OPTIONS.length ? "bg-[#607B96] border-[#607B96]" : "border-[#607B96]"}`}>
              {filters.length === TECH_OPTIONS.length && <span className="text-[#011627] text-[10px]">✓</span>}
            </div>
            {filters.length === TECH_OPTIONS.length ? "Unselect all" : "Select all"}
          </button>

          {TECH_OPTIONS.map((item) => {
            const isChecked = filters.includes(item.name);
            return (
              <label 
                key={item.name}
                className="flex items-center gap-3 w-full p-2 cursor-pointer group hover:text-white transition-colors"
              >
                <input type="checkbox" className="hidden" checked={isChecked} onChange={() => toggleFilter(item.name)} />
                <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all ${isChecked ? "bg-[#607B96] border-[#607B96]" : "border-[#607B96] group-hover:border-white"}`}>
                  {isChecked && <span className="text-[#011627] text-[10px]">✓</span>}
                </div>
                <item.icon size={18} className={isChecked ? "text-white" : ""} />
                <span className={`text-sm ${isChecked ? "text-white" : ""}`}>{item.name}</span>
              </label>
            );
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex border-b border-[#1E2D3D] h-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="px-4 flex items-center border-r border-[#1E2D3D] text-white text-sm">
            {filters.length > 0 ? filters.join("; ") : "no-filter"}
          </div>
        </div>

        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
              {filteredProjects.map((project, idx) => (
                <div key={project.id} className="animate-in fade-in duration-500 max-w-sm mx-auto w-full lg:max-w-none">
                  <h3 className="text-[#4D5BCE] font-bold mb-4 text-sm md:text-base truncate">
                    Project {idx + 1} <span className="text-[#607B96] font-normal">// {project.title}</span>
                  </h3>
                  
                  <div className="border border-[#1E2D3D] bg-[#011221] rounded-2xl overflow-hidden shadow-xl flex flex-col h-100">
                    <div className="relative h-48 w-full overflow-hidden shrink-0">
                      <img src={project.image} alt={project.title} className="object-cover w-full h-full opacity-80" />
                      <div className="absolute top-3 right-3 p-1.5 bg-[#011627]/80 rounded border border-[#1E2D3D]">
                        {getTechIcon(project.tech)}
                      </div>
                    </div>

                    <div className="p-6 border-t border-[#1E2D3D] flex flex-col flex-1 justify-between">
                      <p className="text-[#607B96] text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      <Link href={`/project/${project.id}`} className="bg-[#1C2B3A] text-white px-4 py-2 rounded-lg text-xs hover:bg-[#263849] transition-colors w-max">
                        view-project
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center opacity-30 text-xl italic">
              // select a filter to see projects
            </div>
          )}
        </div>
      </main>
    </div>
  );
}