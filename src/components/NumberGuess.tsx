/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from "react";
import { RiParentLine, RiHistoryLine, RiRestartLine, RiCheckLine } from "react-icons/ri";

export default function NumberGuess() {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState("");
  const [lastGuess, setLastGuess] = useState<number | null>(null);
  const [status, setStatus] = useState<"higher" | "lower" | "won" | "start">("start");
  const [range, setRange] = useState({ min: 1, max: 100 });
  const [attempts, setAttempts] = useState(0);

  const initGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setRange({ min: 1, max: 100 });
    setLastGuess(null);
    setStatus("start");
    setAttempts(0);
    setGuess("");
  };

  useEffect(() => { initGame(); }, []);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) return;

    setAttempts(prev => prev + 1);
    setLastGuess(num);

    if (num === target) {
      setStatus("won");
    } else if (num < target) {
      setStatus("higher");
      setRange(prev => ({ ...prev, min: Math.max(prev.min, num + 1) }));
    } else {
      setStatus("lower");
      setRange(prev => ({ ...prev, max: Math.min(prev.max, num - 1) }));
    }
    setGuess("");
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl w-full max-w-md font-sans transition-all duration-500">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
          <RiParentLine className="text-indigo-500" />
          <span className="text-sm font-bold text-slate-600">Guess 1-100</span>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100">
          <RiHistoryLine className="text-indigo-600" />
          <span className="text-sm font-bold text-indigo-600">Try: {attempts}</span>
        </div>
      </div>

      {/* Main Feedback Radar */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className={`
          w-48 h-48 rounded-full flex flex-col items-center justify-center transition-all duration-700 relative
          ${status === "won" ? "bg-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.3)] scale-110" : 
            status === "higher" ? "bg-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.2)]" :
            status === "lower" ? "bg-sky-500 shadow-[0_0_40px_rgba(14,165,233,0.2)]" : "bg-slate-100"}
        `}>
          {status === "start" ? (
            <span className="text-4xl">🤔</span>
          ) : status === "won" ? (
            <>
              <RiCheckLine className="text-white text-6xl mb-2" />
              <span className="text-white font-black text-xl tracking-tight">CORRECT!</span>
            </>
          ) : (
            <>
              <span className="text-white text-5xl font-black mb-1">{lastGuess}</span>
              <span className="text-white/80 font-bold text-xs uppercase tracking-widest italic">
                GO {status}!
              </span>
            </>
          )}
        </div>
      </div>

      {/* Visual Range Track */}
      <div className="space-y-4 mb-10">
        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
          <span>Range: {range.min}</span>
          <span>{range.max}</span>
        </div>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/50">
          <div 
            className="absolute h-full bg-indigo-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.4)]"
            style={{ 
              left: `${range.min - 1}%`, 
              width: `${(range.max - range.min) + 1}%` 
            }}
          />
        </div>
      </div>

      {/* Action Area */}
      {status !== "won" ? (
        <form onSubmit={handleGuess} className="relative group">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 text-center text-3xl font-black text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-300"
            placeholder="? ? ?"
            autoFocus
          />
          <button 
            type="submit"
            className="absolute right-3 top-3 bottom-3 px-6 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Check
          </button>
        </form>
      ) : (
        <button 
          onClick={initGame}
          className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
        >
          <RiRestartLine size={24} /> PLAY AGAIN
        </button>
      )}
    </div>
  );
}