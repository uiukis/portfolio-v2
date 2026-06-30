import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { pt } from "@/lib/i18n/dictionaries/pt";
import { JsonLd } from "@/components/seo/json-ld";
import { Providers } from "./providers";
import { SkipLink } from "@/components/layout/skip-link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${pt.meta.title}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: pt.meta.description,
  keywords: [
    "AI Engineer",
    "Technical Lead",
    "Full Stack Engineer",
    "AI Agents",
    "Control Planes",
    "LLM Systems",
    "System Architecture",
    "Technical Leadership",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${pt.meta.title}`,
    description: pt.meta.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${pt.meta.title}`,
    description: pt.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "pt-BR": siteConfig.url,
      en: siteConfig.url,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <Providers>
          <SkipLink />
          <JsonLd />
          {children}
        </Providers>
      </body>
    </html>
  );
}
