"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowsRightLeftIcon,
  PhotoIcon,
  GlobeAltIcon,
  ScissorsIcon,
  HomeIcon,
  ArrowsPointingInIcon,
  DevicePhoneMobileIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { ImageProvider } from "@/context/ImageProvider";
import { DotPattern } from "@/components/ui/DotPattern";

// Nav arrays
const featuresNav = [
  { name: "Home", href: "/", icon: <HomeIcon className="h-6 w-6" /> },
  { name: "Compress", href: "/compress", icon: <ArrowsPointingInIcon className="h-6 w-6" /> },
  { name: "Resize", href: "/resize", icon: <ScissorsIcon className="h-6 w-6" /> },
  { name: "Convert", href: "/convert", icon: <ArrowsRightLeftIcon className="h-6 w-6" /> },
  { name: "Remove BG", href: "/remove-bg", icon: <PhotoIcon className="h-6 w-6" /> },
];

const specialtyNav = [
  { name: "Favicons", href: "/favicons", icon: <GlobeAltIcon className="h-6 w-6" /> },
  { name: "App Icon", href: "/app-icon", icon: <DevicePhoneMobileIcon className="h-6 w-6" /> },
];

// Shared sidebar content for both mobile & desktop
function SidebarContent({ onLinkClick }) {
  return (
    <nav className="flex flex-col gap-8 h-full">
      {/* Logo -> Home */}
      <div className="flex items-center gap-2 text-2xl font-bold text-[#0984e3]">
        <Link href="/" onClick={() => onLinkClick?.()}>
          Nocabot
        </Link>
      </div>

      {/* Navigation */}
      <ul className="mt-4 flex flex-col gap-y-6 overflow-y-auto">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {featuresNav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-700 hover:bg-gray-50 hover:text-indigo-600 group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                  onClick={() => onLinkClick?.()}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <hr className="my-4 border-gray-200" />
        </li>

        <li>
          <div className="mb-2 px-2 text-xs font-semibold text-gray-400">Specialty</div>
          <ul role="list" className="-mx-2 space-y-1">
            {specialtyNav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-700 hover:bg-gray-50 hover:text-indigo-600 group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                  onClick={() => onLinkClick?.()}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default function LayoutClient({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ImageProvider>
      {/* 
        Full-screen container:
        - flex layout
        - min-h-screen to fill vertical space
        - font-sans ensures Geist (or your chosen font) is used
      */}
      <div className="flex min-h-screen font-sans bg-white">
        {/* DESKTOP SIDEBAR: shown at md+; pinned left */}
        <aside className="hidden md:block md:h-full md:flex-none w-64 border-r border-gray-200 bg-white px-6 py-4">
          <SidebarContent />
        </aside>

        {/* MAIN AREA (top bar on mobile, content below/next to it) */}
        <div className="flex-1 flex flex-col">
          {/* MOBILE TOP BAR: only visible if below md */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Link href="/" className="text-xl font-bold text-[#0984e3]">
              Nocabot
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-600 hover:text-gray-800"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Content area. DotPattern is placed behind the children. */}
          <div className="relative flex-1 overflow-auto p-8">
            <DotPattern />
            <div className="relative z-10">{children}</div>
          </div>
        </div>

        {/* MOBILE OFF-CANVAS SIDEBAR if open */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Dark overlay */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Slide-in panel: pinned to left, full height */}
            <div className="relative w-64 bg-white p-6 shadow h-full">
              {/* Close button (icon only) */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="mb-4 text-gray-700 hover:text-gray-900"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <SidebarContent onLinkClick={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </ImageProvider>
  );
}
