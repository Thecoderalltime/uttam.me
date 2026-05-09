"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Database, 
  Layers, 
  Globe, 
  Code2, 
  ChevronRight,
  Send,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Data ---
const SKILLS = [
  { name: "React / Next.js", icon: <Code2 className="w-5 h-5" />, category: "Frontend" },
  { name: "Node.js / Express", icon: <Terminal className="w-5 h-5" />, category: "Backend" },
  { name: "MongoDB / MERN", icon: <Database className="w-5 h-5" />, category: "Stack" },
  { name: "Firebase", icon: <Globe className="w-5 h-5" />, category: "Cloud" },
  { name: "GraphQL", icon: <Layers className="w-5 h-5" />, category: "Backend" },
  { name: "MySQL", icon: <Cpu className="w-5 h-5" />, category: "Database" },
  { name: "Tailwind CSS", icon: <Layers className="w-5 h-5" />, category: "UI" },
  { name: "WordPress", icon: <Globe className="w-5 h-5" />, category: "CMS" },
];

const PROJECTS = [
  {
    title: "E-Commerce OS",
    description: "A full-scale MERN marketplace with real-time inventory and GraphQL API.",
    tags: ["MERN", "GraphQL", "Tailwind"],
    link: "#"
  },
  {
    title: "Firebase Dashboard",
    description: "Enterprise monitoring tool with Firebase Auth and Firestore.",
    tags: ["React", "Firebase", "Motion"],
    link: "#"
  },
  {
    title: "WP Headless CMS",
    description: "Modern frontend for a WordPress backend using REST API.",
    tags: ["Next.js", "WordPress", "Node"],
    link: "#"
  }
];

// --- Components ---

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-12",
      isScrolled ? "glass py-3 border-b border-border shadow-md bg-white/80 dark:bg-black/70" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold font-mono tracking-tighter"
        >
          UTTAM <span className="text-brand">.</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-muted hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors text-muted hover:text-foreground border border-border"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors text-muted"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            className="text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass p-6 md:hidden flex flex-col gap-4 text-center"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg py-2 hover:text-brand"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ContactForm = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      if (res.ok) {
        setFormState('success');
        setMessage(result.message);
        (e.target as HTMLFormElement).reset();
      } else {
        setFormState('error');
        setMessage(result.message || result.error || 'Failed to send');
      }
    } catch (err) {
      setFormState('error');
      setMessage('Network error. Check your connection.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted">Full Name</label>
          <input 
            name="name"
            required
            className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition-colors text-foreground" 
            placeholder="Uttam Kumar Roy"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted">Email Address</label>
          <input 
            name="email"
            type="email"
            required
            className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition-colors text-foreground" 
            placeholder="roy77uttom@gmail.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm text-muted">Message</label>
        <textarea 
          name="message"
          required
          rows={5}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-brand transition-colors resize-none text-foreground" 
          placeholder="How can I help you?"
        ></textarea>
      </div>
      
      <button 
        type="submit"
        disabled={formState === 'loading'}
        className="w-full bg-brand hover:bg-brand-secondary text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        {formState === 'loading' ? 'Sending...' : (
          <>
            Send Message <Send className="w-4 h-4" />
          </>
        )}
      </button>

      {message && (
        <p className={cn(
          "text-sm text-center mt-4",
          formState === 'success' ? "text-green-500" : "text-red-500"
        )}>
          {message}
        </p>
      )}
    </form>
  );
};

export default function PortfolioApp() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    const initialDark = saved ? saved === 'dark' : true;
    setIsDark(initialDark);
    
    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen selection:bg-brand/30 selection:text-brand">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <header id="about" className="relative pt-24 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-brand/5 dark:bg-brand/10 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full text-[10px] font-mono font-bold text-brand mb-6 border-brand/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
              </span>
              AVAILABLE FOR NEW PROJECTS
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-foreground">
              Full-Stack <br />
              <span className="text-gradient">Expertise </span>
              Redefined.
            </h1>
            <p className="text-lg text-muted max-w-xl mb-8 leading-relaxed">
              Hi, I&apos;m <span className="text-foreground font-semibold">Uttam Kumar Roy</span>. 
              A MERN stack specialist crafting high-performance, accessible, and 
              scalable full-stack applications with modern architecture.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-brand text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-secondary transition-all shadow-lg shadow-brand/10 hover:shadow-brand/20">
                Hire Me
              </a>
              <a href="#projects" className="glass px-8 py-3 rounded-lg font-semibold hover:bg-white dark:hover:bg-zinc-800 transition-all flex items-center gap-2 border border-border shadow-sm">
                View Work <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex gap-6 mt-12">
              <a href="#" className="text-muted hover:text-brand transition-colors p-2 glass rounded-lg"><Github className="w-5 h-5"/></a>
              <a href="#" className="text-muted hover:text-brand transition-colors p-2 glass rounded-lg"><Linkedin className="w-5 h-5"/></a>
              <a href="mailto:roy77uttom@gmail.com" className="text-muted hover:text-brand transition-colors p-2 glass rounded-lg"><Mail className="w-5 h-5"/></a>
            </div>
          </motion.div>

          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative z-10 glass p-8 rounded-3xl border-brand/10 shadow-2xl shadow-brand/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-accent ring-2 ring-brand/20 p-0.5">
                   <Image 
                     src="https://api.dicebear.com/7.x/avataaars/svg?seed=Uttam" 
                     alt="Profile" 
                     fill
                     className="w-full h-full object-cover rounded-xl bg-background" 
                     referrerPolicy="no-referrer"
                   />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Uttam Kumar Roy</h3>
                  <p className="text-xs text-brand font-mono font-bold tracking-wider">FULL-STACK DEVELOPER</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-accent/50 rounded-2xl border border-border">
                  <div className="text-2xl font-bold font-mono text-foreground">5+</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-muted">Years Exp</div>
                </div>
                <div className="p-4 bg-accent/50 rounded-2xl border border-border">
                  <div className="text-2xl font-bold font-mono text-foreground">50+</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-muted">Projects Done</div>
                </div>
              </div>

              <div className="mt-8 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-muted">
                   <span>Location</span>
                   <span className="text-foreground font-bold">Dhaka, BD</span>
                </div>
                <div className="flex justify-between items-center text-muted">
                   <span>Main Stack</span>
                   <span className="text-foreground font-bold">MERN / Firebase</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 md:px-12 glass border-y-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/10 -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Core Competencies</h2>
              <p className="text-muted leading-relaxed max-w-lg">Optimizing performance and scalability with the latest cloud-native technologies and industry best practices.</p>
            </div>
            <div className="flex gap-2 text-[10px] font-mono font-bold uppercase tracking-tighter">
              <span className="px-3 py-1 glass rounded-full text-brand border-brand/20">Typescript</span>
              <span className="px-3 py-1 glass rounded-full text-brand border-brand/20">Architecture</span>
              <span className="px-3 py-1 glass rounded-full text-brand border-brand/20">DevOps</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((skill, i) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 glass rounded-2xl card-hover cursor-default bg-card"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300 mb-4 border border-border ring-4 ring-transparent group-hover:ring-brand/10">
                  {skill.icon}
                </div>
                <h3 className="font-bold mb-1 text-foreground">{skill.name}</h3>
                <p className="text-xs text-muted font-medium">{skill.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4">
            <h2 className="text-4xl font-bold tracking-tight">Featured Projects</h2>
            <div className="h-px flex-1 mx-8 bg-border hidden md:block" />
            <p className="text-sm font-mono text-muted">SELECTED WORKS 01-03</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass rounded-3xl overflow-hidden card-hover flex flex-col bg-card"
              >
                <div className="h-56 bg-accent relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent group-hover:scale-105 transition-transform duration-700 ease-out" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand/5 backdrop-blur-[2px]">
                      <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                   </div>
                   <div className="absolute bottom-4 left-4 flex gap-2">
                     {project.tags.map(tag => (
                       <span key={tag} className="text-[10px] font-bold uppercase tracking-widest glass px-2 py-1 rounded-md text-foreground border-white/5">{tag}</span>
                     ))}
                   </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold mb-3 tracking-tight text-foreground">{project.title}</h3>
                  <p className="text-muted text-sm mb-8 flex-1 leading-relaxed">{project.description}</p>
                  <a href={project.link} className="inline-flex items-center gap-2 text-brand font-bold hover:gap-3 transition-all group/link">
                    Explore Project <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-12 relative">
        <div className="absolute inset-0 bg-accent/20 -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">Let&apos;s build <br /> <span className="text-brand">Something Great.</span></h2>
              <p className="text-muted mb-12 max-w-sm leading-relaxed text-lg">
                I&apos;m currently looking for new opportunities and high-impact collaborations. 
                Have a clear vision or just a starting point? Let&apos;s connect.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-sm border-border">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-widest font-bold">Email Directly</p>
                    <p className="font-bold text-foreground">roy77uttom@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-sm border-border">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-widest font-bold">Current Base</p>
                    <p className="font-bold text-foreground">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-brand/5 border-brand/5 bg-card"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background text-center text-muted text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xl font-bold font-mono tracking-tighter text-foreground mb-4">
             UTTAM <span className="text-brand">.</span>
          </div>
          <p className="font-medium tracking-tight">© 2026 Uttam Kumar Roy. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">
            <span>React 19</span>
            <span className="w-1 h-1 rounded-full bg-border mt-1.5" />
            <span>Next.js 15</span>
            <span className="w-1 h-1 rounded-full bg-border mt-1.5" />
            <span>Tailwind V4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
