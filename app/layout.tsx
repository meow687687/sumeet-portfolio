/* The shared App Router root layout loads these fonts on every route. */
/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sumeet Basfore — Developer Portfolio',
  description: 'Explore projects by Sumeet Basfore, from creative tools to security and developer utilities.',
  openGraph: { title: 'Sumeet Basfore — Developer Portfolio', description: 'Creative tools, security projects, and developer utilities by Sumeet Basfore.', type: 'website' },
  twitter: { card: 'summary' },
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Antonio:wght@700&family=Bowlby+One&family=Inter:wght@500;700&display=swap" rel="stylesheet"/></head><body>{children}</body></html>;
}
