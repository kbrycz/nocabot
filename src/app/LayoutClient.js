"use client";

import "./globals.css";
import { DotPattern } from "@/components/ui/DotPattern";
import Link from "next/link";
import React, { useState } from "react";
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
import { AuroraText } from "@/components/ui/AuroraText";

// Nav arrays
const featuresNav = [
  { name: "Home", href: "/", icon: <HomeIcon className="h-6 w-6" /> },
  {
    name: "Compress",
    href: "/compress",
    icon: <ArrowsPointingInIcon className="h-6 w-6" />,
  },
  { name: "Resize", href: "/resize", icon: <ScissorsIcon className="h-6 w-6" /> },
  {
    name: "Convert",
    href: "/convert",
    icon: <ArrowsRightLeftIcon className="h-6 w-6" />,
  },
  { name: "Remove BG", href: "/remove-bg", icon: <PhotoIcon className="h-6 w-6" /> },
];

const specialtyNav = [
  { name: "Favicons", href: "/favicons", icon: <GlobeAltIcon className="h-6 w-6" /> },
  { name: "App Icon", href: "/app-icon", icon: <DevicePhoneMobileIcon className="h-6 w-6" /> },
];

// Here is the sidebar content
function SidebarContent({ onLinkClick }) {
  return (
    <nav className="flex flex-col h-full items-center">
      {/* AuroraText as the top brand */}
      <Link href="/" onClick={() => onLinkClick?.()} className="mt-4 block text-center">
        <AuroraText className="text-2xl font-bold tracking-tight text-gray-800">
          Nocabot
        </AuroraText>
      </Link>

      <ul className="mt-8 flex flex-col gap-y-6 overflow-y-auto px-1 w-full">
        <li>
          <ul role="list" className="space-y-1">
            {featuresNav.map((item) => (
              <li key={item.name}>
                {/* Changed from hover:bg-gray-50 hover:text-indigo-600
                    to hover:bg-blue-50 hover:text-blue-600 */}
                <Link
                  href={item.href}
                  className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
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
          <ul role="list" className="space-y-1">
            {specialtyNav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
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
        Full-screen container, pinned sidebar on desktop,
        no horizontal scroll: "overflow-hidden", "w-screen".
      */}
      <div className="flex h-screen w-screen overflow-hidden font-sans bg-white">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:flex md:flex-col w-64 h-full border-r border-gray-200 bg-white px-4 py-2">
          <SidebarContent />
        </aside>

        {/* MAIN AREA */}
        <div className="relative flex-1 flex flex-col overflow-hidden">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-600 hover:text-gray-800"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <Link href="/" className="block">
              {/* AuroraText in mobile top bar as well */}
              <AuroraText className="text-xl font-bold tracking-tight text-gray-800">
                Nocabot
              </AuroraText>
            </Link>
          </div>

          {/* Content container that can scroll vertically */}
          <div className="relative flex-1 overflow-auto p-8">
            <DotPattern />
            <div className="relative z-10">{children}</div>
          </div>
        </div>

        {/* MOBILE OFF-CANVAS SIDEBAR */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-64 bg-white p-4 shadow h-full">
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
