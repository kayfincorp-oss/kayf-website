import type { Metadata } from 'next';
import { Fraunces, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces-var',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit-var',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-var',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kayf — Don\'t watch AI think',
  description:
    'Kayf automatically switches you to a break activity while your AI thinks, then brings you back when the answer is ready. Zero data collected.',
  keywords: [
    'chrome extension',
    'ai productivity',
    'chatgpt',
    'claude',
    'gemini',
    'deepseek',
    'break timer',
    'focus tool',
  ],
  openGraph: {
    title: 'Kayf — Don\'t watch AI think',
    description:
      'Kayf automatically switches you to a break activity while your AI thinks, then brings you back when the answer is ready. Zero data collected.',
    type: 'website',
    url: 'https://www.getkayf.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kayf — Don\'t watch AI think',
    description:
      'Kayf automatically switches you to a break activity while your AI thinks, then brings you back when the answer is ready.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
