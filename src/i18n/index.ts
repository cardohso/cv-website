/**
 * Tiny i18n layer.
 *
 * Today there is a single locale (`en`). The structure below is deliberately
 * set up so that adding European Portuguese later is mechanical:
 *
 *   1. Copy `en.ts` to `pt.ts` and translate the strings.
 *   2. Import it here and add it to `dictionaries` + `locales`.
 *   3. Add 'pt' to `locales` in `astro.config.mjs`.
 *   4. (Optional) create localized routes under `src/pages/pt/`.
 *
 * Components call `getContent()` (defaulting to `en`) so none of them hardcode
 * copy — all visible text comes from the dictionary.
 */
import { en, type SiteContent } from './en';

export const defaultLocale = 'en' as const;
export const locales = ['en'] as const; // add 'pt' here later
export type Locale = (typeof locales)[number];

const dictionaries: Record<Locale, SiteContent> = { en };

export function getContent(locale: Locale = defaultLocale): SiteContent {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export type { SiteContent };
