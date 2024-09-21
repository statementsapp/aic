"use client";

import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { translations } from '../utils/translations'
import Image from 'next/image'

export function OurWork() {
  const { theme } = useTheme()

  const getThemeClasses = () => {
    switch (theme) {
      case 'modern':
        return 'bg-gray-800 text-white';
      case 'vibrant':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <section className={`w-full py-12 ${getThemeClasses()}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Work</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/otters.jpeg"
              alt="Family of otters"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg mb-4">
              This image showcases our ability to create lifelike and charming animal illustrations.
            </p>
            <p className="italic text-gray-300">
              Prompt: "A heartwarming scene of a family of otters playing together in a crystal-clear river. The otters are depicted with realistic fur textures and expressive faces, showing their playful nature. The background features lush greenery and smooth river stones, creating a serene natural environment."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurWork