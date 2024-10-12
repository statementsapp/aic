"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ClipboardCopy, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Footer from './Footer';

interface PayForRequestProps {
  message: string;
}

export default function PayForRequest({ message }: PayForRequestProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateResponse = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to generate response');
      }

      const data = await res.json();
      setResponse(data.content);
    } catch (error) {
      console.error('Error generating response:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setResponse(null);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col p-4">
        <div className={`max-w-4xl mx-auto w-full shadow-md rounded-lg overflow-hidden text-gray-100 p-6 border-4 border-white transition-colors duration-300 ${isGenerating ? 'bg-gray-700' : 'bg-gray-800'} flex flex-col`}>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Message:</h2>
            <p>{message}</p>
          </div>
          
          <button
            onClick={handleGenerateResponse}
            disabled={isGenerating}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {isGenerating ? 'Generating...' : 'Generate Response'}
          </button>
          
          {error && (
            <div className="mt-4 text-red-500">
              Error: {error}
            </div>
          )}
          
          {response && (
            <div className="mt-4 relative">
              <div className="whitespace-pre-wrap text-gray-300 relative z-10">
                {response}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/70 to-gray-800 pointer-events-none"></div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
