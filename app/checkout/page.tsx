"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import Link from 'next/link';
import { ArrowLeft, Upload, Sparkles, Twitter, Check } from 'lucide-react';
import db from '../services/database';
import Image from 'next/image';
import { useToast } from "../components/ui/use-toast";
import { Toaster } from "../components/ui/toast";
import { abbreviateFileName } from '../utils/helpers';
import { z } from 'zod';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex space-x-2">
      <button onClick={() => setTheme('default')} className={`px-2 py-1 rounded text-sm ${theme === 'default' ? 'bg-blue-500' : 'bg-blue-700'}`}>Default</button>
      <button onClick={() => setTheme('modern')} className={`px-2 py-1 rounded text-sm ${theme === 'modern' ? 'bg-gray-700' : 'bg-gray-900'}`}>Modern</button>
      <button onClick={() => setTheme('vibrant')} className={`px-2 py-1 rounded text-sm ${theme === 'vibrant' ? 'bg-purple-500' : 'bg-purple-700'}`}>Vibrant</button>
    </div>
  );
}

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex space-x-2">
      <button onClick={() => setLanguage('en')} className={`px-2 py-1 rounded ${language === 'en' ? 'bg-blue-500' : 'bg-blue-700'}`}>EN</button>
      <button onClick={() => setLanguage('th')} className={`px-2 py-1 rounded ${language === 'th' ? 'bg-blue-500' : 'bg-blue-700'}`}>TH</button>
    </div>
  );
}

export default function CheckoutPage() {
  const [prompt, setPrompt] = useState('');
  const [email, setEmail] = useState('');
  const [productType, setProductType] = useState<'text' | 'photo'>('text');
  const [file, setFile] = useState<File | null>(null);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { toast } = useToast();

  const t = translations[language].checkout;

  useEffect(() => {
    const requestId = searchParams.get('requestId');
    if (requestId) {
      const requestData = db.get(requestId);
      if (requestData) {
        setPrompt(requestData.request);
        if (requestData.file) {
          // Convert base64 back to File object
          const byteString = atob(requestData.file.data.split(',')[1]);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const newFile = new File([ab], requestData.file.name, { type: requestData.file.type });
          setFile(newFile);
        }
      }
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          email,
          productType,
          specialInstructions,
          fileName: file?.name,
        }),
      })
      const result = await response.json()

      if (result.success) {
        let toastMessage = `Your confirmation number is: ${result.data.confirmationNumber}.`
        if (result.data.emailInfo.error) {
          toastMessage += " However, there was an issue sending the confirmation email. Please contact support if you don't receive it shortly."
        } else {
          toastMessage += ' A confirmation email has been sent.'
        }
        toast({
          title: "Checkout Successful",
          description: toastMessage,
        })
        router.push('/qr-code')
      } else {
        throw new Error(result.message || "Checkout failed")
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "There was an error processing your checkout. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getThemeClasses = () => {
    switch (theme) {
      case 'modern':
        return 'bg-gray-800 border-gray-700 text-gray-100';
      case 'vibrant':
        return 'bg-blue-500 border-blue-300 text-white';
      default:
        return 'bg-blue-500 border-blue-300 text-white';
    }
  };

  const guarantees = [
    'Customer service 7 days a Week',
    'Satisfaction guaranteed',
    'Secure payment'
  ];

  return (
    <div className={`min-h-screen flex flex-col ${getThemeClasses()}`}>
      <header className="flex justify-between items-center py-8 relative container mx-auto px-4">
        <div className="flex items-center">
          <Sparkles className="w-8 h-8 mr-2" />
          <span className="text-2xl font-bold tracking-tight">UseAI.th</span>
        </div>
        <div className="absolute left-1/4 top-0 transform -translate-x-1/2">
          <ThemeSwitcher />
        </div>
        <div className="flex items-center">
          <LanguageSelector />
          <Link href="https://twitter.com/useaith" target="_blank" rel="noopener noreferrer" className="ml-4">
            <Twitter className="w-6 h-6 text-blue-400" />
          </Link>
        </div>
      </header>
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className={`w-full max-w-4xl mx-auto rounded-lg shadow-lg border-2 border-white ${getThemeClasses()}`}>
          <div className="flex items-center justify-between p-6 border-b border-white">
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-sm font-light"
            >
              <ArrowLeft size={16} className="mr-2" />
              {t.backButton}
            </Button>
          </div>
          <div className="flex">
            <div className="w-2/3 p-6">
              <div className="mb-3">
                <div className={`mb-2 p-2 rounded-t-md font-medium ${getThemeClasses()}`}>
                  I'd like to use AI to...
                </div>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t.promptLabel}
                  className={`h-32 w-full resize-none border rounded-b-md p-2 text-sm font-light ${getThemeClasses()}`}
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-light">Special Instructions</label>
                <Textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Any special instructions or requirements?"
                  className={`h-24 w-full resize-none border rounded-md p-2 text-sm font-light ${getThemeClasses()}`}
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-light">{t.productTypeLabel}</label>
                <Select 
                  value={productType} 
                  onValueChange={(value: 'text' | 'photo') => setProductType(value)}
                >
                  <SelectTrigger className={`w-full border rounded-md text-sm font-light ${getThemeClasses()}`}>
                    <SelectValue placeholder={t.selectProductType} />
                  </SelectTrigger>
                  <SelectContent className={`${getThemeClasses()} opacity-100`}>
                    <SelectItem value="text">{t.textOption}</SelectItem>
                    <SelectItem value="photo">{t.photoOption}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-3">
                <label className="block mb-1 text-sm font-light">{t.emailLabel}</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-2 border rounded-md text-sm font-light ${getThemeClasses()}`}
                />
              </div>
              <div className="mb-3">
                <label className={`flex items-center cursor-pointer py-1 px-3 rounded text-sm font-light ${getThemeClasses()}`}>
                  <Upload className="mr-2" size={16} />
                  {file ? abbreviateFileName(file.name) : t.uploadLabel}
                  <input type="file" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            </div>
            <div className="w-1/3 p-6 border-l border-white">
              <h2 className="text-lg font-semibold mb-2">{t.priceTitle}</h2>
              <p className="text-2xl font-bold mb-2">200 THB</p>
              <p className="text-xs mb-4 font-light">{t.priceDescription}</p>
              <Button 
                onClick={handleCheckout} 
                disabled={isLoading}
                className={`w-full py-2 text-sm font-light border-2 border-white flex items-center justify-center ${getThemeClasses()}`}
              >
                {isLoading ? 'Processing...' : (
                  <>
                    <Image
                      src="/thaiqrpayment.png"
                      alt="Thai QR Payment"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    {t.checkoutButton}
                  </>
                )}
              </Button>
              <div className="mt-4">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Check size={16} className="mr-2 text-green-500" />
                    <span className="text-xs">{guarantee}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}