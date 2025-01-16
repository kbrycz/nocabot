"use client"

import React from "react"
import ImageUploaderForConvert from "@/components/ui/ImageUploaderForConvert"

export default function ConvertPage() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-gray-800">Convert Images</h1>
      <p className="mt-2 text-lg text-gray-600">
        Select an image and choose a new format to convert to.
      </p>

      <div className="mt-8">
        <ImageUploaderForConvert />
      </div>
    </div>
  )
}