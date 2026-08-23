"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useAnimationActive } from "@/lib/use-animation-active";

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 };
    case 3:
      return { x: 0, y: offset, angle: 315 };
    default:
      return { x: 0, y: 0, angle: 45 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const starRef = useRef<ShootingStar | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const activeRef = useRef(true);

  function tick() {
    const star = starRef.current;
    const rect = rectRef.current;

    if (star && rect) {
      const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
      const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
      const newDistance = star.distance + star.speed;
      const newScale = 1 + newDistance / 100;

      if (
        newX < -20 ||
        newX > window.innerWidth + 20 ||
        newY < -20 ||
        newY > window.innerHeight + 20
      ) {
        starRef.current = null;
        rect.style.opacity = "0";
      } else {
        star.x = newX;
        star.y = newY;
        star.distance = newDistance;
        star.scale = newScale;

        const width = starWidth * newScale;
        const cx = newX + width / 2;
        const cy = newY + starHeight / 2;
        rect.setAttribute("x", String(newX));
        rect.setAttribute("y", String(newY));
        rect.setAttribute("width", String(width));
        rect.setAttribute("height", String(starHeight));
        rect.setAttribute("transform", `rotate(${star.angle}, ${cx}, ${cy})`);
        rect.style.opacity = "1";
      }
    }

    if (activeRef.current) {
      rafIdRef.current = requestAnimationFrame(tick);
    } else {
      rafIdRef.current = null;
    }
  }

  const startLoop = () => {
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(tick);
    }
  };

  useAnimationActive(svgRef, activeRef, startLoop);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const spawn = () => {
      const { x, y, angle } = getRandomStartPoint();
      starRef.current = {
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutId = setTimeout(spawn, randomDelay);
    };

    spawn();
    startLoop();

    return () => {
      clearTimeout(timeoutId);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0", className)}
    >
      <rect ref={rectRef} fill="url(#gradient)" style={{ opacity: 0 }} />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
