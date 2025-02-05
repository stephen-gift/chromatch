import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import SoundManager from "@/components/SoundManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Chromatch - Color Quest",
  description:
    "Test your color matching skills with Chromatch! Guess the right color, earn points, and challenge yourself in this exciting game.",
  keywords:
    "color game, color matching, fun game, chromatch, color challenge, guessing game",
  openGraph: {
    title: "Chromatch - Color Quest",
    description:
      "Can you match the right color? Play Chromatch and put your color recognition skills to the test!",
    siteName: "Chromatch",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Chromatch - Color Quest",
    description:
      "Challenge yourself with this fun and interactive color guessing game!"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout>
        <Toaster />
      </body>
    </html>
  );
}
