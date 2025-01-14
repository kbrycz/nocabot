// src/components/ui/BentoGrid.js
"use client"

import React from "react"
import clsx from "clsx"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

export function BentoGrid({ children, className }) {
  return (
    <div
      className={clsx(
        // Responsive columns
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}) {
  return (
    <div
      className={clsx(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl",
        // White background + subtle shadow
        "bg-white shadow-md",
        className
      )}
    >
      {/* Optional top area (like an image/gradient) */}
      {background ? (
        <div>{background}</div>
      ) : (
        <div className="h-32 w-full bg-gray-100" />
      )}

      {/* Content */}
      <div className="z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
        {Icon && (
          <Icon className="mb-3 h-8 w-8 text-gray-600" />
        )}
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="max-w-lg text-gray-600">{description}</p>
      </div>

      {/* CTA button area - revert to simpler style */}
      <div className="z-10 flex w-full transform-gpu justify-start p-4 transition-all duration-300 group-hover:-translate-y-2">
        <Button variant="ghost" size="sm" className="border border-gray-300 text-gray-700 hover:bg-gray-100">
          <a href={href} className="flex items-center">
            {cta}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      {/* Hover overlay effect */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/5" />
    </div>
  )
}
