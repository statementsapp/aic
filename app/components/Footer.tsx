import React from 'react';
import Link from 'next/link';
import { Sparkles} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-blue-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-xl font-semibold mb-4">
              <Sparkles className="w-8 h-8 mr-2" />
              <span className="text-2xl font-bold tracking-tight">UseAI</span>

            </span>
            
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