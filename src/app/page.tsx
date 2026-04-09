/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import Snake from "@/components/Snake";
import React from "react";

export default function HeroSection() {
  return (
    <main className="min-h-[calc(100vh-104px)] bg-[#011627] flex items-center justify-center px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-100 h-100 bg-[#43D9AD] opacity-10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-125 h-125 bg-[#4D5BCE] opacity-15 blur-[150px] rounded-full" />

      <div className="z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text Content */}
        <div className="space-y-2 font-mono">
          <p className="text-[#E5E9F0] text-lg">Hi all. I am</p>
          <h1 className="text-[#E5E9F0] text-6xl md:text-7xl font-light">
            Michael Weaver
          </h1>
          <h2 className="text-[#4D5BCE] text-2xl md:text-3xl flex items-center gap-3">
            <span className="text-[#607B96]">{">"}</span> Front-end developer
          </h2>

          <div className="pt-16 space-y-2 text-sm">
            <p className="text-[#607B96]">// complete the game to continue</p>
            <p className="text-[#607B96]">// find my profile on Github:</p>
            <p className="flex gap-2">
              <span className="text-[#4D5BCE]">const</span>
              <span className="text-[#43D9AD]">githubLink</span>
              <span className="text-white">=</span>
              <span className="text-[#E99287]">
                "https://github.com/example/url"
              </span>
            </p>
          </div>
        </div>

        {/* Right Side: Game Console */}
        <Snake />
      </div>
    </main>
  );
}
