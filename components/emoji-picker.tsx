"use client";

import { Smile } from "lucide-react";
import EmojiPickerReact, { EmojiClickData, Theme } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface EmojiPickerProps {
  onChange: (value: string) => void;
  className?: string;
}

export const EmojiPicker = ({ onChange, className }: EmojiPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChange(emojiData.emoji);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Smile
          className={cn(
            `text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition cursor-pointer`,
            className
          )}
        />
      </PopoverTrigger>
      <PopoverContent
        side={isMobile ? "top" : "right"}
        align={isMobile ? "end" : "start"}
        className={cn(
          "bg-transparent border-none shadow-none drop-shadow-none",
          isMobile ? "mb-4" : "mb-16"
        )}
        style={{
          width: isMobile ? "min(350px, 90vw)" : "auto",
          maxWidth: isMobile ? "90vw" : "none",
        }}
      >
        <EmojiPickerReact
          onEmojiClick={handleEmojiClick}
          theme={resolvedTheme as Theme}
          lazyLoadEmojis
          width={isMobile ? "min(350px, 90vw)" : 350}
          height={isMobile ? 400 : 450}
          previewConfig={{
            showPreview: !isMobile,
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
