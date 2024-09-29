"use client";

import React, { useState } from 'react';
import Hero from './components/Hero'
import ProcessDescription from './components/ProcessDescription'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import LanguageSelector from './components/LanguageSelector'
import { Sparkles, Twitter, ArrowUpRight } from 'lucide-react'
import { useTheme } from './contexts/ThemeContext'
import Link from 'next/link'
import BusinessConsulting from './components/BusinessConsulting'
import OurWork from './components/OurWork' // Import the OurWork component
import AIPartners from './components/AIPartners' // Add this new import

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex space-x-2">
      <button onClick={() => setTheme('default')} className={`px-2 py-1 rounded text-sm ${theme === 'default' ? 'bg-blue-500' : 'bg-blue-700'}`}>Default</button>
      <button onClick={() => setTheme('modern')} className={`px-2 py-1 rounded text-sm ${theme === 'modern' ? 'bg-gray-700' : 'bg-gray-900'}`}>Modern</button>
      <button onClick={() => setTheme('vibrant')} className={`px-2 py-1 rounded text-sm ${theme === 'vibrant' ? 'bg-purple-500' : 'bg-purple-700'}`}>Vibrant</button>
    </div>
  );
}

function SocialLinks({ cookieConsentShown }: { cookieConsentShown: boolean }) {
  return (
    <div className={`fixed ${cookieConsentShown ? 'bottom-20' : 'bottom-4'} right-4 z-50 transition-all duration-300`}>
      <Link href="https://twitter.com/useaith" target="_blank" rel="noopener noreferrer">
        <Twitter className="w-6 h-6 text-blue-400" />
      </Link>
    </div>
  );
}

export default function Home() {
  const { theme } = useTheme();
  const [cookieConsentShown, setCookieConsentShown] = useState(true);
  
  const getThemeClasses = () => {
    switch (theme) {
      case 'modern':
        return 'bg-gradient-modern';
      case 'vibrant':
        return 'bg-gradient-vibrant';
      default:
        return 'bg-gradient-default';
    }
  };

  return (
    <main className={`relative min-h-screen overflow-hidden font-sans ${getThemeClasses()}`}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/wave-bg.svg')] bg-cover bg-center animate-wave opacity-20"></div>
      </div>
      <div className="relative z-10">
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
          <Hero />
          <AIPartners /> {/* Add this new component */}
          <ProcessDescription />
          <OurWork /> {/* Add the OurWork component here */}
          <Testimonials />
          <BusinessConsulting />
        </div>
        <Footer />
        <CookieConsent onAccept={() => setCookieConsentShown(false)} onDecline={() => setCookieConsentShown(false)} />
      </div>
      <SocialLinks cookieConsentShown={cookieConsentShown} />
    </main>
  );
}