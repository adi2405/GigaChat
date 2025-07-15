"use client";

import { Smile } from "lucide-react";
import EmojiPickerReact, { EmojiClickData, Theme } from "emoji-picker-react";
import { useState } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface EmojiPickerProps {
  onChange: (value: string) => void;
  className?: string;
}

export const EmojiPicker = ({ onChange, className }: EmojiPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChange(emojiData.emoji);
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
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <EmojiPickerReact
          onEmojiClick={handleEmojiClick}
          theme={resolvedTheme as Theme}
          lazyLoadEmojis
        />
      </PopoverContent>
    </Popover>
  );
};
