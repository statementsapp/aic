"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { translations } from '../utils/translations';
import Image from 'next/image';
import Link from "next/link";

export default function BusinessConsulting() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language].businessConsulting;

  const getThemeClasses = () => {
    switch (theme) {
      case 'modern':
        return 'bg-gray-800 text-white';
      case 'vibrant':
        return 'bg-red-600 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getButtonClasses = () => {
    switch (theme) {
      case 'modern':
        return 'bg-white text-gray-800 hover:bg-gray-200';
      case 'vibrant':
        return 'bg-yellow-400 text-red-600 hover:bg-yellow-300';
      default:
        return 'bg-white text-blue-500 hover:bg-blue-100';
    }
  };

  return (
    <div className={`flex flex-col md:flex-row items-center justify-between py-12 px-4 md:px-8 lg:px-16 ${getThemeClasses()}`}>
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <Image
          src="/consultantspresent.jpg"
          alt="Consultants presenting"
          width={500}
          height={300}
          className="rounded-lg shadow-md"
        />
      </div>
      <div className="w-full md:w-1/2 md:pl-8">
        <h2 className="text-3xl font-bold mb-4">We can help bring AI to your workplace</h2>
        <p className="mb-6">Our consultants provide tailored solutions to help your business thrive in a changing environment.</p>
        <ul className="list-disc list-inside mb-6">
          <li>Powerful data analysis</li>
          <li>Process automation</li>
          <li>Market research</li>
        </ul>
        <Link href="/business-consulting-inquiry" passHref>
          <button className={`px-4 py-2 rounded ${getButtonClasses()}`}>
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
}