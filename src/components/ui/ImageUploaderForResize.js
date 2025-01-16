"use client";

import React, { useRef, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { SERVER_BASE_URL } from "@/config";

export default function ImageUploaderForResize() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [locked, setLocked] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [originalRatio, setOriginalRatio] = useState(1);

  // Additional states for resizing
  const [isResizing, setIsResizing] = useState(false);
  const [resized, setResized] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);

      // Create an HTML img to read the natural dimension
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        setWidth(w);
        setHeight(h);
        setOriginalRatio(h / w);
        setSelectedImage({ file, url });

        // Reset states
        setResized(false);
        setErrorMsg(null);
        setSuccessMsg(null);
      };
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleReplace = () => {
    fileInputRef.current?.click();
  };

  const handleDownload = () => {
    if (selectedImage?.url) {
      // "Download" the currently displayed image
      const link = document.createElement("a");
      link.href = selectedImage.url;
      link.download = selectedImage.file?.name || "image.png";
      link.click();
    }
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setWidth(0);
    setHeight(0);
    setResized(false);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  // The big difference: Actually calling the server to resize the image
  const handleResize = async () => {
    if (!selectedImage) return;

    setIsResizing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // Build form data
      const formData = new FormData();
      formData.append("image", selectedImage.file);
      formData.append("width", width);
      formData.append("height", height);

      // POST to Flask /resize endpoint
      const res = await fetch(`${SERVER_BASE_URL}/resize`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      const blob = await res.blob();
      const resizedUrl = URL.createObjectURL(blob);

      // Update the selectedImage preview
      setSelectedImage((prev) => ({
        ...prev,
        url: resizedUrl,
      }));

      setResized(true);
      setSuccessMsg(`Successfully resized to ${width} x ${height}!`);
    } catch (error) {
      console.error("Resize failed:", error);
      setErrorMsg(`Resize failed: ${error.message}`);
    } finally {
      setIsResizing(false);
    }
  };

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

  return (
    <div className="flex flex-col items-center">
      {/* Error and success messages */}
      {errorMsg && <p className="mb-2 text-sm text-red-600">{errorMsg}</p>}
      {successMsg && <p className="mb-2 text-sm text-green-600">{successMsg}</p>}

      {selectedImage ? (
        <div className="relative flex flex-col items-center gap-4">
          {/* 'X' corner button */}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-4 -right-4 rounded-full bg-gray-200 p-1 text-gray-600 shadow hover:bg-gray-300"
          >
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Show the image preview */}
          <img
            src={selectedImage.url}
            alt="Selected"
            className="max-h-72 rounded border border-gray-200 object-contain"
          />

          {/* Dimension fields + lock toggle */}
          <div className="mt-2 flex items-center gap-4">
            <div className="flex flex-col">
              <label className="text-xs text-gray-500">Width (px)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => onChangeWidth(e.target.value)}
                className="w-24 rounded border border-gray-300 px-2 py-1 text-center text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-500">Height (px)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => onChangeHeight(e.target.value)}
                className="w-24 rounded border border-gray-300 px-2 py-1 text-center text-sm"
              />
            </div>

            {/* Lock toggle */}
            <label className="flex items-center gap-2 text-sm text-gray-500">
              <input
                type="checkbox"
                checked={locked}
                onChange={(e) => setLocked(e.target.checked)}
              />
              Lock Ratio
            </label>
          </div>

          {/* Buttons: Resize, Download, Replace */}
          <div className="mt-4 flex gap-4">
            {/* Resize triggers the server call */}
            {!resized && (
              <button
                type="button"
                onClick={handleResize}
                disabled={isResizing}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                {isResizing ? "Resizing..." : "Resize"}
              </button>
            )}

            <button
              type="button"
              onClick={handleDownload}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Download
            </button>
            <button
              type="button"
              onClick={handleReplace}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Replace Image
            </button>
          </div>
        </div>
      ) : (
        // If no image, show dotted box
        <div
          onClick={handleUploadClick}
          className="flex h-96 w-96 cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dotted border-gray-300 p-4 text-gray-500 hover:border-gray-400 hover:bg-gray-50"
        >
          <PlusIcon aria-hidden="true" className="h-10 w-10 text-indigo-600" />
          <span className="text-sm">Upload Image</span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}