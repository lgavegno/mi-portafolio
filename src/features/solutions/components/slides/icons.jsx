import {
  FiCopy, FiClock, FiSlash, FiUser, FiUsers, FiRefreshCw, FiDatabase, FiTarget,
  FiShoppingCart, FiPackage, FiShoppingBag, FiPercent, FiTool, FiCheckCircle,
  FiSettings, FiClipboard, FiRepeat, FiGlobe, FiCpu, FiBook, FiTag, FiHome,
  FiFileText, FiGrid, FiDollarSign, FiBarChart2, FiBriefcase,
} from 'react-icons/fi';

// Claves usadas en data/slides.*.js → íconos genéricos (sin assets de terceros).
const SLIDE_ICONS = {
  copy: FiCopy, clock: FiClock, unlink: FiSlash, user: FiUser, users: FiUsers,
  refresh: FiRefreshCw, database: FiDatabase, target: FiTarget, cart: FiShoppingCart,
  package: FiPackage, bag: FiShoppingBag, calculator: FiPercent, tool: FiTool,
  check: FiCheckCircle, settings: FiSettings, clipboard: FiClipboard, repeat: FiRepeat,
  globe: FiGlobe, cpu: FiCpu, book: FiBook, tag: FiTag, home: FiHome, file: FiFileText,
  grid: FiGrid, dollar: FiDollarSign, chart: FiBarChart2, shop: FiBriefcase,
};

export function SlideIcon({ name, className = '' }) {
  const Icon = SLIDE_ICONS[name];
  return Icon ? <Icon aria-hidden="true" className={className} /> : null;
}
