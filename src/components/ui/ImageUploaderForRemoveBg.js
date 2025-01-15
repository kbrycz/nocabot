// src/components/ui/ImageUploaderForRemoveBg.js
"use client"

import React, { useRef, useState } from "react"
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid"

export default function ImageUploaderForRemoveBg() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [removed, setRemoved] = useState(false) // has the background been removed yet?
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setSelectedImage({ file, url })
      setRemoved(false) // reset if user picks new file
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveBg = () => {
    // Placeholder for background removal logic
    alert("Removing background... (not implemented)")
    setRemoved(true)
  }

  const handleReplace = () => {
    fileInputRef.current?.click()
  }

  const handleDownload = () => {
    if (!selectedImage) return
    if (!removed) return

    // For now, just re-download the original
    // In real logic, you'd link to the "removed background" version
    const link = document.createElement("a")
    link.href = selectedImage.url
    link.download = "image-no-bg.png"
    link.click()
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setRemoved(false)
  }

  return (
    <div className="flex flex-col items-center">
      {selectedImage ? (
        <div className="relative flex flex-col items-center gap-4">
          {/* 'X' corner button */}
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-4 -right-4 rounded-full bg-gray-200 p-1 text-gray-600 shadow hover:bg-gray-300"
          >
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Image preview */}
          <img
            src={selectedImage.url}
            alt="Selected"
            className="max-h-72 rounded border border-gray-200 object-contain"
          />

          <div className="mt-2 flex flex-row items-center gap-3">
            {!removed && (
              <button
                type="button"
                onClick={handleRemoveBg}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Remove Background
              </button>
            )}

            {removed && (
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Download
              </button>
            )}

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
  )
}
