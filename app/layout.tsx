import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRISHYAM — See your ingredients. Discover your possibilities.",
  description:
    "AI-powered computational gastronomy and personalized nutrition. Molecular aroma pairing, pantry intelligence, and metabolic targets in one cinematic platform.",
  keywords: [
    "computational gastronomy",
    "personalized nutrition",
    "molecular pairing",
    "Indian cuisine",
    "pantry intelligence",
    "FlavorDB",
  ],
  authors: [{ name: "DRISHYAM" }],
  openGraph: {
    title: "DRISHYAM — Computational Gastronomy",
    description:
      "Your kitchen, understood. Your nutrition, decoded. See your ingredients and discover your possibilities.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

import { FirebaseProvider } from "@/components/firebase-provider";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
