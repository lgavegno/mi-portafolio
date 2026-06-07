import { useLocation, useNavigate } from 'react-router-dom';

const LangSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isES = location.pathname.startsWith('/es');

  const handleNavigate = (targetLocale) => {
    let newPathname = location.pathname;

    if (targetLocale === 'es') {
      // Navegar a ES: prepend /es si no existe
      if (!newPathname.startsWith('/es')) {
        newPathname = '/es' + newPathname;
      }
    } else {
      // Navegar a EN: strip /es si existe
      if (newPathname.startsWith('/es')) {
        newPathname = newPathname.slice(3);
        if (!newPathname.startsWith('/')) {
          newPathname = '/' + newPathname;
        }
      }
    }

    window.scrollTo(0, 0);
    navigate(newPathname + location.search + location.hash);
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => handleNavigate('en')}
        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
          !isES
            ? 'bg-cyan-500/20 text-cyan-300'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleNavigate('es')}
        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
          isES
            ? 'bg-cyan-500/20 text-cyan-300'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        ES
      </button>
    </div>
  );
};

export default LangSwitcher;
