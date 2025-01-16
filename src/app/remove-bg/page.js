"use client"

import React from "react"
import ImageUploaderForRemoveBg from "@/components/ui/ImageUploaderForRemoveBg"

export default function RemoveBGPage() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-gray-800">Remove Background</h1>
      <p className="mt-2 text-lg text-gray-600">
        Automatically remove the background from your images.
      </p>

      <div className="mt-8">
        <ImageUploaderForRemoveBg />
      </div>
    </div>
  )
}