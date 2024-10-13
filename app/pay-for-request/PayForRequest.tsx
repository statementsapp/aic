"use client";

import React, { useState, useRef, useEffect } from 'react';
import Footer from './Footer';
import Image from 'next/image';
import { RefreshCw } from 'lucide-react';

interface PayForRequestProps {
  message: string;
}

export default function PayForRequest({ message }: PayForRequestProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [partialResponse, setPartialResponse] = useState<string | null>(null);
  const [fullResponse, setFullResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [partialResponse, showPayment]);

  useEffect(() => {
    generateResponse();
  }, []);

  const generateResponse = async () => {
    setIsGenerating(true);
    setError(null);
    setPartialResponse('');
    setFullResponse(null);
    setShowPayment(false);

    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const reader = res.body?.getReader();
      if (!reader) throw new Error('Failed to get response reader');

      let accumulatedResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        accumulatedResponse += chunk;
      }

      const paragraphs = accumulatedResponse.split('\n\n');
      const twoParagraphs = paragraphs.slice(0, 2).join('\n\n');

      setFullResponse(twoParagraphs);
      await displayResponseGracefully(twoParagraphs);
      setTimeout(() => setShowPayment(true), 1500);
    } catch (error) {
      console.error('Error generating response:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const displayResponseGracefully = async (response: string) => {
    const paragraphs = response.split('\n\n');
    const firstParagraph = paragraphs[0];
    const words = firstParagraph.split(/\s+/);
    const targetWordCount = Math.min(words.length, 30);

    for (let i = 1; i <= targetWordCount; i++) {
      setPartialResponse(words.slice(0, i).join(' '));
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
    }

    if (words.length > targetWordCount) {
      setPartialResponse(prevResponse => prevResponse + ' ...');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col p-4">
        <div className="max-w-4xl mx-auto w-full shadow-md rounded-lg overflow-hidden text-gray-100 p-6 border-4 border-white bg-gray-800 flex flex-col">
          <div ref={chatContainerRef} className="flex flex-col space-y-4 mb-4 h-98 overflow-y-auto">
            <div className="self-end bg-blue-500 rounded-lg p-3 max-w-[70%]">
              {message}
            </div>
            <div className="self-start bg-gray-700 rounded-lg p-3 w-[70%]">
              <div className="whitespace-pre-wrap min-h-[4rem]">
                {partialResponse}
              </div>
              {isGenerating && (
                <div className="mt-2 flex justify-center">
                  <RefreshCw className="animate-spin" size={20} />
                </div>
              )}
            </div>
            {showPayment && (
              <div className="self-end bg-green-500 rounded-lg p-3 max-w-[70%] flex flex-col items-center">
                <p className="mb-2">Pay 50 THB</p>
                <Image src="/qr-code.png" alt="QR Code" width={150} height={150} />
              </div>
            )}
          </div>
          
          {error && (
            <div className="mt-4 text-red-500">
              Error: {error}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
