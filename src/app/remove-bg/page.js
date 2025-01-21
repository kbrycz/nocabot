"use client";

import React, { useState } from "react";
import { useImageContext } from "@/context/ImageProvider";
import GlobalUploader from "@/components/ui/GlobalUploader";
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
      // Simulate a short delay as if calling a server
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // For demonstration: treat each existing image as "no-bg" version of itself
      const updated = [];
      for (let i = 0; i < globalImages.length; i++) {
        const original = globalImages[i];
        // Fetch the existing image blob
        const response = await fetch(original.url);
        const blob = await response.blob();

        // Create new url + file (pretend it's background-removed PNG)
        const newUrl = URL.createObjectURL(blob);
        const origName = original.file.name.replace(/\.[^/.]+$/, "");
        const newFile = new File([blob], `${origName}_no-bg.png`, {
          type: "image/png",
        });

        updated.push({
          ...original,
          url: newUrl,
          file: newFile,
        });
      }

      setGlobalImages(updated);
      setDidProcess(true);
    } catch (err) {
      console.error("Remove BG error:", err);
      setErrorMsg(err.message || "Remove BG failed");
    } finally {
      setIsRemoving(false);
    }
  };

  const handleDownloadOne = (index) => {
    const img = globalImages[index];
    if (!img) return;
    const link = document.createElement("a");
    link.href = img.url;
    link.download = img.file.name; // already has _no-bg.png in the name
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

  return (
    <div className="mx-auto mt-10 mb-10 w-full max-w-4xl bg-white p-6 rounded-md shadow">
      <h1 className="text-3xl font-bold text-center text-gray-800">Remove Background</h1>
      <p className="mt-2 text-sm text-center text-gray-600">
        Automatically remove the background from up to 5 images (simulated).
      </p>

      {errorMsg && (
        <div className="mt-4 text-center text-sm text-red-600">{errorMsg}</div>
      )}

      <div className="mt-6">
        <GlobalUploader didProcess={didProcess} onDownloadOne={handleDownloadOne} />
      </div>

      {globalImages.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
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
            onClick={clearAllImages}
            className="rounded-md bg-gray-300 px-6 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
