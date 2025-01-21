"use client";

import React, { useState } from "react";
import { useImageContext } from "@/context/ImageProvider";
import GlobalUploader from "@/components/ui/GlobalUploader";
import { SERVER_BASE_URL } from "@/config";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function CompressPage() {
  const { globalImages, setGlobalImages, clearAllImages } = useImageContext();

  // sliderValue from 1..10, step=0.1 for smoothness
  const [sliderValue, setSliderValue] = useState(5);
  const [isCompressing, setIsCompressing] = useState(false);
  const [didProcess, setDidProcess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleCompressAll = async () => {
    if (globalImages.length === 0) return;
    setIsCompressing(true);
    setErrorMsg(null);
    setDidProcess(false);

    try {
      const compressionLevel = Math.round(sliderValue);
      const formData = new FormData();
      formData.append("compression_level", compressionLevel.toString());

      globalImages.forEach((img) => {
        formData.append("images", img.file);
      });

      const res = await fetch(`${SERVER_BASE_URL}/compress`, {
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
        if (srv?.compressed_b64) {
          const binary = atob(srv.compressed_b64);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], { type: "image/jpeg" });
          const newUrl = URL.createObjectURL(blob);

          return {
            ...img,
            url: newUrl,
            file: new File([blob], img.file.name, { type: "image/jpeg" }),
          };
        }
        return img;
      });

      setGlobalImages(updated);
      setDidProcess(true);
    } catch (err) {
      console.error("Compression error:", err);
      setErrorMsg(err.message || "Compression failed");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownloadOne = (index) => {
    const img = globalImages[index];
    if (!img) return;
    const origName = img.file.name.replace(/\.[^/.]+$/, "");
    const ext = ".jpg";
    const newName = `${origName}_compressed${ext}`;

    const link = document.createElement("a");
    link.href = img.url;
    link.download = newName;
    link.click();
  };

  const handleDownloadAll = async () => {
    if (!didProcess || globalImages.length === 0) return;
    const zip = new JSZip();
    const folder = zip.folder("compressed_images");

    for (let i = 0; i < globalImages.length; i++) {
      const img = globalImages[i];
      const response = await fetch(img.url);
      const blob = await response.blob();

      const origName = img.file.name.replace(/\.[^/.]+$/, "");
      const ext = ".jpg";
      const newName = `${origName}_compressed${ext}`;

      folder.file(newName, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "compressed_images.zip");
  };

  return (
    <div className="mx-auto mt-10 mb-10 w-full max-w-4xl bg-white p-6 rounded-md shadow font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800">Compress Images</h1>
      <p className="mt-2 text-sm text-center text-gray-600">
        Upload up to 5 images, adjust the slider, then compress.
      </p>

      {errorMsg && (
        <div className="mt-4 text-center text-sm text-red-600">{errorMsg}</div>
      )}

      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="flex w-full max-w-sm items-center justify-between px-2 text-sm font-medium text-gray-700">
          <span>Smaller file size</span>
          <span>Larger file size</span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          step={0.1}
          value={sliderValue}
          onChange={(e) => setSliderValue(parseFloat(e.target.value))}
          className="my-slider w-full max-w-sm"
        />
        <style jsx>{`
          .my-slider {
            -webkit-appearance: none;
            height: 8px;
            border-radius: 9999px;
            background: linear-gradient(to right, #b3e0ff, #0984e3, #074291);
            outline: none;
            cursor: pointer;
          }
          .my-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            background: #ffffff;
            border: 2px solid #0984e3;
            border-radius: 9999px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            margin-top: -6px; /* center the thumb on track */
          }
          .my-slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            background: #ffffff;
            border: 2px solid #0984e3;
            border-radius: 9999px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;
          }
        `}</style>
      </div>

      <div className="mt-6">
        <GlobalUploader didProcess={didProcess} onDownloadOne={handleDownloadOne} />
      </div>

      {globalImages.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleCompressAll}
            disabled={isCompressing}
            className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            {isCompressing
              ? "Compressing..."
              : globalImages.length === 1
              ? "Compress"
              : "Compress All"}
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
