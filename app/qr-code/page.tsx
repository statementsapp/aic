"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { translations } from '../utils/translations';
import { Button } from '../components/ui/button';

export default function QRCodePage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language].qrCode || { 
    title: '', 
    description: '', 
    confirmation: '', 
    customerService: '', 
    backToHome: '' // Fallback for backToHome
  }

  const getThemeClasses = () => {
    switch (theme) {
      case 'modern':
        return 'bg-gray-900 text-white';
      case 'vibrant':
        return 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${getThemeClasses()}`}>
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
        <p className="text-md mb-6">{t.confirmation}</p>
        <p className="text-lg mb-6">{t.description}</p>
        <div className="bg-white p-4 rounded-lg mb-8 flex justify-center">
          <Image src="/qr-code.png" alt="QR Code" width={250} height={250} />
        </div>
        
        <p className="text-sm mb-6">{t.customerService}</p>
        <Link href="/" passHref>
          <Button variant="outline" className="w-full">
            {t.backToHome}
          </Button>
        </Link>
      </div>
    </div>
  );
}