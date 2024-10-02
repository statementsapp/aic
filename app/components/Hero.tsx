"use client";

import React, { useState } from 'react';
import RequestForm from './RequestForm'
import Chatbot from './Chatbot'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

export default function Hero() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [activeView, setActiveView] = useState(1); // Default to "Best AI Chatbot" view

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

  const heroContents = [
    // Original content
    {
      content: (
        <>
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">{t.title}</h1>
          <p className="text-xl mb-2 max-w-2xl mx-auto font-light">
            {t.subtitle}
          </p>
          <p className="text-lg mb-6 max-w-2xl mx-auto font-light">
            {t.expertDescription}
          </p>
        </>
      ),
      form: <RequestForm />
    },
    // New content with "Best AI Chatbot"
    {
      content: (
        <>
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Best AI Chatbot
          </h1>
          <p className="text-xl mb-2 max-w-2xl mx-auto font-light">
            Experience the future of customer interaction with our state-of-the-art AI chatbot.
          </p>
          <p className="text-lg mb-6 max-w-2xl mx-auto font-light">
            Seamlessly handle inquiries, provide instant support, and elevate your customer service to unprecedented levels.
          </p>
        </>
      ),
      form: <Chatbot />
    }
  ];

  return (
    <section className={`py-12 text-center ${getThemeClasses()}`}>
      <div className="flex flex-col h-[550px]">
        <div className="relative flex-grow overflow-hidden">
          {heroContents.map(({ content, form }, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === activeView ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="h-full flex flex-col justify-between">
                <div>{content}</div>
                <div className="mt-4 max-w-3xl mx-auto w-full">
                  {form}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => setActiveView(index)}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              index === activeView
                ? 'bg-white scale-125'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`View ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}