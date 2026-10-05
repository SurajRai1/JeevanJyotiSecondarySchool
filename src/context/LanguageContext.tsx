'use client';
/**
 * @file LanguageContext.tsx
 * @description Global language context for the full-site translation system.
 *
 * Persists the selected language to localStorage so the user's choice
 * survives page refreshes. Also updates the <html lang> attribute for
 * accessibility and SEO.
 *
 * HOW TO ADD A NEW LANGUAGE:
 *   1. Add the language code to the `Language` type in translations.ts
 *   2. Add the translation block to translations.ts
 *   3. Add the language option to the Navbar switcher
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Language } from '@/lib/translations';

interface LanguageContextValue {
  /** Currently selected language code */
  lang: Language;
  /** Switch to a different language */
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
});

const STORAGE_KEY = 'jj_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved === 'en' || saved === 'ne') {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // localStorage not available (SSR / private browsing)
    }
  }, []);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
    // Update <html lang> attribute for a11y + screen readers
    document.documentElement.lang = l === 'ne' ? 'ne' : 'en';
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Access the current language and the setter. */
export const useLanguage = () => useContext(LanguageContext);
