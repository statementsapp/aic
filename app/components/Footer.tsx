import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-blue-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p>UseAI.th - Empowering your business with AI solutions.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">Send Request</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p>Email: info@useai.th</p>
            <p className="mt-4">
              Follow us on Twitter: 
              <a href="https://twitter.com/useaith" target="_blank" rel="noopener noreferrer" className="ml-1 underline">@useaith</a>
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p>&copy; 2024 UseAI.in.th. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}