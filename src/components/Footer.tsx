import { RiTwitterFill, RiLinkedinFill, RiGithubFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1E2D3D] bg-[#011627] flex items-center justify-between font-mono text-[#607B96] text-sm h-12 overflow-hidden">
      
      <div className="flex h-full items-center">
        {/* Label: Hidden on small mobile screens to save space */}
        <div className="px-4 md:px-5 border-r border-[#1E2D3D] h-full flex items-center whitespace-nowrap">
          <span className="md:inline">find me in:</span>
        </div>

        {/* Social Icons */}
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noreferrer"
          className="px-4 border-r border-[#1E2D3D] h-full flex items-center hover:text-white transition-colors"
        >
          <RiTwitterFill size={20} />
        </a>
        <a 
          href="www.linkedin.com/in/imsabbir" 
          target="_blank" 
          rel="noreferrer"
          className="px-4 border-r border-[#1E2D3D] h-full flex items-center hover:text-white transition-colors"
        >
          <RiLinkedinFill size={20} />
        </a>
      </div>

      {/* Github Username - Label hidden on mobile, showing only icon and username on desktop */}
      <a 
        href="https://github.com/imsabbiir" 
        target="_blank" 
        rel="noreferrer"
        className="px-4 md:px-5 border-l border-[#1E2D3D] h-full flex items-center gap-2 hover:text-white transition-colors"
      >
        <span className="hidden md:inline">@mehedi-hasan</span>
        <RiGithubFill size={20} />
      </a>
    </footer>
  );
}