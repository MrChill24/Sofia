import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spain, Sofia - Travel Journal & Tour Guide",
  description: "Your personal Spain adventure companion with interactive maps, photo journal, and travel guides.",
  keywords: ["Spain travel", "travel journal", "tour guide", "Sofia", "adventure", "interactive maps"],
  authors: [{ name: "Spain, Sofia" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Spain, Sofia - Travel Journal & Tour Guide",
    description: "Your personal Spain adventure companion with interactive maps, photo journal, and travel guides.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spain, Sofia - Travel Journal & Tour Guide",
    description: "Your personal Spain adventure companion with interactive maps, photo journal, and travel guides.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
