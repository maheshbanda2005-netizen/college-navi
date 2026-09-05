'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addToCompare } from '@/store/store';
import toast from 'react-hot-toast';

import { telanganaColleges } from '@/data/collegesData';


export default function UniversitiesPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ type: '', minRating: 0, minAIScore: 0 });
  const [universities] = useState(telanganaColleges);
  const router = useRouter();
  const dispatch = useDispatch();
  const compareList = useSelector((state: RootState) => state.compare.universities);

  const filtered = universities.filter(u => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.type && u.type !== filters.type) return false;
    if (filters.minRating && u.rating < filters.minRating) return false;
    if (filters.minAIScore && u.aiScore < filters.minAIScore) return false;
    return true;
  });

  const handleAddToCompare = (u: any) => {
    if (compareList.length >= 4) { toast.error('Maximum 4 colleges can be compared'); return; }
    dispatch(addToCompare(u as any));
    toast.success('Added to comparison');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Telangana Colleges</h1>
            <p className="text-gray-600 mt-1">Discover {filtered.length} engineering colleges in Telangana</p>
          </div>
          {compareList.length > 0 && (
            <button onClick={() => router.push('/compare')} className="btn-primary mt-4 md:mt-0">
              Compare ({compareList.length})
            </button>
          )}
        </div>

        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                className="input-field" placeholder="Search colleges, locations..."
              />
            </div>
            <select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })} className="input-field md:w-48">
              <option value="">All Types</option>
              <option value="IIT">IIT</option>
              <option value="NIT">NIT</option>
              <option value="IIIT">IIIT</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
              <option value="Central University">Central University</option>
            </select>
            <select value={filters.minRating} onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })} className="input-field md:w-48">
              <option value="0">Min Rating</option>
              <option value="3">3+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
            <select value={filters.minAIScore} onChange={(e) => setFilters({ ...filters, minAIScore: Number(e.target.value) })} className="input-field md:w-48">
              <option value="0">AI Score</option>
              <option value="50">50+</option>
              <option value="60">60+</option>
              <option value="70">70+</option>
              <option value="80">80+</option>
            </select>
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Showing {filtered.length} of {universities.length} colleges
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((u, i) => (
            <motion.div key={u.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
              className="card cursor-pointer group hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-lg">{u.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{u.name}</h3>
                    <p className="text-sm text-gray-500">{u.location}</p>
                  </div>
                </div>
                <span className="badge-primary">{u.type}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-sm font-bold text-blue-700">{u.aiScore}</div>
                  <div className="text-xs text-blue-600">AI Score</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="text-sm font-bold text-green-700">{u.placementRate}%</div>
                  <div className="text-xs text-green-600">Placement</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
                <div>
                  <div className="font-bold text-gray-900">#{u.ranking}</div>
                  <div className="text-xs text-gray-500">Rank</div>
                </div>
                <div>
                  <div className="font-bold text-green-600">{u.avgPackage}</div>
                  <div className="text-xs text-gray-500">Avg Pkg</div>
                </div>
                <div>
                  <div className="font-bold text-accent-600">{u.fees}</div>
                  <div className="text-xs text-gray-500">Fees</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium">{u.rating}</span>
                </div>
                <span className="text-xs text-gray-500">EAMCET: {u.eamcetCutoff}</span>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <button onClick={() => router.push(`/universities/${u.id}`)} className="flex-1 btn-primary text-sm py-2">
                  View Details
                </button>
                <button onClick={() => handleAddToCompare(u)} className="btn-secondary text-sm py-2 px-3">
                  Compare
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-gray-500">No colleges match your filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
