"use client"

import React, { useState, useRef } from "react"
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { SERVER_BASE_URL } from "@/config"

export default function FaviconsPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setSelectedImage({ file, url })
      setErrorMsg(null)
      setSuccessMsg(null)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleReplace = () => {
    fileInputRef.current?.click()
  }

  const handleDownloadFavicon = async () => {
    if (!selectedImage) return

    setIsGenerating(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      // Build form data
      const formData = new FormData()
      formData.append("image", selectedImage.file)

      // POST to /favicon
      const res = await fetch(`${SERVER_BASE_URL}/favicon`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Server error: ${res.status} - ${errorText}`)
      }

      // We'll get back a .ico (or .png if you prefer)
      const blob = await res.blob()
      const faviconUrl = URL.createObjectURL(blob)

      // "Download" it to the user's computer
      const link = document.createElement("a")
      link.href = faviconUrl
      link.download = "favicon.ico"
      link.click()

      setSuccessMsg("Favicon generated & downloaded successfully!")
    } catch (error) {
      console.error("Favicon generation failed:", error)
      setErrorMsg(`Favicon generation failed: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRemove = () => {
    setSelectedImage(null)
    setErrorMsg(null)
    setSuccessMsg(null)
  }

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-gray-800">Favicons</h1>
      <p className="mt-2 text-lg text-gray-600">
        Upload an image to generate or download a Favicon.
      </p>

      {/* Error/Success messages */}
      {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
      {successMsg && <p className="mt-4 text-sm text-green-600">{successMsg}</p>}

      <div className="mt-8">
        {selectedImage ? (
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
                disabled={isGenerating}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                {isGenerating ? "Generating..." : "Download Favicon"}
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