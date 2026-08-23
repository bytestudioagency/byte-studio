"use client";
import { cn } from "@/lib/utils";
import React, {
  useState,
  useEffect,
  useRef,
  type RefObject,
  useCallback,
} from "react";
import { useAnimationActive } from "@/lib/use-animation-active";

interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
}

interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}

export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const canvasRef: RefObject<HTMLCanvasElement | null> =
    useRef<HTMLCanvasElement>(null);

  const generateStars = useCallback(
    (width: number, height: number): StarProps[] => {
      const area = width * height;
      const numStars = Math.floor(area * starDensity);
      return Array.from({ length: numStars }, () => {
        const shouldTwinkle =
          allStarsTwinkle || Math.random() < twinkleProbability;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.05 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed +
              Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
        };
      });
    },
    [
      starDensity,
      allStarsTwinkle,
      twinkleProbability,
      minTwinkleSpeed,
      maxTwinkleSpeed,
    ]
  );

  useEffect(() => {
    const updateStars = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const prevWidth = canvas.width;
        const prevHeight = canvas.height;
        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        setStars((prevStars) => {
          // Canvas height tracks total page height, so any content reflow
          // (an accordion opening, an image loading in) fires this same
          // resize path. Only a real viewport-width change should reshuffle
          // every star; a height-only change should leave existing stars
          // exactly where they are and just add/drop stars for the area
          // that was gained or lost.
          if (prevStars.length === 0 || Math.round(width) !== Math.round(prevWidth)) {
            return generateStars(width, height);
          }
          if (height > prevHeight) {
            const added = generateStars(width, height - prevHeight).map((s) => ({
              ...s,
              y: s.y + prevHeight,
            }));
            return [...prevStars, ...added];
          }
          if (height < prevHeight) {
            return prevStars.filter((s) => s.y <= height);
          }
          return prevStars;
        });
      }
    };

    updateStars();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateStars, 200);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    const canvasEl = canvasRef.current;
    if (canvasEl) {
      resizeObserver.observe(canvasEl);
    }

    return () => {
      clearTimeout(resizeTimeout);
      if (canvasEl) {
        resizeObserver.unobserve(canvasEl);
      }
    };
  }, [
    starDensity,
    allStarsTwinkle,
    twinkleProbability,
    minTwinkleSpeed,
    maxTwinkleSpeed,
    generateStars,
  ]);

  const rafIdRef = useRef<number | null>(null);
  const activeRef = useRef(true);

  function render() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        if (star.twinkleSpeed !== null) {
          star.opacity =
            0.5 +
            Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
        }
      });
    }

    if (activeRef.current) {
      rafIdRef.current = requestAnimationFrame(render);
    } else {
      rafIdRef.current = null;
    }
  }

  const startLoop = () => {
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(render);
    }
  };

  useAnimationActive(canvasRef, activeRef, startLoop);

  useEffect(() => {
    startLoop();
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full absolute inset-0", className)}
    />
  );
};
