"use client";

import React, { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

/**
 * props:
 *  - images: array of { file, url, ... }
 *  - onChange(newImages) => void
 *
 * Allows drag-and-drop or click to add up to 5 images.
 * If user tries to add more than 5, we show an error at the top.
 */
export default function MultipleImageUploader({ images, onChange }) {
  const [dropError, setDropError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  };

  // Called if user drags files onto the container
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    processFiles(droppedFiles);
  };

  // Generic function to merge newly dropped/selected files
  const processFiles = (fileArr) => {
    setDropError(null);
    if (!fileArr.length) return;

    // Convert each File to the object
    const newItems = fileArr.map((file) => {
      const url = URL.createObjectURL(file);
      return {
        file,
        url,
        compressedUrl: null,
        compressed: false,
        success: false,
        errorMsg: null,
      };
    });

    // Merge with existing
    const combined = [...images, ...newItems];

    if (combined.length > 5) {
      setDropError("We only accept up to 5 images at this time.");
      // Slice to 5
      onChange(combined.slice(0, 5));
      return;
    }

    onChange(combined);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center">
      {/* If there's a drop error, show it */}
      {dropError && (
        <div className="mb-2 text-sm text-red-600">{dropError}</div>
      )}

      {/* Big drag-and-drop area */}
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

      {/* Hidden file input */}
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