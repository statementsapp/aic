"use client";

import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import Footer from './Footer';
import Image from 'next/image';

interface PayForRequestProps {
  message: string;
}

export default function PayForRequest({ message }: PayForRequestProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [response, showPayment]);

  const handleGenerateResponse = async () => {
    setIsGenerating(true);
    setError(null);
    setResponse(null);
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

      let partialResponse = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        partialResponse += chunk;
        
        const lines = partialResponse.split('\n');
        if (lines.length >= 3) {
          const truncatedResponse = lines.slice(0, 3).join('\n') + '...';
          setResponse(truncatedResponse);
          console.log('Response:', truncatedResponse);
          break;
        }
      }

      setTimeout(() => setShowPayment(true), 1000);
    } catch (error) {
      console.error('Error generating response:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col p-4">
        <div className="max-w-4xl mx-auto w-full shadow-md rounded-lg overflow-hidden text-gray-100 p-6 border-4 border-white bg-gray-800 flex flex-col">
          <div ref={chatContainerRef} className="flex flex-col space-y-4 mb-4 h-96 overflow-y-auto">
            <div className="self-end bg-blue-500 rounded-lg p-3 max-w-[70%]">
              {message}
            </div>
            {response && (
              <div className="self-start bg-gray-700 rounded-lg p-3 max-w-[70%]">
                {response}
              </div>
            )}
            {showPayment && (
              <div className="self-end bg-green-500 rounded-lg p-3 max-w-[70%] flex flex-col items-center">
                <p className="mb-2">Pay 50 THB</p>
                <Image src="/qr-code.png" alt="QR Code" width={150} height={150} />
              </div>
            )}
          </div>
          
          <button
            onClick={handleGenerateResponse}
            disabled={isGenerating}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="animate-spin mr-2" size={20} />
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </button>
          
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
