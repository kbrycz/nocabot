"use client";
import React, { useState } from "react";
import MultipleImageUploaderForConvert from "@/components/ui/MultipleImageUploaderForConvert";
import { SERVER_BASE_URL } from "@/config";

export default function ConvertPage() {
  const [images, setImages] = useState([]);
  // images: array of objects like:
  // {
  //   file: File,
  //   url: string (local object URL),
  //   convertedUrl: string | null,
  //   converted: boolean,
  //   success: boolean,
  //   errorMsg: string | null
  // }

  const [targetFormat, setTargetFormat] = useState("png");
  const [isConverting, setIsConverting] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleClearAll = () => {
    setImages([]);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  // Convert all images in one request
  const handleConvertAll = async () => {
    if (!images.length) return;

    setIsConverting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData();
      formData.append("target_format", targetFormat);

      images.forEach((img) => {
        formData.append("images", img.file);
      });

      const res = await fetch(`${SERVER_BASE_URL}/convert`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} - ${text}`);
      }

      const data = await res.json();
      if (!data.images) {
        throw new Error("No images returned from server.");
      }

      // data.images -> array of { filename, converted_b64 }
      const updated = images.map((img, idx) => {
        const serverImg = data.images[idx];
        if (serverImg && serverImg.converted_b64) {
          // Convert base64 to blob
          const binary = atob(serverImg.converted_b64);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([array], { type: "image/" + targetFormat });
          const convertedUrl = URL.createObjectURL(blob);

          return {
            ...img,
            converted: true,
            success: true,
            convertedUrl,
          };
        } else {
          return {
            ...img,
            converted: true,
            success: false,
            errorMsg: "No data returned",
          };
        }
      });

      setImages(updated);
      setSuccessMsg(`Successfully converted ${images.length} image(s) to ${targetFormat}!`);
    } catch (error) {
      console.error("Convert error:", error);
      setErrorMsg(error.message || "Conversion failed");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownloadOne = (img) => {
    if (!img.convertedUrl) return;
    const link = document.createElement("a");
    link.href = img.convertedUrl;
    link.download = `converted.${targetFormat}`;
    link.click();
  };

  const handleDownloadAll = () => {
    images.forEach((img) => {
      if (img.converted && img.success && img.convertedUrl) {
        const link = document.createElement("a");
        link.href = img.convertedUrl;
        link.download = `converted.${targetFormat}`;
        link.click();
      }
    });
  };

  const hasAnyConverted = images.some((img) => img.converted && img.success);

  return (
    <div className="relative">
      <div className="mx-auto mt-10 mb-10 w-full max-w-4xl bg-white shadow-lg p-8 rounded-md">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">Convert Images</h1>
        <p className="mt-2 text-lg text-gray-600 text-center">
          Select up to 5 images and choose a new format to convert them all at once!
        </p>

        {/* Error/Success */}
        {errorMsg && <div className="mt-4 text-sm text-red-600 text-center">{errorMsg}</div>}
        {successMsg && <div className="mt-4 text-sm text-green-600 text-center">{successMsg}</div>}

        {/* Format dropdown (prettier via Tailwind classes) */}
        <div className="mt-6 flex justify-center">
          <label className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            Convert To:
            <select
              value={targetFormat}
              onChange={(e) => {
                setTargetFormat(e.target.value);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:outline-none shadow-sm"
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="gif">GIF</option>
              <option value="webp">WEBP</option>
              <option value="bmp">BMP</option>
              <option value="tiff">TIFF</option>
            </select>
          </label>
        </div>

        {/* Multi-uploader */}
        <div className="mt-8">
          <MultipleImageUploaderForConvert images={images} onChange={handleImagesChange} />
        </div>

        {/* Action buttons */}
        {images.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <button
              onClick={handleConvertAll}
              disabled={isConverting}
              className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              {isConverting
                ? "Converting..."
                : images.length === 1
                ? "Convert"
                : "Convert All"}
            </button>

            {hasAnyConverted && (
              <button
                onClick={handleDownloadAll}
                className="rounded-md bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-500"
              >
                Download All
              </button>
            )}

            <button
              onClick={handleClearAll}
              className="rounded-md bg-gray-300 px-6 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Thumbnails row */}
        {images.length > 0 && (
          <div className="mt-8 flex flex-nowrap gap-4 overflow-x-auto">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-48 h-48 flex-shrink-0 border rounded-md flex flex-col items-center justify-center bg-gray-50 p-2"
              >
                {/* Remove icon */}
                <button
                  type="button"
                  onClick={() => {
                    const newArr = images.filter((_, i) => i !== idx);
                    setImages(newArr);
                  }}
                  className="absolute top-1 right-1 rounded-full bg-gray-200 p-1 text-gray-600 shadow hover:bg-gray-300"
                >
                  ✕
                </button>

                <img
                  src={img.converted && img.success ? img.convertedUrl : img.url}
                  alt={`img-${idx}`}
                  className="max-h-32 object-contain"
                />

                {img.converted && img.success && (
                  <div className="mt-2 text-green-600 font-semibold">✓ Converted</div>
                )}
                {img.converted && !img.success && (
                  <div className="mt-2 text-red-600 text-sm">
                    {img.errorMsg || "Error"}
                  </div>
                )}

                {img.converted && img.success && (
                  <button
                    onClick={() => handleDownloadOne(img)}
                    className="mt-2 rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-500"
                  >
                    Download
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}