"use client";
import React, { useState } from "react";
import { 
  RiGamepadLine, 
  RiTrophyLine, 
  RiHistoryLine, 
  RiFullscreenLine,
  RiRestartLine,
  RiPlayFill
} from "react-icons/ri";

// 🔥 Games
import Snake from "@/components/Snake";
import RockPaperScissors from "@/components/RockPaperScissors";
import NumberGuess from "@/components/NumberGuess";
import MemoryMatch from "@/components/MemoryMatch";
import SpeedTyper from "@/components/SpeedTyper";
import TicTacToe from "@/components/TicTacToe";
import HexGuess from "@/components/HexGuess";
import Tetris from "@/components/Tetris";

// 🎮 GAME CATALOG (UNCHANGED)
const GAMES_CATALOG = [
  { id: "snake", name: "snake.exe", component: <Snake /> },
  { id: "rps", name: "rock-paper-scissors.sh", component: <RockPaperScissors /> },
  { id: "guess", name: "guess-number.py", component: <NumberGuess /> },
  { id: "memory", name: "memory-match.ts", component: <MemoryMatch /> },
  { id: "typer", name: "speed-typer.ts", component: <SpeedTyper /> },
  { id: "ttt", name: "tic-tac-toe.jsx", component: <TicTacToe /> },
  { id: "hex", name: "hex-guess.css", component: <HexGuess /> },
  { id: "tetris", name: "tetris.js", component: <Tetris /> },
];

export default function GamesPage() {

  const [activeGame, setActiveGame] = useState(GAMES_CATALOG[0]);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ MOBILE DRAWER

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-104px)] overflow-hidden font-mono text-[#607B96] bg-[#011627]">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50 h-full w-64
          border-r border-[#1E2D3D] flex flex-col shrink-0
          bg-[#011627] transform transition-transform duration-300

          ${menuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-4 border-b border-[#1E2D3D] text-white flex items-center gap-2 text-sm italic">
          <RiGamepadLine className="text-[#43D9AD]" /> game-library
        </div>

        <div className="flex-1 p-2 space-y-1 overflow-y-auto">
          {GAMES_CATALOG.map((game) => (
            <button
              key={game.id}
              onClick={() => {
                setActiveGame(game);
                setMenuOpen(false); // ✅ auto close on mobile
              }}
              className={`flex flex-col w-full p-3 rounded-lg transition-all text-left ${
                activeGame.id === game.id
                  ? "bg-[#1E2D3D] text-white"
                  : "hover:text-white hover:bg-[#1E2D3D]/30"
              }`}
            >
              <span className="text-sm font-bold flex items-center gap-2">
                {game.id === activeGame.id && (
                  <RiPlayFill className="text-[#43D9AD]" />
                )}
                {game.name}
              </span>
              <span className="text-[10px] opacity-50 mt-1"> • </span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-[#1E2D3D] hidden lg:block">
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3 text-white">
            session-info
          </p>
          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between">
              <span>Status:</span> <span className="text-[#43D9AD]">Online</span>
            </div>
            <div className="flex justify-between">
              <span>Ping:</span> <span className="text-[#43D9AD]">24ms</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= OVERLAY (MOBILE) ================= */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col bg-[#010C15] overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-4 h-10 border-b border-[#1E2D3D] bg-[#011627] shrink-0">

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-white font-bold">{activeGame.name}</span>
            <span className="opacity-40">60 FPS</span>
          </div>

          <div className="flex gap-4">
            <RiRestartLine className="cursor-pointer hover:text-white" />
            <RiFullscreenLine className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* GAME AREA */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-10 relative overflow-hidden">

          {/* GRID BACKGROUND (UNCHANGED) */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#1E2D3D 1px, transparent 1px), linear-gradient(90deg, #1E2D3D 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="z-10 w-full max-w-2xl transform scale-90 md:scale-100 transition-transform">
            {activeGame.component}
          </div>
        </div>
      </main>

      {/* ================= RIGHT SIDEBAR (UNCHANGED) ================= */}
      <aside className="hidden xl:flex w-72 border-l border-[#1E2D3D] flex-col p-6 space-y-8 bg-[#011221]">

        <div>
          <h3 className="text-white text-xs mb-4 flex items-center gap-2 uppercase tracking-widest">
            <RiTrophyLine className="text-[#FEA55F]" /> high-scores
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs p-2 bg-[#1E2D3D]/50 rounded">
              <span className="text-white">1. _PLAYER_1</span>
              <span className="text-[#FEA55F]">5000</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-white text-xs mb-4 flex items-center gap-2 uppercase tracking-widest">
            <RiHistoryLine className="text-[#4D5BCE]" /> recent-activity
          </h3>

          <div className="text-[10px] space-y-4 border-l border-[#1E2D3D] pl-4">
            <p className="text-white">Played Snake</p>
            <p className="opacity-50">2 hours ago</p>
          </div>
        </div>

      </aside>
    </div>
  );
}