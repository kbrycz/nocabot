"use client";
import React, { useState } from "react";
import MultipleImageUploader from "@/components/ui/MultipleImageUploader";
import { SERVER_BASE_URL } from "@/config";

export default function CompressPage() {
  const [images, setImages] = useState([]); 
  // Each item in `images` is an object:
  // {
  //   file: File,
  //   url: string (object URL),
  //   compressedUrl: string | null,
  //   compressed: boolean,
  //   success: boolean,
  //   errorMsg: string | null
  // }

  const [compressionLevel, setCompressionLevel] = useState(5);
  const [isCompressing, setIsCompressing] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const increment = () => setCompressionLevel((prev) => Math.min(10, prev + 1));
  const decrement = () => setCompressionLevel((prev) => Math.max(1, prev - 1));

  // Called by the multi-uploader to set images (or show an error if >5).
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

  const handleCompressAll = async () => {
    if (!images.length) return;

    setIsCompressing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // 1) Build form data
      const formData = new FormData();
      formData.append("compression_level", compressionLevel.toString());

      // Append each file
      images.forEach((img) => {
        formData.append("images", img.file);
      });

      // 2) POST to /compress
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
        throw new Error("No images returned from server.");
      }

      // 3) data.images -> each has { filename, compressed_b64 }
      const updated = images.map((img, idx) => {
        const serverImg = data.images[idx];
        if (serverImg && serverImg.compressed_b64) {
          // Convert base64 to Blob
          const binary = atob(serverImg.compressed_b64);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], { type: "image/jpeg" });
          const compressedUrl = URL.createObjectURL(blob);

          return {
            ...img,
            compressed: true,
            success: true,
            compressedUrl
          };
        } else {
          return {
            ...img,
            compressed: true,
            success: false,
            errorMsg: "No compressed data returned.",
          };
        }
      });

      setImages(updated);
      setSuccessMsg(`Successfully compressed ${images.length} image(s)!`);
    } catch (error) {
      console.error("Compression error:", error);
      setErrorMsg(error.message || "Compression failed");
    } finally {
      setIsCompressing(false);
    }
  };

  // Download a single compressed image
  const handleDownloadOne = (img) => {
    if (!img.compressedUrl) return;
    const link = document.createElement("a");
    link.href = img.compressedUrl;
    link.download = `compressed-${img.file.name}`;
    link.click();
  };

  // Download all compressed
  const handleDownloadAll = () => {
    images.forEach((img) => {
      if (img.compressed && img.success && img.compressedUrl) {
        const link = document.createElement("a");
        link.href = img.compressedUrl;
        link.download = `compressed-${img.file.name}`;
        link.click();
      }
    });
  };

  const hasAnyCompressed = images.some((img) => img.compressed && img.success);

  return (
    <div className="relative">
      {/* The dotted background is provided by your layout.
          We'll create a white container with shadow. */}
      <div className="mx-auto mt-10 mb-10 w-full max-w-4xl bg-white shadow-lg p-8 rounded-md">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">Compress Images</h1>
        <p className="mt-2 text-lg text-gray-600 text-center">
          You can upload up to 5 images and compress them with a single click!
        </p>

        {errorMsg && (
          <div className="mt-4 text-sm text-red-600 text-center">{errorMsg}</div>
        )}
        {successMsg && (
          <div className="mt-4 text-sm text-green-600 text-center">{successMsg}</div>
        )}

        {/* Compression meter */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={decrement}
              className="inline-flex items-center rounded-l-md bg-gray-100 px-3 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-10"
            >
              -
            </button>
            <span className="w-8 text-center text-xl font-bold text-blue-600">
              {compressionLevel}
            </span>
            <button
              type="button"
              onClick={increment}
              className="inline-flex items-center rounded-r-md bg-gray-100 px-3 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-10"
            >
              +
            </button>
          </div>
        </div>

        {/* Multi-image uploader */}
        <div className="mt-8">
          <MultipleImageUploader images={images} onChange={handleImagesChange} />
        </div>

        {/* Action Buttons */}
        {images.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-4">
            {/* Single or multiple compress button */}
            <button
              onClick={handleCompressAll}
              disabled={isCompressing}
              className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              {isCompressing
                ? "Compressing..."
                : images.length === 1
                ? "Compress"
                : "Compress All"}
            </button>

            {/* Download all if any are compressed */}
            {hasAnyCompressed && (
              <button
                onClick={handleDownloadAll}
                className="rounded-md bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-500"
              >
                Download All
              </button>
            )}

            {/* Clear all */}
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
                {/* Remove icon (top-right) */}
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

                {/* Display the image (compressed if available) */}
                <img
                  src={img.compressed && img.success ? img.compressedUrl : img.url}
                  alt={`img-${idx}`}
                  className="max-h-32 object-contain"
                />

                {/* Status text */}
                {img.compressed && img.success && (
                  <div className="mt-2 text-green-600 font-semibold">✓ Compressed</div>
                )}
                {img.compressed && !img.success && (
                  <div className="mt-2 text-red-600 text-sm">
                    {img.errorMsg || "Error"}
                  </div>
                )}

                {/* Download button if compressed & successful */}
                {img.compressed && img.success && (
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