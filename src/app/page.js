"use client"

import React from "react"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Main Title & Subtitle */}
      <h1 className="text-5xl font-extrabold text-gray-800">Welcome to Nocabot</h1>
      <p className="mt-2 text-lg text-gray-600">
        Transform your images with ease—remove backgrounds, compress, resize, or convert formats.
      </p>

      {/* 2 x 2 Feature Grid (on dotted background) */}
      <div className="mt-12 grid w-full max-w-7xl gap-4 sm:mt-16 lg:grid-cols-2 lg:grid-rows-2">
        {/* 1) Remove Background */}
        <div className="relative">
          <div className="absolute inset-px rounded-lg bg-white" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-lg shadow ring-1 ring-black/5">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="text-lg font-medium tracking-tight text-gray-950">Remove Background</p>
              <p className="mt-2 text-sm text-gray-600">
                Quickly remove backgrounds from images for a cleaner, more focused look.
              </p>
            </div>
            {/* Desktop Placeholder */}
            <div className="mt-4 flex flex-1 items-center justify-center px-8 pb-8 sm:px-10">
              <img
                className="h-40 w-full max-w-sm rounded object-cover bg-gray-200"
                src="#"
                alt="Remove Background"
              />
            </div>
          </div>
        </div>

        {/* 2) Compression */}
        <div className="relative">
          <div className="absolute inset-px rounded-lg bg-white" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-lg shadow ring-1 ring-black/5">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="text-lg font-medium tracking-tight text-gray-950">Compression</p>
              <p className="mt-2 text-sm text-gray-600">
                Reduce file sizes while preserving image quality—perfect for faster load times.
              </p>
            </div>
            <div className="mt-4 flex flex-1 items-center justify-center px-8 pb-8 sm:px-10">
              <img
                className="h-40 w-full max-w-sm rounded object-cover bg-gray-200"
                src="#"
                alt="Compression"
              />
            </div>
          </div>
        </div>

        {/* 3) Resize */}
        <div className="relative">
          <div className="absolute inset-px rounded-lg bg-white" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-lg shadow ring-1 ring-black/5">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="text-lg font-medium tracking-tight text-gray-950">Resize</p>
              <p className="mt-2 text-sm text-gray-600">
                Adjust your image dimensions freely or lock aspect ratios with ease.
              </p>
            </div>
            <div className="mt-4 flex flex-1 items-center justify-center px-8 pb-8 sm:px-10">
              <img
                className="h-40 w-full max-w-sm rounded object-cover bg-gray-200"
                src="#"
                alt="Resize"
              />
            </div>
          </div>
        </div>

        {/* 4) Convert */}
        <div className="relative">
          <div className="absolute inset-px rounded-lg bg-white" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-lg shadow ring-1 ring-black/5">
            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
              <p className="text-lg font-medium tracking-tight text-gray-950">Convert</p>
              <p className="mt-2 text-sm text-gray-600">
                Effortlessly switch between PNG, JPG, GIF, WebP, and more.
              </p>
            </div>
            <div className="mt-4 flex flex-1 items-center justify-center px-8 pb-8 sm:px-10">
              <img
                className="h-40 w-full max-w-sm rounded object-cover bg-gray-200"
                src="#"
                alt="Convert"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
