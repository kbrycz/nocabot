// src/app/remove-bg/page.js
"use client";

import React, { useState } from "react";
import { useImageContext } from "@/context/ImageProvider";
import GlobalUploader from "@/components/ui/GlobalUploader";

export default function RemoveBGPage() {
  const { globalImages, clearAllImages } = useImageContext();

  const [errorMsg, setErrorMsg] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleRemoveBgAll = () => {
    setErrorMsg(null); // clear error when pressing main button

    if (globalImages.length === 0) return;
    setIsRemoving(true);
    setIsDisabled(true);

    alert("This feature is coming soon! We'll implement real background removal soon.");

    setTimeout(() => {
      setIsRemoving(false);
      setIsDisabled(false);
    }, 3000);
  };

  const handleClearAll = () => {
    setErrorMsg(null);
    clearAllImages();
  };

  return (
    <div className="mx-auto mt-10 mb-10 w-full sm:w-[95%] md:w-[85%] bg-white dark:bg-gray-800 p-12 rounded-md shadow font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
        Remove Background
      </h1>
      <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
        Automatically remove the background (Coming Soon!).
      </p>

      {errorMsg && (
        <div className="mt-4 text-center text-sm text-red-600">{errorMsg}</div>
      )}

      <div className="mt-6">
        <GlobalUploader
          didProcess={false}
          onDownloadOne={() => {}}
          onNewImages={() => setErrorMsg(null)}
        />
      </div>

      {globalImages.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleRemoveBgAll}
            disabled={isDisabled}
            className={`rounded-md px-6 py-2 text-sm font-semibold text-white ${
              isDisabled
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {isRemoving
              ? "Removing..."
              : globalImages.length === 1
              ? "Remove Background"
              : "Remove Backgrounds"}
          </button>

          <button
            onClick={handleClearAll}
            className="rounded-md bg-gray-300 dark:bg-gray-600 px-6 py-2 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}