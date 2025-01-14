// src/components/NavBar.js
"use client"

import Link from "next/link"
import React from "react"

export default function NavBar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand on the left (bold for Geist-Bold) */}
        <Link href="/" className="text-2xl font-bold text-[#0984e3]">
          Nocabot
        </Link>

        {/* Nav links on the right */}
        <ul className="flex items-center space-x-8">
          <li>
            <Link
              href="/app"
              className="text-gray-800 transition-colors duration-150 hover:text-[#0984e3]"
            >
              App
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-800 transition-colors duration-150 hover:text-[#0984e3]"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-800 transition-colors duration-150 hover:text-[#0984e3]"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/signin"
              className="text-gray-800 transition-colors duration-150 hover:text-[#0984e3]"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              href="/signup"
              className="rounded bg-[#0984e3] px-4 py-2 font-medium text-white hover:bg-[#0771c0]"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
