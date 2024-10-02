"use client";

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { useRouter } from 'next/navigation';

export default function Chatbot() {
  const { language } = useLanguage();
  const t = translations[language].chatbot;
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    router.push(`/pay-for-request?message=${encodeURIComponent(message)}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-2"> {/* Changed from max-w-md to max-w-3xl and mt-4 to mt-2 */}
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {t.sendButton}
        </button>
      </form>
    </div>
  );
}