import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootProvider } from 'fumadocs-ui/provider/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SimpleNS",
  description: "SimpleNS is a self-hosted notification orchestration engine that manages delivery workflows—retries, scheduling, crash recovery, and scaling—while delegating the actual sending to plugins. Build your own providers or use community plugins to support any channel: Email, SMS, WhatsApp, Push, and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
