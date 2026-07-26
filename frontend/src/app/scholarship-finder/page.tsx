'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const scholarships = [
  { id: 1, name: 'AICTE Scholarship', amount: 5, eligibility: 'Merit-based', category: 'General', minMarks: 85, income: 'No limit', deadline: '2024-06-30' },
  { id: 2, name: 'Merit Scholarship', amount: 3, eligibility: 'Top 10%', category: 'General', minMarks: 90, income: 'No limit', deadline: '2024-07-15' },
  { id: 3, name: 'SC/ST Scholarship', amount: 4, eligibility: 'Reserved', category: 'SC/ST', minMarks: 75, income: '₹3L', deadline: '2024-08-01' },
  { id: 4, name: 'Women Empowerment', amount: 2.5, eligibility: 'Female', category: 'General', minMarks: 80, income: '₹5L', deadline: '2024-07-30' },
  { id: 5, name: 'Sports Scholarship', amount: 2, eligibility: 'Sports', category: 'General', minMarks: 70, income: 'No limit', deadline: '2024-06-15' },
  { id: 6, name: 'Disability Scholarship', amount: 3.5, eligibility: 'PWD', category: 'General', minMarks: 70, income: '₹4L', deadline: '2024-08-15' },
];

export default function ScholarshipFinderPage() {
  const [filters, setFilters] = useState({ category: '', minMarks: 0, income: 0 });
  const [matched, setMatched] = useState<any[]>([]);

  const handleFilter = () => {
    const result = scholarships.filter(s => {
      if (filters.category && s.category !== filters.category) return false;
      if (filters.minMarks && s.minMarks > filters.minMarks) return false;
      return true;
    });
    setMatched(result);
    toast.success(`Found ${result.length} matching scholarships!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scholarship Finder</h1>
        <p className="text-gray-600 mb-8">Find scholarships matching your profile</p>

        <div className="card mb-8">
          <h3 className="font-semibold mb-4">Filter Scholarships</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="input-field">
                <option value="">All Categories</option>
                <option value="General">General</option>
                <option value="SC/ST">SC/ST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Marks (%)</label>
              <input type="number" value={filters.minMarks} onChange={(e) => setFilters({ ...filters, minMarks: Number(e.target.value) })} className="input-field" placeholder="85" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income (₹L)</label>
              <input type="number" value={filters.income} onChange={(e) => setFilters({ ...filters, income: Number(e.target.value) })} className="input-field" placeholder="0" />
            </div>
          </div>
          <button onClick={handleFilter} className="btn-primary w-full mt-4">Find Scholarships</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {(matched.length > 0 ? matched : scholarships).map(s => (
            <motion.div key={s.id} whileHover={{ scale: 1.02 }} className="card">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg">{s.name}</h3>
                <span className="badge bg-green-50 text-green-700 border border-green-200">₹{s.amount}L</span>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Eligibility</span>
                  <span className="font-bold">{s.eligibility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Marks</span>
                  <span className="font-bold">{s.minMarks}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Income Limit</span>
                  <span className="font-bold">{s.income}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline</span>
                  <span className="font-bold text-orange-600">{s.deadline}</span>
                </div>
              </div>
              <button onClick={() => toast.success('Application started!')} className="btn-primary w-full text-sm">Apply Now</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
