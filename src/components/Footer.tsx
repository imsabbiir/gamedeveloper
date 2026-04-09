import { RiTwitterFill, RiLinkedinFill, RiGithubFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1E2D3D] bg-[#011627] flex items-center justify-between font-mono text-[#607B96] text-sm h-12">
      
      <div className="flex h-full items-center">
        {/* "find me in:" label */}
        <div className="px-5 border-r border-[#1E2D3D] h-full flex items-center">
          find me in:
        </div>

        {/* Social Icons - Bordered individually */}
        <a 
          href="https://twitter.com" 
          target="_blank" 
          className="px-4 border-r border-[#1E2D3D] h-full flex items-center hover:text-white transition-colors"
        >
          <RiTwitterFill size={20} />
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          className="px-4 border-r border-[#1E2D3D] h-full flex items-center hover:text-white transition-colors"
        >
          <RiLinkedinFill size={20} />
        </a>
      </div>

      {/* Github Username - Right Aligned */}
      <a 
        href="https://github.com" 
        target="_blank" 
        className="px-5 border-l border-[#1E2D3D] h-full flex items-center gap-2 hover:text-white transition-colors"
      >
        @michael-weaver
        <RiGithubFill size={20} />
      </a>
    </footer>
  );
}