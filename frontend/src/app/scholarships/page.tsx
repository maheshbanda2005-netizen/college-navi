'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const scholarships = [
  { id: 1, name: 'National Merit Scholarship', provider: 'Government of India', amount: '₹50,000/yr', deadline: '2024-12-31', eligibility: '90%+ in 12th', category: 'Merit', income: 8, icon: '🏆' },
  { id: 2, name: 'SC/ST Scholarship', provider: 'Ministry of Social Justice', amount: 'Full Tuition', deadline: '2024-11-30', eligibility: 'SC/ST Category', category: 'Category', income: 2.5, icon: '🛡️' },
  { id: 3, name: 'Girl Child Education Fund', provider: 'Various NGOs', amount: '₹30,000/yr', deadline: '2025-01-15', eligibility: 'Girl Students', category: 'Gender', income: 5, icon: '👩‍🎓' },
  { id: 4, name: 'Sports Excellence Scholarship', provider: 'Sports Authority', amount: '₹75,000/yr', deadline: '2024-12-15', eligibility: 'National Level Players', category: 'Sports', income: 12, icon: '🏅' },
  { id: 5, name: 'Minority Community Scholarship', provider: 'Minority Affairs Ministry', amount: '₹40,000/yr', deadline: '2024-10-31', eligibility: 'Minority Community', category: 'Minority', income: 5, icon: '🤝' },
  { id: 6, name: 'Disability Support Scholarship', provider: 'Social Welfare Dept', amount: '₹60,000/yr', deadline: '2025-02-28', eligibility: 'Disabled Students', category: 'Disability', income: 8, icon: '♿' },
  { id: 7, name: 'Telangana EAPCET Rank Scholarship', provider: 'Govt of Telangana', amount: '₹25,000/yr', deadline: '2025-03-31', eligibility: 'EAPCET Rank < 5000', category: 'Merit', income: 4, icon: '📚' },
  { id: 8, name: 'Single Girl Child Scholarship', provider: 'CBSE & UGC', amount: '₹20,000/yr', deadline: '2025-01-31', eligibility: 'Only Child (Girl)', category: 'Gender', income: 8, icon: '💫' },
  { id: 9, name: 'Research Fellowship (NET)', provider: 'UGC', amount: '₹31,000/mo', deadline: '2024-12-01', eligibility: 'NET Qualified', category: 'Merit', income: 12, icon: '🔬' },
];

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const categories = ['All', 'Merit', 'Category', 'Gender', 'Sports', 'Minority', 'Disability'];

export default function ScholarshipsPage() {
  const [filters, setFilters] = useState({ category: 'All', income: 0, search: '' });

  const filtered = useMemo(() => {
    return scholarships.filter(s => {
      if (filters.category !== 'All' && s.category !== filters.category) return false;
      if (filters.income && s.income > filters.income) return false;
      if (filters.search && !s.name.toLowerCase().includes(filters.search.toLowerCase()) && !s.provider.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  const totalAmount = useMemo(() => {
    const sum = scholarships.filter(s => /\d/.test(s.amount)).reduce((acc, s) => acc + (parseInt(s.amount.replace(/[^\d]/g, '')) || 0), 0);
    return sum;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Scholarship Engine
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Scholarship Finder</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Find scholarships that match your profile, category, and family income — apply before the deadlines.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: `${scholarships.length}+`, label: 'Scholarships' },
              { value: `₹${totalAmount.toLocaleString('en-IN')}K+`, label: 'Total Value / Yr' },
              { value: '9', label: 'Funding Bodies' },
              { value: '100%', label: 'Free to Apply' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="input-field"
                placeholder="🔍 Search scholarships, providers..."
              />
            </div>
            <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="input-field md:w-52">
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
            <select value={filters.income} onChange={(e) => setFilters({ ...filters, income: Number(e.target.value) })} className="input-field md:w-52">
              <option value={0}>Any Family Income</option>
              <option value={2.5}>&lt; ₹2.5 Lakh</option>
              <option value={4}>&lt; ₹4 Lakh</option>
              <option value={5}>&lt; ₹5 Lakh</option>
              <option value={8}>&lt; ₹8 Lakh</option>
              <option value={12}>&lt; ₹12 Lakh</option>
            </select>
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Showing {filtered.length} of {scholarships.length} scholarships
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => {
            const days = daysUntil(s.deadline);
            const urgent = days <= 30;
            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="card hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">{s.icon}</div>
                  <span className="badge-success">{s.category}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{s.provider}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-semibold text-green-600">{s.amount}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Eligibility</span><span>{s.eligibility}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Income</span><span>&lt; ₹{s.income}L</span></div>
                </div>
                <div className={`flex items-center justify-between px-3 py-2 rounded-lg mb-4 text-sm ${urgent ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-600'}`}>
                  <span>📅 Deadline: {s.deadline}</span>
                  <span className="font-semibold">{urgent ? `${days}d left ⚡` : `${days}d left`}</span>
                </div>
                <button onClick={() => toast.success('Application started!')} className="btn-primary w-full text-sm mt-auto">
                  Apply Now
                </button>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-gray-500 mb-2">No scholarships match your filters</p>
            <button onClick={() => setFilters({ category: 'All', income: 0, search: '' })} className="btn-secondary text-sm">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}