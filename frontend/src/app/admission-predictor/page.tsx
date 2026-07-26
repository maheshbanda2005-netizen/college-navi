'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import toast from 'react-hot-toast';

const hyderabadColleges = [
  { name: 'IIT Hyderabad', eamcetCutoff: 450, jeeAdvancedCutoff: 2500, avgPackage: 24, placementRate: 96, aiScore: 92 },
  { name: 'IIIT Hyderabad', eamcetCutoff: 380, jeeAdvancedCutoff: 1800, avgPackage: 28, placementRate: 98, aiScore: 95 },
  { name: 'CBIT Hyderabad', eamcetCutoff: 650, jeeAdvancedCutoff: 5500, avgPackage: 18, placementRate: 88, aiScore: 82 },
  { name: 'VNR VJIET', eamcetCutoff: 700, jeeAdvancedCutoff: 6000, avgPackage: 17, placementRate: 85, aiScore: 80 },
  { name: 'GRIET Hyderabad', eamcetCutoff: 750, jeeAdvancedCutoff: 6500, avgPackage: 16, placementRate: 82, aiScore: 78 },
  { name: 'Osmania University', eamcetCutoff: 850, jeeAdvancedCutoff: 8000, avgPackage: 12, placementRate: 65, aiScore: 72 },
];

const branchData = [
  { branch: 'CSE', avgPackage: 28, placement: 100, cutoff: 2500, demand: 95 },
  { branch: 'ECE', avgPackage: 22, placement: 95, cutoff: 3200, demand: 85 },
  { branch: 'ME', avgPackage: 20, placement: 92, cutoff: 3800, demand: 75 },
  { branch: 'CE', avgPackage: 18, placement: 88, cutoff: 4200, demand: 65 },
  { branch: 'IT', avgPackage: 26, placement: 98, cutoff: 2800, demand: 90 },
];

const cutoffTrendData = [
  { year: 2019, eamcet: 600, jeeAdvanced: 4500 },
  { year: 2020, eamcet: 550, jeeAdvanced: 4000 },
  { year: 2021, eamcet: 500, jeeAdvanced: 3500 },
  { year: 2022, eamcet: 480, jeeAdvanced: 3200 },
  { year: 2023, eamcet: 450, jeeAdvanced: 2800 },
];

export default function AdmissionPredictorPage() {
  const [form, setForm] = useState({
    eamcetRank: '', jeeAdvancedRank: '', tenthMarks: '', twelfthMarks: '',
    ugCGPA: '', category: 'general', reservation: 'general', workExperience: '',
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const calculateProbability = (rank: number, cutoff: number) => {
    if (rank <= cutoff * 0.5) return 95;
    if (rank <= cutoff * 0.8) return 85;
    if (rank <= cutoff) return 70;
    if (rank <= cutoff * 1.2) return 50;
    return 25;
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));

    const eamcetRank = parseInt(form.eamcetRank) || 0;
    const jeeRank = parseInt(form.jeeAdvancedRank) || 0;

    const predictions = hyderabadColleges.map(college => {
      const eamcetProb = form.eamcetRank ? calculateProbability(eamcetRank, college.eamcetCutoff) : 0;
      const jeeProb = form.jeeAdvancedRank ? calculateProbability(jeeRank, college.jeeAdvancedCutoff) : 0;
      const avgProb = (eamcetProb + jeeProb) / 2 || Math.max(eamcetProb, jeeProb);
      return { ...college, probability: Math.round(avgProb) };
    });

    const safe = predictions.filter(p => p.probability >= 70).sort((a, b) => b.probability - a.probability);
    const moderate = predictions.filter(p => p.probability >= 40 && p.probability < 70).sort((a, b) => b.probability - a.probability);
    const dream = predictions.filter(p => p.probability < 40).sort((a, b) => b.probability - a.probability);

    const bestBranch = branchData.reduce((a, b) => a.placement > b.placement ? a : b);

    setResult({
      overallProbability: Math.round((safe.length * 70 + moderate.length * 50 + dream.length * 25) / (safe.length + moderate.length + dream.length) || 50),
      safe, moderate, dream, bestBranch,
      predictions: predictions.sort((a, b) => b.probability - a.probability),
    });
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Admission Predictor</h1>
          <p className="text-gray-600 mt-2">ML-powered admission probability with EAMCET/JEE rank analysis</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="card">
              <form onSubmit={handlePredict} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">EAMCET Rank</label>
                  <input name="eamcetRank" value={form.eamcetRank} onChange={handleChange} className="input-field" type="number" placeholder="e.g., 450" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">JEE Advanced Rank</label>
                  <input name="jeeAdvancedRank" value={form.jeeAdvancedRank} onChange={handleChange} className="input-field" type="number" placeholder="e.g., 2500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">10th Marks (%)</label>
                    <input name="tenthMarks" value={form.tenthMarks} onChange={handleChange} className="input-field" type="number" placeholder="85" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">12th Marks (%)</label>
                    <input name="twelfthMarks" value={form.twelfthMarks} onChange={handleChange} className="input-field" type="number" placeholder="88" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">UG CGPA</label>
                  <input name="ugCGPA" value={form.ugCGPA} onChange={handleChange} className="input-field" type="number" step="0.1" placeholder="8.5" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select name="category" value={form.category} onChange={handleChange} className="input-field">
                      <option value="general">General</option>
                      <option value="engineering">Engineering</option>
                      <option value="medical">Medical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reservation</label>
                    <select name="reservation" value={form.reservation} onChange={handleChange} className="input-field">
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Analyzing...' : 'Predict Admission'}
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-2">
            {loading && (
              <div className="card flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-gray-600">AI is analyzing your profile...</p>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                <div className="card text-center">
                  <h3 className="text-lg font-semibold mb-4">Overall Admission Probability</h3>
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={result.overallProbability > 70 ? '#22C55E' : result.overallProbability > 40 ? '#F59E0B' : '#EF4444'} strokeWidth="3" strokeDasharray={`${result.overallProbability}, 100`} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">{result.overallProbability}%</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">Based on your entrance rank and academic profile</p>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-4">Recommended Branch</h3>
                  <div className="bg-blue-50 p-4 rounded border border-blue-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-blue-900">{result.bestBranch.branch}</h4>
                        <p className="text-sm text-blue-700">Highest placement & package</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">₹{result.bestBranch.avgPackage} LPA</div>
                        <div className="text-sm text-blue-600">{result.bestBranch.placement}% placement</div>
                      </div>
                    </div>
                  </div>
                </div>

                {[
                  { label: 'Safe Colleges', colleges: result.safe, color: 'green', bg: 'bg-green-50 border-green-200' },
                  { label: 'Moderate Colleges', colleges: result.moderate, color: 'yellow', bg: 'bg-yellow-50 border-yellow-200' },
                  { label: 'Dream Colleges', colleges: result.dream, color: 'red', bg: 'bg-red-50 border-red-200' },
                ].map(({ label, colleges, bg }) => (
                  colleges.length > 0 && (
                    <div key={label} className={`card ${bg} border`}>
                      <h3 className="font-semibold mb-3">{label}</h3>
                      <div className="space-y-2">
                        {colleges.map((c: any) => (
                          <div key={c.name} className="flex justify-between items-center text-sm">
                            <span className="font-medium">{c.name}</span>
                            <span className={`font-bold ${c.probability > 70 ? 'text-green-600' : c.probability > 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {c.probability}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>

        {result && !loading && (
          <div className="mt-8 space-y-6">
            <div className="card">
              <h3 className="font-semibold mb-4">Cutoff Trends (Last 5 Years)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cutoffTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="eamcet" stroke="#f59e0b" name="EAMCET Cutoff" />
                  <Line type="monotone" dataKey="jeeAdvanced" stroke="#3b82f6" name="JEE Advanced Cutoff" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3 className="font-semibold mb-4">Branch Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={branchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="branch" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgPackage" fill="#10b981" name="Avg Package (LPA)" />
                  <Bar dataKey="placement" fill="#3b82f6" name="Placement %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3 className="font-semibold mb-4">All Colleges - Admission Probability</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">College</th>
                      <th className="px-4 py-2 text-left font-semibold">Probability</th>
                      <th className="px-4 py-2 text-left font-semibold">Avg Package</th>
                      <th className="px-4 py-2 text-left font-semibold">Placement</th>
                      <th className="px-4 py-2 text-left font-semibold">AI Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.predictions.map((p: any) => (
                      <tr key={p.name} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium">{p.name}</td>
                        <td className="px-4 py-2">
                          <span className={`font-bold ${p.probability > 70 ? 'text-green-600' : p.probability > 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {p.probability}%
                          </span>
                        </td>
                        <td className="px-4 py-2">₹{p.avgPackage} LPA</td>
                        <td className="px-4 py-2">{p.placementRate}%</td>
                        <td className="px-4 py-2"><span className="badge bg-blue-50 text-blue-700">{p.aiScore}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
