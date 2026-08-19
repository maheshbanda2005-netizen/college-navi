'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Find Colleges', href: '/universities' },
  { name: 'Compare Colleges', href: '/compare' },
  { name: 'Admission Predictor', href: '/admission-predictor' },
  { name: 'Scholarships', href: '/scholarships' },
  { name: 'Career Guidance', href: '/career-guidance' },
];

const resources = [
  { name: 'AICTE', url: 'https://www.aicte-india.org' },
  { name: 'UGC', url: 'https://www.ugc.ac.in' },
  { name: 'NAAC', url: 'https://www.naac.gov.in' },
  { name: 'NBA', url: 'https://www.nbaind.org' },
  { name: 'NIRF Rankings', url: 'https://www.nirfindia.org' },
  { name: 'TG EAPCET', url: 'https://eapcet.tsche.ac.in' },
];

const features = [
  { name: 'AI Recommendations', href: '/universities' },
  { name: 'Rank Predictor', href: '/rank-predictor' },
  { name: 'Branch Predictor', href: '/branch-predictor' },
  { name: 'ROI Calculator', href: '/roi-calculator' },
  { name: 'Campus Suitability', href: '/campus-suitability' },
  { name: 'Alumni Tracker', href: '/alumni-tracker' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl text-white">EduNavigator <span className="text-primary-400">AI</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              AI-powered platform helping students discover the right college through personalized recommendations,
              rank prediction, and career guidance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">AI Tools</h4>
            <ul className="space-y-2.5">
              {features.map((feature) => (
                <li key={feature.name}>
                  <Link href={feature.href} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {feature.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center gap-1"
                  >
                    {resource.name}
                    <span className="text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

<div className="h-px bg-gray-800 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} EduNavigator AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <a href="#privacy" className="text-gray-500 hover:text-primary-400 transition-colors">Privacy Policy</a>
            <span className="text-gray-700">•</span>
            <a href="#terms" className="text-gray-500 hover:text-primary-400 transition-colors">Terms of Service</a>
            <span className="text-gray-700">•</span>
            <a href="#contact" className="text-gray-500 hover:text-primary-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
