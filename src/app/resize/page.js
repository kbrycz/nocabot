"use client";

import React from "react";
import ImageUploaderForResize from "@/components/ui/ImageUploaderForResize";

export default function ResizePage() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-gray-800">Resize Images</h1>
      <p className="mt-2 text-lg text-gray-600">
        Adjust the width and height, or lock the ratio to keep them in sync.
      </p>

      <div className="mt-8">
        <ImageUploaderForResize />
      </div>
    </div>
  );
}