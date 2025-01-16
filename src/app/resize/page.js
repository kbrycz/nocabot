"use client";

import React, { useState } from "react";
import MultipleImageUploaderForResize from "@/components/ui/MultipleImageUploaderForResize";
import { SERVER_BASE_URL } from "@/config";

export default function ResizePage() {
  const [images, setImages] = useState([]);
  // images = array of objects:
  // {
  //   file: File,
  //   url: string,
  //   resizedUrl: string | null,
  //   resized: boolean,
  //   success: boolean,
  //   errorMsg: string | null,
  //   originalWidth: number,
  //   originalHeight: number
  // }

  // For dimensions
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [locked, setLocked] = useState(true);

  // We'll store the ratio from the *first* image that was uploaded
  // so if the user changes width, we adjust height, and vice versa.
  const [originalRatio, setOriginalRatio] = useState(1);

  const [isResizing, setIsResizing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Handle dimension changes
  const onChangeWidth = (val) => {
    const newW = parseInt(val || 0, 10);
    setWidth(newW);
    if (locked && newW > 0) {
      setHeight(Math.round(newW * originalRatio));
    }
  };

  const onChangeHeight = (val) => {
    const newH = parseInt(val || 0, 10);
    setHeight(newH);
    if (locked && newH > 0) {
      setWidth(Math.round(newH / originalRatio));
    }
  };

  // Called by the multi-uploader when images are added
  const handleImagesChange = (newImages) => {
    setImages(newImages);
    setErrorMsg(null);
    setSuccessMsg(null);

    // If we have at least one new image, store the ratio from the first
    if (newImages.length > 0) {
      const img = newImages[0];
      if (img.originalWidth && img.originalHeight) {
        const ratio = img.originalHeight / img.originalWidth;
        setOriginalRatio(ratio);
        setWidth(img.originalWidth);
        setHeight(img.originalHeight);
      }
    } else {
      setWidth(0);
      setHeight(0);
    }
  };

  const handleClearAll = () => {
    setImages([]);
    setErrorMsg(null);
    setSuccessMsg(null);
    setWidth(0);
    setHeight(0);
  };

  const handleResizeAll = async () => {
    if (!images.length) return;
    if (width < 1 || height < 1) {
      setErrorMsg("Width and Height must be greater than 0.");
      return;
    }

    setIsResizing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // Build form data
      const formData = new FormData();
      formData.append("width", width.toString());
      formData.append("height", height.toString());

      images.forEach((img) => {
        formData.append("images", img.file);
      });

      // POST to /resize
      const res = await fetch(`${SERVER_BASE_URL}/resize`, {
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

      // data.images -> array of { filename, resized_b64 }
      const updated = images.map((img, idx) => {
        const serverImg = data.images[idx];
        if (serverImg && serverImg.resized_b64) {
          const binary = atob(serverImg.resized_b64);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], { type: "image/jpeg" });
          const resizedUrl = URL.createObjectURL(blob);

          return {
            ...img,
            resized: true,
            success: true,
            resizedUrl,
          };
        } else {
          return {
            ...img,
            resized: true,
            success: false,
            errorMsg: "No resized data returned.",
          };
        }
      });

      setImages(updated);
      setSuccessMsg(`Successfully resized ${images.length} image(s)!`);
    } catch (error) {
      console.error("Resize error:", error);
      setErrorMsg(error.message || "Resize failed.");
    } finally {
      setIsResizing(false);
    }
  };

  const handleDownloadOne = (img) => {
    if (!img.resizedUrl) return;
    const link = document.createElement("a");
    link.href = img.resizedUrl;
    link.download = `resized-${img.file.name}`;
    link.click();
  };

  const handleDownloadAll = () => {
    images.forEach((img) => {
      if (img.resized && img.success && img.resizedUrl) {
        const link = document.createElement("a");
        link.href = img.resizedUrl;
        link.download = `resized-${img.file.name}`;
        link.click();
      }
    });
  };

  const hasAnyResized = images.some((img) => img.resized && img.success);

  return (
    <div className="relative">
      <div className="mx-auto mt-10 mb-10 w-full max-w-4xl bg-white shadow-lg p-8 rounded-md">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">Resize Images</h1>
        <p className="mt-2 text-lg text-gray-600 text-center">
          Adjust the width and height below (lock ratio optional), and upload up to 5 images!
        </p>

        {errorMsg && <div className="mt-4 text-sm text-red-600 text-center">{errorMsg}</div>}
        {successMsg && <div className="mt-4 text-sm text-green-600 text-center">{successMsg}</div>}

        {/* Dimension inputs + Lock toggle */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <label className="block text-sm font-medium text-gray-700">
              Width
              <input
                type="number"
                value={width}
                onChange={(e) => onChangeWidth(e.target.value)}
                className="mt-1 block w-24 rounded border border-gray-300 px-2 py-1 text-center text-sm"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Height
              <input
                type="number"
                value={height}
                onChange={(e) => onChangeHeight(e.target.value)}
                className="mt-1 block w-24 rounded border border-gray-300 px-2 py-1 text-center text-sm"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={locked}
                onChange={(e) => setLocked(e.target.checked)}
              />
              Lock Ratio
            </label>
          </div>
        </div>

        {/* Uploader */}
        <div className="mt-8">
          <MultipleImageUploaderForResize images={images} onChange={handleImagesChange} />
        </div>

        {/* Action buttons */}
        {images.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <button
              onClick={handleResizeAll}
              disabled={isResizing}
              className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              {isResizing
                ? "Resizing..."
                : images.length === 1
                ? "Resize"
                : "Resize All"}
            </button>

            {hasAnyResized && (
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

        {/* Thumbnails row with horizontal scroll */}
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

                {/* Show resized preview if success, else original */}
                <img
                  src={img.resized && img.success ? img.resizedUrl : img.url}
                  alt={`img-${idx}`}
                  className="max-h-32 object-contain"
                />

                {/* Status text */}
                {img.resized && img.success && (
                  <div className="mt-2 text-green-600 font-semibold">✓ Resized</div>
                )}
                {img.resized && !img.success && (
                  <div className="mt-2 text-red-600 text-sm">
                    {img.errorMsg || "Error"}
                  </div>
                )}

                {/* Download button if resized & success */}
                {img.resized && img.success && (
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