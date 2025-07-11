"use client";

import axios from "axios";
import { useState } from "react";
import { CheckCheck, Copy, RefreshCw } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { useRouter } from "next/navigation";

export const InviteModal = () => {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          router.refresh();
        }
      }}
    >
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl sm:text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
          <DialogDescription className="text-center to-zinc-500">
            Share the link below to invite people to your server. You can
            control who joins and manage permissions anytime.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="!bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black shadow-none"
              value={inviteUrl}
              readOnly
            />
            <Button
              disabled={isLoading}
              size={"icon"}
              onClick={onCopy}
              className="cursor-pointer"
            >
              {copied ? (
                <CheckCheck className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={onNew}
            variant={"link"}
            className="text-xs text-zinc-500 mt-4 !px-0 cursor-pointer"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-[2px]" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
