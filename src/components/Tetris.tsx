/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

const COLS = 10;
const ROWS = 20;

const SHAPES: any = {
  I: { s: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], c: "bg-cyan-400" },
  J: { s: [[1,0,0],[1,1,1],[0,0,0]], c: "bg-blue-500" },
  L: { s: [[0,0,1],[1,1,1],[0,0,0]], c: "bg-orange-500" },
  O: { s: [[1,1],[1,1]], c: "bg-yellow-400" },
  S: { s: [[0,1,1],[1,1,0],[0,0,0]], c: "bg-emerald-500" },
  T: { s: [[0,1,0],[1,1,1],[0,0,0]], c: "bg-purple-500" },
  Z: { s: [[1,1,0],[0,1,1],[0,0,0]], c: "bg-rose-500" },
};

export default function TetrisFix() {
  const [grid, setGrid] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const [active, setActive] = useState<any>(null);
  const [next, setNext] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Generate a truly random piece
  const getRandomPiece = useCallback(() => {
    const keys = Object.keys(SHAPES);
    const type = keys[Math.floor(Math.random() * keys.length)];
    return { type, ...SHAPES[type], pos: { x: 3, y: 0 } };
  }, []);

  // Initialization
  useEffect(() => {
    setActive(getRandomPiece());
    setNext(getRandomPiece());
  }, [getRandomPiece]);

  const collision = (x: number, y: number, shape: number[][]) => {
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          const nx = x + c;
          const ny = y + r;
          if (nx < 0 || nx >= COLS || ny >= ROWS || (ny >= 0 && grid[ny][nx])) return true;
        }
      }
    }
    return false;
  };

  const rotate = () => {
    if (!active || gameOver) return;
    const shape = active.s;
    // ROTATE ARRAY: Transpose + Reverse rows
    const rotated = shape[0].map((_: any, i: number) => shape.map((row: any) => row[i]).reverse());
    
    // Wall Kick: If rotation hits a wall, try moving left/right once
    let nx = active.pos.x;
    if (collision(nx, active.pos.y, rotated)) {
      nx = active.pos.x + (active.pos.x > COLS / 2 ? -1 : 1);
      if (collision(nx, active.pos.y, rotated)) return; // Still hitting? Cancel.
    }
    setActive({ ...active, s: rotated, pos: { ...active.pos, x: nx } });
  };

  const lock = useCallback(() => {
    const newGrid = grid.map(r => [...r]);
    active.s.forEach((row: any, y: number) => {
      row.forEach((v: number, x: number) => {
        if (v) newGrid[active.pos.y + y][active.pos.x + x] = active.c;
      });
    });

    const filtered = newGrid.filter(r => !r.every(c => c !== 0));
    const cleared = ROWS - filtered.length;
    while (filtered.length < ROWS) filtered.unshift(Array(COLS).fill(0));
    
    setGrid(filtered);
    setScore(s => s + cleared * 100);
    
    // Cycle "Next" to "Active"
    setActive(next);
    const newNext = getRandomPiece();
    if (collision(newNext.pos.x, newNext.pos.y, newNext.s)) setGameOver(true);
    setNext(newNext);
  }, [active, grid, next, getRandomPiece]);

  const move = useCallback((dx: number, dy: number) => {
    if (!active || gameOver) return;
    if (!collision(active.pos.x + dx, active.pos.y + dy, active.s)) {
      setActive((prev: any) => ({ ...prev, pos: { x: prev.pos.x + dx, y: prev.pos.y + dy } }));
    } else if (dy > 0) {
      lock();
    }
  }, [active, grid, gameOver, lock]);

  // Handle Gravity
  useEffect(() => {
    const t = setInterval(() => move(0, 1), 800);
    return () => clearInterval(t);
  }, [move]);

  // Handle Keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") move(-1, 0);
      if (e.key === "ArrowRight") move(1, 0);
      if (e.key === "ArrowDown") move(0, 1);
      if (e.key === "ArrowUp") rotate(); // ROTATION KEY
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move, active]); // active dependency ensures rotation uses fresh state

  return (
    <div className="flex gap-8 p-10 bg-slate-950 rounded-[3rem] border border-white/10 shadow-2xl items-start max-w-lg mx-auto font-sans">
      <div className="relative bg-slate-900 border-4 border-slate-800 rounded-2xl overflow-hidden">
        {grid.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => {
              let color = cell || "bg-transparent";
              if (active) {
                const py = y - active.pos.y, px = x - active.pos.x;
                if (py >= 0 && py < active.s.length && px >= 0 && px < active.s[0].length && active.s[py][px]) color = active.c;
              }
              return <div key={x} className={`w-6 h-6 border-[0.5px] border-white/5 ${color}`} />;
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 flex-1">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Next</p>
          <div className="h-12 flex items-center justify-center">
            {next && <div className={`w-10 h-10 rounded-lg shadow-xl ${next.c}`} />}
          </div>
        </div>
        
        <div className="text-white">
          <p className="text-[10px] text-slate-500 font-bold uppercase">Score</p>
          <p className="text-3xl font-black italic">{score}</p>
        </div>

        <div className="space-y-2 text-[10px] text-slate-500 font-bold uppercase italic">
          <p className="flex items-center gap-2"><RiArrowUpSLine className="text-white" /> Rotate Shape</p>
          <p className="flex items-center gap-2"><RiArrowDownSLine className="text-white" /> Fast Drop</p>
        </div>
      </div>
    </div>
  );
}