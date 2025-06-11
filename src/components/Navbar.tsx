import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { title: 'About', href: '#about' },
        { title: 'Skills', href: '#skills' },
        { title: 'Experience', href: '#experience' },
        { title: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md z-50 border-b border-white/20">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <motion.a
                    href="#"
                    className="text-xl font-semibold gradient-text"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    s4ssyxd
                </motion.a>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {menuItems.map((item, index) => (
                        <motion.a
                            key={item.title}
                            href={item.href}
                            className="nav-link"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            {item.title}
                        </motion.a>
                    ))}
                </div>

                {/* Hamburger Button */}
                <motion.button
                    className="md:hidden flex flex-col space-y-1.5 p-2 relative z-50"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.span
                        className="hamburger-line"
                        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    />
                    <motion.span
                        className="hamburger-line"
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    />
                    <motion.span
                        className="hamburger-line"
                        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    />
                </motion.button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                className="mobile-menu-overlay md:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                            />
                            <motion.div
                                className="mobile-menu md:hidden"
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            >
                                <div className="p-6 space-y-6">
                                    {menuItems.map((item, index) => (
                                        <motion.a
                                            key={item.title}
                                            href={item.href}
                                            className="block nav-link text-lg"
                                            onClick={() => setIsOpen(false)}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {item.title}
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar; 