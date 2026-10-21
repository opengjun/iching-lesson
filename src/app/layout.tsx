import type { Metadata } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lesson 1 · Lines and Images",
  description:
    "A beginner-friendly introduction to the I Ching: yin and yang lines, the eight trigrams, and how one changing line shifts a reading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${sourceSerif.variable} min-h-dvh bg-stone-100 font-sans text-stone-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
