// src/app/layout.js
import "./globals.css"
import { DotPattern } from "@/components/ui/DotPattern"
import { ArrowPathIcon, ScissorsIcon, FolderIcon, PhotoIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import Image from "next/image"
import React from "react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Our main nav items
const navigation = [
  { name: "Nocabot", href: "/", icon: null, isBrand: true },
  { name: "Home", href: "/", icon: FolderIcon },
  { name: "Compress", href: "/compress", icon: ArrowPathIcon },
  { name: "Resize", href: "/resize", icon: ScissorsIcon },
  { name: "Convert", href: "/convert", icon: FolderIcon },
  { name: "Remove BG", href: "/remove-bg", icon: PhotoIcon },
]

// “Recent Projects” as placeholders
const recentProjects = [
  { id: 1, name: "Heroicons", href: "#", initial: "H" },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T" },
  { id: 3, name: "Workcation", href: "#", initial: "W" },
]

export const metadata = {
  title: "Nocabot",
  description: "Your image-based tool suite",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <div className="flex flex-1">
          {/* LEFT SIDEBAR with border-r + white bg */}
          <aside className="flex grow-0 flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 py-4 w-64">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      const isActive =
                        typeof window !== "undefined" &&
                        window.location.pathname === item.href

                      // If this is the "brand" item, style differently
                      if (item.isBrand) {
                        return (
                          <li key={item.name}>
                            <div className="mb-4 mt-2 px-2 text-2xl font-bold text-[#0984e3]">
                              {item.name}
                            </div>
                          </li>
                        )
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
                            {item.icon && (
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  isActive
                                    ? "text-indigo-600"
                                    : "text-gray-400 group-hover:text-indigo-600",
                                  "h-6 w-6 shrink-0"
                                )}
                              />
                            )}
                            {item.name}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </li>

                <li>
                  {/* “Recent Projects” */}
                  <div className="text-xs font-semibold text-gray-400">Recent Projects</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {recentProjects.map((proj) => (
                      <li key={proj.name}>
                        <a
                          href={proj.href}
                          className="text-gray-700 hover:bg-gray-50 hover:text-indigo-600 group flex gap-x-3 rounded-md p-2 text-sm font-semibold"
                        >
                          <span
                            className="border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600
                            flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                          >
                            {proj.initial}
                          </span>
                          <span className="truncate">{proj.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>

                {/* Profile at bottom */}
                <li className="-mx-6 mt-auto">
                  <Link
                    href="/profile"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    <Image
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          {/* MAIN CONTENT: dotted background behind only this area */}
          <div className="relative flex-1 p-8">
            <DotPattern />
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
