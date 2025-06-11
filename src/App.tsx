// Enhanced portfolio app with improved animations and section visibility
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimation } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiArrowUp, FiCircle, FiMoon, FiSun } from 'react-icons/fi';
import Navbar from './components/Navbar';
import { useEffect, useState, useRef, createContext, useContext } from 'react';

// Create theme context
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => { },
});

// Typing animation component
const TypeWriter = ({ text, delay = 100, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span className={`${className} typing-cursor`}>
      {displayText}
    </span>
  );
};

const SkillTag = ({ skill }) => (
  <div className="skill-tag">
    {skill}
  </div>
);

const NameRevealText = ({ text, delay = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.2, 0.65, 0.3, 0.9]
      }}
      className="block"
    >
      {text}
    </motion.span>
  );
};

const CodenameMask = ({ children }) => {
  return (
    <motion.div
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{
        duration: 1,
        delay: 1.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }}
      className="overflow-hidden"
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{
          duration: 1,
          delay: 1.8,
          ease: [0.2, 0.65, 0.3, 0.9]
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const MouseTrail = () => {
  const [trails, setTrails] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Main trail
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      setTrails(prev => [...prev, newTrail].slice(-15));

      // Sparkles
      const newSparkles = Array.from({ length: 3 }, (_, i) => ({
        x: e.clientX + (Math.random() - 0.5) * 30,
        y: e.clientY + (Math.random() - 0.5) * 30,
        id: Date.now() + i,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
      }));
      setSparkles(prev => [...prev, ...newSparkles].slice(-30));

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setTrails([]);
        setSparkles([]);
      }, 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Main trail */}
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
            x: trail.x - 4,
            y: trail.y - 4,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}
      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
          initial={{ opacity: sparkle.opacity, scale: sparkle.scale }}
          animate={{
            opacity: 0,
            scale: 0,
            x: sparkle.x - 2,
            y: sparkle.y - 2,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

const FloatingParticle = ({ delay = 0, size = 1, opacity = 0.3 }) => {
  const randomX = Math.random() * window.innerWidth;
  const randomDuration = 15 + Math.random() * 10;
  const randomDelay = delay + (Math.random() * 2);

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity,
      }}
      initial={{ x: randomX, y: window.innerHeight + 10 }}
      animate={{
        y: -10,
        transition: {
          duration: randomDuration,
          repeat: Infinity,
          delay: randomDelay,
          ease: "linear"
        }
      }}
    />
  );
};

const ParticleField = () => {
  // Generate particles with different sizes
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // Random size between 1-4px
    opacity: Math.random() * 0.3 + 0.1, // Random opacity between 0.1-0.4
    delay: i * 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <FloatingParticle
          key={particle.id}
          delay={particle.delay}
          size={particle.size}
          opacity={particle.opacity}
        />
      ))}
    </div>
  );
};

const GlowingCard = ({ children, className = "" }) => {
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      />
      {children}
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useTransform(scaleProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scaleProgress, [0, 1], [0, 100]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const socialLinks = [
    {
      href: "https://github.com/SassyxD",
      icon: FiGithub,
      label: "GitHub"
    },
    {
      href: "mailto:xenonhash@gmail.com",
      icon: FiMail,
      label: "Email"
    }
  ];

  const skills = [
    'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'Next.js',
    'Python', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL', 'Redis',
    'Git', 'CI/CD', 'Jest', 'React Native', 'Vue.js', 'Angular'
  ];

  const roles = ["Full Stack Developer", "Designer", "Problem Solver"];

  const [message, setMessage] = useState("");

  const experiences = [
    'Leading development of DDEXP platform as Part-time Fullstack Developer',
    'Delivering high-quality solutions as Freelance Fullstack Developer on Fastwork',
    'Contributing to blockchain infrastructure as Backend Developer at just.money'
  ];

  const competitions = [
    {
      title: "🏆 Grand Prize - Huawei ICT Competition 2024-2025",
      details: "National Round (Computing Track)",
      level: "National",
      status: "completed",
      priority: 1
    },
    {
      title: "🌏 3rd Prize - Huawei ICT Competition 2024-2025",
      details: "Regional Round @KLCC (Computing Track)",
      level: "International",
      status: "completed",
      priority: 2
    },
    {
      title: "🥉 3rd Prize - Huawei ICT Competition 2023-2024",
      details: "National Round (Computing Track)",
      level: "National",
      status: "completed",
      priority: 3
    },
    {
      title: "🎖️ Honorable Mention - ETHglobal Bangkok",
      details: "Global Blockchain Competition",
      level: "International",
      status: "completed",
      priority: 4
    },
    {
      title: "🚀 Final Pitch Qualified - AI Hackathon@SIT",
      details: "The International AI Hackathon @KMUTT",
      level: "International",
      status: "ongoing",
      priority: 5
    },
    {
      title: "💻 Semi-Finalist - SCC Solution Hackathon",
      details: "Banpu Track",
      level: "National",
      status: "completed",
      priority: 6
    },
    {
      title: "🏃‍♂️ Ongoing - National Software Contest 2025",
      details: "NSC 2025",
      level: "National",
      status: "ongoing",
      priority: 7
    },
    {
      title: "🛡️ Ongoing - Cyber Warrior Hackathon 2025",
      details: "Cybersecurity Competition",
      level: "National",
      status: "ongoing",
      priority: 8
    },
    {
      title: "💰 Ongoing - Hack to the Max",
      details: "Next-gen Financial Solution",
      level: "National",
      status: "ongoing",
      priority: 9
    },
    {
      title: "📊 Participant - Impvest Financial Hackathon",
      details: "Financial Innovation Competition",
      level: "National",
      status: "completed",
      priority: 10
    },
    {
      title: "🔧 Participant - Intania Hackathon",
      details: "Engineering Innovation Challenge",
      level: "University",
      status: "completed",
      priority: 11
    }
  ];

  const achievements = [
    {
      title: "Certifications",
      items: [
        "AWS Certified Solutions Architect",
        "Google Cloud Professional Developer",
        "Microsoft Azure Expert"
      ]
    },
    {
      title: "Publications",
      items: [
        "Research paper on AI optimization",
        "Technical blog with 10k+ followers"
      ]
    },
    {
      title: "Open Source",
      items: [
        "Core contributor to popular frameworks",
        "500+ GitHub stars on personal projects"
      ]
    }
  ];

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Remove system preference check to ensure light mode is default
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <MouseTrail />
        <ParticleField />
        <Navbar />

        <div className="container mx-auto px-4 py-8 max-w-5xl mt-20">
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative mb-16 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                <div className="md:w-1/2 text-center md:text-left space-y-6">
                  <div>
                    <div className="overflow-hidden mb-6">
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                        <NameRevealText text={<span className="gradient-text">Nattapong</span>} delay={0.3} />
                        <NameRevealText text={<span className="gradient-text">Pudtipatkosit</span>} delay={0.6} />
                      </h1>
                    </div>

                    <div>
                      <CodenameMask>
                        <motion.h2
                          className="text-2xl md:text-3xl font-bold gradient-text mb-4 relative"
                          initial={{ opacity: 0, scale: 1.2 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 2,
                            ease: [0.2, 0.65, 0.3, 0.9]
                          }}
                        >
                          s4ssyxd
                        </motion.h2>
                      </CodenameMask>
                      <motion.div
                        className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 font-medium flex flex-wrap gap-2 justify-center md:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 2.3,
                          ease: [0.2, 0.65, 0.3, 0.9]
                        }}
                      >
                        <TypeWriter text={roles.join(" • ")} delay={100} />
                      </motion.div>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="md:w-1/2 flex justify-center"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: 1,
                    ease: [0.2, 0.65, 0.3, 0.9]
                  }}
                >
                  <motion.img
                    src="/pfp.jpg"
                    alt="Profile"
                    className="profile-image w-64 h-64 md:w-80 md:h-80 object-cover"
                    animate={{
                      y: [0, -8, 0],
                      x: [-3, 3, -3]
                    }}
                    transition={{
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "reverse"
                      },
                      x: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "reverse"
                      }
                    }}
                  />
                </motion.div>
              </div>
            </section>

            {/* About Me Section */}
            <section id="about" className="grid grid-cols-1 gap-8 mb-8">
              <GlowingCard className="interactive-card group">
                <h2 className="text-2xl font-semibold mb-6 gradient-text group-hover:text-violet-700">About Me</h2>
                <div className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>
                    Yo! I'm your typical brainrot-infected Gen Z dev from KMITL's School of IT.
                    Absolutely obsessed with crafting sick web experiences that make people go "sheesh!"
                    My toxic trait? I can't stop thinking about clean code and pixel-perfect designs.
                  </p>
                  <p>
                    When I'm not in my coding era, you'll catch me doom-scrolling through tech Twitter,
                    contributing to open-source (real), or sharing my ✨hot takes✨ with the dev community.
                    Fr fr, web dev is my passion and I'm always down to collab on something cool!
                  </p>
                </div>
              </GlowingCard>
            </section>

            {/* Skills Section */}
            <section id="skills" className="grid grid-cols-1 gap-8 mb-8">
              <GlowingCard className="interactive-card group">
                <h2 className="text-2xl font-semibold mb-6 gradient-text group-hover:text-violet-700">Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                    >
                      <SkillTag skill={skill} />
                    </motion.div>
                  ))}
                </div>
              </GlowingCard>
            </section>

            {/* Experience, Say Something, and Competitions Section */}
            <div className="grid grid-cols-12 gap-8 mb-8">
              {/* Left column - Experience and Say Something */}
              <div className="col-span-12 md:col-span-7 space-y-8 flex flex-col">
                <GlowingCard id="experience" className="interactive-card group flex-1">
                  <h2 className="text-2xl font-semibold mb-6 gradient-text group-hover:text-violet-700">Professional Experience</h2>
                  <div className="space-y-4">
                    {experiences.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="experience-item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FiCircle className="experience-bullet" />
                        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlowingCard>

                <GlowingCard className="interactive-card group">
                  <h2 className="text-2xl font-semibold mb-6 gradient-text group-hover:text-violet-700">Say or Sybau🥀</h2>
                  <div className="space-y-4">
                    <textarea
                      className="say-something-input"
                      placeholder="Leave a message for me..."
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <motion.button
                        className="say-something-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          console.log('Message:', message);
                          setMessage('');
                        }}
                      >
                        Send Message
                      </motion.button>
                    </div>
                  </div>
                </GlowingCard>
              </div>

              {/* Right column - Competitions */}
              <div className="col-span-12 md:col-span-5 flex">
                <GlowingCard className="interactive-card group w-full">
                  <h2 className="text-2xl font-semibold mb-6 gradient-text group-hover:text-violet-700">
                    Competitions & Achievements
                  </h2>
                  <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2" style={{ maxHeight: "460px" }}>
                    {competitions.map((comp, index) => (
                      <motion.div
                        key={index}
                        className="competition-item p-3 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex flex-col gap-1.5">
                          <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                            {comp.title}
                          </span>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {comp.details}
                          </span>
                          <div className="flex gap-1.5 items-center flex-wrap mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${comp.level === 'International'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : comp.level === 'National'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                              }`}>
                              {comp.level}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${comp.status === 'ongoing'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              }`}>
                              {comp.status === 'ongoing' ? '🔄 Ongoing' : '✅ Completed'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlowingCard>
              </div>
            </div>

            {/* Contact Section */}
            <section id="contact" className="text-center space-y-8 pb-16">
              <h2 className={`text-2xl font-semibold gradient-text ${isDarkMode ? 'dark:text-violet-400' : ''}`}>
                Let's Connect
              </h2>
              <div className="flex justify-center gap-8">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon ${isDarkMode ? 'dark:text-violet-400 dark:hover:text-violet-300' : ''}`}
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
            </section>
          </div>
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
    </ThemeContext.Provider>
  );
}

export default App;
