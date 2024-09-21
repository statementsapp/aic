"use client";

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

export default function ProcessDescription() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const getThemeClasses = () => {
    // ... (unchanged)
  };

  const t = translations[language].process;

  return (
    <section className={`py-16 ${getThemeClasses()}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{t.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">{index + 1}</span>
              </div>
              <p className="font-light">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}