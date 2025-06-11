import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiMoon, FiSun, FiUser, FiMail, FiGithub, FiAward, FiCode } from 'react-icons/fi';
import { ThemeContext } from '../App';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

    const menuItems = [
        { icon: FiUser, label: 'About Me', href: '#about' },
        { icon: FiCode, label: 'Skills', href: '#skills' },
        { icon: FiAward, label: 'Experience', href: '#experience' },
        { icon: FiMail, label: 'Contact', href: '#contact' },
        { icon: FiGithub, label: 'GitHub', href: 'https://github.com/SassyxD', external: true },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenuClick = (href: string) => {
        setIsOpen(false);
        if (!href.startsWith('http')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'mt-4' : 'mt-8'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className={`relative rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 
                    ${scrolled ? 'py-2 px-4' : 'py-3 px-6'} 
                    ${isDarkMode ? 'bg-gray-800/95 border border-gray-700' : 'bg-white/95 border border-gray-100'}`}
                >
                    <div className="flex items-center justify-between">
                        <a href="#" className="text-xl font-bold gradient-text">
                            s4ssyxd
                        </a>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-2">
                            {/* Theme Toggle */}
                            <motion.button
                                className={`p-2 rounded-full ${isDarkMode
                                    ? 'bg-gray-700 text-violet-400 hover:bg-gray-600 border border-gray-600'
                                    : 'bg-gray-50 text-violet-600 hover:bg-gray-100 border border-gray-200'
                                    } transition-all duration-300`}
                                onClick={toggleDarkMode}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                            </motion.button>

                            {/* Menu Button */}
                            <button
                                className={`${isDarkMode ? 'text-violet-400 hover:text-violet-300' : 'text-gray-600 hover:text-fuchsia-500'
                                    } transition-colors duration-300 relative`}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <FiMenu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Menu Overlay */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-4 w-48 rounded-xl shadow-lg overflow-hidden"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className={`${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'} p-2`}>
                                    {menuItems.map((item) => (
                                        <motion.a
                                            key={item.label}
                                            href={item.external ? item.href : '#'}
                                            target={item.external ? '_blank' : undefined}
                                            rel={item.external ? 'noopener noreferrer' : undefined}
                                            onClick={() => !item.external && handleMenuClick(item.href)}
                                            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isDarkMode
                                                ? 'hover:bg-gray-700 text-gray-300'
                                                : 'hover:bg-gray-100 text-gray-600'
                                                } transition-all duration-300`}
                                            whileHover={{ x: 4 }}
                                        >
                                            <item.icon size={18} />
                                            {item.label}
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;