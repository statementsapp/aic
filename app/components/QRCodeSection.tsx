import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

export default function QRCodeSection() {
  return (
    <section id="qr-code-section" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">We are processing</h2>
        <h3 className="text-2xl font-semibold mb-8">Scan to Start Your Project</h3>
        <div className="flex justify-center">
          <Image 
            src="/qrcode.jpeg" 
            alt="QR Code" 
            width={200} 
            height={200} 
            className="rounded-lg shadow-lg"
          />
        </div>
        <p className="mt-4 text-gray-600">Scan this QR code to begin your AI project journey</p>
        <Link href="/" passHref>
          <Button className="mt-8">Back to Home</Button>
        </Link>
      </div>
    </section>
  );
}