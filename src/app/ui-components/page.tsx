"use client";
import React, { useState } from "react";
import {
  RiCodeBoxLine,
  RiLayout4Line,
  RiCheckLine,
  RiArrowRightSLine,
  RiSearchLine,
  RiCodeLine,
  RiStackLine,
  RiInformationLine,
  RiLoader4Line,
  RiUserLine,
  RiSettings4Line,
} from "react-icons/ri";

const COMPONENT_LIBRARY = [
  {
    id: "btn-primary",
    category: "Forms",
    name: "PrimaryButton.tsx",
    code: `const Button = ({ children }) => (\n  <button className="bg-[#FEA55F] text-[#01080E] px-6 py-2 rounded-lg font-bold hover:shadow-[0_0_20px_#FEA55F] transition-all active:scale-95">\n    {children}\n  </button>\n);`,
    preview: (
      <button className="bg-[#FEA55F] text-[#01080E] px-6 py-2 rounded-lg font-bold hover:shadow-[0_0_20px_#FEA55F] transition-all">
        GLOW ACTION
      </button>
    ),
  },
  {
    id: "card-glass",
    category: "Layout",
    name: "GlassCard.tsx",
    code: `<div className="bg-[#1E2D3D]/30 backdrop-blur-md border border-[#1E2D3D] p-8 rounded-2xl">\n  <p className="text-white text-sm">Glassmorphism UI</p>\n</div>`,
    preview: (
      <div className="bg-[#1E2D3D]/30 backdrop-blur-md border border-[#1E2D3D] p-8 rounded-2xl w-full max-w-xs text-center">
        <RiStackLine size={32} className="mx-auto mb-4 text-[#43D9AD]" />
        <p className="text-white text-sm tracking-wide">Glassmorphism UI</p>
      </div>
    ),
  },
  {
    id: "input-cyber",
    category: "Forms",
    name: "CyberInput.tsx",
    code: `<div className="relative group">\n  <input className="bg-transparent border-b border-[#1E2D3D] py-2 px-4 focus:border-[#43D9AD] outline-none text-white transition-all"/>\n  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#43D9AD] group-focus-within:w-full transition-all"/>\n</div>`,
    preview: (
      <div className="relative group w-full max-w-50">
        <input
          className="bg-transparent border-b border-[#1E2D3D] py-2 px-4 outline-none text-white w-full font-mono text-xs"
          placeholder="USER_INPUT..."
        />
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#43D9AD] group-focus-within:w-full transition-all duration-300" />
      </div>
    ),
  },
  {
    id: "toggle-neon",
    category: "Forms",
    name: "NeonToggle.tsx",
    code: `<button className="w-12 h-6 rounded-full bg-[#1E2D3D] p-1 relative">\n  <div className="w-4 h-4 bg-[#43D9AD] rounded-full shadow-[0_0_8px_#43D9AD] translate-x-6 transition-all" />\n</button>`,
    preview: (
      <div className="w-12 h-6 rounded-full bg-[#1E2D3D] p-1 flex items-center">
        <div className="w-4 h-4 bg-[#43D9AD] rounded-full shadow-[0_0_10px_#43D9AD] translate-x-6" />
      </div>
    ),
  },
  {
    id: "alert-ghost",
    category: "Feedback",
    name: "GhostAlert.tsx",
    code: `<div className="border border-[#4D5BCE] bg-[#4D5BCE]/10 p-4 rounded-xl flex items-center gap-3 text-white">\n  <RiInformationLine /> System initialized.\n</div>`,
    preview: (
      <div className="border border-[#4D5BCE] bg-[#4D5BCE]/10 p-4 rounded-xl flex items-center gap-3 text-white text-[10px] font-mono">
        <RiInformationLine size={18} className="text-[#4D5BCE]" />
        <span>BOOT_SEQUENCE_COMPLETE</span>
      </div>
    ),
  },
  {
    id: "badge-pulse",
    category: "Feedback",
    name: "StatusBadge.tsx",
    code: `<span className="flex items-center gap-2 bg-[#1E2D3D] px-3 py-1 rounded-full text-[10px] text-white">\n  <div className="w-2 h-2 rounded-full bg-[#43D9AD] animate-pulse" /> Live\n</span>`,
    preview: (
      <span className="flex items-center gap-2 bg-[#1E2D3D] px-3 py-1 rounded-full text-[10px] text-white border border-[#43D9AD]/20 uppercase font-black tracking-widest">
        <div className="w-2 h-2 rounded-full bg-[#43D9AD] animate-pulse shadow-[0_0_5px_#43D9AD]" />{" "}
        Live Server
      </span>
    ),
  },
  {
    id: "nav-pill",
    category: "Navigation",
    name: "NavPills.tsx",
    code: `<div className="bg-[#1E2D3D] p-1 rounded-xl flex gap-1">\n  <button className="bg-[#011627] text-white px-4 py-1.5 rounded-lg text-xs">Files</button>\n</div>`,
    preview: (
      <div className="bg-[#1E2D3D] p-1 rounded-xl flex gap-1">
        <button className="bg-[#011627] text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg">
          Files
        </button>
        <button className="text-[#607B96] px-4 py-1.5 text-xs">Preview</button>
      </div>
    ),
  },
  {
    id: "loader-spin",
    category: "Feedback",
    name: "NeonLoader.tsx",
    code: `<RiLoader4Line className="animate-spin text-[#43D9AD]" size={32} />`,
    preview: (
      <RiLoader4Line className="animate-spin text-[#43D9AD]" size={40} />
    ),
  },
  {
    id: "tag-code",
    category: "Data",
    name: "CodeTag.tsx",
    code: `<code className="bg-[#1E2D3D] text-[#FEA55F] px-2 py-0.5 rounded border border-white/5">\n  npm install\n</code>`,
    preview: (
      <code className="bg-[#1E2D3D] text-[#FEA55F] px-3 py-1 rounded border border-white/5 text-xs font-mono">
        npm run dev
      </code>
    ),
  },
  {
    id: "avatar-ring",
    category: "Data",
    name: "Avatar.tsx",
    code: `<div className="w-10 h-10 rounded-full border-2 border-[#43D9AD] p-0.5">\n  <RiUserLine />\n</div>`,
    preview: (
      <div className="w-12 h-12 rounded-full border-2 border-[#43D9AD] p-0.5 shadow-[0_0_10px_rgba(67,217,173,0.3)]">
        <div className="w-full h-full bg-[#1E2D3D] rounded-full flex items-center justify-center text-[#43D9AD]">
          <RiUserLine size={24} />
        </div>
      </div>
    ),
  },
  {
    id: "sidebar-item",
    category: "Navigation",
    name: "SidebarItem.tsx",
    code: `<div className="flex items-center gap-3 text-white bg-[#4D5BCE]/20 px-6 py-2 rounded-lg border-l-4 border-[#4D5BCE]">\n  <RiSettings4Line /> Settings\n</div>`,
    preview: (
      <div className="flex items-center gap-3 text-white bg-[#4D5BCE]/20 px-6 py-2 rounded-lg border-l-4 border-[#4D5BCE] w-48 font-mono">
        <RiSettings4Line />
        <span className="text-sm tracking-tighter uppercase">Settings</span>
      </div>
    ),
  },
  {
    id: "stat-card",
    category: "Data",
    name: "StatCard.tsx",
    code: `<div className="bg-[#1E2D3D] p-4 rounded-xl">\n  <p className="text-[10px] text-[#607B96] uppercase font-bold">Revenue</p>\n  <p className="text-2xl text-white font-black">$12,400</p>\n</div>`,
    preview: (
      <div className="bg-[#1E2D3D] p-4 rounded-xl border border-white/5 w-40">
        <p className="text-[10px] text-[#607B96] uppercase font-bold tracking-widest mb-1">
          CPU Load
        </p>
        <p className="text-2xl text-white font-black italic">42%</p>
      </div>
    ),
  },
  {
    id: "tooltip-dark",
    category: "Feedback",
    name: "Tooltip.tsx",
    code: `<div className="bg-[#010C15] text-white text-[10px] px-3 py-1.5 rounded border border-[#1E2D3D] shadow-xl">\n  Helpful Info\n</div>`,
    preview: (
      <div className="bg-[#010C15] text-white text-[10px] px-3 py-1.5 rounded border border-[#1E2D3D] shadow-xl">
        Informational Tip
      </div>
    ),
  },
  {
    id: "divider-neon",
    category: "Layout",
    name: "NeonDivider.tsx",
    code: `<div className="flex items-center gap-4">\n  <div className="h-px flex-1 bg-[#1E2D3D]" />\n  <span className="text-[10px]">SECTION</span>\n  <div className="h-px flex-1 bg-[#1E2D3D]" />\n</div>`,
    preview: (
      <div className="flex items-center gap-4 w-full max-w-xs px-4">
        <div className="h-px flex-1 bg-linear-to-r from-transparent to-[#1E2D3D]" />
        <span className="text-[10px] font-bold tracking-widest">
          CHAPTER_01
        </span>
        <div className="h-px flex-1 bg-linear-to-l from-transparent to-[#1E2D3D]" />
      </div>
    ),
  },
  {
    id: "checkbox-custom",
    category: "Forms",
    name: "Checkbox.tsx",
    code: `<div className="w-5 h-5 border border-[#43D9AD] rounded flex items-center justify-center bg-[#43D9AD]/10">\n  <RiCheckLine className="text-[#43D9AD]" />\n</div>`,
    preview: (
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border border-[#43D9AD] rounded flex items-center justify-center bg-[#43D9AD]/10 shadow-[0_0_10px_rgba(67,217,173,0.15)]">
          <RiCheckLine className="text-[#43D9AD]" />
        </div>
        <span className="text-xs text-white">Accept Terms</span>
      </div>
    ),
  },
];

/**
 * MAIN COMPONENT
 */
export default function UI_Vault_Library() {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ SAFE INIT (fix crash)
  const [activeComp, setActiveComp] = useState(
    COMPONENT_LIBRARY.length > 0 ? COMPONENT_LIBRARY[0] : null,
  );

  const filtered = COMPONENT_LIBRARY.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()),
  );

  const copyCode = () => {
    if (!activeComp) return;
    navigator.clipboard.writeText(activeComp.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ safety guard
  if (!activeComp) {
    return <div className="text-white p-10">No components found</div>;
  }

  return (
    <div className="flex h-screen bg-[#01080E] text-[#607B96] overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`
        fixed md:static z-50 top-0 left-0 h-full w-72
        bg-[#011627] border-r border-[#1E2D3D]
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="p-5 border-b border-[#1E2D3D]">
          <div className="flex items-center gap-3 mb-4">
            <RiLayout4Line className="text-[#43D9AD]" />
            <h1 className="text-white font-bold">UI_VAULT</h1>
          </div>

          <div className="relative">
            <RiSearchLine className="absolute left-3 top-2.5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-[#01080E] border border-[#1E2D3D] pl-10 py-2 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="p-3 space-y-2 overflow-y-auto">
          {filtered.map((comp) => (
            <button
              key={comp.id}
              onClick={() => {
                setActiveComp(comp);
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs ${
                activeComp.id === comp.id
                  ? "bg-[#43D9AD]/10 text-white"
                  : "hover:bg-[#1E2D3D]"
              }`}
            >
              <RiCodeBoxLine className="inline mr-2" />
              {comp.name}
            </button>
          ))}
        </div>
      </aside>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-14 flex items-center justify-between px-4 border-b border-[#1E2D3D] bg-[#011627]">
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span>{activeComp.category}</span>
            <RiArrowRightSLine />
            <span className="text-[#43D9AD]">{activeComp.name}</span>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-6 w-full min-w-0 overflow-hidden">

  {/* PREVIEW */}
  <div className="bg-[#011627] border border-[#1E2D3D] h-72 md:h-96 flex items-center justify-center rounded-xl w-full overflow-hidden">
    <div className="max-w-full overflow-hidden">
      {activeComp.preview}
    </div>
  </div>

  {/* CODE */}
  <div className="bg-[#011627] border border-[#1E2D3D] rounded-xl overflow-hidden w-full min-w-0">

    <div className="flex justify-between p-3 border-b border-[#1E2D3D]">
      <span className="text-xs text-white flex items-center gap-2">
        <RiCodeLine /> Code
      </span>

      <button
        onClick={copyCode}
        className="text-xs bg-[#43D9AD] text-black px-3 py-1 rounded shrink-0"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>

    {/* ✅ THIS FIXES MOBILE OVERFLOW */}
    <div className="w-full overflow-x-auto">
      <pre className="p-4 text-xs text-[#43D9AD] min-w-0 whitespace-pre">
        {activeComp.code?.split("\n").map((line, i) => (
          <div key={i} className="wrap-break-words whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </pre>
    </div>

  </div>
</div>
      </main>
    </div>
  );
}
