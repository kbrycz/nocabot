"use client";

import React, { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

/**
 * props:
 *  - images: array of image objects
 *  - onChange(newImages): function
 *
 * Allows drag-and-drop or click to select up to 5 images for resizing.
 * We store each image's natural dimension so we can do ratio logic.
 */
export default function MultipleImageUploaderForResize({ images, onChange }) {
  const [dropError, setDropError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    processFiles(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Convert each File to an image object with natural dimension
  const processFiles = async (fileArr) => {
    setDropError(null);
    if (!fileArr.length) return;

    let newItems = [];
    for (let file of fileArr) {
      const url = URL.createObjectURL(file);

      // We load an <img> to get the width/height
      const dim = await getImageDimensions(url);

      newItems.push({
        file,
        url,
        resizedUrl: null,
        resized: false,
        success: false,
        errorMsg: null,
        originalWidth: dim.width,
        originalHeight: dim.height,
      });
    }

    const combined = [...images, ...newItems];
    if (combined.length > 5) {
      setDropError("We only accept up to 5 images at this time.");
      onChange(combined.slice(0, 5));
      return;
    }

    onChange(combined);
  };

  // Helper: Load an <img> to read width/height
  const getImageDimensions = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      {dropError && (
        <div className="mb-2 text-sm text-red-600">{dropError}</div>
      )}

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
  );
}