'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const careers = [
  { title: 'Data Scientist', demand: 'Very High', avgSalary: '₹25 LPA', skills: ['Python', 'ML', 'Statistics', 'SQL', 'Deep Learning'], growth: '35%' },
  { title: 'AI/ML Engineer', demand: 'Very High', avgSalary: '₹28 LPA', skills: ['Python', 'TensorFlow', 'NLP', 'Computer Vision', 'MLOps'], growth: '40%' },
  { title: 'Full Stack Developer', demand: 'High', avgSalary: '₹18 LPA', skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'], growth: '25%' },
  { title: 'Cloud Architect', demand: 'Very High', avgSalary: '₹35 LPA', skills: ['AWS/Azure', 'Docker', 'Kubernetes', 'Terraform', 'Networking'], growth: '30%' },
  { title: 'Cybersecurity Analyst', demand: 'High', avgSalary: '₹22 LPA', skills: ['Network Security', 'Ethical Hacking', 'Risk Analysis', 'Compliance'], growth: '32%' },
  { title: 'Product Manager', demand: 'High', avgSalary: '₹30 LPA', skills: ['Strategy', 'Analytics', 'UX', 'Agile', 'Communication'], growth: '20%' },
  { title: 'DevOps Engineer', demand: 'Very High', avgSalary: '₹24 LPA', skills: ['Docker', 'K8s', 'CI/CD', 'Linux', 'Scripting'], growth: '28%' },
  { title: 'Blockchain Developer', demand: 'Growing', avgSalary: '₹26 LPA', skills: ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts'], growth: '45%' },
];

const skillGap = [
  { skill: 'Python', current: 3, required: 5, importance: 'Critical' },
  { skill: 'Machine Learning', current: 2, required: 5, importance: 'Critical' },
  { skill: 'SQL', current: 4, required: 4, importance: 'Important' },
  { skill: 'Deep Learning', current: 1, required: 4, importance: 'Important' },
  { skill: 'Cloud Computing', current: 2, required: 4, importance: 'Moderate' },
];

export default function CareerGuidancePage() {
  const [activeTab, setActiveTab] = useState<'careers' | 'skills' | 'roadmap'>('careers');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Career Guidance</h1>
          <p className="text-gray-600 mt-2">Discover career paths, analyze skill gaps, and plan your learning journey</p>
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8 justify-center">
          {['careers', 'skills', 'roadmap'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-md text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600'}`}
            >
              {tab === 'careers' ? 'Career Suggestions' : tab === 'skills' ? 'Skill Gap Analysis' : 'Learning Roadmap'}
            </button>
          ))}
        </div>

        {activeTab === 'careers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{c.title}</h3>
                  <span className={`badge ${c.demand === 'Very High' ? 'badge-danger' : c.demand === 'High' ? 'badge-warning' : 'badge-primary'}`}>
                    {c.demand}
                  </span>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-2">{c.avgSalary}</div>
                <div className="text-sm text-gray-500 mb-3">Growth: {c.growth} YoY</div>
                <div className="flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="max-w-2xl mx-auto">
            <div className="card">
              <h3 className="font-semibold text-lg mb-4">Your Skill Gap Analysis</h3>
              <div className="space-y-4">
                {skillGap.map((s) => (
                  <div key={s.skill}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{s.skill}</span>
                      <span className="text-xs text-gray-500">
                        {s.current}/{s.required} | <span className={s.importance === 'Critical' ? 'text-red-600' : s.importance === 'Important' ? 'text-yellow-600' : 'text-blue-600'}>{s.importance}</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${(s.current / s.required) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-accent-50 rounded-lg">
                <h4 className="font-medium text-accent-800 mb-1">Recommendation</h4>
                <p className="text-sm text-accent-700">Focus on Python and Machine Learning to bridge the critical skill gaps. Consider enrolling in specialized courses.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { phase: 'Phase 1: Foundation (0-6 Months)', items: ['Learn Python basics', 'Mathematics for ML (Linear Algebra, Calculus)', 'Statistics fundamentals', 'SQL for data manipulation'] },
              { phase: 'Phase 2: Core Skills (6-12 Months)', items: ['Machine Learning algorithms', 'Deep Learning fundamentals', 'Data visualization', 'Build portfolio projects'] },
              { phase: 'Phase 3: Specialization (12-18 Months)', items: ['Choose domain (NLP/CV/Recommendation)', 'Advanced ML techniques', 'Cloud deployment (AWS/GCP)', 'Kaggle competitions'] },
              { phase: 'Phase 4: Professional (18-24 Months)', items: ['MLOps and model deployment', 'System design for ML', 'Research paper implementation', 'Industry internship/project'] },
            ].map(({ phase, items }) => (
              <div key={phase} className="card border-l-4 border-primary-500">
                <h3 className="font-semibold text-gray-900 mb-3">{phase}</h3>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
