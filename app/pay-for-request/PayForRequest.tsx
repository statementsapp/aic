"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ClipboardCopy, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Footer from './Footer';

const dummyResponse = `    This is a dummy response in the style of Grok. It's witty, informative, and slightly irreverent. The response continues with more details and interesting facts. Here's some more text to make it longer and more engaging for the reader.

    Now, let's dive into a second paragraph of this dummy text. We'll explore some hypothetical scenarios, throw in a few jokes, and maybe even a dash of sarcasm. After all, that's what you'd expect from a chatbot trying to emulate the style of Grok, right? Remember, the key to great AI is not just accuracy, but also personality!`;

export default function PayForRequest({ message }: { message: string }) {
  // ... (keep all the existing state and functions)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col p-4">
        <div className={`max-w-4xl mx-auto w-full shadow-md rounded-lg overflow-hidden text-gray-100 p-6 border-4 border-white transition-colors duration-300 ${isGenerating ? 'bg-gray-700' : 'bg-gray-800'} flex flex-col`}>
          {/* ... (keep all the existing JSX for the conversation and payment button) */}
          
          {response && (
            <div className="mt-4 relative">
              <div className="whitespace-pre-wrap text-gray-300 relative z-10">
                {response}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/70 to-gray-800 pointer-events-none"></div>
            </div>
          )}
          
          {/* ... rest of the existing JSX ... */}
        </div>
      </div>
      <Footer />
    </div>
  );
}