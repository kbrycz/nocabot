// src/app/layout.js

import "./globals.css";            // your global styles
import { DotPattern } from "@/components/ui/DotPattern";
import LayoutClient from "./LayoutClient"; // the separate client component

// This is a server component, so "metadata" can be exported here:
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
      <body className="min-h-screen flex flex-col bg-white font-sans">
        {/*
          We render <LayoutClient> here, which is a 'use client' component.
          That handles your sidebar, mobile menu, etc.
        */}
        <LayoutClient>
          {/*
            If you still want an extra container that has p-8, you can put it here.
            Just note: any `p-8` will create extra margins, 
            so if you want near full width, reduce or remove it.
          */}
          <div className="relative flex-1 p-2">
            <DotPattern />
            <div className="relative z-10">{children}</div>
          </div>
        </LayoutClient>
      </body>
    </html>
  );
}
