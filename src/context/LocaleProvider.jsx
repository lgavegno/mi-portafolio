import { LocaleContext } from './LocaleContext.jsx';

// Import all locale files
import commonEn from '../locales/en/common.js';
import heroEn from '../locales/en/hero.js';
import servicesEn from '../locales/en/services.js';
import worksEn from '../locales/en/works.js';
import contactEn from '../locales/en/contact.js';

import commonEs from '../locales/es/common.js';
import heroEs from '../locales/es/hero.js';
import servicesEs from '../locales/es/services.js';
import worksEs from '../locales/es/works.js';
import contactEs from '../locales/es/contact.js';

export const LocaleProvider = ({ locale, children }) => {
  const localeFiles = {
    en: { common: commonEn, hero: heroEn, services: servicesEn, works: worksEn, contact: contactEn },
    es: { common: commonEs, hero: heroEs, services: servicesEs, works: worksEs, contact: contactEs },
  };

  const t = localeFiles[locale];

  return (
    <LocaleContext.Provider value={{ locale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};
