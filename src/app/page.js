"use client"

import React, { useState } from "react"
import NavBar from "@/components/NavBar"
import { DotPattern } from "@/components/ui/DotPattern"
import { TypingAnimation } from "@/components/ui/TypingAnimation"
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid"
import { ImageIcon, ArchiveIcon, CropIcon, MagicWandIcon } from "@radix-ui/react-icons"

export default function HomePage() {
  // Toggle state for monthly vs. annual
  const [billingCycle, setBillingCycle] = useState("monthly")
  const isMonthly = billingCycle === "monthly"

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

        {/* PRICING SECTION (spaced further down: mt-32) */}
        <section
          id="pricing"
          className="relative z-10 mt-32 px-6 pb-16 scroll-mt-20 bg-white"
        >
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="mb-2 text-3xl font-bold text-gray-800">Simple Pricing for Everyone</h2>
            <p className="mb-6 text-lg text-gray-600">
              Choose a plan that fits your needs. Switch between monthly or annual at any time.
            </p>

            {/* Billing Cycle Toggle (friendly toggle switch) */}
            <div className="flex items-center justify-center gap-4">
              <span
                className={`cursor-pointer text-sm font-semibold ${
                  isMonthly ? "text-[#0984e3]" : "text-gray-500"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={!isMonthly}
                  onChange={() =>
                    setBillingCycle(isMonthly ? "annual" : "monthly")
                  }
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 transition-all peer-checked:bg-[#0984e3]">
                </div>
                <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-5" />
              </label>
              <span
                className={`cursor-pointer text-sm font-semibold ${
                  !isMonthly ? "text-[#0984e3]" : "text-gray-500"
                }`}
                onClick={() => setBillingCycle("annual")}
              >
                Annual
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {/* STANDARD PLAN (Always Free) */}
            <div className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Standard</h3>
                <p className="mt-1 text-sm text-gray-500">Perfect for casual users</p>
                <div className="mt-4 text-3xl font-extrabold text-gray-800">
                  {isMonthly ? "$0" : "$0"}
                  <span className="ml-1 text-sm font-medium text-gray-500">
                    /{isMonthly ? "month" : "year"}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>2 background removals / month</li>
                  <li>10 compressions</li>
                  <li>10 resizes</li>
                  <li>10 all-in-ones</li>
                </ul>
              </div>
              <button className="mt-6 w-full rounded bg-[#0984e3] px-4 py-2 font-semibold text-white hover:bg-[#0771c0]">
                Choose Standard
              </button>
            </div>

            {/* PRO PLAN (highlighted) */}
            <div className="relative flex flex-col justify-between rounded-lg bg-white p-6 shadow-md ring-2 ring-[#0984e3]">
              <span className="absolute top-3 right-3 rounded bg-[#0984e3] px-2 py-1 text-xs font-semibold text-white">
                Best Value
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Pro</h3>
                <p className="mt-1 text-sm text-gray-500">For growing power users</p>
                {isMonthly ? (
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <div className="text-2xl font-extrabold text-gray-800 line-through">
                      $10<span className="ml-1 text-sm font-medium text-gray-500">/month</span>
                    </div>
                    <div className="text-3xl font-extrabold text-[#0984e3]">FREE</div>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <div className="text-2xl font-extrabold text-gray-800 line-through">
                      $99<span className="ml-1 text-sm font-medium text-gray-500">/year</span>
                    </div>
                    <div className="text-3xl font-extrabold text-[#0984e3]">FREE</div>
                  </div>
                )}
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>10 background removals / month</li>
                  <li>50 compressions</li>
                  <li>50 resizes</li>
                  <li>50 all-in-ones</li>
                </ul>
              </div>
              <button className="mt-6 w-full rounded border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200">
                Choose Pro
              </button>
            </div>

            {/* GOLD PLAN */}
            <div className="flex flex-col justify-between rounded-lg bg-white p-6 shadow-md">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Gold</h3>
                <p className="mt-1 text-sm text-gray-500">Unlimited for serious users</p>
                <div className="mt-4 text-3xl font-extrabold text-gray-800">
                  {isMonthly ? "$100" : "$999"}
                  <span className="ml-1 text-sm font-medium text-gray-500">
                    /{isMonthly ? "month" : "year"}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>50 background removals / month</li>
                  <li>Unlimited compressions</li>
                  <li>Unlimited resizes</li>
                  <li>Unlimited all-in-ones</li>
                </ul>
              </div>
              <button className="mt-6 w-full rounded bg-[#0984e3] px-4 py-2 font-semibold text-white hover:bg-[#0771c0]">
                Choose Gold
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
