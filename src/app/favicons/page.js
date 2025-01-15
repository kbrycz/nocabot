"use client"

import React, { useState, useRef } from "react"
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid"

export default function FaviconsPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setSelectedImage({ file, url })
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleReplace = () => {
    fileInputRef.current?.click()
  }

  const handleDownloadFavicon = () => {
    if (!selectedImage) return
    // Eventually you'd generate .ico or PNG in logic
    alert("Download Favicon logic not implemented yet.")
  }

  const handleRemove = () => {
    setSelectedImage(null)
  }

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-gray-800">Favicons</h1>
      <p className="mt-2 text-lg text-gray-600">
        Upload an image to generate or download a Favicon.
      </p>

      <div className="mt-8">
        {selectedImage ? (
          // Show preview + "Download Favicon" & "Replace Image"
          <div className="relative flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleRemove}
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

            <div className="mt-2 flex gap-4">
              <button
                type="button"
                onClick={handleDownloadFavicon}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Download Favicon
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
            className="flex h-72 w-72 cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dotted border-gray-300 p-4 text-gray-500 hover:border-gray-400 hover:bg-gray-50"
          >
            <PlusIcon aria-hidden="true" className="h-8 w-8 text-indigo-600" />
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
    </div>
  )
}