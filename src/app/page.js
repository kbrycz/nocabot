"use client";
import React from "react";

export default function HomePage() {
  return (
    <div className="relative">
      <div className="mx-auto mt-10 mb-10 w-full max-w-7xl bg-white shadow-lg p-8 rounded-md">
        {/* Main Title & Subtitle */}
        <h1 className="text-5xl font-extrabold text-gray-800 text-center">Welcome to Nocabot</h1>
        <p className="mt-2 text-lg text-gray-600 text-center">
          Transform your images with ease—remove backgrounds, compress, resize, or convert formats.
        </p>

        {/* 2 x 2 Feature Grid */}
        <div className="mt-12 grid w-full gap-4 sm:mt-16 lg:grid-cols-2 lg:grid-rows-2">
          {/* Remove BG */}
          <div className="relative">
            <div className="absolute inset-px rounded-lg bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg shadow ring-1 ring-black/5">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="text-lg font-medium tracking-tight text-gray-950">Remove Background</p>
                <p className="mt-2 text-sm text-gray-600">
                  Quickly remove backgrounds from images for a cleaner, more focused look.
                </p>
              </div>
              <div className="mt-4 flex flex-1 items-center justify-center px-8 pb-8 sm:px-10">
                <img
                  className="h-40 w-full max-w-sm rounded object-cover"
                  src="/images/rm_background.png"
                  alt="Remove Background"
                />
              </div>
            </div>
          </div>

          {/* Compression */}
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
                  className="h-40 w-full max-w-sm rounded object-cover"
                  src="/images/compress.png"
                  alt="Compression"
                />
              </div>
            </div>
          </div>

          {/* Resize */}
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
                  className="h-40 w-full max-w-sm rounded object-cover"
                  src="/images/resize.png"
                  alt="Resize"
                />
              </div>
            </div>
          </div>

          {/* Convert */}
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
                  className="h-40 w-full max-w-sm rounded object-cover"
                  src="/images/convert.png"
                  alt="Convert"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}