"use client";

import { useEffect, useRef } from "react";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
  className?: string;
}

const Squares: React.FC<SquaresProps> = ({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const resizeCanvas = () => {
      // Ensure canvas matches parent dimensions
      canvas.width = canvas.parentElement
        ? canvas.parentElement.clientWidth
        : canvas.offsetWidth;
      canvas.height = canvas.parentElement
        ? canvas.parentElement.clientHeight
        : canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    const drawGrid = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Normalize grid offset to stay within one square cycle
      const normalizedOffsetX = gridOffset.current.x % squareSize;
      const normalizedOffsetY = gridOffset.current.y % squareSize;

      // Draw only within canvas bounds
      for (let x = -squareSize; x <= canvas.width; x += squareSize) {
        for (let y = -squareSize; y <= canvas.height; y += squareSize) {
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(
            x + normalizedOffsetX,
            y + normalizedOffsetY,
            squareSize,
            squareSize
          );

          if (hoveredSquareRef.current) {
            const { x: hoverX, y: hoverY } = hoveredSquareRef.current;
            const adjustedHoverX = hoverX + normalizedOffsetX;
            const adjustedHoverY = hoverY + normalizedOffsetY;

            if (
              Math.abs(x - adjustedHoverX) < squareSize &&
              Math.abs(y - adjustedHoverY) < squareSize
            ) {
              ctx.fillStyle = hoverFillColor;
              ctx.fillRect(
                x + normalizedOffsetX,
                y + normalizedOffsetY,
                squareSize,
                squareSize
              );
            }
          }
        }
      }
    };

    const updateAnimation = () => {
      // Update offset based on direction
      switch (direction) {
        case "up":
          gridOffset.current.y -= speed;
          break;
        case "down":
          gridOffset.current.y += speed;
          break;
        case "left":
          gridOffset.current.x -= speed;
          break;
        case "right":
          gridOffset.current.x += speed;
          break;
        case "diagonal":
          gridOffset.current.x += speed;
          gridOffset.current.y += speed;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const hoverX = Math.floor(x / squareSize) * squareSize;
      const hoverY = Math.floor(y / squareSize) * squareSize;

      hoveredSquareRef.current = { x: hoverX, y: hoverY };
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    // Initial resize and draw
    resizeCanvas();
    drawGrid();

    // Event listeners
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none ${className || ""}`}
    />
  );
};

export default Squares;