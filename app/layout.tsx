'use client'

import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { ThemeProvider } from './contexts/ThemeContext';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

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
