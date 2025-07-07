"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: string) => void;
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20 mx-auto">
        <Image
          fill
          src={value}
          alt="Upload"
          onLoad={() => setImageLoaded(true)}
          className="rounded-full"
        />
        {imageLoaded && (
          <button
            type="button"
            onClick={() => {
              setImageLoaded(false);
              onChange("");
            }}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      className="w-full py-4 ut-button:text-black border-2 border-dashed border-black outline-none"
      appearance={{
        uploadIcon: "h-12 w-12",
      }}
    />
  );
};
