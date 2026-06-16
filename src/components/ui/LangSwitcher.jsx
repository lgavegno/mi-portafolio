import { useLocation, useNavigate } from 'react-router-dom';

// Segmentos de ruta que difieren entre ES y EN
const SEGMENT_ES_TO_EN = { agencias: 'agencies' };
const SEGMENT_EN_TO_ES = { agencies: 'agencias' };

const translateSegments = (pathname, map) =>
  pathname.split('/').map(seg => map[seg] ?? seg).join('/');

const LangSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isEN = location.pathname.startsWith('/en');

  const handleNavigate = (targetLocale) => {
    let newPathname = location.pathname;

    if (targetLocale === 'en') {
      // Navegar a EN: prepend /en si no existe, luego traducir segmentos
      if (!newPathname.startsWith('/en')) {
        newPathname = '/en' + newPathname;
      }
      newPathname = translateSegments(newPathname, SEGMENT_ES_TO_EN);
    } else {
      // Navegar a ES: strip /en si existe, luego traducir segmentos
      if (newPathname.startsWith('/en')) {
        newPathname = newPathname.slice(3);
        if (!newPathname.startsWith('/')) {
          newPathname = '/' + newPathname;
        }
      }
      newPathname = translateSegments(newPathname, SEGMENT_EN_TO_ES);
    }

    window.scrollTo(0, 0);
    navigate(newPathname + location.search + location.hash);
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => handleNavigate('es')}
        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
          !isEN
            ? 'bg-cyan-500/20 text-cyan-300'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => handleNavigate('en')}
        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
          isEN
            ? 'bg-cyan-500/20 text-cyan-300'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LangSwitcher;
