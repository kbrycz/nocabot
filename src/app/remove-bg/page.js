"use client";

import React, { useState } from "react";
import { useImageContext } from "@/context/ImageProvider";
import GlobalUploader from "@/components/ui/GlobalUploader";

/**
 * This version does NOT call the server. When "Remove BG" is clicked,
 * it just shows an alert "Coming soon!" and disables the button for 3s.
 */
export default function RemoveBGPage() {
  const { globalImages, clearAllImages } = useImageContext();

  const [errorMsg, setErrorMsg] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false); // spinner state
  const [isDisabled, setIsDisabled] = useState(false); // 3-sec cooldown

  const handleRemoveBgAll = () => {
    if (globalImages.length === 0) return;
    setErrorMsg(null);
    setIsRemoving(true);
    setIsDisabled(true);

    // Show "coming soon" alert
    alert("This feature is coming soon! We hope to have it available in a future update.");

    // After 3s, re-enable the button
    setTimeout(() => {
      setIsRemoving(false);
      setIsDisabled(false);
    }, 3000);
  };

  // Clear all images (and any error message)
  const handleClearAll = () => {
    setErrorMsg(null);
    clearAllImages();
  };

  return (
    <div className="mx-auto mt-10 mb-10 w-full sm:w-[95%] md:w-[85%] bg-white p-12 rounded-md shadow font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800">Remove Background</h1>
      <p className="mt-2 text-sm text-center text-gray-600">
        Automatically remove the background from up to 5 images. (Coming Soon!)
      </p>

      {errorMsg && (
        <div className="mt-4 text-center text-sm text-red-600">{errorMsg}</div>
      )}

      {/* GlobalUploader just to show images. We won't do anything with them. */}
      <div className="mt-6">
        <GlobalUploader
          didProcess={false} // We never "process" for real
          onDownloadOne={() => { /* no-op */ }}
        />
      </div>

      {globalImages.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleRemoveBgAll}
            disabled={isDisabled}
            className={`rounded-md px-6 py-2 text-sm font-semibold text-white ${
              isDisabled ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {isRemoving
              ? "Removing..."
              : globalImages.length === 1
              ? "Remove Background"
              : "Remove Backgrounds"}
          </button>

          {/* There's no real "Download All" or "didProcess" because it's not implemented */}
          <button
            onClick={handleClearAll}
            className="rounded-md bg-gray-300 px-6 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
