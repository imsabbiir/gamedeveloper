/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    // Changed: flex-col on mobile, flex-row via justify-between on desktop. 
    // Removed overflow-hidden to allow scrolling if content exceeds height on small devices.
    <div className="flex min-h-[calc(100vh-104px)] items-center justify-center bg-[#011627] font-mono text-[#607B96] p-6 lg:p-4">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-10 lg:gap-12 max-w-5xl w-full items-center">
        
        {/* Left Side: Large Pixel 404 */}
        <div className="relative select-none flex justify-center w-full lg:w-auto">
          <img 
            src="/404.png" 
            alt="404 Error Graphic" 
            className="w-48 md:w-64 lg:w-80 h-auto object-contain brightness-110" 
          />
        </div>

        {/* Right Side: Code Block Message */}
        <div className="space-y-6 w-full lg:w-auto">
          <div className="flex gap-4 text-[13px] md:text-base leading-relaxed">
            {/* Line Numbers - Hidden on very small screens to save space */}
            <div className="hidden sm:block text-right opacity-30 select-none border-r border-[#1E2D3D] pr-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Error Code Content - Added wrap and break logic */}
            <div className="text-white flex-1 min-w-0 wrap-break-word whitespace-pre-wrap">
              <p>
                <span className="text-[#C98BDF]">const</span>{" "}
                <span className="text-[#4D5BCE]">page</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-[#43D9AD]">findPage</span>(
                <span className="text-[#FEA55F]">'you-were-looking-for'</span>);
              </p>
              <br className="hidden sm:block" />
              <p>
                <span className="text-[#C98BDF]">if</span> (
                <span className="text-white">!</span>
                <span className="text-[#4D5BCE]">page</span>) {"{"}
              </p>
              <p className="pl-4">
                <span className="text-[#4D5BCE]">console</span>.
                <span className="text-[#43D9AD]">log</span>(
                <span className="text-[#FEA55F]">"Oops! Wrong turn..."</span>
                );
              </p>
              <p className="pl-4">
                <span className="text-[#C98BDF]">throw new</span>{" "}
                <span className="text-[#E99287]">Error</span>(
                <span className="text-[#FEA55F]">"404: Not Found"</span>
                );
              </p>
              <p>{"}"}</p>
              <br className="hidden sm:block" />
              <p>
                <Link href="/" className="text-[#43D9AD] hover:underline inline-block">
                  redirect<span className="text-white">(</span>'home'
                  <span className="text-white">);</span>
                </Link>
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 flex justify-center lg:justify-start">
            <Link
              href="/"
              className="w-full lg:w-auto text-center px-6 py-3 bg-[#1C2B3A] text-white rounded-lg text-sm hover:bg-[#263849] transition-colors border border-[#1E2D3D]"
            >
              go-back-to-safety
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}