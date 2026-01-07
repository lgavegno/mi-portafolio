// src/components/ui/ShareButton.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShare2, FiMail, FiCopy, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const ShareButton = ({
    url = typeof window !== 'undefined' ? window.location.href : '',
    title = '',
    description = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const menuRef = useRef(null);

    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Resetear estado de copiado cuando se cierra el menú
    useEffect(() => {
        if (!isOpen) {
            setCopied(false);
        }
    }, [isOpen]);

    const shareOptions = [
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            color: 'text-green-400 hover:bg-green-400/10',
            action: () => {
                const text = title ? `${title}\n\n${url}` : url;
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
                window.open(whatsappUrl, '_blank');
                setIsOpen(false);
            }
        },
        {
            name: 'Email',
            icon: FiMail,
            color: 'text-blue-400 hover:bg-blue-400/10',
            action: () => {
                const subject = title || 'Te comparto este enlace';
                const body = description
                    ? `${description}\n\n${url}`
                    : `Mira esto: ${url}`;
                const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.location.href = mailtoUrl;
                setIsOpen(false);
            }
        },
        // Web Share API (nativo en móviles y algunos navegadores de escritorio)
        ...(typeof navigator !== 'undefined' && navigator.share ? [{
            name: 'Compartir',
            icon: FiShare2,
            color: 'text-purple-400 hover:bg-purple-400/10',
            action: async () => {
                try {
                    await navigator.share({
                        title: title || document.title,
                        text: description,
                        url: url
                    });
                    setIsOpen(false);
                } catch (err) {
                    // Usuario canceló o error
                    console.log('Error al compartir:', err);
                }
            }
        }] : []),
        {
            name: copied ? 'Copiado!' : 'Copiar enlace',
            icon: copied ? FiCheck : FiCopy,
            color: copied ? 'text-mint-400 hover:bg-mint-400/10' : 'text-gray-400 hover:bg-white/10',
            action: async () => {
                try {
                    await navigator.clipboard.writeText(url);
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                        setIsOpen(false);
                    }, 1500);
                } catch (err) {
                    console.error('Error al copiar:', err);
                }
            }
        }
    ];

    return (
        <div className="relative" ref={menuRef}>
            {/* Botón principal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                aria-label="Compartir"
                aria-expanded={isOpen}
            >
                <FiShare2 /> Compartir
            </button>

            {/* Menú desplegable */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-800/95 backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden z-50"
                    >
                        <div className="py-2">
                            {shareOptions.map((option, index) => (
                                <motion.button
                                    key={option.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={option.action}
                                    className={`
                    w-full px-4 py-3 flex items-center gap-3
                    transition-colors duration-200
                    ${option.color}
                  `}
                                >
                                    <option.icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{option.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ShareButton;
