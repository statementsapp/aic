import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from UseAI.th.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Personal information we collect</h2>
      <p className="mb-4">
        When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
      </p>
      {/* Add more sections as needed */}
      <Link href="/" className="text-blue-500 hover:underline">Back to Home</Link>
    </div>
  );
}