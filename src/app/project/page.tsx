/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { 
  RiReactjsLine, RiVuejsLine, RiHtml5Line, 
  RiCss3Line, RiGatsbyLine, RiAngularjsLine, 
  RiFlutterLine, RiCloseFill, RiFilter3Fill
} from "react-icons/ri";

const PROJECTS = [
  {
    id: 1,
    title: "_ui-animations",
    description: "Duis aute irure dolor in velit esse cillum dolore.",
    tech: "React",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "_tetris-game",
    description: "Duis aute irure dolor in velit esse cillum dolore.",
    tech: "React",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "_web-scraper",
    description: "Duis aute irure dolor in velit esse cillum dolore.",
    tech: "HTML",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  },
];

const TECH_OPTIONS = [
  { name: "React", icon: RiReactjsLine },
  { name: "HTML", icon: RiHtml5Line },
  { name: "CSS", icon: RiCss3Line },
  { name: "Vue", icon: RiVuejsLine },
  { name: "Angular", icon: RiAngularjsLine },
  { name: "Gatsby", icon: RiGatsbyLine },
  { name: "Flutter", icon: RiFlutterLine },
];

export default function ProjectsPage() {
  const [filters, setFilters] = useState<string[]>(["React"]);
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
        <div className="flex border-b border-[#1E2D3D] h-10 overflow-x-auto whitespace-nowrap">
          <div className="px-4 flex items-center border-r border-[#1E2D3D] text-white text-sm">
            {filters.length > 0 ? filters.join("; ") : "no-filter"}
          </div>
        </div>

        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
            {filteredProjects.map((project, idx) => (
              <div key={project.id} className="animate-in fade-in duration-500 max-w-sm mx-auto w-full lg:max-w-none">
                <h3 className="text-[#4D5BCE] font-bold mb-4 text-sm md:text-base truncate">
                  Project {idx + 1} <span className="text-[#607B96] font-normal">// {project.title}</span>
                </h3>
                
                <div className="border border-[#1E2D3D] bg-[#011221] rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
                  <div className="relative h-40 md:h-48 w-full overflow-hidden">
                    <img src={project.image} alt={project.title} className="object-cover w-full h-full opacity-80" />
                    <div className="absolute top-3 right-3 p-1.5 bg-[#011627]/80 rounded border border-[#1E2D3D]">
                      {project.tech === "React" ? <RiReactjsLine className="text-white" /> : <RiHtml5Line className="text-white" />}
                    </div>
                  </div>

                  <div className="p-6 border-t border-[#1E2D3D] flex flex-col flex-1">
                    <p className="text-[#607B96] text-sm mb-6 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <button className="bg-[#1C2B3A] text-white px-4 py-2 rounded-lg text-xs hover:bg-[#263849] transition-colors w-max">
                      view-project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}