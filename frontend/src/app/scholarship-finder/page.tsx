'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const scholarships = [
  { id: 1, name: 'AICTE Pragati & Saksham Scholarship', amount: 5, eligibility: 'Merit & Technical Degree', category: 'General', minMarks: 85, income: 'No limit', deadline: '2026-11-30', provider: 'AICTE' },
  { id: 2, name: 'National Merit Scholarship Scheme', amount: 3, eligibility: 'Top 10% in 12th Board', category: 'General', minMarks: 90, income: 'No limit', deadline: '2026-12-15', provider: 'Ministry of Education' },
  { id: 3, name: 'SC/ST Post-Matric Tuition Grant', amount: 4, eligibility: 'Reserved Category', category: 'SC/ST', minMarks: 75, income: '₹3 Lakhs', deadline: '2026-11-30', provider: 'Ministry of Social Justice' },
  { id: 4, name: 'Telangana Girl Child Higher Education Fund', amount: 2.5, eligibility: 'Female Students in TS Colleges', category: 'General', minMarks: 80, income: '₹5 Lakhs', deadline: '2026-12-31', provider: 'Telangana Higher Education Council' },
  { id: 5, name: 'Sports Excellence National Scholarship', amount: 2, eligibility: 'State / National Level Sports', category: 'General', minMarks: 70, income: 'No limit', deadline: '2026-11-15', provider: 'Sports Authority of India' },
  { id: 6, name: 'Disability & Divyangjan Support Grant', amount: 3.5, eligibility: 'PWD Differently Abled', category: 'General', minMarks: 70, income: '₹4 Lakhs', deadline: '2027-01-15', provider: 'Social Welfare Department' },
];

export default function ScholarshipFinderPage() {
  const router = useRouter();
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

  const handleApply = (s: typeof scholarships[0]) => {
    toast.success(`Redirecting to Central Applications Desk for ${s.name}...`);
    router.push(
      `/applications?type=scholarship&name=${encodeURIComponent(s.name)}&amount=${encodeURIComponent('₹' + s.amount + ' Lakhs/yr')}&provider=${encodeURIComponent(s.provider || 'State Scholarship Board')}`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Scholarship Finder</h1>
            <p className="text-gray-600 mt-1">Match government & private grants with your academic profile</p>
          </div>
          <button
            onClick={() => router.push('/applications?type=scholarship')}
            className="btn-secondary text-xs font-semibold py-2 px-4 text-emerald-800 border-emerald-300 self-start sm:self-auto"
          >
            📋 View Applied Scholarships
          </button>
        </div>

        <div className="card mb-8 p-6 bg-white border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 text-base">Filter by Your Credentials</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Caste / Reservation Category</label>
              <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="input-field text-sm bg-white">
                <option value="">All Categories</option>
                <option value="General">General</option>
                <option value="SC/ST">SC/ST</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Your 12th / Intermediate Marks (%)</label>
              <input type="number" value={filters.minMarks || ''} onChange={(e) => setFilters({ ...filters, minMarks: Number(e.target.value) })} className="input-field text-sm" placeholder="e.g. 85" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Annual Family Income (₹ Lakhs)</label>
              <input type="number" value={filters.income || ''} onChange={(e) => setFilters({ ...filters, income: Number(e.target.value) })} className="input-field text-sm" placeholder="e.g. 4" />
            </div>
          </div>
          <button onClick={handleFilter} className="btn-primary w-full mt-5 font-semibold text-sm py-2.5">
            Find Matching Scholarships
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(matched.length > 0 ? matched : scholarships).map(s => (
            <motion.div key={s.id} whileHover={{ y: -3 }} className="card border border-gray-200 bg-white hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 text-lg">{s.name}</h3>
                  <span className="badge bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    ₹{s.amount} Lakhs/yr
                  </span>
                </div>
                <div className="space-y-2 text-xs mb-4 bg-gray-50 p-3 rounded-xl">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Eligibility:</span>
                    <span className="font-bold text-gray-800">{s.eligibility}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Minimum Qualifying Marks:</span>
                    <span className="font-bold text-primary-700">{s.minMarks}%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Income Limit:</span>
                    <span className="font-bold text-gray-800">{s.income}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Application Deadline:</span>
                    <span className="font-bold text-amber-700">{s.deadline}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleApply(s)} 
                className="btn-primary w-full text-xs md:text-sm py-2.5 font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <span>Direct Apply in Applications Desk</span>
                <span>→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
