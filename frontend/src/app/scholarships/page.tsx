'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const scholarships = [
  { id: 1, name: 'National Merit Scholarship', provider: 'Government of India', amount: '₹50,000/yr', deadline: '2024-12-31', eligibility: '90%+ in 12th', category: 'Merit', income: '< ₹8L' },
  { id: 2, name: 'SC/ST Scholarship', provider: 'Ministry of Social Justice', amount: 'Full Tuition', deadline: '2024-11-30', eligibility: 'SC/ST Category', category: 'Category', income: '< ₹2.5L' },
  { id: 3, name: 'Girl Child Education Fund', provider: 'Various NGOs', amount: '₹30,000/yr', deadline: '2025-01-15', eligibility: 'Girl Students', category: 'Gender', income: '< ₹5L' },
  { id: 4, name: 'Sports Excellence Scholarship', provider: 'Sports Authority', amount: '₹75,000/yr', deadline: '2024-12-15', eligibility: 'National Level Players', category: 'Sports', income: 'Any' },
  { id: 5, name: 'Minority Community Scholarship', provider: 'Minority Affairs Ministry', amount: '₹40,000/yr', deadline: '2024-10-31', eligibility: 'Minority Community', category: 'Minority', income: '< ₹5L' },
  { id: 6, name: 'Disability Support Scholarship', provider: 'Social Welfare Dept', amount: '₹60,000/yr', deadline: '2025-02-28', eligibility: 'Disabled Students', category: 'Disability', income: '< ₹8L' },
];

export default function ScholarshipsPage() {
  const [filters, setFilters] = useState({ category: '', income: '' });
  const filtered = scholarships.filter(s => {
    if (filters.category && s.category !== filters.category) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Scholarship Finder</h1>
          <p className="text-gray-600 mt-2">Find scholarships that match your profile and eligibility</p>
        </div>

        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="input-field md:w-48">
              <option value="">All Categories</option>
              <option value="Merit">Merit Based</option>
              <option value="Category">Category Based</option>
              <option value="Gender">Gender Based</option>
              <option value="Sports">Sports</option>
              <option value="Minority">Minority</option>
              <option value="Disability">Disability</option>
            </select>
            <select value={filters.income} onChange={(e) => setFilters({ ...filters, income: e.target.value })} className="input-field md:w-48">
              <option value="">Any Income</option>
              <option value="2.5">&lt; ₹2.5 Lakh</option>
              <option value="5">&lt; ₹5 Lakh</option>
              <option value="8">&lt; ₹8 Lakh</option>
              <option value="12">&lt; ₹12 Lakh</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">💰</div>
                <span className="badge-success">{s.category}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{s.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{s.provider}</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Amount</span><span className="font-semibold text-green-600">{s.amount}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Eligibility</span><span>{s.eligibility}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Income</span><span>{s.income}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Deadline</span><span className="text-red-600">{s.deadline}</span></div>
              </div>
              <button onClick={() => toast.success('Application started!')} className="btn-primary w-full text-sm">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
