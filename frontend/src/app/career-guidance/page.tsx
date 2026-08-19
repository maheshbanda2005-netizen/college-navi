'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const careers = [
  { title: 'Data Scientist', demand: 'Very High', avgSalary: '₹25 LPA', skills: ['Python', 'ML', 'Statistics', 'SQL', 'Deep Learning'], growth: '35%', icon: '📊' },
  { title: 'AI/ML Engineer', demand: 'Very High', avgSalary: '₹28 LPA', skills: ['Python', 'TensorFlow', 'NLP', 'Computer Vision', 'MLOps'], growth: '40%', icon: '🤖' },
  { title: 'Full Stack Developer', demand: 'High', avgSalary: '₹18 LPA', skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'], growth: '25%', icon: '💻' },
  { title: 'Cloud Architect', demand: 'Very High', avgSalary: '₹35 LPA', skills: ['AWS/Azure', 'Docker', 'Kubernetes', 'Terraform', 'Networking'], growth: '30%', icon: '☁️' },
  { title: 'Cybersecurity Analyst', demand: 'High', avgSalary: '₹22 LPA', skills: ['Network Security', 'Ethical Hacking', 'Risk Analysis', 'Compliance'], growth: '32%', icon: '🔐' },
  { title: 'Product Manager', demand: 'High', avgSalary: '₹30 LPA', skills: ['Strategy', 'Analytics', 'UX', 'Agile', 'Communication'], growth: '20%', icon: '🚀' },
  { title: 'DevOps Engineer', demand: 'Very High', avgSalary: '₹24 LPA', skills: ['Docker', 'K8s', 'CI/CD', 'Linux', 'Scripting'], growth: '28%', icon: '⚙️' },
  { title: 'Blockchain Developer', demand: 'Growing', avgSalary: '₹26 LPA', skills: ['Solidity', 'Web3', 'Ethereum', 'Smart Contracts'], growth: '45%', icon: '⛓️' },
  { title: 'UI/UX Designer', demand: 'High', avgSalary: '₹15 LPA', skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research'], growth: '22%', icon: '🎨' },
];

const skillGap = [
  { skill: 'Python', current: 3, required: 5, importance: 'Critical' },
  { skill: 'Machine Learning', current: 2, required: 5, importance: 'Critical' },
  { skill: 'SQL', current: 4, required: 4, importance: 'Important' },
  { skill: 'Deep Learning', current: 1, required: 4, importance: 'Important' },
  { skill: 'Cloud Computing', current: 2, required: 4, importance: 'Moderate' },
];

const careerQuiz = [
  { q: 'Which activity do you enjoy most?', options: ['Solving puzzles & logic problems', 'Building things & creating apps', 'Analyzing data & finding patterns', 'Designing & being creative'] },
  { q: 'How do you like working?', options: ['Independently', 'In a team', 'Leading a team', 'Mixed'] },
  { q: 'What matters most in a career?', options: ['High salary', 'Job security', 'Growth & learning', 'Work-life balance'] },
];

const quizResult = (answers: number[]): string => {
  const sum = answers.reduce((a, b) => a + b, 0);
  if (sum <= 4) return '💻 You are a natural problem solver — consider Software Engineering, AI/ML, or Data Science roles.';
  if (sum <= 6) return '🎯 You thrive on building — Full Stack Development, Cloud Architecture, or DevOps fit you well.';
  if (sum <= 8) return '🧠 You love analysis — Data Science, Product Management, or Business Analytics are great fits.';
  return '🎨 You are creative — UI/UX Design, Product Design, or Marketing careers suit you best.';
};

export default function CareerGuidancePage() {
  const [activeTab, setActiveTab] = useState<'careers' | 'skills' | 'roadmap' | 'quiz'>('careers');
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  const answerQuiz = (idx: number) => {
    const next = [...quizAnswers, idx];
    setQuizAnswers(next);
    if (next.length === careerQuiz.length) setQuizDone(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              AI-Powered Guidance
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              AI <span className="gradient-text-sweep gradient-text-animate">Career Guidance</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover career paths, analyze skill gaps, take the career quiz, and plan your learning journey.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 bg-white rounded-xl p-1.5 border border-gray-200 mb-10 justify-center max-w-3xl mx-auto shadow-sm">
          {[
            { key: 'careers', label: '💼 Career Suggestions' },
            { key: 'quiz', label: '🎯 Career Quiz' },
            { key: 'skills', label: '📈 Skill Gap Analysis' },
            { key: 'roadmap', label: '🗺️ Learning Roadmap' },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'careers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="card hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{c.icon}</div>
                    <h3 className="font-semibold text-gray-900">{c.title}</h3>
                  </div>
                  <span className={`badge ${c.demand === 'Very High' ? 'badge-danger' : c.demand === 'High' ? 'badge-warning' : 'badge-primary'}`}>
                    {c.demand}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl font-bold text-green-600">{c.avgSalary}</div>
                  <div className="text-sm text-gray-500">Growth: <span className="font-semibold text-blue-600">{c.growth}</span> YoY</div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            <div className="card p-8 text-center">
              {!quizDone ? (
                <>
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-3xl mb-6">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Your Ideal Career</h3>
                  <p className="text-gray-600 mb-8">Answer 3 quick questions to get personalized career recommendations</p>
                  <div className="text-sm text-gray-500 mb-4">Question {quizAnswers.length + 1} of {careerQuiz.length}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-5">{careerQuiz[quizAnswers.length]?.q}</h4>
                  <div className="space-y-3">
                    {careerQuiz[quizAnswers.length]?.options.map((opt, idx) => (
                      <button key={idx} onClick={() => answerQuiz(idx)}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 transition-all font-medium text-gray-700"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center text-4xl mb-6">🎉</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Career Match!</h3>
                  <div className="p-5 bg-primary-50 rounded-xl mb-6">
                    <p className="text-lg text-primary-800 leading-relaxed">{quizResult(quizAnswers)}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => { setQuizAnswers([]); setQuizDone(false); }} className="btn-secondary">🔄 Retake Quiz</button>
                    <button onClick={() => setActiveTab('roadmap')} className="btn-primary">🗺️ View Learning Roadmap</button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="max-w-2xl mx-auto">
            <div className="card">
              <h3 className="font-semibold text-lg mb-4">📈 Your Skill Gap Analysis</h3>
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
                      <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-2.5 rounded-full" style={{ width: `${(s.current / s.required) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-accent-50 rounded-lg">
                <h4 className="font-medium text-accent-800 mb-1">💡 Recommendation</h4>
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
            ].map(({ phase, items }, i) => (
              <motion.div key={phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card border-l-4 border-primary-500">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-sm">{i + 1}</span>
                  <h3 className="font-semibold text-gray-900">{phase}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start space-x-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}