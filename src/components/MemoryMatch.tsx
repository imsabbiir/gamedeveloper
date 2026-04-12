/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { 
  RiReactjsLine, RiTailwindCssLine, 
  RiNextjsLine, RiNodejsLine, 
  RiJavascriptLine, RiDatabase2Line,
  RiCss3Line, RiHtml5Line,
  RiGithubFill, RiRefreshLine 
} from "react-icons/ri";

const icons = [
  RiReactjsLine, RiTailwindCssLine, 
  RiNextjsLine, RiNodejsLine, 
  RiJavascriptLine, RiDatabase2Line,
  RiCss3Line, RiHtml5Line
];

export default function MemoryMatch() {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initGame = () => {
    const deck = [...icons, ...icons]
      .map((Icon, i) => ({ id: i, Icon, flipped: false, solved: false }))
      .sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlipped([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => { initGame(); }, []);

  const handleFlip = (index: number) => {
    if (flipped.length === 2 || cards[index].flipped || cards[index].solved) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setFlipped([...flipped, index]);

    if (flipped.length === 1) {
      setMoves(m => m + 1);
      const first = cards[flipped[0]];
      const second = newCards[index];

      if (first.Icon === second.Icon) {
        newCards[flipped[0]].solved = true;
        newCards[index].solved = true;
        setFlipped([]);
        if (newCards.every(c => c.solved)) setIsWon(true);
      } else {
        setTimeout(() => {
          newCards[flipped[0]].flipped = false;
          newCards[index].flipped = false;
          setCards(newCards);
          setFlipped([]);
        }, 800);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 font-mono">
      {/* HUD - Grid Meta */}
      <div className="flex justify-between w-full max-w-75 text-[10px] uppercase tracking-widest text-[#607B96]">
        <span>Moves: <span className="text-white">{moves}</span></span>
        <span className="opacity-40">// 4x4_matrix</span>
        <button onClick={initGame} className="flex items-center gap-1 hover:text-white transition-colors">
          <RiRefreshLine /> reset
        </button>
      </div>

      {/* Grid - 4x4 Layout */}
      <div className="grid grid-cols-4 gap-3 perspective-1000">
        {cards.map((card, i) => (
          <div
            key={card.id}
            onClick={() => handleFlip(i)}
            className="relative w-14 h-14 md:w-16 md:h-16 cursor-pointer transition-transform duration-500 preserve-3d"
            style={{ transform: card.flipped || card.solved ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* Front of Card (Hidden Side) */}
            <div className="absolute inset-0 backface-hidden bg-[#011627] border border-[#1E2D3D] rounded-xl flex items-center justify-center shadow-lg group">
              <RiGithubFill className="opacity-10 group-hover:opacity-30 transition-opacity" size={20} />
            </div>

            {/* Back of Card (Icon Side) */}
            <div 
              className={`absolute inset-0 backface-hidden rotate-y-180 border rounded-xl flex items-center justify-center shadow-2xl transition-all duration-500
                ${card.solved ? "bg-[#43D9AD]/10 border-[#43D9AD] shadow-[0_0_15px_rgba(67,217,173,0.25)]" : "bg-[#1E2D3D] border-white/20"}
              `}
            >
              <card.Icon size={26} className={card.solved ? "text-[#43D9AD]" : "text-white"} />
            </div>
          </div>
        ))}
      </div>

      {/* Win Notification */}
      {isWon && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 text-center">
          <p className="text-[#43D9AD] text-sm font-bold tracking-widest">COMPILE_SUCCESSFUL</p>
          <p className="text-[10px] opacity-40 mt-1">Full memory match in {moves} moves.</p>
        </div>
      )}

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}