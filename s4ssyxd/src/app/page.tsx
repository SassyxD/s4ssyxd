import Image from "next/image";
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl animate-float" />
        <div className="text-center z-10">
          <h1 className="text-6xl font-extralight mb-4 animate-fade-in">
            S4ssyxD
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 animate-fade-in delay-200">
            Creative Developer & Digital Artist
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-primary-light/5 to-transparent">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-light/20 dark:bg-accent-dark/20 rounded-full blur-2xl animate-scale" />
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">About Me</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            A passionate developer with a keen eye for design and creativity. I blend technical expertise with artistic flair to create unique digital experiences.
          </p>
        </div>
      </section>

      {/* CV Section */}
      <section id="cv" className="min-h-screen flex items-center justify-center relative">
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary-light/10 rounded-full blur-2xl animate-rotate" />
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
          <div className="space-y-8">
            {/* Timeline items */}
            <div className="relative pl-8 border-l-2 border-primary-light dark:border-accent-dark">
              <div className="absolute w-4 h-4 bg-primary-light dark:bg-accent-dark rounded-full -left-[9px] top-0" />
              <h3 className="text-xl font-bold">Senior Developer</h3>
              <p className="text-gray-600 dark:text-gray-400">2020 - Present</p>
              <p className="mt-2">Leading development teams and creating innovative solutions.</p>
            </div>
            {/* Add more timeline items as needed */}
          </div>
        </div>
      </section>

      {/* Playground Section */}
      <section id="playground" className="min-h-screen flex items-center justify-center relative bg-gradient-to-tl from-accent-light/5 to-transparent">
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-light/15 rounded-full blur-3xl animate-float" />
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Creative Playground</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project cards */}
            <div className="bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-4">Interactive Experiments</h3>
              <p className="text-gray-600 dark:text-gray-400">Exploring the boundaries of web interactions.</p>
            </div>
            {/* Add more project cards */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center relative">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-accent-light/20 dark:bg-accent-dark/20 rounded-full blur-3xl animate-scale" />
        <div className="max-w-2xl mx-auto px-6 text-center z-10">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <div className="space-y-6">
            <a
              href="mailto:contact@s4ssyxd.com"
              className="inline-block px-8 py-3 bg-primary-light dark:bg-accent-dark text-white rounded-full hover:opacity-90 transition-opacity"
            >
              Say Hello
            </a>
            <div className="flex justify-center space-x-6 mt-8">
              {/* Add social media links */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
