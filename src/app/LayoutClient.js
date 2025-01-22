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

// Shared sidebar content
function SidebarContent({ onLinkClick }) {
  return (
    <nav className="flex flex-col h-full">
      {/* Show the top image, bigger than before */}
      <Link href="/" onClick={() => onLinkClick?.()} className="block text-center">
        <img
          src="/images/nocabot.png"
          alt="Nocabot"
          className="h-10 w-auto mx-auto mt-2"
        />
      </Link>

      <ul className="mt-4 flex flex-col gap-y-6 overflow-y-auto px-1">
        <li>
          <ul role="list" className="space-y-1">
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
          <ul role="list" className="space-y-1">
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

export const metadata = {
  title: "Nocabot",
  description: "Your image-based tool suite",
};

export default function LayoutClient({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ImageProvider>
      {/* 
        Full-screen container, no horizontal scroll
      */}
      <div className="flex h-screen w-screen overflow-hidden font-sans bg-white">
        {/* DESKTOP SIDEBAR (pinned left, full height) */}
        <aside className="hidden md:flex md:flex-col w-64 h-full shrink-0 border-r border-gray-200 bg-white px-4 py-2">
          <SidebarContent />
        </aside>

        {/* MAIN AREA */}
        <div className="relative flex-1 flex flex-col overflow-hidden">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
            <Link href="/" className="block">
              <img
                src="/images/nocabot.png"
                alt="Nocabot"
                className="h-10 w-auto"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-600 hover:text-gray-800"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
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
