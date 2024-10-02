"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ClipboardCopy, Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const dummyResponse = `    This is a dummy response in the style of Grok. It's witty, informative, and slightly irreverent. The response continues with more details and interesting facts. Here's some more text to make it longer and more engaging for the reader.

    Now, let's dive into a second paragraph of this dummy text. We'll explore some hypothetical scenarios, throw in a few jokes, and maybe even a dash of sarcasm. After all, that's what you'd expect from a chatbot trying to emulate the style of Grok, right? Remember, the key to great AI is not just accuracy, but also personality!`;

export default function PayForRequest({ message }: { message: string }) {
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isFullyDisplayed, setIsFullyDisplayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < dummyResponse.length) {
        setDisplayedResponse(prev => prev + dummyResponse[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setIsFullyDisplayed(true);
      }
    }, 20); // Adjusted from 10 to 20 for slightly slower typing

    return () => clearInterval(interval);
  }, []);

  const handlePayment = () => {
    setIsLoading(true);
    // Simulate payment process
    setTimeout(() => {
      setShowQR(true);
      setIsLoading(false);
      setIsPaid(true); // Set isPaid to true after payment
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayedResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className={`max-w-3xl mx-auto shadow-md rounded-lg overflow-hidden text-gray-100 p-6 border-4 border-white transition-colors duration-300 ${isGenerating ? 'bg-gray-700' : 'bg-gray-800'}`}>
          <div className="flex flex-col space-y-4">
            <div className="self-end max-w-[70%]">
              <div className="bg-blue-600 p-3 rounded-lg">
                <p className="text-white">{message}</p>
              </div>
            </div>
            <div 
              className="self-start max-w-[70%] relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="bg-gray-700 p-3 rounded-lg relative">
                <p className="text-gray-300 whitespace-pre-wrap">{displayedResponse}</p>
                <div className="absolute top-[75%] left-0 right-0 bottom-0 bg-gradient-to-t from-gray-700 via-gray-700 to-transparent"></div>
              </div>
              {isFullyDisplayed && isPaid && isHovered && (
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-1 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors duration-200"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <ClipboardCopy className="w-5 h-5 text-gray-300" />
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="mt-8">
            {!showQR ? (
              <div>
                <button
                  onClick={handlePayment}
                  disabled={isGenerating || isLoading}
                  className="w-full py-2 text-sm font-medium border-2 border-blue-500 flex items-center justify-center mb-2 bg-gray-800 text-blue-400 rounded-lg hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin text-blue-400" />
                      Generating
                    </>
                  ) : isLoading ? (
                    'Processing...'
                  ) : (
                    <>
                      <Image
                        src="/thaiqrpayment.png"
                        alt="Thai QR Payment"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      PromptPay
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4">Scan QR Code to Pay</h3>
                <Image src="/qr-code.png" alt="QR Code" width={200} height={200} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-400 p-4 text-right">
        Questions? <Link href="mailto:contact@useai.in.th" className="text-blue-400 hover:underline">Contact us</Link>
      </div>
    </div>
  );
}