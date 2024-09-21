"use client";

import React from 'react';
import RequestForm from './RequestForm'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

export default function Hero() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const getThemeClasses = () => {
    switch (theme) {
      case 'modern':
        return 'text-gray-100';
      case 'vibrant':
        return 'text-white';
      default:
        return 'text-white';
    }
  };

  const t = translations[language].hero;

  return (
    <section className={`py-20 text-center ${getThemeClasses()}`}>
      <h1 className="text-6xl font-extrabold mb-6 tracking-tight leading-tight">{t.title}</h1>
      <p className="text-xl mb-4 max-w-2xl mx-auto font-light">
        {t.subtitle}
      </p>
      <p className="text-lg mb-8 max-w-2xl mx-auto font-light">
        {t.expertDescription}
      </p>
      <div className="max-w-3xl mx-auto">
        <RequestForm />
      </div>
    </section>
  )
}