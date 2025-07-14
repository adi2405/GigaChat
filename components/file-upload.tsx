"use client";

import Image from "next/image";
import { useState } from "react";
import { FileIcon, X } from "lucide-react";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: string, fileType?: string) => void;
  fileType?: string;
}

const getFilenameFromUrl = (url: string) => {
  try {
    const decodedUrl = decodeURIComponent(url);
    const matches = decodedUrl.match(/\/([^/]+\.(pdf|docx?|xlsx?|pptx?))$/i);
    return matches ? matches[1] : "View File";
  } catch {
    return "View File";
  }
};

export const FileUpload = ({
  endpoint,
  value,
  onChange,
  fileType,
}: FileUploadProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isPdf = fileType === "application/pdf" || fileType === "pdf";

  if (value && !isPdf) {
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

  if (value && isPdf) {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline truncate"
        >
          {getFilenameFromUrl(value)}
        </a>
        <button
          type="button"
          onClick={() => {
            setImageLoaded(false);
            onChange("");
          }}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const file = res?.[0];
        if (!file) return;
        console.log("Upload Result:", file);
        onChange(file.ufsUrl, file.type);
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
