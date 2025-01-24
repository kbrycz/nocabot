"use client";

import React, { useState, useEffect } from "react";
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
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

import { ImageProvider } from "@/context/ImageProvider";
import { AuroraText } from "@/components/ui/AuroraText";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

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

function SidebarContent({ onLinkClick, darkMode, toggleDarkMode }) {
  return (
    <nav className="relative flex flex-col h-full">
      <Link href="/" onClick={onLinkClick} className="mt-4 block text-center">
        <AuroraText className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
          Nocabot
        </AuroraText>
      </Link>

      <ul className="mt-8 flex flex-col gap-y-6 overflow-y-auto px-1 w-full">
        <li>
          <ul role="list" className="space-y-1">
            {featuresNav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="
                    group flex gap-x-3 rounded-md p-2 text-sm font-semibold
                    text-gray-700 dark:text-gray-200
                    hover:bg-blue-50 dark:hover:bg-gray-700
                    hover:text-blue-600 dark:hover:text-white
                  "
                  onClick={onLinkClick}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <hr className="my-4 border-gray-200 dark:border-gray-700" />
        </li>

        <li>
          <div className="mb-2 px-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
            Specialty
          </div>
          <ul role="list" className="space-y-1">
            {specialtyNav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="
                    group flex gap-x-3 rounded-md p-2 text-sm font-semibold
                    text-gray-700 dark:text-gray-200
                    hover:bg-blue-50 dark:hover:bg-gray-700
                    hover:text-blue-600 dark:hover:text-white
                  "
                  onClick={onLinkClick}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      {/* Dark Mode Toggle */}
      <div className="mt-auto mb-2 px-2">
        <button
          onClick={toggleDarkMode}
          className="
            flex w-full items-center justify-center gap-2
            rounded-md border border-gray-200 dark:border-gray-700
            bg-gray-100 dark:bg-gray-800
            px-3 py-2 text-sm font-semibold
            text-gray-800 dark:text-gray-200
            hover:bg-gray-50 dark:hover:bg-gray-700
          "
        >
          {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default function LayoutClient({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // We'll track darkMode in state. We also ensure no SSR mismatch by deferring
  // the text rendering until after hydration.
  const [darkMode, setDarkMode] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // On mount, read if .dark is present
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
    setInitialized(true);
  }, []);

  const toggleDarkMode = () => {
    const nextVal = !darkMode;
    setDarkMode(nextVal);
    if (nextVal) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("nocabotDarkMode", nextVal ? "true" : "false");
  };

  // If not yet initialized, skip rendering text that might mismatch SSR
  if (!initialized) {
    return null; // or a loading placeholder
  }

  return (
    <ImageProvider>
      <div
        className="
          flex h-screen w-screen overflow-hidden
          bg-white/90 dark:bg-gray-900/90
          text-gray-800 dark:text-gray-200
          relative
        "
      >
        {/* Desktop sidebar */}
        <aside className="hidden md:flex md:flex-col w-64 h-full border-r border-gray-200 dark:border-gray-700 px-4 py-2">
          <SidebarContent darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </aside>

        {/* Main content area */}
        <div className="relative flex-1">
          {/* Flickering background behind everything */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <FlickeringGrid
              className="absolute inset-0 w-full h-full"
              squareSize={4}
              gridGap={6}
              color="#6B7280"
              maxOpacity={0.5}
              flickerChance={0.1}
            />
          </div>

          {/* Mobile top bar */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-50"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <Link href="/" className="block">
              <AuroraText className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
                Nocabot
              </AuroraText>
            </Link>
          </div>

          {/* Scrollable content */}
          <div className="relative h-full w-full flex-1 overflow-auto">
            <div className="min-h-full px-2 pb-24 pt-2">{children}</div>
          </div>
        </div>

        {/* MOBILE OFF-CANVAS SIDEBAR */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-64 bg-white dark:bg-gray-900 p-4 shadow h-full">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="mb-4 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <SidebarContent
                onLinkClick={() => setMobileMenuOpen(false)}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </div>
          </div>
        )}
      </div>
    </ImageProvider>
  );
}