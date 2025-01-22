"use client";

import React, { useState } from "react";
import { useImageContext } from "@/context/ImageProvider";
import GlobalUploader from "@/components/ui/GlobalUploader";
import { SERVER_BASE_URL } from "@/config";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function FaviconsPage() {
  const { globalImages, clearAllImages } = useImageContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [didProcess, setDidProcess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // We'll store the generated data for each image in the same order as globalImages.
  // Each entry is { fav16Url, fav32Url, icoUrl }, or null if generation failed.
  const [faviconResults, setFaviconResults] = useState([]);

  const handleGenerateAll = async () => {
    if (globalImages.length === 0) return;

    setIsGenerating(true);
    setErrorMsg(null);
    setDidProcess(false);
    setFaviconResults([]);

    try {
      const formData = new FormData();
      globalImages.forEach((img) => {
        formData.append("images", img.file);
      });

      const res = await fetch(`${SERVER_BASE_URL}/favicon`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} - ${text}`);
      }

      const data = await res.json();
      if (!data.images) {
        throw new Error("No data returned from server");
      }

      // data.images is an array of objects: { filename, fav16_b64, fav32_b64, ico_b64 }
      const newResults = data.images.map((item) => {
        // Convert base64 to URLs
        const fav16Blob = b64ToBlob(item.fav16_b64, "image/png");
        const fav16Url = URL.createObjectURL(fav16Blob);

        const fav32Blob = b64ToBlob(item.fav32_b64, "image/png");
        const fav32Url = URL.createObjectURL(fav32Blob);

        const icoBlob = b64ToBlob(item.ico_b64, "image/x-icon");
        const icoUrl = URL.createObjectURL(icoBlob);

        return {
          filename: item.filename,
          fav16Url,
          fav32Url,
          icoUrl,
        };
      });

      setFaviconResults(newResults);
      setDidProcess(true);
    } catch (err) {
      console.error("Favicon generation error:", err);
      let msg = err?.message || "Favicon generation failed.";
      if (msg.includes("Failed to fetch") || msg.includes("Load failed")) {
        msg = "Could not connect to server. Please try again later.";
      }
      setErrorMsg(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download "one" image's favicon set as a mini-zip with 3 files
  const handleDownloadOne = (index) => {
    const res = faviconResults[index];
    if (!res) return;

    const origName = res.filename.replace(/\.[^/.]+$/, ""); // remove extension
    const zip = new JSZip();
    const folder = zip.folder(`${origName}_favicons`);

    // fetch blobs from each URL
    Promise.all([
      fetch(res.fav16Url).then((r) => r.blob()),
      fetch(res.fav32Url).then((r) => r.blob()),
      fetch(res.icoUrl).then((r) => r.blob()),
    ]).then(([blob16, blob32, icoBlob]) => {
      folder.file("favicon-16x16.png", blob16);
      folder.file("favicon-32x32.png", blob32);
      folder.file("favicon.ico", icoBlob);

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, `${origName}_favicons.zip`);
      });
    });
  };

  // Download all images' favicons in a single zip, with subfolders
  const handleDownloadAll = () => {
    if (!didProcess || faviconResults.length === 0) return;

    const zip = new JSZip();
    const rootFolder = zip.folder("all_favicons");

    const promises = faviconResults.map((res, idx) => {
      const origName = res.filename.replace(/\.[^/.]+$/, "");
      const subFolder = rootFolder.folder(`${origName}_favicons`);

      return Promise.all([
        fetch(res.fav16Url).then((r) => r.blob()),
        fetch(res.fav32Url).then((r) => r.blob()),
        fetch(res.icoUrl).then((r) => r.blob()),
      ]).then(([blob16, blob32, icoBlob]) => {
        subFolder.file("favicon-16x16.png", blob16);
        subFolder.file("favicon-32x32.png", blob32);
        subFolder.file("favicon.ico", icoBlob);
      });
    });

    Promise.all(promises).then(() => {
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "all_favicons.zip");
      });
    });
  };

  const handleClearAll = () => {
    clearAllImages();
    setFaviconResults([]);
    setDidProcess(false);
    setErrorMsg(null);
  };

  const b64ToBlob = (b64Data, contentType) => {
    const binary = atob(b64Data);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: contentType });
  };

  return (
    <div className="mx-auto mt-10 mb-10 w-full sm:w-[95%] md:w-[85%] bg-white p-12 rounded-md shadow font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800">Favicons</h1>
      <p className="mt-2 text-sm text-center text-gray-600">
        Upload up to 5 images, then generate your 16×16, 32×32, and .ico favicons.
      </p>

      {errorMsg && (
        <div className="mt-4 text-center text-sm text-red-600">{errorMsg}</div>
      )}

      <div className="mt-6">
        <GlobalUploader
          didProcess={didProcess}
          onDownloadOne={handleDownloadOne}
        />
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
              ? "Generate Favicon"
              : "Generate All Favicons"}
          </button>

          {didProcess && faviconResults.length > 0 && (
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
