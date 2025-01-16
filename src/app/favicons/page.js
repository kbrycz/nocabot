"use client";
import React, { useState } from "react";
import MultipleImageUploaderForFavicon from "@/components/ui/MultipleImageUploaderForFavicon";
import { SERVER_BASE_URL } from "@/config";

export default function FaviconsPage() {
  const [images, setImages] = useState([]);
  // images: array of {
  //   file, url, success, faviconUrl, errorMsg, ...
  // }
  const [isGenerating, setIsGenerating] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleClearAll = () => {
    setImages([]);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleGenerateAll = async () => {
    if (!images.length) return;

    setIsGenerating(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData();
      images.forEach((img) => {
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
        throw new Error("No images returned from server.");
      }

      // data.images -> array of { filename, favicon_b64 }
      const updated = images.map((img, idx) => {
        const serverImg = data.images[idx];
        if (serverImg && serverImg.favicon_b64) {
          const binary = atob(serverImg.favicon_b64);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], { type: "image/x-icon" });
          const faviconUrl = URL.createObjectURL(blob);

          return {
            ...img,
            success: true,
            faviconUrl,
          };
        } else {
          return {
            ...img,
            success: false,
            errorMsg: "No data returned",
          };
        }
      });

      setImages(updated);
      setSuccessMsg(`Generated ${images.length} favicon(s) successfully!`);
    } catch (error) {
      console.error("Favicon generation error:", error);
      setErrorMsg(error.message || "Favicon generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadOne = (img) => {
    if (!img.faviconUrl) return;
    const link = document.createElement("a");
    link.href = img.faviconUrl;
    link.download = "favicon.ico";
    link.click();
  };

  const handleDownloadAll = () => {
    images.forEach((img) => {
      if (img.success && img.faviconUrl) {
        const link = document.createElement("a");
        link.href = img.faviconUrl;
        link.download = "favicon.ico";
        link.click();
      }
    });
  };

  const hasAnyGenerated = images.some((img) => img.success);

  return (
    <div className="relative">
      <div className="mx-auto mt-10 mb-10 w-full max-w-4xl bg-white shadow-lg p-8 rounded-md">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">Favicons</h1>
        <p className="mt-2 text-lg text-gray-600 text-center">
          Upload up to 5 images to generate .ico favicons (32×32).
        </p>

        {errorMsg && <div className="mt-4 text-sm text-red-600 text-center">{errorMsg}</div>}
        {successMsg && <div className="mt-4 text-sm text-green-600 text-center">{successMsg}</div>}

        {/* Uploader */}
        <div className="mt-8">
          <MultipleImageUploaderForFavicon images={images} onChange={handleImagesChange} />
        </div>

        {/* Action buttons */}
        {images.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <button
              onClick={handleGenerateAll}
              disabled={isGenerating}
              className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              {isGenerating
                ? "Generating..."
                : images.length === 1
                ? "Generate Favicon"
                : "Generate All Favicons"}
            </button>

            {hasAnyGenerated && (
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

        {/* Thumbnails row */}
        {images.length > 0 && (
          <div className="mt-8 flex flex-nowrap gap-4 overflow-x-auto">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-48 h-48 flex-shrink-0 border rounded-md flex flex-col items-center justify-center bg-gray-50 p-2"
              >
                {/* Remove icon */}
                <button
                  type="button"
                  onClick={() => {
                    const newArr = images.filter((_, i) => i !== idx);
                    setImages(newArr);
                  }}
                  className="absolute top-1 right-1 rounded-full bg-gray-200 p-1 text-gray-600 shadow hover:bg-gray-300"
                >
                  ✕
                </button>

                <img
                  src={img.success && img.faviconUrl ? img.faviconUrl : img.url}
                  alt={`img-${idx}`}
                  className="max-h-32 object-contain"
                />

                {img.success && (
                  <div className="mt-2 text-green-600 font-semibold">✓ Favicon</div>
                )}
                {!img.success && img.errorMsg && (
                  <div className="mt-2 text-red-600 text-sm">{img.errorMsg}</div>
                )}

                {img.success && (
                  <button
                    onClick={() => handleDownloadOne(img)}
                    className="mt-2 rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-500"
                  >
                    Download
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}