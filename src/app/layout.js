// src/app/layout.js
import "./globals.css"
import { DotPattern } from "@/components/ui/DotPattern"
import {
  ArrowPathIcon,
  ScissorsIcon,
  FolderIcon,
  PhotoIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import React from "react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

// We'll group the app features vs. account items
const featuresNav = [
  { name: "Home", href: "/", icon: FolderIcon },
  { name: "Compress", href: "/compress", icon: ArrowPathIcon },
  { name: "Resize", href: "/resize", icon: ScissorsIcon },
  { name: "Convert", href: "/convert", icon: FolderIcon },
  { name: "Remove BG", href: "/remove-bg", icon: PhotoIcon },
  { name: "Favicons", href: "/favicons", icon: FolderIcon }
]

const accountNav = [
  { name: "Profile", href: "/profile", icon: UserIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
]

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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <div className="flex flex-1">
          <aside className="w-64 border-r border-gray-200 bg-white px-6 py-4">
            {/* We'll use a flex column that justifies content in top and bottom sections */}
            <nav className="flex h-full flex-col justify-between">
              <div>
                {/* 1) Top brand logo */}
                <div className="my-2">
                  <img
                    src="/small-logo.png"
                    alt="Nocabot small logo"
                    className="h-10 w-auto"
                  />
                </div>

                {/* 2) The nav items (features + account) */}
                <ul className="mt-6 flex flex-col gap-y-7">
                  <li>
                    {/* Features section */}
                    <ul role="list" className="-mx-2 space-y-1">
                      {featuresNav.map((item) => {
                        let isActive = false
                        if (typeof window !== "undefined") {
                          isActive = window.location.pathname === item.href
                        }
                        return (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={classNames(
                                isActive
                                  ? "bg-gray-50 text-indigo-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  isActive
                                    ? "text-indigo-600"
                                    : "text-gray-400 group-hover:text-indigo-600",
                                  "h-6 w-6 shrink-0"
                                )}
                              />
                              {item.name}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>

                  <li>
                    <hr className="my-4 border-gray-200" />
                  </li>

                  <li>
                    <div className="mb-2 px-2 text-xs font-semibold text-gray-400">
                      Account
                    </div>
                    <ul role="list" className="-mx-2 space-y-1">
                      {accountNav.map((item) => {
                        let isActive = false
                        if (typeof window !== "undefined") {
                          isActive = window.location.pathname === item.href
                        }
                        return (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={classNames(
                                isActive
                                  ? "bg-gray-50 text-indigo-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  isActive
                                    ? "text-indigo-600"
                                    : "text-gray-400 group-hover:text-indigo-600",
                                  "h-6 w-6 shrink-0"
                                )}
                              />
                              {item.name}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                </ul>
              </div>

              {/* 3) "Nocabot" text pinned at the bottom */}
              <div className="mb-4 px-2 text-2xl font-bold text-[#0984e3]">
                Nocabot
              </div>
            </nav>
          </aside>

          {/* MAIN CONTENT: dotted background behind only this area */}
          <div className="relative flex-1 p-8">
            <DotPattern />
            <div className="relative z-10">{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}