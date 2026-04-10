"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const navItems = [
    { label: "_hello", link: "/" },
    { label: "_about-me", link: "/about" },
    { label: "_projects", link: "/project" },
  ];

  return (
    <header className="w-full border-b border-[#1E2D3D] bg-[#011627] flex items-center justify-between font-mono text-[#607B96] text-sm h-14 relative z-50">
      {/* Name Section */}
      <div className="px-6 border-r border-[#1E2D3D] h-full flex items-center min-w-max lg:min-w-70">
        mehedi-hasan
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex grow h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.link;
          return (
            <Link
              href={item.link}
              key={item.label}
              className={`px-8 h-full flex items-center border-r border-[#1E2D3D] transition-colors hover:text-white relative ${isActive ? "text-white" : ""}`}
            >
              {item.label}
              {isActive && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FEA55F]" />}
            </Link>
          );
        })}
      </nav>

      {/* Desktop Contact Link */}
      <Link
        href="/contact"
        className={`hidden lg:flex px-6 border-l border-[#1E2D3D] h-full items-center hover:text-white ${pathname === "/contact" ? "text-white" : ""}`}
      >
        _contact-me
      </Link>

      {/* Mobile Toggle Button */}
      <button 
        className="lg:hidden px-6 h-full flex items-center text-2xl" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RiCloseFill /> : <RiMenuFill />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-14 bg-[#011627] z-40 flex flex-col lg:hidden border-t border-[#1E2D3D]">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="p-6 border-b border-[#1E2D3D] text-white text-base"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="p-6 border-b border-[#1E2D3D] text-white text-base"
          >
            _contact-me
          </Link>
        </div>
      )}
    </header>
  );
}