/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/preserve-manual-memoization */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { RiRefreshLine, RiUser3Line, RiRobotLine } from "react-icons/ri";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [isSystemThinking, setIsSystemThinking] = useState(false);

  const calculateWinner = useCallback((squares: any[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }, []);

  const winInfo = calculateWinner(board);
  const winner = winInfo?.winner;
  const winLine = winInfo?.line || [];
  const isDraw = !winner && board.every(s => s);

  // --- AUTOMATION LOGIC ---
  const makeSystemMove = useCallback(() => {
    if (winner || isDraw) return;

    // 1. Find all empty indices
    const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];
    if (emptyIndices.length === 0) return;

    setIsSystemThinking(true);

    // Simulate "System Processing"
    setTimeout(() => {
      let choice: number;

      // Strategy A: Win if possible
      const winMove = emptyIndices.find(idx => {
        const testBoard = [...board];
        testBoard[idx] = "O";
        return calculateWinner(testBoard)?.winner === "O";
      });

      // Strategy B: Block player if they are about to win
      const blockMove = emptyIndices.find(idx => {
        const testBoard = [...board];
        testBoard[idx] = "X";
        return calculateWinner(testBoard)?.winner === "X";
      });

      // Strategy C: Pick center, or corners, or random
      if (winMove !== undefined) choice = winMove;
      else if (blockMove !== undefined) choice = blockMove;
      else if (emptyIndices.includes(4)) choice = 4;
      else choice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

      const nextBoard = board.slice();
      nextBoard[choice] = "O";
      setBoard(nextBoard);

      const newWinInfo = calculateWinner(nextBoard);
      if (newWinInfo) {
        setScores(prev => ({ ...prev, O: prev.O + 1 }));
      }
      
      setIsXNext(true);
      setIsSystemThinking(false);
    }, 600);
  }, [board, winner, isDraw, calculateWinner]);

  useEffect(() => {
    if (!isXNext && !winner && !isDraw) {
      makeSystemMove();
    }
  }, [isXNext, winner, isDraw, makeSystemMove]);

  const handleClick = (i: number) => {
    if (winner || board[i] || !isXNext || isSystemThinking) return;
    
    const nextBoard = board.slice();
    nextBoard[i] = "X";
    setBoard(nextBoard);
    
    const newWinInfo = calculateWinner(nextBoard);
    if (newWinInfo) {
      setScores(prev => ({ ...prev, X: prev.X + 1 }));
    }
    
    setIsXNext(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setIsSystemThinking(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 font-mono">
      <div className="flex gap-8 text-[10px] uppercase tracking-widest">
        <div className={`flex flex-col items-center gap-1 ${isXNext && !winner ? "text-white" : "text-[#607B96]"}`}>
          <RiUser3Line size={16} className={isXNext ? "text-[#E99287]" : ""} />
          <span>User_X: {scores.X}</span>
        </div>
        <div className="h-8 w-px bg-[#1E2D3D]" />
        <div className={`flex flex-col items-center gap-1 ${!isXNext && !winner ? "text-white" : "text-[#607B96]"}`}>
          <RiRobotLine size={16} className={!isXNext ? "text-[#4D5BCE]" : ""} />
          <span>System_O: {scores.O}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 p-3 bg-[#010C15] rounded-xl border border-[#1E2D3D] shadow-2xl relative">
        {board.map((val, i) => {
          const isWinningSquare = winLine.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={!isXNext || isSystemThinking}
              className={`
                w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-300
                ${!val && !winner && isXNext ? "hover:bg-[#1E2D3D]/50" : "cursor-default"}
                ${isWinningSquare ? (val === "X" ? "bg-[#E99287]/20 border-[#E99287] shadow-[0_0_15px_#E99287]" : "bg-[#4D5BCE]/20 border-[#4D5BCE] shadow-[0_0_15px_#4D5BCE]") : "bg-[#011627] border border-[#1E2D3D]"}
              `}
            >
              <span className={`
                ${val === "X" ? "text-[#E99287]" : "text-[#4D5BCE]"}
                ${val ? "scale-100 opacity-100" : "scale-50 opacity-0"}
                transition-all duration-200
              `}>
                {val}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-center h-8">
        {winner ? (
          <p className="text-[#43D9AD] text-sm font-bold animate-pulse tracking-tighter">
            // {winner === 'X' ? 'USER' : 'SYSTEM'}_WIN_DETECTED
          </p>
        ) : isDraw ? (
          <p className="text-[#FEA55F] text-sm font-bold tracking-tighter">// RESULT: STALEMATE</p>
        ) : isSystemThinking ? (
          <p className="text-[10px] text-[#4D5BCE] animate-pulse">// SYSTEM_CALCULATING...</p>
        ) : (
          <p className="text-[10px] text-[#607B96] uppercase tracking-[0.2em]">
            Waiting for <span className={isXNext ? "text-[#E99287]" : "text-[#4D5BCE]"}>{isXNext ? "USER" : "SYSTEM"}</span>
          </p>
        )}
      </div>

      {(winner || isDraw) && (
        <button 
          onClick={resetGame} 
          className="flex items-center gap-2 text-[10px] text-white bg-[#1E2D3D] px-4 py-2 rounded-full hover:bg-[#263849] transition-colors"
        >
          <RiRefreshLine /> reboot-match
        </button>
      )}
    </div>
  );
}