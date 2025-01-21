// NOTE: No "use client" here. That way we can export "metadata".
import "./globals.css";
import { DotPattern } from "@/components/ui/DotPattern";
import LayoutClient from "./LayoutClient"; // The new client component for mobile nav

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
          We delegate the sidebar, mobile menu state, and the <ImageProvider> 
          to the client component below.
        */}
        <LayoutClient>
          <div className="relative flex-1 p-8">
            <DotPattern />
            <div className="relative z-10">{children}</div>
          </div>
        </LayoutClient>
      </body>
    </html>
  );
}
