import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import Providers from './providers';
import { ThemeProvider } from './contexts/ThemeContext';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UseAI.th',
  description: 'AI at Your Fingertips',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            <SessionProvider>{children}</SessionProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
