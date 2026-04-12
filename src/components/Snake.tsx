/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  RiArrowDownSFill,
  RiArrowLeftSFill,
  RiArrowRightSFill,
  RiArrowUpSFill,
} from "react-icons/ri";

function Snake() {
  const [isGameStart, setIsGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [foodLeft, setFoodLeft] = useState(10);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const snake = useRef<{ x: number; y: number }[]>([]);
  const direction = useRef({ x: 0, y: -20 });
  const food = useRef({ x: -100, y: -100 });

  const generateRandomSnake = (width: number, height: number) => {
    const gridSize = 20;
    const maxX = Math.floor(width / gridSize) - 10;
    const maxY = Math.floor(height / gridSize) - 10;
    
    const startX = (Math.floor(Math.random() * (maxX - 5)) + 5) * gridSize;
    const startY = (Math.floor(Math.random() * (maxY - 5)) + 5) * gridSize;
    const hDir = Math.random() > 0.5 ? gridSize : -gridSize;

    return [
      { x: startX, y: startY },
      { x: startX, y: startY + gridSize },
      { x: startX, y: startY + gridSize * 2 },
      { x: startX + hDir, y: startY + gridSize * 2 },
      { x: startX + hDir * 2, y: startY + gridSize * 2 },
      { x: startX + hDir * 3, y: startY + gridSize * 2 },
      { x: startX + hDir * 3, y: startY + gridSize * 3 },
      { x: startX + hDir * 3, y: startY + gridSize * 4 },
      { x: startX + hDir * 3, y: startY + gridSize * 5 },
    ];
  };

  const generateFood = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let newFood;
    let isOccupied = true;
    const maxX = Math.floor(canvas.width / 20);
    const maxY = Math.floor(canvas.height / 20);

    while (isOccupied) {
      newFood = {
        x: Math.floor(Math.random() * maxX) * 20,
        y: Math.floor(Math.random() * maxY) * 20,
      };
      isOccupied = snake.current.some((s) => s.x === newFood!.x && s.y === newFood!.y);
    }
    food.current = newFood!;
  }, []);

  const startGame = () => {
    if (gameOver || isWin) {
      resetGame();
    } else {
      setIsGameStart(true);
    }
  };

  const resetGame = () => {
    if (!canvasRef.current) return;
    snake.current = generateRandomSnake(canvasRef.current.width, canvasRef.current.height);
    direction.current = { x: 0, y: -20 };
    setFoodLeft(10);
    setGameOver(false);
    setIsWin(false);
    setIsGameStart(true);
    generateFood();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") startGame();
      if (!isGameStart) return;
      if (e.key === "ArrowUp" && direction.current.y === 0) direction.current = { x: 0, y: -20 };
      if (e.key === "ArrowDown" && direction.current.y === 0) direction.current = { x: 0, y: 20 };
      if (e.key === "ArrowLeft" && direction.current.x === 0) direction.current = { x: -20, y: 0 };
      if (e.key === "ArrowRight" && direction.current.x === 0) direction.current = { x: 20, y: 0 };
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isGameStart, gameOver, isWin]);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#010C15";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw Food
    ctx.beginPath();
    ctx.arc(food.current.x + 10, food.current.y + 10, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#43D9AD";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#43D9AD";
    ctx.fill();

    // Draw Snake with Gradient Path
    if (snake.current.length > 0) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#43D9AD";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 14;

      // Create a linear gradient from Head to Tail
      const head = snake.current[0];
      const tail = snake.current[snake.current.length - 1];
      const gradient = ctx.createLinearGradient(
        head.x + 10, head.y + 10, 
        tail.x + 10, tail.y + 10
      );
      
      gradient.addColorStop(0, "rgba(67, 217, 173, 1)");   // Solid at head
      gradient.addColorStop(1, "rgba(67, 217, 173, 0.1)"); // Faded at tail

      ctx.strokeStyle = gradient;
      ctx.beginPath();
      snake.current.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x + 10, p.y + 10);
        else ctx.lineTo(p.x + 10, p.y + 10);
      });
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      if (snake.current.length === 0) {
        snake.current = generateRandomSnake(canvas.width, canvas.height);
        generateFood();
      }
    };
    resize();

    const interval = setInterval(() => {
      const ctx = canvas.getContext("2d");
      if (!ctx || !isGameStart || gameOver || isWin) {
        if (ctx) draw(ctx);
        return;
      }
      const newHead = {
        x: snake.current[0].x + direction.current.x,
        y: snake.current[0].y + direction.current.y,
      };
      if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
        setGameOver(true);
        return;
      }
      if (snake.current.some((s) => s.x === newHead.x && s.y === newHead.y)) {
        setGameOver(true);
        return;
      }
      snake.current.unshift(newHead);
      if (Math.abs(newHead.x - food.current.x) < 5 && Math.abs(newHead.y - food.current.y) < 5) {
        setFoodLeft((prev) => {
          if (prev <= 1) { setIsWin(true); return 0; }
          generateFood();
          return prev - 1;
        });
      } else {
        snake.current.pop();
      }
      draw(ctx);
    }, 150);
    return () => clearInterval(interval);
  }, [isGameStart, gameOver, isWin, generateFood]);

  return (
    <div className="relative group w-150 mx-auto">
      <div className="bg-linear-to-br from-[#175553] to-[#011627] p-6 rounded-lg border border-[#0C1616] shadow-2xl grid grid-cols-5 gap-6">
        <div ref={containerRef} className="w-full h-80 bg-[#010C15]/80 rounded-lg shadow-inner flex items-center justify-center col-span-3 relative overflow-hidden border border-[#1E2D3D]">
          <canvas ref={canvasRef} className="block" />
          {!isGameStart && !gameOver && !isWin && (
            <button onClick={startGame} className="bg-[#FEA55F] text-[#01080E] px-4 py-2 rounded-lg text-[10px] font-bold uppercase absolute bottom-8 hover:bg-[#ffb37a]">
              start-game
            </button>
          )}
          {(gameOver || isWin) && (
            <div className="absolute flex flex-col items-center gap-3 rounded-xl w-full">
              <p className={`w-full py-3 text-center ${gameOver ? "text-red-600 bg-[#ff801f36]" : "text-green-600 bg-[#01813b44]"}`}>{gameOver ? "GAME OVER!" : "WELL DONE!"}</p>
              <button onClick={resetGame} className="text-[#FEA55F] text-xs font-mono hover:underline">
                play-again
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between py-1 col-span-2">
          <div className="bg-[#011423]/40 p-3 rounded-lg border border-[#1E2D3D]">
            <p className="text-[10px] text-white leading-relaxed mb-4 font-mono">{"//"} use arrows to play<br/>{"//"} press enter to start</p>
            <div className="grid grid-cols-3 gap-1 w-24 mx-auto">
              <div/><div className="bg-[#010C15] flex justify-center py-1 rounded"><RiArrowUpSFill className="text-xl text-white"/></div><div/>
              <div className="bg-[#010C15] flex justify-center py-1 rounded"><RiArrowLeftSFill className="text-xl text-white"/></div>
              <div className="bg-[#010C15] flex justify-center py-1 rounded"><RiArrowDownSFill className="text-xl text-white"/></div>
              <div className="bg-[#010C15] flex justify-center py-1 rounded"><RiArrowRightSFill className="text-xl text-white"/></div>
            </div>
          </div>
          <div className="font-mono">
  <p className="text-[10px] text-white mb-2">{"//"} food left</p>
  <div className="grid grid-cols-5 gap-4">
    {[...Array(10)].map((_, i) => {
      // If the index is less than foodLeft, it's "available" (glowing)
      const isActive = i < foodLeft;
      return (
        <div 
          key={i} 
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isActive 
              ? "bg-[#43D9AD] shadow-[0_0_10px_#43D9AD] opacity-100" 
              : "bg-[#43D9AD] opacity-20 shadow-none"
          }`} 
        />
      );
    })}
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default Snake;