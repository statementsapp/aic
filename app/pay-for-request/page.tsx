"use client";

import React from 'react';
import PayForRequest from '../components/PayForRequest';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import { useTheme } from '../contexts/ThemeContext';

export default function PayForRequestPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || '';
  const { theme } = useTheme();

  const getThemeClasses = () => {
    switch (theme) {
      case 'modern':
        return 'bg-gradient-modern text-gray-100';
      case 'vibrant':
        return 'bg-gradient-vibrant text-white';
      default:
        return 'bg-gradient-default text-white';
    }
  };

  return (
    <main className={`min-h-screen ${getThemeClasses()}`}>
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center py-8 relative">
          <Link href="/" className="flex items-center">
            <Sparkles className="w-8 h-8 mr-2" />
            <span className="text-2xl font-bold tracking-tight">UseAI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link 
              href="/consultation" 
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              <span className="mr-2">Book a Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </header>
        <div className="py-8">
          <PayForRequest message={message} />
        </div>
      </div>
    </main>
  );
}