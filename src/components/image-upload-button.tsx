"use client";

import { useId, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "sonner";

import { storage } from "~/lib/firebase";
import { LoadingButton } from "./ui/button";

export default function ImageUploadButton({
  onChange,
}: {
  onChange: (imageUrl?: string) => void;
}) {
  const id = useId();
  const [uploading, setUploading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = async (files: FileList | null) => {
    try {
      onChange(undefined);
      setUploading(true);
      const file = files?.[0];
      if (!file) {
        return;
      }
      const imgRef = ref(storage, "images/" + file.name);
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      onChange(url);
    } catch (error) {
      toast.error("Failed to add photo", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex w-full items-center gap-x-2">
        <LoadingButton
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          loading={uploading}
        >
          {uploading ? "Uploading..." : "Choose Image"}
        </LoadingButton>
        <p className="text-sm">
          {!uploading && inputRef.current?.files?.[0]?.name}
        </p>
      </div>

      <input
        type="file"
        name={id}
        id={id}
        ref={inputRef}
        accept="image/*"
        max={1}
        onChange={(e) => {
          void handleFiles(e.target.files);
        }}
        className="hidden"
      />
    </>
  );
}
