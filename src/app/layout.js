// src/app/layout.js
import "./globals.css"

export const metadata = {
  title: "Nocabot",
  description: "Your all-in-one image solution",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
