"use client";

import React, { useState } from "react";
import { useImageContext } from "@/context/ImageProvider";
import GlobalUploader from "@/components/ui/GlobalUploader";
import { SERVER_BASE_URL } from "@/config";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function RemoveBGPage() {
  const { globalImages, setGlobalImages, clearAllImages } = useImageContext();
  const [isRemoving, setIsRemoving] = useState(false);
  const [didProcess, setDidProcess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleRemoveBgAll = async () => {
    if (globalImages.length === 0) return;

    setIsRemoving(true);
    setErrorMsg(null);
    setDidProcess(false);

    try {
      const formData = new FormData();
      globalImages.forEach((img) => formData.append("images", img.file));

      const res = await fetch(`${SERVER_BASE_URL}/remove-bg`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} - ${text}`);
      }

      const data = await res.json();
      if (!data.images) {
        throw new Error("No images returned from server.");
      }

      const updated = globalImages.map((img, idx) => {
        const srv = data.images[idx];
        if (srv?.removed_b64) {
          const binary = atob(srv.removed_b64);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          // PNG with alpha channel
          const blob = new Blob([array], { type: "image/png" });
          const newUrl = URL.createObjectURL(blob);

          const origName = img.file.name.replace(/\.[^/.]+$/, "");
          const newFile = new File([blob], `${origName}_no-bg.png`, {
            type: "image/png",
          });

          return {
            ...img,
            url: newUrl,
            file: newFile,
          };
        }
        return img;
      });

      setGlobalImages(updated);
      setDidProcess(true);
    } catch (err) {
      console.error("Remove BG error:", err);
      let msg = err?.message || "Background removal failed.";

      if (msg.includes("Failed to fetch") || msg.includes("Load failed")) {
        msg = "Could not connect to server. Please try again later.";
      }
      setErrorMsg(msg);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleDownloadOne = (index) => {
    const img = globalImages[index];
    if (!img) return;
    const link = document.createElement("a");
    link.href = img.url;
    link.download = img.file.name; // file name includes _no-bg
    link.click();
  };

  const handleDownloadAll = async () => {
    if (!didProcess || globalImages.length === 0) return;

    const zip = new JSZip();
    const folder = zip.folder("no_bg_images");

    for (let i = 0; i < globalImages.length; i++) {
      const img = globalImages[i];
      const response = await fetch(img.url);
      const blob = await response.blob();

      folder.file(img.file.name, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "no_bg_images.zip");
  };

  const handleClearAll = () => {
    setErrorMsg(null);
    clearAllImages();
  };

  return (
    <div className="mx-auto mt-10 mb-10 w-full sm:w-[95%] md:w-[85%] bg-white p-12 rounded-md shadow font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800">Remove Background</h1>
      <p className="mt-2 text-sm text-center text-gray-600">
        Automatically remove the background from up to 5 images. (Coming Soon).
      </p>

      {errorMsg && (
        <div className="mt-4 text-center text-sm text-red-600">{errorMsg}</div>
      )}

      <div className="mt-6">
        <GlobalUploader didProcess={didProcess} onDownloadOne={handleDownloadOne} />
      </div>

      {globalImages.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleRemoveBgAll}
            disabled={isRemoving}
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            {isRemoving
              ? "Removing..."
              : globalImages.length === 1
              ? "Remove Background"
              : "Remove Backgrounds"}
          </button>

          {didProcess && (
            <button
              onClick={handleDownloadAll}
              className="rounded-md bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-500"
            >
              Download All
            </button>
          )}

          <button
            onClick={handleClearAll}
            className="rounded-md bg-gray-300 px-6 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
