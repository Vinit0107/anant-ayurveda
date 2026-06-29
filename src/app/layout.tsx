import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Anant Ayurveda | Ancient Wisdom for Modern Life",
  description:
    "Discover the power of nature through our ethically sourced, premium Ayurvedic formulations designed to restore balance to your Mind, Body, and Spirit.",
  keywords: [
    "Ayurveda",
    "Ayurvedic products",
    "Natural wellness",
    "Herbal remedies",
    "Aloe Vera Gel",
    "Hair Growth",
    "Organic skincare",
    "Anant Ayurveda",
    "Bhavnagar",
  ],
  authors: [{ name: "Anant Ayurveda" }],
  openGraph: {
    title: "Anant Ayurveda | Ancient Wisdom for Modern Life",
    description:
      "Premium Ayurvedic formulations designed to restore balance to your Mind, Body, and Spirit.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0C0C0C] text-white font-inter antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
