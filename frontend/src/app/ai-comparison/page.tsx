'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const allColleges = [
  { id: '1', name: 'IIT Hyderabad', placement: 96, package: 24, aiScore: 92, roiScore: 88, campusFit: 85, fees: 8.8, rating: 4.8 },
  { id: '2', name: 'IIIT Hyderabad', placement: 98, package: 28, aiScore: 95, roiScore: 94, campusFit: 90, fees: 8.0, rating: 4.9 },
  { id: '3', name: 'CBIT Hyderabad', placement: 88, package: 18, aiScore: 82, roiScore: 85, campusFit: 82, fees: 7.2, rating: 4.5 },
  { id: '4', name: 'VNR VJIET', placement: 85, package: 17, aiScore: 80, roiScore: 82, campusFit: 80, fees: 6.4, rating: 4.4 },
];

const metrics = [
  { key: 'placement', label: 'Placement Rate (%)', type: 'percentage' },
  { key: 'package', label: 'Avg Package (LPA)', type: 'number' },
  { key: 'aiScore', label: 'AI Score', type: 'score' },
  { key: 'roiScore', label: 'ROI Score', type: 'score' },
  { key: 'campusFit', label: 'Campus Fit', type: 'score' },
  { key: 'fees', label: 'Total Fees (L)', type: 'number' },
  { key: 'rating', label: 'Rating', type: 'rating' },
];

export default function AIComparisonPage() {
  const compareList = useSelector((state: RootState) => state.compare.universities);
  const [selectedMetrics, setSelectedMetrics] = useState(metrics.map(m => m.key));

  const colleges = compareList.length > 0 ? compareList : allColleges.slice(0, 2);

  const toggleMetric = (key: string) => {
    setSelectedMetrics(prev => prev.includes(key) ? prev.filter(m => m !== key) : [...prev, key]);
  };

  const getColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Comparison</h1>
        <p className="text-gray-600 mb-8">Advanced college comparison with AI insights</p>

        <div className="card mb-8">
          <h3 className="font-semibold mb-4">Select Metrics to Compare</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {metrics.map(m => (
              <label key={m.key} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(m.key)}
                  onChange={() => toggleMetric(m.key)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Metric</th>
                {colleges.map((c: any) => (
                  <th key={c.id} className="px-4 py-3 text-center font-semibold text-gray-900">{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.filter(m => selectedMetrics.includes(m.key)).map(metric => (
                <tr key={metric.key} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{metric.label}</td>
                  {colleges.map((college: any) => {
                    const value = Number(college[metric.key as keyof typeof college]);
                    return (
                      <td key={college.id} className="px-4 py-3 text-center">
                        <span className={`font-bold ${getColor(value, 100)}`}>
                          {metric.type === 'percentage' ? `${value}%` : metric.type === 'rating' ? `★ ${value}` : value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {colleges.map((college: any) => (
            <div key={college.id} className="card">
              <h3 className="font-semibold text-lg mb-4">{college.name}</h3>
              <div className="space-y-3">
                {metrics.filter(m => selectedMetrics.includes(m.key)).map(metric => {
                  const value = Number(college[metric.key as keyof typeof college]);
                  const max = metric.key === 'placement' ? 100 : metric.key === 'package' ? 30 : metric.key === 'fees' ? 10 : 100;
                  return (
                    <div key={metric.key}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{metric.label}</span>
                        <span className="font-bold">{value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
