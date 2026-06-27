"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  card: {
    src: string;
    title: string;
    category: string;
    content: React.ReactNode;
    videoUrl?: string;
  };
  index: number;
  layout?: boolean;
}

export const VideoCard = ({ card, index, layout = false }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      layoutId={layout ? `card-${card.title}` : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[35rem] md:w-96 dark:bg-neutral-900 group"
    >
      <div
        className={cn(
          "absolute inset-0 z-20 bg-black/20 transition-opacity duration-300 pointer-events-none",
          (isHovered || isPlaying) ? "opacity-0" : "opacity-100"
        )}
      />

      <div className={cn(
        "relative z-40 p-8 pointer-events-none transition-opacity duration-300",
        isPlaying ? "opacity-0" : "opacity-100"
      )}>
        <p className="text-left font-sans text-xs font-medium text-white md:text-sm">
          {card.category}
        </p>
        <p className="mt-2 max-w-xs text-left font-sans text-lg font-semibold [text-wrap:balance] text-white md:text-2xl">
          {card.title}
        </p>
      </div>

      {isPlaying && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPlaying(false);
          }}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          aria-label="Stop video"
        >
          <IconX className="w-5 h-5" />
        </button>
      )}

      {card.videoUrl && !isPlaying && (
        <button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 z-30 flex items-center justify-center bg-transparent border-none cursor-pointer"
          aria-label={`Play video: ${card.title}`}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-crimson ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {card.videoUrl && isPlaying && (
        <div className="absolute inset-0 z-10 w-full h-full bg-black">
          <video
            src={card.videoUrl}
            loop
            playsInline
            autoPlay
            controls
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <img
        src={card.src}
        alt={card.title}
        className={cn(
          "absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none",
          isHovered && card.videoUrl ? "opacity-0" : "opacity-100"
        )}
      />
    </motion.div>
  );
};
