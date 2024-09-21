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
import { Suspense } from 'react';
import CheckoutContent from './CheckoutContent';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}