/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { RiKeyboardLine, RiTimerFlashLine, RiTerminalLine } from "react-icons/ri";

const WORDS = ["typescript", "interface", "component", "tailwind", "useEffect", "middleware", "git-push", "frontend", "re-render", "dependency"];

export default function SpeedTyper() {
  const [target, setTarget] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const startTime = useRef<number>(0);

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setWpm(0);
    setIsActive(true);
    setInput("");
    startTime.current = Date.now();
    setTarget(WORDS[Math.floor(Math.random() * WORDS.length)]);
  };

  useEffect(() => {
    let timer: any;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        // Calculate real-time WPM
        const timePassed = (Date.now() - startTime.current) / 60000; // in minutes
        setWpm(Math.round(score / (timePassed || 1)));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, score]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === target) {
      setScore(s => s + 1);
      setTarget(WORDS[Math.floor(Math.random() * WORDS.length)]);
      setInput("");
      setTimeLeft(prev => prev + 1.5); // Bonus time for speed
    } else {
      setInput(val);
    }
  };

  return (
    <div className="bg-[#011627] border border-[#1E2D3D] rounded-2xl p-6 w-full max-w-md font-mono shadow-2xl relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#1E2D3D]">
        <div 
          className="h-full bg-[#43D9AD] transition-all duration-1000"
          style={{ width: `${(timeLeft / 15) * 100}%` }}
        />
      </div>

      {!isActive ? (
        <div className="py-10 text-center space-y-6 animate-in fade-in zoom-in">
          <RiKeyboardLine size={48} className="mx-auto text-[#607B96] opacity-50" />
          <div>
            <h2 className="text-white text-xl font-bold tracking-tighter">TERMINAL_TYPER_v1</h2>
            <p className="text-[10px] text-[#607B96] mt-1 uppercase">Best WPM: {wpm || '--'}</p>
          </div>
          <button 
            onClick={startGame} 
            className="group relative px-6 py-2 bg-[#43D9AD] text-[#01080E] text-xs font-bold rounded-md hover:shadow-[0_0_20px_#43D9AD] transition-all"
          >
            INITIALIZE_SESSION
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-bottom-4">
          {/* Stats Header */}
          <div className="flex justify-between items-end border-b border-[#1E2D3D] pb-4">
            <div className="space-y-1">
              <p className="text-[9px] text-[#607B96] flex items-center gap-1"><RiTimerFlashLine /> TIME_REMAINING</p>
              <p className={`text-xl font-bold ${timeLeft < 5 ? 'text-[#E99287] animate-pulse' : 'text-white'}`}>
                {timeLeft}s
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[9px] text-[#607B96] flex items-center justify-end gap-1">SCORE / WPM <RiTerminalLine /></p>
              <p className="text-xl font-bold text-[#43D9AD]">{score} <span className="text-[10px] opacity-50">[{wpm}]</span></p>
            </div>
          </div>

          {/* Target Word Display */}
          <div className="text-center py-4">
            <div className="text-3xl font-bold tracking-[0.2em] mb-2 flex justify-center">
              {target.split("").map((char, i) => {
                let color = "text-white opacity-20";
                if (i < input.length) {
                  color = input[i] === char ? "text-[#43D9AD]" : "text-[#E99287]";
                }
                return <span key={i} className={`${color} transition-colors`}>{char}</span>;
              })}
            </div>
            <p className="text-[10px] text-[#4D5BCE] font-bold">» TYPE_NOW «</p>
          </div>

          {/* Input Field */}
          <div className="relative">
            <input
              autoFocus
              type="text"
              value={input}
              onChange={handleChange}
              className="w-full bg-[#010C15] border border-[#1E2D3D] rounded-lg p-4 text-white text-center text-lg outline-none focus:border-[#4D5BCE] transition-all"
              spellCheck={false}
              autoComplete="off"
            />
            {/* Blinking Cursor Decor */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#43D9AD] opacity-50">$</div>
          </div>
        </div>
      )}
    </div>
  );
}