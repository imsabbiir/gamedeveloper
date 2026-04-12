/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import { RiContrastDrop2Line, RiCheckDoubleLine, RiCloseCircleLine } from "react-icons/ri";

export default function HexGuess() {
  const [color, setColor] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [status, setStatus] = useState<"IDLE" | "WRONG" | "CORRECT">("IDLE");
  const [score, setScore] = useState(0);

  const generateGame = () => {
    const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    const actual = randomColor();
    setColor(actual);
    setOptions([actual, randomColor(), randomColor()].sort(() => Math.random() - 0.5));
    setStatus("IDLE");
  };

  useEffect(() => { generateGame(); }, []);

  const handleSelect = (choice: string) => {
    if (choice === color) {
      setStatus("CORRECT");
      setScore(s => s + 1);
      setTimeout(generateGame, 1200);
    } else {
      setStatus("WRONG");
      setScore(0);
    }
  };

  return (
    <div className="flex justify-center items-center w-full p-4">
      <div className="bg-white p-6 md:p-8 rounded-4xl border border-slate-100 shadow-2xl w-full max-w-95 text-center font-sans overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <RiContrastDrop2Line className="text-indigo-500" size={18} />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">Color_Match</span>
          </div>
          <div className="bg-indigo-600 px-3 py-1 rounded-full shadow-md shadow-indigo-100">
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Streak: {score}</span>
          </div>
        </div>

        {/* Swatch */}
        <div 
          className="w-full h-40 md:h-48 rounded-3xl mb-8 shadow-xl transition-all duration-700 flex items-center justify-center relative group"
          style={{ 
              backgroundColor: color,
              boxShadow: status === "CORRECT" ? `0 15px 30px -10px ${color}80` : 'none'
          }}
        >
          <span className="text-white/20 font-black text-6xl select-none">?</span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 gap-2.5">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={status === "CORRECT"}
              className={`
                relative py-3.5 rounded-xl border-2 font-black text-xs tracking-widest transition-all duration-200 active:scale-95
                ${status === "CORRECT" && opt === color ? "bg-emerald-500 border-emerald-500 text-white" : 
                  status === "WRONG" && opt !== color ? "border-slate-100 bg-slate-50 text-slate-300" :
                  "bg-white border-slate-100 text-slate-600 hover:border-indigo-500 hover:shadow-md"}
              `}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Status */}
        <div className="h-8 mt-4 flex items-center justify-center">
          {status === "CORRECT" && (
            <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] animate-in slide-in-from-bottom-1">
              <RiCheckDoubleLine size={16} /> SUCCESS_LOADED
            </div>
          )}
          {status === "WRONG" && (
            <div className="flex items-center gap-2 text-rose-500 font-black text-[10px] animate-shake">
              <RiCloseCircleLine size={16} /> ERROR_MISMATCH
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .animate-shake { animation: shake 0.15s ease-in-out infinite; }
      `}</style>
    </div>
  );
}