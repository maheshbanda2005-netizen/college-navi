'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const features = [
  { title: 'AI Recommendations', desc: 'Personalized university suggestions powered by ML', icon: '🤖', color: 'from-primary-500 to-primary-700' },
  { title: 'Smart Comparison', desc: 'Compare universities across 50+ parameters', icon: '📊', color: 'from-accent-500 to-accent-700' },
  { title: 'Admission Predictor', desc: 'Predict your admission chances with AI', icon: '🎯', color: 'from-green-500 to-green-700' },
  { title: 'Scholarship Engine', desc: 'Find scholarships matching your profile', icon: '💰', color: 'from-purple-500 to-purple-700' },
  { title: 'Career Guidance', desc: 'AI-powered career path recommendations', icon: '🚀', color: 'from-blue-500 to-blue-700' },
  { title: 'AI Chatbot', desc: '24/7 instant answers to all your queries', icon: '💬', color: 'from-pink-500 to-pink-700' },
];

const stats = [
  { value: '10K+', label: 'Universities' }, { value: '50K+', label: 'Courses' },
  { value: '1M+', label: 'Students Helped' }, { value: '95%', label: 'Satisfaction' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              AI-Powered Education Ecosystem
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Find Your Perfect<br />
              <span className="gradient-text">University</span> with AI
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Discover, compare, and apply to universities worldwide powered by artificial intelligence.
              Personalized recommendations, admission prediction, and career guidance — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => router.push('/register')} className="btn-primary text-lg py-3 px-8 bg-white text-primary-900 hover:bg-gray-100">
                Get Started Free
              </button>
              <button onClick={() => router.push('/universities')} className="btn-secondary text-lg py-3 px-8 bg-white/10 text-white border-white/30 hover:bg-white/20">
                Explore Universities
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From discovery to admission — complete AI-powered toolkit for your higher education journey
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="card group cursor-pointer hover:shadow-lg"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                AI-Powered <span className="text-primary-600">Smart Recommendations</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our AI analyzes your academic profile, preferences, budget, and career goals to recommend the best universities and courses tailored just for you.
              </p>
              <ul className="space-y-4">
                {['Personalized university matching', 'Admission probability prediction', 'Scholarship recommendations', 'Career roadmap generation'].map((item) => (
                  <li key={item} className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => router.push('/register')} className="btn-primary mt-8">
                Start Your Journey
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
              <div className="space-y-4">
                {['IIT Bombay', 'Stanford University', 'NIT Trichy', 'MIT'].map((u, i) => (
                  <div key={u} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700 font-bold">
                        {u.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{u}</div>
                        <div className="text-sm text-gray-500">Match: {95 - i * 8}%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-primary-600 font-bold">{92 - i * 7}%</div>
                      <div className="text-xs text-gray-500">Admit Chance</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream University?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of students who have found their perfect match with EduNavigator AI
          </p>
          <button onClick={() => router.push('/register')} className="btn-primary text-lg py-3 px-10 bg-accent-500 hover:bg-accent-600 text-white">
            Create Free Account
          </button>
        </div>
      </section>
    </div>
  );
}
