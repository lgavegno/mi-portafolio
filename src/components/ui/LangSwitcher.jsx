import { useLocation, useNavigate } from 'react-router-dom';

const LOCALE_PREFIX = {
  es: '',
  en: '/en',
  pt: '/pt',
};

const LOCALIZED_SEGMENTS = {
  agencias: {
    es: 'agencias',
    en: 'agencies',
    pt: 'agencias',
  },
};

const LOCALES = [
  { id: 'es', label: '🇪🇸', title: 'Español', ariaLabel: 'Cambiar a Español' },
  { id: 'en', label: '🇺🇸', title: 'English', ariaLabel: 'Switch to English' },
  { id: 'pt', label: '🇧🇷', title: 'Português', ariaLabel: 'Mudar para Português' },
];

const getLocaleFromPathname = (pathname) => {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en';
  if (pathname === '/pt' || pathname.startsWith('/pt/')) return 'pt';
  return 'es';
};

const stripLocalePrefix = (pathname, locale) => {
  const prefix = LOCALE_PREFIX[locale];
  if (!prefix) return pathname;

  const stripped = pathname.slice(prefix.length);
  return stripped === '' ? '/' : stripped;
};

const translateSegments = (pathname, sourceLocale, targetLocale) =>
  pathname
    .split('/')
    .map((segment) => {
      const segmentGroup = Object.values(LOCALIZED_SEGMENTS).find(
        (localized) => localized[sourceLocale] === segment
      );

      return segmentGroup?.[targetLocale] ?? segment;
    })
    .join('/');

const buildLocalizedPath = (pathname, sourceLocale, targetLocale) => {
  const unprefixedPath = stripLocalePrefix(pathname, sourceLocale);
  const translatedPath = translateSegments(unprefixedPath, sourceLocale, targetLocale);
  const prefix = LOCALE_PREFIX[targetLocale];

  if (translatedPath === '/') {
    return prefix || '/';
  }

  return `${prefix}${translatedPath}`;
};

const LangSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentLocale = getLocaleFromPathname(location.pathname);

  const handleNavigate = (targetLocale) => {
    if (targetLocale === currentLocale) {
      return;
    }

    const newPathname = buildLocalizedPath(location.pathname, currentLocale, targetLocale);

    window.scrollTo(0, 0);
    navigate(newPathname + location.search + location.hash);
  };

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map((locale) => {
        const isActive = locale.id === currentLocale;

        return (
          <button
            key={locale.id}
            onClick={() => handleNavigate(locale.id)}
            className={`px-2 py-1.5 rounded-lg text-lg transition-all duration-200 ${
              isActive
                ? 'bg-[#2C3340] shadow-sm scale-105'
                : 'opacity-50 hover:opacity-80 hover:bg-[#2C3340]/10'
            }`}
            title={locale.title}
            aria-label={locale.ariaLabel}
          >
            {locale.label}
          </button>
        );
      })}
    </div>
  );
};

export default LangSwitcher;
