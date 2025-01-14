"use client"

import React from "react"
import NavBar from "@/components/NavBar"
import { DotPattern } from "@/components/ui/DotPattern"
import { TypingAnimation } from "@/components/ui/TypingAnimation"
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid"

// Icons from @radix-ui/react-icons (adjust as needed)
import { ImageIcon, ArchiveIcon, CropIcon, MagicWandIcon } from "@radix-ui/react-icons"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* White nav bar (no dotted background) */}
      <NavBar />

      {/* Everything else under the dotted background */}
      <div className="relative flex-1">
        {/* DotPattern behind this entire main area except nav */}
        <DotPattern />

        {/* HERO SECTION: fills first screen */}
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="text-6xl font-bold leading-tight text-gray-800">
            <TypingAnimation className="inline-block text-6xl font-bold text-gray-700" duration={80}>
              Welcome to
            </TypingAnimation>{" "}
            <span className="text-[#0984e3]">Nocabot</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600">
            Your one-stop shop for all your image needs!
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/app"
              className="rounded border border-[#0984e3] px-6 py-3 font-semibold text-[#0984e3] transition-colors hover:bg-[#0984e3] hover:text-white"
            >
              Go to App
            </a>
            <a
              href="#features"
              className="rounded border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* FEATURES SECTION (with scroll offset) */}
        <section
          id="features"
          className="relative z-10 px-6 pb-16 scroll-mt-20" 
          // scroll-mt-20 ensures there's spacing when scrolling here
        >
          <div className="mx-auto mb-8 max-w-7xl text-center">
            <h2 className="text-3xl font-bold text-gray-800">What can we do for you?</h2>
            <p className="mt-2 text-lg text-gray-600">
              Did we mention everything is <strong className="text-[#0984e3]">FREE?</strong>
            </p>
          </div>

          <div className="mx-auto max-w-7xl">
            <BentoGrid>
              <BentoCard
                name="Background Removal"
                description="Easily remove backgrounds from images with AI."
                Icon={ImageIcon}
                href="/app"
                cta="Try it"
              />
              <BentoCard
                name="Compression"
                description="Compress images while retaining clarity."
                Icon={ArchiveIcon}
                href="/app"
                cta="Try it"
              />
              <BentoCard
                name="Resizing"
                description="Resize images for mobile, web, and more."
                Icon={CropIcon}
                href="/app"
                cta="Try it"
              />
              <BentoCard
                name="All-in-One Optimization"
                description="Combine all steps for fully optimized images."
                Icon={MagicWandIcon}
                href="/app"
                cta="Try it"
              />
            </BentoGrid>
          </div>
        </section>
      </div>
    </main>
  )
}
