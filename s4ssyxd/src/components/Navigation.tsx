import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'cv', label: 'CV' },
    { id: 'playground', label: 'Playground' },
    { id: 'contact', label: 'Contact' },
]

export default function Navigation() {
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.5 }
        )

        navItems.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <ul className="flex space-x-8">
                {navItems.map(({ id, label }) => (
                    <li key={id}>
                        <a
                            href={`#${id}`}
                            className={twMerge(
                                'text-sm font-medium transition-colors duration-200',
                                activeSection === id
                                    ? 'text-primary-light dark:text-accent-dark'
                                    : 'text-gray-600 hover:text-primary-light dark:text-gray-400 dark:hover:text-accent-dark'
                            )}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
} 