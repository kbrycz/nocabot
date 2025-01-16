"use client"

import React, { useRef, useState } from "react"
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { SERVER_BASE_URL } from "@/config"

export default function ImageUploaderForConvert() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [convertedFormat, setConvertedFormat] = useState("png")
  const [converted, setConverted] = useState(false)

  const [isConverting, setIsConverting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setSelectedImage({ file, url })
      setConverted(false)
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

  const handleConvert = async () => {
    if (!selectedImage) return

    setIsConverting(true)
    setConverted(false)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      // Build form data
      const formData = new FormData()
      formData.append("image", selectedImage.file)
      formData.append("target_format", convertedFormat)

      // POST to /convert
      const res = await fetch(`${SERVER_BASE_URL}/convert`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Server error: ${res.status} - ${errorText}`)
      }

      // Get the converted image as a Blob
      const blob = await res.blob()
      const convertedUrl = URL.createObjectURL(blob)

      // Update local preview
      setSelectedImage((prev) => ({
        ...prev,
        url: convertedUrl,
      }))
      setConverted(true)
      setSuccessMsg(`Successfully converted to ${convertedFormat}!`)
    } catch (error) {
      console.error("Conversion failed:", error)
      setErrorMsg(`Conversion failed: ${error.message}`)
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (!selectedImage || !converted) return

    // We'll name the file "converted.<format>"
    const link = document.createElement("a")
    link.href = selectedImage.url
    link.download = `converted.${convertedFormat}`
    link.click()
  }

  const handleRemove = () => {
    setSelectedImage(null)
    setConverted(false)
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

          {/* Format dropdown + Convert, Replace, (Download if converted) */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Convert To:</label>
              <select
                value={convertedFormat}
                onChange={(e) => {
                  setConvertedFormat(e.target.value)
                  setConverted(false) // if user changes format, reset
                  setErrorMsg(null)
                  setSuccessMsg(null)
                }}
                className="rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="gif">GIF</option>
                <option value="webp">WEBP</option>
                <option value="bmp">BMP</option>
                <option value="tiff">TIFF</option>
                {/* <option value="heic">HEIC</option>  <-- If you install pillow-heif */}
              </select>
            </div>

            <div className="mt-2 flex gap-3">
              {!converted && (
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  {isConverting ? "Converting..." : "Convert"}
                </button>
              )}

              {converted && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Download as {convertedFormat}
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