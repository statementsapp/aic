"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { useRouter } from 'next/navigation';

const prompts = [
  { short: "Otter picture", full: "Create a detailed, whimsical picture of an otter wearing a top hat and monocle, sitting in a Victorian-era library." },
  { short: "Bangkok detective", full: "Write a noir-style detective story set in the bustling streets of Bangkok, featuring a jaded ex-pat investigator and a mysterious client." },
  { short: "Sci-fi haiku", full: "Compose a haiku about a futuristic city on Mars, capturing the blend of human ambition and alien landscapes." },
  { short: "Steampunk invention", full: "Design a steampunk-inspired flying machine that combines Victorian aesthetics with impossible technology." },
  { short: "Time-travel recipe", full: "Create a recipe for a dish that combines ingredients from three different historical eras, explaining the time-travel process to obtain each component." },
  { short: "Alien language", full: "Invent a new alien language with unique phonetics and grammar, providing examples of common phrases and their meanings." },
  { short: "Underwater city", full: "Describe an advanced underwater city built in the Mariana Trench, detailing its architecture, society, and how it deals with the extreme pressure." },
  { short: "Mythical creature", full: "Design a new mythical creature by combining features from three existing legendary beasts, and write a short origin story for it." },
  { short: "Musical plants", full: "Imagine a world where plants can produce music. Describe how this would change ecosystems, human society, and the concept of concerts." }
];

export default function Chatbot() {
  const { language } = useLanguage();
  const t = translations[language].chatbot;
  const [message, setMessage] = useState('');
  const [choices, setChoices] = useState<typeof prompts>([]);
  const router = useRouter();

  useEffect(() => {
    // Randomly select 3 unique prompts
    const shuffled = [...prompts].sort(() => 0.5 - Math.random());
    setChoices(shuffled.slice(0, 3));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    router.push(`/pay-for-request?message=${encodeURIComponent(message)}`);
  };

  const handleChoiceClick = (fullPrompt: string) => {
    setMessage(fullPrompt);
    setChoices([]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto -mt-24">
      <h2>What do you want AI to make for you?</h2>
      <form onSubmit={handleSubmit} className="relative">
        <div className="mb-4 flex flex-col">
          <textarea
            id="message"
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t.messagePlaceholder}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 mb-4"
        >
          {t.sendButton}
        </button>
        {choices.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoiceClick(choice.full)}
                className="bg-gray-700 text-gray-300 py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {choice.short}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}