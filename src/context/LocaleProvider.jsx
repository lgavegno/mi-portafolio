import { LocaleContext } from './LocaleContext.jsx';

// Import all locale files
import commonEn from '../locales/en/common.js';
import heroEn from '../locales/en/hero.js';
import servicesEn from '../locales/en/services.js';
import worksEn from '../locales/en/works.js';
import contactEn from '../locales/en/contact.js';
import aboutEn from '../locales/en/about.js';
import blogEn from '../locales/en/blog.js';
import experienceEn from '../locales/en/experience.js';
import { agencies } from '../locales/en/agencies.js';

import commonEs from '../locales/es/common.js';
import heroEs from '../locales/es/hero.js';
import servicesEs from '../locales/es/services.js';
import worksEs from '../locales/es/works.js';
import contactEs from '../locales/es/contact.js';
import aboutEs from '../locales/es/about.js';
import blogEs from '../locales/es/blog.js';
import experienceEs from '../locales/es/experience.js';
import { agencias } from '../locales/es/agencias.js';

import commonPt from '../locales/pt/common.js';
import heroPt from '../locales/pt/hero.js';
import servicesPt from '../locales/pt/services.js';
import worksPt from '../locales/pt/works.js';
import contactPt from '../locales/pt/contact.js';
import aboutPt from '../locales/pt/about.js';
import blogPt from '../locales/pt/blog.js';
import experiencePt from '../locales/pt/experience.js';
import { agencies as agenciesPt } from '../locales/pt/agencies.js';

export const LocaleProvider = ({ locale, children }) => {
  const localeFiles = {
    en: { common: commonEn, hero: heroEn, services: servicesEn, works: worksEn, contact: contactEn, about: aboutEn, blog: blogEn, experience: experienceEn, agencies },
    es: { common: commonEs, hero: heroEs, services: servicesEs, works: worksEs, contact: contactEs, about: aboutEs, blog: blogEs, experience: experienceEs, agencias },
    pt: { common: commonPt, hero: heroPt, services: servicesPt, works: worksPt, contact: contactPt, about: aboutPt, blog: blogPt, experience: experiencePt, agencies: agenciesPt },
  };

  const t = localeFiles[locale];

  return (
    <LocaleContext.Provider value={{ locale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};
