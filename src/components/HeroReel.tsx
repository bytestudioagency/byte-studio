"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react";

/**
 * Showreel under the hero copy. Plays muted and looped while on screen (paused off screen),
 * and doesn't download until it's near the viewport. Reduced-motion users get the poster and a play button.
 */
export function HeroReel() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) userPaused.current = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    }
  };

  const btn =
    "flex size-10 items-center justify-center rounded-full bg-black/50 text-white ring-1 ring-white/15 backdrop-blur-md transition-[color,background-color,transform] duration-300 ease-spring hover:bg-black/70 hover:text-lime active:scale-95";

  return (
    <div className="hero-up relative mx-auto mt-20 w-full max-w-5xl sm:mt-28" style={{ animationDelay: "0.7s" }}>
      {/* Glow under the frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] -bottom-10 -z-10 h-1/2 rounded-full bg-lime/15 blur-[90px]"
      />
      <div className="rounded-[1.5rem] bg-white/[0.03] p-1.5 ring-1 ring-white/10 sm:rounded-[2rem]">
        <div className="relative overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] sm:rounded-[calc(2rem-0.375rem)]">
          <video
            ref={ref}
            className="block aspect-video w-full"
            poster="/reel/poster.webp"
            muted
            loop
            playsInline
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label="Byte Studio showreel"
          >
            <source src="/reel/showreel-720.mp4" type="video/mp4" media="(max-width: 767px)" />
            <source src="/reel/showreel-1080.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 sm:inset-x-5 sm:bottom-5">
            <span className="ml-auto flex gap-2">
              <button type="button" onClick={togglePlay} className={btn} aria-label={playing ? "Pause showreel" : "Play showreel"}>
                {playing ? <PauseIcon weight="fill" className="size-4" /> : <PlayIcon weight="fill" className="size-4" />}
              </button>
              <button type="button" onClick={toggleSound} className={btn} aria-label={muted ? "Unmute showreel" : "Mute showreel"}>
                {muted ? <SpeakerSlashIcon weight="fill" className="size-4" /> : <SpeakerHighIcon weight="fill" className="size-4" />}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
