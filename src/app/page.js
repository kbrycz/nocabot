"use client";

import React from "react";
import {
  ArrowsPointingInIcon, // Compress
  ScissorsIcon,          // Resize
  ArrowsRightLeftIcon,   // Convert
  PhotoIcon,             // Remove BG
  GlobeAltIcon,          // Favicons
  DevicePhoneMobileIcon, // App Icon
} from "@heroicons/react/24/outline";

// Import your AuroraText from the new local file
import { AuroraText } from "@/components/ui/AuroraText";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const actions = [
  {
    title: "Compress Images",
    href: "/compress",
    icon: ArrowsPointingInIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
    description: "Reduce file sizes while retaining quality for faster load times.",
  },
  {
    title: "Resize Images",
    href: "/resize",
    icon: ScissorsIcon,
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
    description: "Quickly change dimensions or aspect ratios to fit any usage scenario.",
  },
  {
    title: "Convert Images",
    href: "/convert",
    icon: ArrowsRightLeftIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
    description: "Switch between PNG, JPG, GIF, WebP, and more with a single click.",
  },
  {
    title: "Remove Background",
    href: "/remove-bg",
    icon: PhotoIcon,
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
    description: "Automatically remove backgrounds to highlight your subject (simulated).",
  },
  {
    title: "Generate Favicons",
    href: "/favicons",
    icon: GlobeAltIcon,
    iconForeground: "text-green-700",
    iconBackground: "bg-green-50",
    description: "Create multiple favicon sizes and .ico files for perfect branding.",
  },
  {
    title: "App Icon",
    href: "/app-icon",
    icon: DevicePhoneMobileIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
    description: "Transform any image into a 1024×1024 compressed app icon.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto mt-10 mb-10 w-full sm:w-[95%] md:w-[85%] bg-white p-12 rounded-md shadow font-sans">
      {/* Heading with smaller font, to match other pages */}
      <h1 className="text-3xl font-bold tracking-tight text-center text-gray-800">
        Welcome to <AuroraText>Nocabot</AuroraText>
      </h1>

      {/* Subtitle underneath */}
      <p className="mt-2 text-sm text-center text-gray-600">
        A suite of easy-to-use image tools for every workflow.
      </p>

      {/* The actions grid below */}
      <div className="mt-8 divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-100 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {actions.map((action, idx) => (
          <div
            key={action.title}
            className={classNames(
              idx === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
              idx === 1 ? "sm:rounded-tr-lg" : "",
              idx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
              idx === actions.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            )}
          >
            <div>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  "inline-flex rounded-lg p-3 ring-4 ring-white"
                )}
              >
                <action.icon aria-hidden="true" className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold text-gray-900">
                <a href={action.href} className="focus:outline-none">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {action.title}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{action.description}</p>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            >
              {/* The small diagonal icon in top-right corner */}
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
