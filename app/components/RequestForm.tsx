"use client";

import React, { useState } from 'react';
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Upload } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import db from '../services/database';
import { abbreviateFileName } from '../utils/helpers';

export default function RequestForm() {
  const [request, setRequest] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = translations[language].requestForm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (request.length < 25) {
      setError(t.errorMinLength);
      return;
    }

    const requestId = Date.now().toString();
    const requestData = {
      request,
      file: file ? {
        name: file.name,
        type: file.type,
        size: file.size,
        // Convert file to base64 string
        data: await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
      } : null
    };

    db.set(requestId, requestData);

    // Navigate to the checkout page with the requestId as a query parameter
    router.push(`/checkout?requestId=${requestId}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedTypes = ['.txt', '.pdf', '.docx'];
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (allowedTypes.includes(`.${fileExtension}`)) {
        setFile(selectedFile);
        setError('');
      } else {
        setError(t.errorFileType);
        e.target.value = '';
      }
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'modern':
        return 'bg-gray-800 border-gray-700 text-gray-100';
      case 'vibrant':
        return 'bg-white/20 backdrop-blur-md border-white/30 text-white';
      default:
        return 'bg-blue-500 border-blue-300 text-white';
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full mx-auto p-6 rounded-lg shadow-lg ${getThemeClasses()}`}>
      <div className={`mb-2 p-2 rounded-t-md font-medium text-left text-lg ${getThemeClasses()}`}>
        I'd like to use AI to...
      </div>
      <Textarea 
        placeholder={t.placeholder}
        className={`mb-4 h-32 w-full resize-none border-2 rounded-b-md p-2 font-light ${getThemeClasses()}`}
        value={request}
        onChange={(e) => setRequest(e.target.value)}
        spellCheck={false}
      />
      {error && <p className="text-red-400 mb-2 font-light">{error}</p>}
      <div className="flex justify-between items-center">
        <label className={`flex items-center cursor-pointer py-2 px-4 rounded font-light ${getThemeClasses()}`}>
          <Upload className="mr-2" size={20} />
          {file ? abbreviateFileName(file.name) : t.uploadFile}
          <input type="file" accept=".txt,.pdf,.docx" className="hidden" onChange={handleFileChange} />
        </label>
        <Button type="submit" className={`py-2 px-6 rounded font-light ${getThemeClasses()}`}>
          {t.submitPrompt}
        </Button>
      </div>
      <p className="text-xs mt-2 font-light">{t.acceptedFileTypes}</p>
    </form>
  )
}