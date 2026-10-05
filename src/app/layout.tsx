/**
 * @file layout.tsx
 * @description Root application layout — Elementis-inspired dark theme.
 * Loads DM Sans + DM Serif Display + Noto Sans Devanagari (for Nepali),
 * mounts Lenis smooth scroll, scroll-reveal, and Language providers.
 */

import type { Metadata } from 'next';
import '@/app/globals.css';
import { SITE } from '@/lib/constants';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: SITE.fullName,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['school', 'education', 'Nepal', 'Jeevan Jyoti', 'higher secondary', 'NEB'],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.fullName,
    description: SITE.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        {/* Google Fonts — DM Sans + DM Serif Display + Noto Sans Devanagari (Nepali) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,200;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&family=Noto+Sans+Devanagari:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
          {children}
      </body>
    </html>
  );
}
