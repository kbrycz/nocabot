// src/app/layout.js

import "./globals.css"; // your global styles
import { DotPattern } from "@/components/ui/DotPattern";
import LayoutClient from "./LayoutClient"; // your separate client component

// 1) Provide top-level metadata for SEO:
export const metadata = {
  title: "Nocabot – The Ultimate Image Tool Suite",
  description:
    "Nocabot.com – Compress, Resize, Convert, Remove Background, Generate Favicons, and Create App Icons. All in one seamless tool suite.",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon.ico",
    other: {
      rel: "icon",
      url: "/favicon-16x16.png",
    },
  },
};

/**
 * We'll insert our Google Analytics + JSON-LD structured data
 * in <head> using <script> tags. Because this is a server component,
 * we can't use next/script easily here, so we do a raw <script> approach.
 */
export default function RootLayout({ children }) {
  // This is a simple structured data snippet (JSON-LD) describing your site.
  // Google may (or may not) use it to generate sitelinks and other rich results.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    // The official URL of your site:
    "url": "https://nocabot.com/",
    "name": "Nocabot",
    "description":
      "Nocabot – The Ultimate Image Tool Suite (compress, resize, convert, remove backgrounds, generate favicons, and create app icons).",
    // Example SiteNavigationElement to show your main sub-pages:
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": "https://nocabot.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    ],
    "hasPart": [
      {
        "@type": "WebPage",
        "url": "https://nocabot.com/compress",
        "name": "Compress Images",
      },
      {
        "@type": "WebPage",
        "url": "https://nocabot.com/resize",
        "name": "Resize Images",
      },
      {
        "@type": "WebPage",
        "url": "https://nocabot.com/convert",
        "name": "Convert Images",
      },
      {
        "@type": "WebPage",
        "url": "https://nocabot.com/remove-bg",
        "name": "Remove Background",
      },
      {
        "@type": "WebPage",
        "url": "https://nocabot.com/favicons",
        "name": "Generate Favicons",
      },
      {
        "@type": "WebPage",
        "url": "https://nocabot.com/app-icon",
        "name": "App Icon",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/*
          2) Google Analytics 4 – using your Measurement ID: G-FRD68YWYKY
             We load gtag.js, then configure it.
        */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FRD68YWYKY"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FRD68YWYKY');
            `,
          }}
        />

        {/*
          3) JSON-LD structured data for your domain. This may help SEO,
             giving Google more context to potentially show “sitelinks”
             under your search result. 
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>

      <body className="min-h-screen flex flex-col bg-white font-sans">
        {/*
          LayoutClient is your "use client" component
          that handles the sidebar, mobile nav, etc.
        */}
        <LayoutClient>
          {/*
            If you want a small padding or a dot pattern background, do it here.
            We'll show minimal padding (p-2). Adjust as you wish.
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
