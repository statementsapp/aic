"use client";

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded ${language === 'en' ? 'bg-blue-500' : 'bg-blue-700'}`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('th')}
        className={`px-2 py-1 rounded ${language === 'th' ? 'bg-blue-500' : 'bg-blue-700'}`}
      >
        TH
      </button>
    </div>
  );
}