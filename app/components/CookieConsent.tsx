"use client";

import React, { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    setIsVisible(false);
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50">
      <p className="text-sm">
        This website uses cookies to enhance the user experience. 
        <Link href="/privacy-policy" className="ml-2 underline">Privacy Policy</Link>
      </p>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={handleDecline}>Decline</Button>
        <Button variant="default" size="sm" onClick={handleAccept}>Accept</Button>
      </div>
    </div>
  );
}