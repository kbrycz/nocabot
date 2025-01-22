"use client";

import React, { useRef } from "react";
import { useImageContext } from "@/context/ImageProvider";
import { PlusIcon } from "@heroicons/react/20/solid";

/**
 * props:
 *   didProcess: boolean - if true, show "Download" on each image
 *   onDownloadOne: function(index) => called when user clicks "Download" on a single image
 */
export default function GlobalUploader({ didProcess, onDownloadOne }) {
  const { globalImages, addImages, removeImage } = useImageContext();
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    addImages(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    if (!droppedFiles.length) return;
    addImages(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white p-6 text-gray-600"
      style={{ minHeight: 300 }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleUploadClick}
    >
      {/* If no images, show the + icon and text in the center */}
      {globalImages.length === 0 && (
        <div className="pointer-events-none flex flex-col items-center justify-center text-center">
          <PlusIcon className="h-10 w-10 text-[#0984e3]" />
          <p className="mt-2 text-sm text-gray-600">
            Drag &amp; Drop or Click to Upload <br /> (up to 5)
          </p>
        </div>
      )}

      {/* If we have images, show them in a row (or grid) within the same box */}
      {globalImages.length > 0 && (
        <div className="pointer-events-none flex flex-wrap justify-center gap-4">
          {globalImages.map((img, idx) => (
            <div
              key={idx}
              className="pointer-events-auto relative h-40 w-40 overflow-hidden rounded-md border border-gray-200 bg-gray-50"
            >
              {/* X button (top-right) */}
              <button
                type="button"
                onClick={(ev) => {
                  ev.stopPropagation();
                  removeImage(idx);
                }}
                className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
              >
                <span className="text-base font-bold">&times;</span>
              </button>

              {/* If didProcess is true, show "Download" at the bottom-center */}
              {didProcess && (
                <button
                  type="button"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    if (onDownloadOne) onDownloadOne(idx);
                  }}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 transform rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-500"
                >
                  Download
                </button>
              )}

              {/* The image preview */}
              <img
                src={img.url}
                alt={`uploaded-${idx}`}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      )}

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
