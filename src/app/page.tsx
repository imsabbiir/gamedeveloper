/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import Snake from "@/components/Snake";
import React from "react";

export default function HeroSection() {
  return (
    <main className="min-h-[calc(100vh-104px)] bg-[#011627] flex items-center justify-center px-6 md:px-12 lg:px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-100 md:h-100 bg-[#43D9AD] opacity-10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 md:w-125 md:h-125 bg-[#4D5BCE] opacity-15 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Side: Text Content */}
        <div className="font-mono pt-10 lg:pt-0">
          <p className="text-[#E5E9F0] text-lg mb-2">Hi all. I am</p>
          <h1 className="text-[#E5E9F0] text-5xl sm:text-6xl md:text-7xl font-light mb-4">
            Mehedi Hasan
          </h1>
          <h2 className="text-[#43D9AD] sm:text-[#4D5BCE] text-xl md:text-3xl flex items-center gap-3">
            <span className="text-[#607B96]">{">"}</span> Game Developer
          </h2>

          <div className="mt-20 md:mt-32 lg:mt-16 space-y-3">
            <p className="text-[#607B96] hidden lg:block text-sm">// complete the game to continue</p>
            <p className="text-[#607B96] text-sm">// find my profile on Github:</p>
            <div className="flex flex-wrap gap-2 text-sm sm:text-base">
              <span className="text-[#4D5BCE]">const</span>
              <span className="text-[#43D9AD]">githubLink</span>
              <span className="text-white">=</span>
              <span className="text-[#E99287] break-all">
                "https://github.com/imsabbiir"
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Game Console (Hidden on Mobile) */}
        <div className="hidden lg:flex justify-center">
          <Snake />
        </div>
      </div>
    </main>
  );
}