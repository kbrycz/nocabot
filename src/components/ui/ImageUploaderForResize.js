// src/components/ui/ImageUploaderForResize.js
"use client"

import React, { useRef, useState } from "react"
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid"

export default function ImageUploaderForResize() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [locked, setLocked] = useState(true)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [originalRatio, setOriginalRatio] = useState(1)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)

      // Create an HTML img to read the natural dimension
      const img = new Image()
      img.src = url
      img.onload = () => {
        const w = img.naturalWidth
        const h = img.naturalHeight
        setWidth(w)
        setHeight(h)
        setOriginalRatio(h / w)
        setSelectedImage({ file, url })
      }
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleReplace = () => {
    fileInputRef.current?.click()
  }

  const handleDownload = () => {
    if (selectedImage?.url) {
      // dummy approach (like compress version)
      const link = document.createElement("a")
      link.href = selectedImage.url
      link.download = selectedImage.file.name || "image.png"
      link.click()
    }
  }

  const handleRemove = () => {
    setSelectedImage(null)
    setWidth(0)
    setHeight(0)
  }

  const handleResize = () => {
    // We'll do the actual resizing logic later
    alert(`Resizing image to ${width} x ${height} (locked ratio = ${locked})`)
  }

  // Handle dimension changes
  const onChangeWidth = (val) => {
    const newW = parseInt(val || 0, 10)
    setWidth(newW)
    if (locked && newW > 0) {
      setHeight(Math.round(newW * originalRatio))
    }
  }

  const onChangeHeight = (val) => {
    const newH = parseInt(val || 0, 10)
    setHeight(newH)
    if (locked && newH > 0) {
      setWidth(Math.round(newH / originalRatio))
    }
  }

  return (
    <div className="flex flex-col items-center">
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
            <button
              type="button"
              onClick={handleResize}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Resize
            </button>
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
        // If no image, show dotted box (like the compress one)
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
  )
}
