'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const colleges = [
  { name: 'IIT Hyderabad', score: 85, academics: 95, infrastructure: 90, socialLife: 80, sports: 85, research: 92, diversity: 88 },
  { name: 'IIIT Hyderabad', score: 90, academics: 98, infrastructure: 92, socialLife: 85, sports: 80, research: 95, diversity: 90 },
  { name: 'CBIT Hyderabad', score: 82, academics: 88, infrastructure: 85, socialLife: 82, sports: 80, research: 80, diversity: 85 },
];

const radarData = [
  { category: 'Academics', IIT: 95, IIIT: 98, CBIT: 88 },
  { category: 'Infrastructure', IIT: 90, IIIT: 92, CBIT: 85 },
  { category: 'Social Life', IIT: 80, IIIT: 85, CBIT: 82 },
  { category: 'Sports', IIT: 85, IIIT: 80, CBIT: 80 },
  { category: 'Research', IIT: 92, IIIT: 95, CBIT: 80 },
  { category: 'Diversity', IIT: 88, IIIT: 90, CBIT: 85 },
];

export default function CampusSuitabilityPage() {
  const [form, setForm] = useState({
    academicFocus: 50,
    socialLife: 50,
    research: 50,
    sports: 50,
    diversity: 50,
  });
  const [selectedCollege, setSelectedCollege] = useState('IIT Hyderabad');
  const college = colleges.find(c => c.name === selectedCollege)!;

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: Number(e.target.value) });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Campus Suitability Score</h1>
        <p className="text-gray-600 mb-8">Find the perfect college match based on your preferences</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="card">
              <h3 className="font-semibold mb-4">Your Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Academic Focus', name: 'academicFocus' },
                  { label: 'Social Life', name: 'socialLife' },
                  { label: 'Research', name: 'research' },
                  { label: 'Sports', name: 'sports' },
                  { label: 'Diversity', name: 'diversity' },
                ].map(pref => (
                  <div key={pref.name}>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">{pref.label}</label>
                      <span className="text-sm font-bold text-primary-600">{form[pref.name as keyof typeof form]}</span>
                    </div>
                    <input
                      type="range"
                      name={pref.name}
                      value={form[pref.name as keyof typeof form]}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {colleges.map(c => (
                <motion.button
                  key={c.name}
                  onClick={() => setSelectedCollege(c.name)}
                  whileHover={{ scale: 1.05 }}
                  className={`card cursor-pointer transition-all ${selectedCollege === c.name ? 'ring-2 ring-primary-600 bg-primary-50' : ''}`}
                >
                  <h3 className="font-semibold text-sm">{c.name}</h3>
                  <div className="mt-3">
                    <div className="text-3xl font-bold text-primary-600">{c.score}</div>
                    <div className="text-xs text-gray-600">Suitability Score</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="card">
              <h3 className="font-semibold mb-4">{college.name} - Detailed Scores</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Academics', value: college.academics },
                  { label: 'Infrastructure', value: college.infrastructure },
                  { label: 'Social Life', value: college.socialLife },
                  { label: 'Sports', value: college.sports },
                  { label: 'Research', value: college.research },
                  { label: 'Diversity', value: college.diversity },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>{item.label}</span>
                      <span className="font-bold">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 card">
          <h3 className="font-semibold mb-4">Multi-Factor Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis />
              <Radar name="IIT Hyderabad" dataKey="IIT" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
              <Radar name="IIIT Hyderabad" dataKey="IIIT" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
              <Radar name="CBIT Hyderabad" dataKey="CBIT" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
