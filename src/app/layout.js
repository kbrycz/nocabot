import "./globals.css";
import LayoutClient from "./LayoutClient"; // "use client" component

export const metadata = {
  title: "Nocabot – The Ultimate Image Tool Suite",
  description:
    "Nocabot.com – Compress, Resize, Convert, Remove BG, Generate Favicons, & Create App Icons. All in one suite.",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon.ico",
    other: { rel: "icon", url: "/favicon-16x16.png" },
  },
};

export default function RootLayout({ children }) {
  // We'll hide <body> until the script sets .dark if needed
  // Use a deferred script so document.body won't be null
  const noFlashScript = `
    document.addEventListener("DOMContentLoaded", function() {
      try {
        const val = localStorage.getItem("nocabotDarkMode");
        if (val === "true") {
          document.documentElement.classList.add("dark");
        }
      } catch(e){}
      document.body.style.display = "";
    });
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Example: Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FRD68YWYKY"
        />
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
        {/* Hide body until dark-mode script runs */}
        <style>{`body { display: none; }`}</style>
        <script defer dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>

      <body className="min-h-screen flex flex-col font-sans bg-white dark:bg-gray-900">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}