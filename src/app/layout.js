// src/app/layout.js
import "./globals.css";
import { DotPattern } from "@/components/ui/DotPattern";
import Link from "next/link";
import React from "react";
import {
  ScissorsIcon,
  ArrowsRightLeftIcon,
  PhotoIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Navigation items with updated SVG icons
const featuresNav = [
  {
    name: "Home",
    href: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    name: "Compress",
    href: "/compress",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.125 3.75h3.75M9 15.75h6m-7.875 4.5h9.75m-9.75 0a.375.375 0 0 1-.375-.375v-13.5c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v13.5c0 .207-.168.375-.375.375m-11.625 0c.621 0 1.125.504 1.125 1.125M5.25 21h13.5m-13.5 0a1.125 1.125 0 1 1 2.25 0m11.25 0c0-.621-.504-1.125-1.125-1.125m1.125 1.125a1.125 1.125 0 1 0-2.25 0"
        />
      </svg>
    ),
  },
  { name: "Resize", href: "/resize", icon: <ScissorsIcon className="h-6 w-6" /> },
  { name: "Convert", href: "/convert", icon: <ArrowsRightLeftIcon className="h-6 w-6" /> },
  { name: "Remove BG", href: "/remove-bg", icon: <PhotoIcon className="h-6 w-6" /> },
  {
    name: "Favicons",
    href: "/favicons",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
];

const accountNav = [
  { name: "Profile", href: "/profile", icon: <UserIcon className="h-6 w-6" /> },
  { name: "Settings", href: "/settings", icon: <Cog6ToothIcon className="h-6 w-6" /> },
];

export const metadata = {
  title: "Nocabot",
  description: "Your image-based tool suite",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon.ico",
    other: {
      rel: "icon",
      url: "/favicon-16x16.png",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <div className="flex flex-1">
          <aside className="w-64 border-r border-gray-200 bg-white px-6 py-4">
            {/* Sidebar navigation */}
            <nav className="flex flex-col gap-8">
              {/* Title */}
              <div className="flex items-center gap-2 text-2xl font-bold text-[#0984e3]">
                <span>Nocabot</span>
              </div>

              {/* Navigation items */}
              <ul className="mt-4 flex flex-col gap-y-6">
                <li>
                  {/* Features section */}
                  <ul role="list" className="-mx-2 space-y-1">
                    {featuresNav.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                          )}
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
                  <div className="mb-2 px-2 text-xs font-semibold text-gray-400">Account</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {accountNav.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                          )}
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
          </aside>

          {/* Main Content */}
          <div className="relative flex-1 p-8">
            <DotPattern />
            <div className="relative z-10">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}