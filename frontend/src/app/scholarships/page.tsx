'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const scholarships = [
  { id: 1, name: 'National Merit Scholarship', provider: 'Government of India', amount: '₹50,000/yr', deadline: '2026-12-31', eligibility: '90%+ in 12th', category: 'Merit', income: 8, icon: '🏆' },
  { id: 2, name: 'SC/ST Post-Matric Scholarship', provider: 'Ministry of Social Justice', amount: 'Full Tuition', deadline: '2026-11-30', eligibility: 'SC/ST Category', category: 'Category', income: 2.5, icon: '🛡️' },
  { id: 3, name: 'Girl Child Education Fund', provider: 'Various NGOs', amount: '₹30,000/yr', deadline: '2026-11-15', eligibility: 'Girl Students', category: 'Gender', income: 5, icon: '👩‍🎓' },
  { id: 4, name: 'Sports Excellence Scholarship', provider: 'Sports Authority of India', amount: '₹75,000/yr', deadline: '2026-12-15', eligibility: 'National / State Level Players', category: 'Sports', income: 12, icon: '🏅' },
  { id: 5, name: 'Minority Community Welfare Scholarship', provider: 'Minority Affairs Ministry', amount: '₹40,000/yr', deadline: '2026-10-31', eligibility: 'Minority Community Students', category: 'Minority', income: 5, icon: '🤝' },
  { id: 6, name: 'Disability Support Scholarship', provider: 'Social Welfare Dept', amount: '₹60,000/yr', deadline: '2027-02-28', eligibility: 'Differently Abled Students', category: 'Disability', income: 8, icon: '♿' },
  { id: 7, name: 'Telangana EAPCET Rank Scholarship', provider: 'Govt of Telangana', amount: '₹25,000/yr', deadline: '2026-10-31', eligibility: 'TG EAPCET Rank < 25,000', category: 'Merit', income: 4, icon: '📚' },
  { id: 8, name: 'Single Girl Child Scholarship Scheme', provider: 'CBSE & UGC', amount: '₹20,000/yr', deadline: '2027-01-31', eligibility: 'Only Child (Girl)', category: 'Gender', income: 8, icon: '💫' },
  { id: 9, name: 'AICTE Pragati Scholarship for Girls', provider: 'AICTE', amount: '₹50,000/yr', deadline: '2026-11-30', eligibility: 'Technical Degree / Diploma', category: 'Gender', income: 8, icon: '🔬' },
];

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const categories = ['All', 'Merit', 'Category', 'Gender', 'Sports', 'Minority', 'Disability'];

export default function ScholarshipsPage() {
  const router = useRouter();
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

  const handleApplyScholarship = (s: typeof scholarships[0]) => {
    toast.success(`Redirecting to Central Applications Desk for ${s.name}...`);
    router.push(
      `/applications?type=scholarship&name=${encodeURIComponent(s.name)}&amount=${encodeURIComponent(s.amount)}&provider=${encodeURIComponent(s.provider)}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm mb-6 border border-white/20">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              Direct Student Grant Portal
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Scholarship & Funding Finder
            </h1>
            <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Find scholarships matching your caste category, family income, and TG EAPCET rank — apply directly with one click to the Central Applications Desk.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: `${scholarships.length}+`, label: 'Active Schemes' },
              { value: `₹${totalAmount.toLocaleString('en-IN')}K+`, label: 'Total Value / Yr' },
              { value: 'Govt & NGO', label: 'Funding Bodies' },
              { value: '100% Free', label: 'Direct Application' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/10">
                <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-300 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="card mb-8 p-5 bg-white border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="input-field text-sm"
                placeholder="🔍 Search scholarships, providers (Govt of Telangana, AICTE, UGC)..."
              />
            </div>
            <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="input-field md:w-52 text-sm bg-white">
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
            <select value={filters.income} onChange={(e) => setFilters({ ...filters, income: Number(e.target.value) })} className="input-field md:w-52 text-sm bg-white">
              <option value={0}>Any Family Income</option>
              <option value={2.5}>&lt; ₹2.5 Lakhs</option>
              <option value={4}>&lt; ₹4 Lakhs</option>
              <option value={5}>&lt; ₹5 Lakhs</option>
              <option value={8}>&lt; ₹8 Lakhs</option>
              <option value={12}>&lt; ₹12 Lakhs</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-semibold text-gray-700">
            Showing <span className="text-emerald-700 font-bold">{filtered.length}</span> verified scholarship schemes
          </div>
          <button 
            onClick={() => router.push('/applications?type=scholarship')} 
            className="text-xs text-primary-700 hover:text-primary-900 font-bold flex items-center space-x-1"
          >
            <span>📋 View My Submitted Applications</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => {
            const days = daysUntil(s.deadline);
            const urgent = days <= 30;
            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="card hover:shadow-xl transition-all flex flex-col border border-gray-200 bg-white justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center text-2xl border border-emerald-200">
                      {s.icon}
                    </div>
                    <span className="badge bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                      {s.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">{s.name}</h3>
                  <p className="text-xs text-gray-500 mb-4">{s.provider}</p>
                  
                  <div className="space-y-2 mb-4 bg-gray-50 p-3 rounded-xl text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Scholarship Benefit:</span>
                      <span className="font-bold text-emerald-700 text-sm">{s.amount}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Eligibility Criteria:</span>
                      <span className="font-semibold text-gray-800">{s.eligibility}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Annual Income Limit:</span>
                      <span className="font-semibold text-gray-800">&lt; ₹{s.income} Lakhs</span>
                    </div>
                  </div>

                  <div className={`flex items-center justify-between px-3 py-2 rounded-lg mb-4 text-xs ${urgent ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-gray-50 text-gray-600'}`}>
                    <span>📅 Deadline: {s.deadline}</span>
                    <span className="font-bold">{urgent ? `${days}d left ⚡` : `${days}d left`}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => handleApplyScholarship(s)} 
                    className="btn-primary w-full text-xs md:text-sm py-2.5 font-bold flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  >
                    <span>Direct Apply to Central Portal</span>
                    <span>→</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="card text-center py-12 bg-white border border-gray-200">
            <p className="text-gray-500 mb-3">No scholarships match your selected criteria</p>
            <button onClick={() => setFilters({ category: 'All', income: 0, search: '' })} className="btn-secondary text-xs py-2 px-4">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}