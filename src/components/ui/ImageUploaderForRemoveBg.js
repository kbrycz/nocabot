"use client"

import React, { useRef, useState } from "react"
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { SERVER_BASE_URL } from "@/config"

export default function ImageUploaderForRemoveBg() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [removed, setRemoved] = useState(false) 
  const [isRemoving, setIsRemoving] = useState(false)

  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setSelectedImage({ file, url })
      setRemoved(false)
      setErrorMsg(null)
      setSuccessMsg(null)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveBg = async () => {
    if (!selectedImage) return

    setIsRemoving(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      const formData = new FormData()
      formData.append("image", selectedImage.file)

      const res = await fetch(`${SERVER_BASE_URL}/remove_bg`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Server error: ${res.status} - ${errorText}`)
      }

      // The server returns a PNG with background removed
      const blob = await res.blob()
      const newUrl = URL.createObjectURL(blob)

      // Update local state to show the new BG-removed image
      setSelectedImage((prev) => ({
        ...prev,
        url: newUrl,
      }))
      setRemoved(true)
      setSuccessMsg("Background successfully removed!")
    } catch (error) {
      console.error("Remove BG failed:", error)
      setErrorMsg(`Remove BG failed: ${error.message}`)
    } finally {
      setIsRemoving(false)
    }
  }

  const handleReplace = () => {
    fileInputRef.current?.click()
  }

  const handleDownload = () => {
    if (!selectedImage || !removed) return

    const link = document.createElement("a")
    link.href = selectedImage.url
    link.download = "image-no-bg.png"
    link.click()
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setRemoved(false)
    setErrorMsg(null)
    setSuccessMsg(null)
  }

  return (
    <div className="flex flex-col items-center">
      {/* Error/Success messages */}
      {errorMsg && <p className="mb-2 text-sm text-red-600">{errorMsg}</p>}
      {successMsg && <p className="mb-2 text-sm text-green-600">{successMsg}</p>}

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
                disabled={isRemoving}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                {isRemoving ? "Removing..." : "Remove Background"}
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