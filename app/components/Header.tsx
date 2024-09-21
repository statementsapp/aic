"use client";

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'default' ? 'modern' : theme === 'modern' ? 'vibrant' : 'default');
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'modern':
        return 'bg-gray-800 text-gray-100';
      case 'vibrant':
        return 'bg-white/20 backdrop-blur-md text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <header className={`p-4 flex justify-between items-center ${getThemeClasses()}`}>
      <Link href="/" className="text-2xl font-bold">
        UseAI
      </Link>
      <div>
        <button onClick={toggleLanguage} className="mr-4 px-3 py-1 rounded border">
          {language === 'en' ? 'TH' : 'EN'}
        </button>
        <button onClick={toggleTheme} className="px-3 py-1 rounded border">
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      </div>
    </header>
  );
}