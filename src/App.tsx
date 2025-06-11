// Enhanced portfolio app with improved animations and section visibility
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiArrowUp } from 'react-icons/fi';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsTypingComplete(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scale = useTransform(scaleProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scaleProgress, [0, 1], [0, 100]);

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16 mt-16"
        >
          {/* Hero Section */}
          <motion.section
            id="about"
            className="relative"
            style={{ scale, y }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
              <div className="md:w-1/2 text-center md:text-left space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                      <span className="gradient-text">Nattapong</span>
                      <br />
                      <span className="gradient-text">Pudtipatkosit</span>
                    </h1>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-4 typing-cursor">
                      s4ssyxd
                    </h2>
                    <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 font-medium">
                      Full Stack Developer & Designer
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="profile-image-container md:w-1/2 flex justify-center"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <img
                  src="/pfp.jpg"
                  alt="Profile"
                  className="profile-image w-64 h-64 md:w-80 md:h-80 object-cover"
                />
              </motion.div>
            </div>
          </motion.section>

          {/* About Section */}
          <motion.section
            className="interactive-card"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6 gradient-text">About Me</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              I'm a passionate developer who loves creating beautiful and functional web applications.
              With expertise in modern web technologies, I focus on delivering exceptional user experiences
              through clean code and intuitive design.
            </p>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            id="skills"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={itemVariants}
          >
            <motion.div
              className="interactive-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6 gradient-text">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'Next.js'].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="interactive-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6 gradient-text">Experience</h2>
              <div className="space-y-4">
                {['Senior Developer at Tech Corp', 'Frontend Lead at Startup Inc', 'Freelance Web Developer'].map((exp, index) => (
                  <motion.div
                    key={index}
                    className="experience-item group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ x: 20 }}
                  >
                    <span className="experience-dot"></span>
                    <span className="text-gray-600">{exp}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            id="contact"
            className="text-center space-y-8"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold gradient-text">Let's Connect</h2>
            <div className="flex justify-center gap-8">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  title={link.label}
                >
                  <link.icon />
                </motion.a>
              ))}
            </div>
          </motion.section>
        </motion.main>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="scroll-indicator"
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
      >
        <div className="scroll-indicator-bar" />
        <motion.div
          className="scroll-indicator-progress"
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 360]) }}
        />
        <FiArrowUp className="text-xl text-fuchsia-500" />
      </motion.button>
    </div>
  );
}

export default App;
