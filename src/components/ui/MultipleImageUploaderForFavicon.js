"use client";

import React, { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

/**
 * Allows multiple images (up to 5) drag-and-drop or click, for Favicon generation.
 */
export default function MultipleImageUploaderForFavicon({ images, onChange }) {
  const [dropError, setDropError] = useState(null);
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
    setDropError(null);
    if (!fileArr.length) return;

    const newItems = fileArr.map((file) => {
      const url = URL.createObjectURL(file);
      return {
        file,
        url,
        faviconUrl: null,
        success: false,
        errorMsg: null,
      };
    });

    const combined = [...images, ...newItems];
    if (combined.length > 5) {
      setDropError("We only accept up to 5 images at this time.");
      onChange(combined.slice(0, 5));
      return;
    }

    onChange(combined);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      {dropError && <div className="mb-2 text-sm text-red-600">{dropError}</div>}

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