// src/app/compress/page.js
"use client"

import React, { useState } from "react"
import ImageUploader from "@/components/ui/ImageUploader"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

export default function CompressPage() {
  // Track whether an image is selected or not
  const [hasImage, setHasImage] = useState(false)

  // Track compression level from 1..10
  const [compressionLevel, setCompressionLevel] = useState(5)

  const increment = () => {
    setCompressionLevel((prev) => Math.min(10, prev + 1))
  }

  const decrement = () => {
    setCompressionLevel((prev) => Math.max(1, prev - 1))
  }

  const handleImageSelected = () => {
    setHasImage(true)
  }

  const handleImageRemoved = () => {
    setHasImage(false)
  }

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-gray-800">Compress Images</h1>
      <p className="mt-2 text-lg text-gray-600">
        Here you can compress images quickly. (Logic coming soon!)
      </p>

      {/* Show compression scale only if no image is selected */}
      {!hasImage && (
        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500">Compression Scale (1-10)</span>
          <div className="inline-flex items-center gap-4">
            <button
              type="button"
              onClick={decrement}
              className="inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            <span className="w-8 text-center text-lg font-bold text-blue-600">
              {compressionLevel}
            </span>
            <button
              type="button"
              onClick={increment}
              className="inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Upload box (or image if selected) */}
      <div className="mt-8">
        <ImageUploader
          onImageSelected={handleImageSelected}
          onRemoveImage={handleImageRemoved}
        />
      </div>
    </div>
  )
}
