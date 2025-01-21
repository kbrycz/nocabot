"use client";

import React, { useState } from "react";
import { useImageContext } from "@/context/ImageProvider";
import { SERVER_BASE_URL } from "@/config";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import GlobalUploader from "@/components/ui/GlobalUploader";

/**
 * This page sends all uploaded images to /app-icon,
 * which resizes them to 1024x1024 and compresses at level=5 (quality=50).
 */
export default function AppIconPage() {
  const { globalImages, setGlobalImages, clearAllImages } = useImageContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [didProcess, setDidProcess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleGenerateAll = async () => {
    if (globalImages.length === 0) return;
    setIsGenerating(true);
    setErrorMsg(null);
    setDidProcess(false);

    try {
      const formData = new FormData();
      globalImages.forEach((img) => {
        formData.append("images", img.file);
      });

      const res = await fetch(`${SERVER_BASE_URL}/app-icon`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} - ${text}`);
      }

      const data = await res.json();
      if (!data.images) {
        throw new Error("No images returned from server");
      }

      // Build new array with updated "url"
      const updated = globalImages.map((img, idx) => {
        const srv = data.images[idx];
        if (srv?.icon_b64) {
          // Convert base64 to Blob
          const binary = atob(srv.icon_b64);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], { type: "image/jpeg" });
          const newUrl = URL.createObjectURL(blob);

          // rename with _app_icon
          const origName = img.file.name.replace(/\.[^/.]+$/, "");
          const newFile = new File([blob], `${origName}_app_icon.jpg`, {
            type: "image/jpeg",
          });

          return {
            ...img,
            url: newUrl,
            file: newFile,
          };
        }
        return img; // fallback if something fails
      });

      setGlobalImages(updated);
      setDidProcess(true);
    } catch (err) {
      console.error("App Icon error:", err);
      setErrorMsg(err.message || "App Icon generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadOne = (index) => {
    const img = globalImages[index];
    if (!img) return;
    const link = document.createElement("a");
    link.href = img.url;
    link.download = img.file.name; // already has _app_icon in the name
    link.click();
  };

  const handleDownloadAll = async () => {
    if (!didProcess || globalImages.length === 0) return;

    const zip = new JSZip();
    const folder = zip.folder("app_icons");

    for (let i = 0; i < globalImages.length; i++) {
      const img = globalImages[i];
      const response = await fetch(img.url);
      const blob = await response.blob();

      folder.file(img.file.name, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "app_icons.zip");
  };

  return (
    <div className="mx-auto mt-10 mb-10 w-full max-w-4xl bg-white p-6 rounded-md shadow">
      <h1 className="text-3xl font-bold text-center text-gray-800">App Icon</h1>
      <p className="mt-2 text-sm text-center text-gray-600">
        Turn any image into a 1024×1024 compressed app icon (quality=5).
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
            onClick={handleGenerateAll}
            disabled={isGenerating}
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            {isGenerating
              ? "Generating..."
              : globalImages.length === 1
              ? "Generate App Icon"
              : "Generate All App Icons"}
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
