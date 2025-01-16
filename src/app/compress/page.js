"use client"
import React, { useState } from "react"
import ImageUploader from "@/components/ui/ImageUploader"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import { SERVER_BASE_URL } from "@/config"  // <<--- Our global server URL

export default function CompressPage() {
  const [hasImage, setHasImage] = useState(false)
  const [compressionLevel, setCompressionLevel] = useState(5)

  // We'll store selectedImage state here too, so we can access it to compress.
  // selectedImage = { file, url }
  const [selectedImage, setSelectedImage] = useState(null)

  // Track compression
  const [isCompressing, setIsCompressing] = useState(false)
  const [isImageCompressed, setIsImageCompressed] = useState(false) // Hide button post-compression

  // For user messages
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  const increment = () => setCompressionLevel((prev) => Math.min(10, prev + 1))
  const decrement = () => setCompressionLevel((prev) => Math.max(1, prev - 1))

  // Callback from ImageUploader
  const handleImageSelected = (fileObj) => {
    setSelectedImage(fileObj) // { file, url }
    setHasImage(true)
    setIsImageCompressed(false)
    setErrorMsg(null)
    setSuccessMsg(null)
  }

  // Callback from ImageUploader
  const handleImageRemoved = () => {
    setSelectedImage(null)
    setHasImage(false)
    setIsImageCompressed(false)
    setErrorMsg(null)
    setSuccessMsg(null)
  }

  const handleCompress = async () => {
    if (!selectedImage) return

    setIsCompressing(true)
    setErrorMsg(null)
    setSuccessMsg(null) // clear any old messages

    try {
      // 1) Build form data
      const formData = new FormData()
      formData.append("image", selectedImage.file)
      formData.append("compression_level", compressionLevel)

      // 2) POST to Flask server
      const res = await fetch(`${SERVER_BASE_URL}/compress`, {
        method: "POST",
        body: formData,
      })

      // If the server responded with an error status
      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`)
      }

      // 3) Get back the compressed image as Blob
      const blob = await res.blob()

      // 4) Create a new URL for the compressed blob
      const compressedUrl = URL.createObjectURL(blob)

      // 5) Update selectedImage to show the compressed version
      setSelectedImage((prev) => ({
        ...prev,
        url: compressedUrl,
      }))

      // Mark it compressed
      setIsImageCompressed(true)
      setSuccessMsg("Compression successful! The preview below is now compressed.")
    } catch (error) {
      console.error("Compression failed", error)
      setErrorMsg(`Compression failed: ${error.message}`)
    } finally {
      setIsCompressing(false)
    }
  }

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-gray-800">Compress Images</h1>
      <p className="mt-2 text-lg text-gray-600">
        Here you can compress images quickly using our Flask backend!
      </p>

      {/* Error/Success messages */}
      {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
      {successMsg && <p className="mt-4 text-sm text-green-600">{successMsg}</p>}

      {/* Show compression scale if we do NOT have an image yet */}
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

      <div className="mt-8">
        <ImageUploader
          onImageSelected={handleImageSelected}
          onRemoveImage={handleImageRemoved}
        />
      </div>

      {/* Show "Compress" button only if we have an image & have not already compressed */}
      {hasImage && !isImageCompressed && (
        <div className="mt-6">
          <button
            onClick={handleCompress}
            disabled={isCompressing}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            {isCompressing ? "Compressing..." : "Compress"}
          </button>
        </div>
      )}
    </div>
  )
}