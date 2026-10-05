/**
 * @file useT.ts
 * @description Translation hook. Returns a `t(key)` function that resolves
 * dot-separated keys (e.g., `t('nav.academics')`) from the active language
 * dictionary. Falls back to the key string if not found.
 *
 * Usage:
 *   const t = useT();
 *   <h1>{t('home.hero.slide1.line1')}</h1>
 *
 * For typed arrays (e.g., activities, events), use `tArr`:
 *   const features = tArr('home.features.items');
 */

'use client';

import { useLanguage } from '@/context/LanguageContext';
import translations from '@/lib/translations';

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

type Leaves<T> = T extends object
  ? { [K in keyof T]: K extends string ? `${K}` | `${K}.${Leaves<T[K]>}` : never }[keyof T]
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DeepValue<T, K extends string> = K extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? DeepValue<T[Head], Tail>
    : never
  : K extends keyof T
  ? T[K]
  : never;

type EnDict = typeof translations.en;

// ---------------------------------------------------------------------------

export function useT() {
  const { lang } = useLanguage();
  const dict = translations[lang] as EnDict;

  /**
   * Resolve a dot-separated key to a string value.
   * Falls back to the key itself if the path is not found.
   */
  function t(key: Leaves<EnDict>): string {
    const parts = (key as string).split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let node: any = dict;
    for (const part of parts) {
      if (node == null || typeof node !== 'object') return key as string;
      node = node[part];
    }
    return typeof node === 'string' ? node : (key as string);
  }

  /**
   * Resolve a dot-separated key to an array value.
   * Useful for translated data arrays (features, events, etc.)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function tArr<T = any>(key: string): T[] {
    const parts = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let node: any = dict;
    for (const part of parts) {
      if (node == null || typeof node !== 'object') return [];
      node = node[part];
    }
    return Array.isArray(node) ? (node as T[]) : [];
  }

  return { t, tArr, lang };
}
