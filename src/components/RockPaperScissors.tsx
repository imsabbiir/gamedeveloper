/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { RiRefreshLine, RiCopperCoinFill } from "react-icons/ri";

const choices = [
  { name: "rock", Icon: FaHandRock, color: "from-[#FF6B6B] to-[#EE5253]", beats: "scissors", shadow: "shadow-[#EE5253]/40" },
  { name: "paper", Icon: FaHandPaper, color: "from-[#48DBFB] to-[#0abde3]", beats: "rock", shadow: "shadow-[#0abde3]/40" },
  { name: "scissors", Icon: FaHandScissors, color: "from-[#1DD1A1] to-[#10AC84]", beats: "paper", shadow: "shadow-[#10AC84]/40" },
];

export default function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState<any>(null);
  const [compChoice, setCompChoice] = useState<any>(null);
  const [result, setResult] = useState("");
  const [isFighting, setIsFighting] = useState(false);
  const [score, setScore] = useState({ user: 0, comp: 0 });

  const play = (choice: any) => {
    setIsFighting(true);
    setUserChoice(choice);
    
    setTimeout(() => {
      const computer = choices[Math.floor(Math.random() * 3)];
      setCompChoice(computer);
      setIsFighting(false);

      if (choice.name === computer.name) {
        setResult("DRAW");
      } else if (choice.beats === computer.name) {
        setResult("WINNER");
        setScore(s => ({ ...s, user: s.user + 1 }));
      } else {
        setResult("LOSE");
        setScore(s => ({ ...s, comp: s.comp + 1 }));
      }
    }, 1200);
  };

  const reset = () => {
    setUserChoice(null);
    setCompChoice(null);
    setResult("");
  };

  return (
    <div className="bg-[#0f172a] p-1 rounded-[40px] shadow-2xl w-full max-w-md overflow-hidden font-sans border-4 border-[#1e293b]">
      <div className="bg-[#1e293b] p-6 rounded-[36px] text-center">
        {/* Scoreboard */}
        <div className="flex justify-between items-center mb-10 px-4">
          <div className="text-left">
            <p className="text-[#94a3b8] text-[10px] uppercase font-black tracking-widest">Player</p>
            <p className="text-3xl font-black text-white">{score.user}</p>
          </div>
          <div className="bg-[#334155] p-2 rounded-2xl">
             <RiCopperCoinFill className="text-[#f59e0b] animate-spin-slow" size={32} />
          </div>
          <div className="text-right">
            <p className="text-[#94a3b8] text-[10px] uppercase font-black tracking-widest">CPU</p>
            <p className="text-3xl font-black text-white">{score.comp}</p>
          </div>
        </div>

        {!userChoice ? (
          <div className="space-y-8 animate-in fade-in zoom-in">
            <h3 className="text-white font-black text-2xl italic tracking-tighter uppercase">Choose Weapon</h3>
            <div className="flex flex-col gap-4 px-4">
              {choices.map((c) => (
                <button
                  key={c.name}
                  onClick={() => play(c)}
                  className={`group relative flex items-center justify-between p-5 bg-linear-to-r ${c.color} rounded-2xl hover:-translate-y-1 active:translate-y-0 transition-all ${c.shadow} shadow-lg`}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <c.Icon size={24} className="text-white" />
                    </div>
                    <span className="text-white font-black uppercase text-lg italic">{c.name}</span>
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] text-white/80 font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                    Pick Me
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-12">
            <div className="flex justify-center items-center gap-4">
              {/* User Pick */}
              <div className="flex-1">
                <div className={`p-8 rounded-3xl bg-linear-to-br ${userChoice.color} shadow-2xl transition-transform ${isFighting ? 'animate-bounce' : 'scale-110'}`}>
                  <userChoice.Icon size={64} className="text-white mx-auto drop-shadow-lg" />
                </div>
              </div>

              <div className="text-white/20 font-black text-4xl italic">VS</div>

              {/* CPU Pick */}
              <div className="flex-1">
                <div className={`p-8 rounded-3xl ${isFighting ? 'bg-[#334155] animate-pulse border-4 border-dashed border-[#475569]' : `bg-linear-to-br ${compChoice?.color || 'bg-[#334155]'} shadow-2xl scale-110`}`}>
                  {isFighting ? (
                    <div className="h-16 flex items-center justify-center">
                       <span className="text-white/40 text-4xl font-black">?</span>
                    </div>
                  ) : (
                    <compChoice.Icon size={64} className="text-white mx-auto drop-shadow-lg" />
                  )}
                </div>
              </div>
            </div>

            {!isFighting && (
              <div className="animate-in slide-in-from-bottom-8">
                <h1 className={`text-6xl font-black italic tracking-tighter mb-6 drop-shadow-sm ${
                  result === "WINNER" ? "text-[#1DD1A1]" : result === "LOSE" ? "text-[#FF6B6B]" : "text-[#48DBFB]"
                }`}>
                  {result}!
                </h1>
                <button 
                  onClick={reset} 
                  className="bg-white text-[#0f172a] px-8 py-3 rounded-2xl font-black uppercase text-sm flex items-center gap-2 mx-auto hover:bg-[#94a3b8] transition-colors"
                >
                  <RiRefreshLine size={20} /> Next Round
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}