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
  InformationCircleIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";

import { ImageProvider } from "@/context/ImageProvider";
import { AuroraText } from "@/components/ui/AuroraText";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

// MAIN NAV
const featuresNav = [
  { name: "Home", href: "/", icon: <HomeIcon className="h-6 w-6" /> },
  { name: "Compress", href: "/compress", icon: <ArrowsPointingInIcon className="h-6 w-6" /> },
  { name: "Resize", href: "/resize", icon: <ScissorsIcon className="h-6 w-6" /> },
  { name: "Convert", href: "/convert", icon: <ArrowsRightLeftIcon className="h-6 w-6" /> },
  { name: "Remove BG", href: "/remove-bg", icon: <PhotoIcon className="h-6 w-6" /> },
];

// SPECIALTY
const specialtyNav = [
  { name: "Favicons", href: "/favicons", icon: <GlobeAltIcon className="h-6 w-6" /> },
  { name: "App Icon", href: "/app-icon", icon: <DevicePhoneMobileIcon className="h-6 w-6" /> },
  { name: "Meme Maker", href: "/meme", icon: <FaceSmileIcon className="h-6 w-6" /> },
];

// OTHER
const otherNav = [
  { name: "About", href: "/about", icon: <InformationCircleIcon className="h-6 w-6" /> },
];

function SidebarContent({ onLinkClick, darkMode, toggleDarkMode }) {
  return (
    <nav className="relative flex flex-col h-full">
      {/* Brand */}
      <Link href="/" onClick={onLinkClick} className="mt-4 block text-center">
        <AuroraText className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
          Nocabot
        </AuroraText>
      </Link>

      <ul className="mt-8 flex flex-col gap-y-6 overflow-y-auto px-1 w-full">
        {/* Features */}
        <li>
          <ul className="space-y-1">
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

        {/* Specialty */}
        <li>
          <div className="mb-2 px-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
            Specialty
          </div>
          <ul className="space-y-1">
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

        <li>
          <hr className="my-4 border-gray-200 dark:border-gray-700" />
        </li>

        {/* Other */}
        <li>
          <div className="mb-2 px-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
            Other
          </div>
          <ul className="space-y-1">
            {otherNav.map((item) => (
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

      {/* Dark Mode Toggle => we put an even bigger margin-top to separate */}
      <div className="mt-10 mb-4 px-2">
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
  const [darkMode, setDarkMode] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // On mount, see if .dark is present
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

  if (!initialized) return null;

  return (
    <ImageProvider>
      <div className="relative flex h-screen w-screen overflow-hidden text-gray-800 dark:text-gray-200">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex md:flex-col w-64 h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2">
          <SidebarContent
            onLinkClick={() => {}}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </aside>

        {/* The main area with flickering grid behind an overlay that drastically reduces opacity */}
        <div className="relative flex-1 flex flex-col">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            {/* Extra-lower overall opacity */}
            <div className="w-full h-full opacity-20">
              <FlickeringGrid
                className="w-full h-full"
                squareSize={4}
                gridGap={6}
                color="#6B7280"
                maxOpacity={0.35}
                flickerChance={0.1}
              />
            </div>
          </div>

          {/* Mobile top bar */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
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

          {/* Main scroll area */}
          <div className="flex-1 overflow-auto pt-2 pb-24">
            {children}
          </div>
        </div>

        {/* MOBILE OFF-CANVAS SIDEBAR */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* overlay */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pb-24 px-4 py-2">
                <SidebarContent
                  onLinkClick={() => setMobileMenuOpen(false)}
                  darkMode={darkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ImageProvider>
  );
}