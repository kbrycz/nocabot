"use client";
import React, { useState } from "react";
import MultipleImageUploaderForRemoveBg from "@/components/ui/MultipleImageUploaderForRemoveBg";

export default function RemoveBGPage() {
  return (
    <div className="relative">
      <div className="mx-auto mt-10 mb-10 w-full max-w-4xl bg-white shadow-lg p-8 rounded-md">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">Remove Background</h1>
        <p className="mt-2 text-lg text-gray-600 text-center">
          Automatically remove the background from up to 5 images. (Simulated)
        </p>

        <div className="mt-8">
          <MultipleImageUploaderForRemoveBg />
        </div>
      </div>
    </div>
  );
}