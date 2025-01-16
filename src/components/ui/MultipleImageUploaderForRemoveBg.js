"use client";

import React, { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

/**
 * Multi-image remove BG (simulated).
 * We'll let users upload up to 5 images, then "Remove BG" is just an alert
 * that sets a "removed" flag for each image, plus a success message.
 */
export default function MultipleImageUploaderForRemoveBg() {
  const [images, setImages] = useState([]); 
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const fileArr = Array.from(e.target.files || []);
    processFiles(fileArr);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fileArr = Array.from(e.dataTransfer.files || []);
    processFiles(fileArr);
  };

  const handleDragOver = (e) => e.preventDefault();

  const processFiles = (fileArr) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fileArr.length) return;

    const newItems = fileArr.map((file) => {
      const url = URL.createObjectURL(file);
      return {
        file,
        url,
        removed: false,
      };
    });

    const combined = [...images, ...newItems];
    if (combined.length > 5) {
      setErrorMsg("We only accept up to 5 images at this time.");
      setImages(combined.slice(0, 5));
      return;
    }

    setImages(combined);
  };

  const handleRemoveAll = () => {
    setImages([]);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleRemoveOne = (idx) => {
    const filtered = images.filter((_, i) => i !== idx);
    setImages(filtered);
  };

  const handleRemoveBgAll = () => {
    if (!images.length) return;

    setIsRemoving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // Just simulate removing background
    setTimeout(() => {
      alert("Background removal is simulated. In real usage, we'd call an API here.");
      const updated = images.map((img) => ({ ...img, removed: true }));
      setImages(updated);
      setSuccessMsg(`Removed background from ${images.length} image(s)!`);
      setIsRemoving(false);
    }, 1200);
  };

  const handleDownloadOne = (idx) => {
    const img = images[idx];
    if (!img || !img.removed) return;
    // We pretend the "removed" version is still img.url.
    // Real usage: you'd set a new "removedUrl" after the server returns it.
    const link = document.createElement("a");
    link.href = img.url;
    link.download = "image-no-bg.png";
    link.click();
  };

  const handleDownloadAll = () => {
    images.forEach((img) => {
      if (img.removed) {
        const link = document.createElement("a");
        link.href = img.url;
        link.download = "image-no-bg.png";
        link.click();
      }
    });
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const hasAnyRemoved = images.some((img) => img.removed);

  return (
    <div>
      {/* Error/Success */}
      {errorMsg && <div className="mb-2 text-sm text-red-600 text-center">{errorMsg}</div>}
      {successMsg && <div className="mb-2 text-sm text-green-600 text-center">{successMsg}</div>}

      {/* Drag/Drop area if no images */}
      {images.length === 0 && (
        <div
          className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-white text-gray-500 hover:bg-gray-50 cursor-pointer"
          onClick={handleUploadClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center gap-1">
            <PlusIcon aria-hidden="true" className="h-8 w-8 text-indigo-600" />
            <span className="text-sm text-gray-600">
              Drag & Drop or Click to Upload (up to 5)
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      )}

      {/* If images exist, show actions + horizontal scroll */}
      {images.length > 0 && (
        <div>
          {/* Action buttons */}
          <div className="mt-4 flex flex-col items-center gap-4">
            <button
              onClick={handleRemoveBgAll}
              disabled={isRemoving}
              className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              {isRemoving ? "Removing..." : "Remove Background"}
            </button>

            {hasAnyRemoved && (
              <button
                onClick={handleDownloadAll}
                className="rounded-md bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-500"
              >
                Download All
              </button>
            )}

            <button
              onClick={handleRemoveAll}
              className="rounded-md bg-gray-300 px-6 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400"
            >
              Clear All
            </button>
          </div>

          {/* Thumbnails row */}
          <div className="mt-8 flex flex-nowrap gap-4 overflow-x-auto">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-48 h-48 flex-shrink-0 border rounded-md flex flex-col items-center justify-center bg-gray-50 p-2"
              >
                {/* Remove one */}
                <button
                  type="button"
                  onClick={() => handleRemoveOne(idx)}
                  className="absolute top-1 right-1 rounded-full bg-gray-200 p-1 text-gray-600 shadow hover:bg-gray-300"
                >
                  ✕
                </button>

                <img
                  src={img.url}
                  alt={`img-${idx}`}
                  className="max-h-32 object-contain"
                />

                {img.removed && (
                  <div className="mt-2 text-green-600 font-semibold">✓ BG Removed</div>
                )}

                {img.removed && (
                  <button
                    onClick={() => handleDownloadOne(idx)}
                    className="mt-2 rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-500"
                  >
                    Download
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden input (again) */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}