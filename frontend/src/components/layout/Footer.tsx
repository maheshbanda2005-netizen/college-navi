'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Find Colleges', href: '/universities' },
    { name: 'Rank Predictor', href: '/admission-predictor' },
    { name: 'Compare Colleges', href: '/compare' },
    { name: 'Scholarships', href: '/scholarships' },
    { name: 'Career Guidance', href: '/career-guidance' },
    { name: 'Contact', href: '#contact' },
  ];

  const resources = [
    { name: 'AICTE', url: 'https://www.aicte-india.org' },
    { name: 'UGC', url: 'https://www.ugc.ac.in' },
    { name: 'NAAC', url: 'https://www.naac.gov.in' },
    { name: 'NBA', url: 'https://www.nbaind.org' },
    { name: 'NIRF Rankings', url: 'https://www.nirfindia.org' },
    { name: 'TG EAPCET', url: 'https://eapcet.tsche.ac.in' },
    { name: 'TG ECET', url: 'https://ecet.tsche.ac.in' },
  ];

  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com/maheshbanda', icon: '🐙', color: 'hover:text-gray-400' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/maheshbanda', icon: '💼', color: 'hover:text-blue-400' },
    { label: 'Facebook', url: 'https://facebook.com/maheshbanda', icon: '📘', color: 'hover:text-blue-500' },
    { label: 'Instagram', url: 'https://instagram.com/maheshbanda', icon: '📸', color: 'hover:text-pink-400' },
    { label: 'YouTube', url: 'https://youtube.com/@maheshbanda', icon: '▶️', color: 'hover:text-red-400' },
    { label: 'X (Twitter)', url: 'https://x.com/maheshbanda', icon: '🐦', color: 'hover:text-gray-400' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 pt-16 pb-8">
      {/* Developer Profile Card */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 shadow-2xl"
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Developer Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-2">👨💻 Mahesh Banda</h3>
              <p className="text-primary-100 mb-3">Full Stack AI Developer | B.Tech Student</p>
              <p className="text-primary-100 text-sm leading-relaxed mb-4">
                Passionate about building AI-powered applications that solve real-world problems in education, healthcare, and smart governance. Specialized in Next.js, React, Python, and Machine Learning.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                  <span>📄</span>
                  <span>Download Resume</span>
                </button>
                <button className="flex items-center space-x-2 bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                  <span>💬</span>
                  <span>Hire Me</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">20+</div>
                <div className="text-sm text-primary-100">AI Features</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">40+</div>
                <div className="text-sm text-primary-100">Colleges</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">37</div>
                <div className="text-sm text-primary-100">Pages</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">🎓 EduNavigator AI</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Smart University & College Finder Portal helping students discover the right college through AI-powered recommendations, rank prediction, and personalized career guidance.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>v1.0.0</span>
              <span>•</span>
              <span>Last Updated: 2024</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">🔗 Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">📚 Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{resource.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">📞 Contact</h4>
            <div className="space-y-3">
              <a href="mailto:mahesh@edunavigator.ai" className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors group">
                <span>📧</span>
                <span className="text-sm">mahesh@edunavigator.ai</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400">
                <span>📍</span>
                <span className="text-sm">Hyderabad, Telangana, India</span>
              </div>
              <a href="https://maheshbanda.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors group">
                <span>🌐</span>
                <span className="text-sm">maheshbanda.com</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Social Links & Additional Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">🤝 Connect With Me</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-xl transition-all ${social.color} hover:bg-gray-700`}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Project Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">🚀 Project Links</h4>
            <div className="space-y-2">
              <a href="https://github.com/maheshbanda/edunavigator-ai" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors group">
                <span>🐙</span>
                <span>GitHub Repository</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
              <a href="https://edunavigator.ai" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors group">
                <span>🌐</span>
                <span>Live Project</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors group">
                <span>⭐</span>
                <span>Rate This Project</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Legal & Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © 2024 EduNavigator AI. All Rights Reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Designed & Developed with ❤️ by <span className="text-primary-400 font-semibold">Mahesh Banda</span>
            </p>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <a href="#privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-600">•</span>
            <a href="#terms" className="text-gray-400 hover:text-primary-400 transition-colors">
              Terms of Service
            </a>
            <span className="text-gray-600">•</span>
            <a href="#contact" className="text-gray-400 hover:text-primary-400 transition-colors">
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow text-xl"
          title="Contact"
        >
          💬
        </motion.button>
      </motion.div>
    </footer>
  );
}
