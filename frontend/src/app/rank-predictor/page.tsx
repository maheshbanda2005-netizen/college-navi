'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import toast from 'react-hot-toast';

interface CollegeResult {
  id: string;
  name: string;
  shortName: string;
  collegeCode: string;
  city: string;
  district: string;
  ownership: string;
  collegeType: string;
}

interface PredictionResult {
  chance: 'High' | 'Medium' | 'Dream';
  college: CollegeResult;
  branch: string;
  closingRank: number;
  year: number;
  matchScore: number;
  placementRate?: number;
  averagePackage?: number;
  highestPackage?: number;
  fees?: number;
  naacGrade?: string;
  nirfRank?: number;
}

interface AIRecommendation {
  bestCollege?: PredictionResult;
  alternative?: PredictionResult;
  safeOption?: PredictionResult;
  highestROI?: PredictionResult;
  bestPlacement?: PredictionResult;
}

interface RankPredictorData {
  highChance: PredictionResult[];
  mediumChance: PredictionResult[];
  dream: PredictionResult[];
  aiRecommendation: AIRecommendation;
  totalColleges: number;
  matchSummary: {
    rank: number;
    category: string;
    gender: string;
    branch: string;
  };
}

const CATEGORIES = [
  { value: 'General', label: 'OC (General)' },
  { value: 'OBC', label: 'BC (OBC)' },
  { value: 'SC', label: 'SC' },
  { value: 'ST', label: 'ST' },
  { value: 'EWS', label: 'EWS' },
];

const BRANCHES = [
  'CSE', 'ECE', 'EEE', 'ME', 'CE', 'CHE', 'BT',
  'AI & ML', 'AI & DS', 'Data Science', 'Cyber Security', 'IT',
];

const DISTRICTS = [
  'Hyderabad', 'Ranga Reddy', 'Medchal-Malkajgiri', 'Warangal Urban',
  'Karimnagar', 'Khammam', 'Nizamabad', 'Medak', 'Mahabubnagar',
  'Nalgonda', 'Suryapet', 'Jagitial', 'Bhadradri Kothagudem',
  'Adilabad', 'Mancherial', 'Peddapalli',
];

const COLLEGE_TYPES = ['Government', 'Private', 'Autonomous'];

const PIE_COLORS = ['#22C55E', '#F59E0B', '#EF4444'];

function MatchScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#22C55E' : score >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth={strokeWidth} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute text-lg font-bold" style={{ color }}>{score}%</span>
    </div>
  );
}

function CollegeDetailModal({ result, onClose }: { result: PredictionResult; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-6 text-white rounded-t-2xl ${result.chance === 'High' ? 'bg-green-600' : result.chance === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'}`}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{result.college.name}</h2>
              <p className="text-white/80 mt-1">{result.college.collegeCode} | {result.college.city}, {result.college.district}</p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white text-2xl">&times;</button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary-600">{result.matchScore}%</div>
              <div className="text-sm text-gray-500">Match Score</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600">{result.closingRank.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Closing Rank ({result.year})</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">College Type</span><span className="font-medium">{result.college.collegeType}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Ownership</span><span className="font-medium">{result.college.ownership}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Branch</span><span className="font-medium">{result.branch}</span></div>
            {result.naacGrade && <div className="flex justify-between text-sm"><span className="text-gray-500">NAAC Grade</span><span className="font-medium">{result.naacGrade}</span></div>}
            {result.nirfRank && <div className="flex justify-between text-sm"><span className="text-gray-500">NIRF Rank</span><span className="font-medium">#{result.nirfRank}</span></div>}
            {result.fees && <div className="flex justify-between text-sm"><span className="text-gray-500">Avg Tuition Fee</span><span className="font-medium">₹{result.fees.toLocaleString()}/yr</span></div>}
          </div>
          {result.placementRate && (
            <div className="card bg-blue-50 border border-blue-200">
              <h3 className="font-semibold mb-2">Placement Summary</h3>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div><div className="font-bold text-blue-700">{result.placementRate}%</div><div className="text-blue-600">Rate</div></div>
                {result.averagePackage && <div><div className="font-bold text-blue-700">₹{result.averagePackage} L</div><div className="text-blue-600">Avg Pkg</div></div>}
                {result.highestPackage && <div><div className="font-bold text-blue-700">₹{result.highestPackage} L</div><div className="text-blue-600">Highest</div></div>}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RankPredictorPage() {
  const [form, setForm] = useState({
    rank: '',
    category: 'General',
    gender: 'Male',
    preferredBranch: 'CSE',
    district: '',
    government: true,
    private: true,
    autonomous: true,
    budget: '',
    minPlacement: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RankPredictorData | null>(null);
  const [selectedCollege, setSelectedCollege] = useState<PredictionResult | null>(null);
  const [activeTab, setActiveTab] = useState<'high' | 'medium' | 'dream'>('high');

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const getCollegeTypes = () => {
    const types: string[] = [];
    if (form.government) types.push('Government');
    if (form.private) types.push('Private');
    if (form.autonomous) types.push('Autonomous');
    return types;
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rank || parseInt(form.rank) <= 0) {
      toast.error('Please enter a valid TG EAPCET rank');
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/ai/rank-predictor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rank: parseInt(form.rank),
          category: form.category,
          gender: form.gender,
          preferredBranch: form.preferredBranch,
          district: form.district || undefined,
          collegeTypes: getCollegeTypes(),
          budget: form.budget ? parseInt(form.budget) : undefined,
          minPlacement: form.minPlacement ? parseInt(form.minPlacement) : undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
        setActiveTab('high');
        toast.success(`Found ${data.data.totalColleges} matching colleges!`);
      } else {
        toast.error(data.message || 'Failed to predict');
      }
    } catch (error: any) {
      toast.error('Network error. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentResults = () => {
    if (!result) return [];
    switch (activeTab) {
      case 'high': return result.highChance;
      case 'medium': return result.mediumChance;
      case 'dream': return result.dream;
      default: return [];
    }
  };

  const getChanceBadge = (chance: string) => {
    switch (chance) {
      case 'High': return <span className="badge bg-green-100 text-green-800">✅ High Chance</span>;
      case 'Medium': return <span className="badge bg-yellow-100 text-yellow-800">🟡 Medium</span>;
      case 'Dream': return <span className="badge bg-red-100 text-red-800">🔴 Dream</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            TG EAPCET <span className="gradient-text">Rank Predictor</span>
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            AI-powered college predictor using previous 3 years of closing ranks. Find your best-fit colleges based on rank, category, gender, and preferences.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Input Form */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="font-bold text-lg mb-4">Your Profile</h2>
              <form onSubmit={handlePredict} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TG EAPCET Rank *</label>
                  <input name="rank" value={form.rank} onChange={handleChange}
                    className="input-field" type="number" placeholder="e.g., 12500" required />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select name="category" value={form.category} onChange={handleChange} className="input-field">
                      {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                    <select name="gender" value={form.gender} onChange={handleChange} className="input-field">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Branch</label>
                  <select name="preferredBranch" value={form.preferredBranch} onChange={handleChange} className="input-field">
                    {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District (Optional)</label>
                  <select name="district" value={form.district} onChange={handleChange} className="input-field">
                    <option value="">All Districts</option>
                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College Type</label>
                  <div className="space-y-1">
                    {COLLEGE_TYPES.map(type => (
                      <label key={type} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" name={type.toLowerCase()} checked={(form as any)[type.toLowerCase()]}
                          onChange={handleChange} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Budget (₹)</label>
                    <input name="budget" value={form.budget} onChange={handleChange}
                      className="input-field" type="number" placeholder="e.g., 100000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Placement %</label>
                    <input name="minPlacement" value={form.minPlacement} onChange={handleChange}
                      className="input-field" type="number" placeholder="e.g., 80" />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="btn-primary w-full py-3 text-base font-semibold">
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </span>
                  ) : '🔮 Predict Colleges'}
                </button>
              </form>
            </div>
          </div>

          {/* Right - Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* AI Recommendation Section */}
            {result?.aiRecommendation?.bestCollege && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200">
                  <h2 className="text-lg font-bold mb-4 flex items-center space-x-2">
                    <span>🤖</span>
                    <span>AI Recommendation</span>
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { label: 'Best College', value: result.aiRecommendation.bestCollege?.college.shortName },
                      { label: 'Alternative', value: result.aiRecommendation.alternative?.college.shortName },
                      { label: 'Safe Option', value: result.aiRecommendation.safeOption?.college.shortName },
                      { label: 'Highest ROI', value: result.aiRecommendation.highestROI?.college.shortName },
                      { label: 'Best Placement', value: result.aiRecommendation.bestPlacement?.college.shortName },
                    ].map(item => (
                      <div key={item.label} className="text-center bg-white/60 rounded-lg p-2">
                        <div className="text-xs text-gray-500">{item.label}</div>
                        <div className="font-bold text-primary-700 text-sm">{item.value || 'N/A'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Summary Stats */}
            {result && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card text-center">
                  <div className="text-3xl font-bold text-green-600">{result.highChance.length}</div>
                  <div className="text-sm text-gray-500">High Chance</div>
                </div>
                <div className="card text-center">
                  <div className="text-3xl font-bold text-yellow-600">{result.mediumChance.length}</div>
                  <div className="text-sm text-gray-500">Medium Chance</div>
                </div>
                <div className="card text-center">
                  <div className="text-3xl font-bold text-red-600">{result.dream.length}</div>
                  <div className="text-sm text-gray-500">Dream Colleges</div>
                </div>
                <div className="card text-center">
                  <div className="text-3xl font-bold text-primary-600">{result.totalColleges}</div>
                  <div className="text-sm text-gray-500">Total Matches</div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="card flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">AI is analyzing your rank against {new Date().getFullYear() - 2022} years of cutoff data...</p>
                  <div className="mt-4 flex justify-center space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results Tabs */}
            {result && !loading && (
              <div>
                <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
                  {[
                    { key: 'high' as const, label: `✅ High (${result.highChance.length})` },
                    { key: 'medium' as const, label: `🟡 Medium (${result.mediumChance.length})` },
                    { key: 'dream' as const, label: `🔴 Dream (${result.dream.length})` },
                  ].map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* College Cards */}
                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    {getCurrentResults().length === 0 ? (
                      <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card text-center py-10">
                        <p className="text-gray-500">No colleges found in this category. Try adjusting your filters.</p>
                      </motion.div>
                    ) : (
                      getCurrentResults().map((item, i) => (
                        <motion.div key={`${item.college.id}-${item.branch}`}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                          className="card cursor-pointer hover:shadow-md transition-all"
                          onClick={() => setSelectedCollege(item)}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-bold text-gray-900">{item.college.name}</h3>
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{item.college.collegeCode}</span>
                                {getChanceBadge(item.chance)}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {item.college.city}, {item.college.district} | {item.college.ownership} | {item.branch}
                              </p>
                              <div className="flex flex-wrap gap-3 mt-2 text-sm">
                                <span className="text-gray-600">Closing Rank: <strong>{item.closingRank.toLocaleString()}</strong> ({item.year})</span>
                                {item.naacGrade && <span className="text-gray-600">NAAC: <strong>{item.naacGrade}</strong></span>}
                                {item.nirfRank && <span className="text-gray-600">NIRF: <strong>#{item.nirfRank}</strong></span>}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <MatchScoreRing score={item.matchScore} size={64} />
                              <div className="text-right text-sm">
                                {item.averagePackage && <div>Avg: <strong className="text-green-600">₹{item.averagePackage}L</strong></div>}
                                {item.placementRate && <div>Place: <strong>{item.placementRate}%</strong></div>}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>

                {/* Charts Section */}
                {(result.highChance.length > 0 || result.mediumChance.length > 0) && (
                  <div className="mt-8 space-y-6">
                    <div className="card">
                      <h3 className="font-semibold mb-4">College Distribution</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie data={[
                            { name: 'High Chance', value: result.highChance.length },
                            { name: 'Medium Chance', value: result.mediumChance.length },
                            { name: 'Dream', value: result.dream.length },
                          ]} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {PIE_COLORS.map((color, i) => <Cell key={i} fill={color} />)}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {(result.highChance.length > 0 || result.mediumChance.length > 0) && (
                      <div className="card">
                        <h3 className="font-semibold mb-4">Match Score Comparison (Top Colleges)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={[...result.highChance, ...result.mediumChance, ...result.dream].slice(0, 15)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="college.shortName" tick={{ fontSize: 11 }} />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="matchScore" fill="#3b82f6" name="Match Score %" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!result && !loading && (
              <div className="card flex items-center justify-center py-20">
                <div className="text-center max-w-md">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect College</h3>
                  <p className="text-gray-600 mb-4">
                    Enter your TG EAPCET rank, category, and preferences. Our AI will analyze 3 years of cutoff data
                    to find the best colleges for you.
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-sm text-left bg-gray-50 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl mb-1">✅</div>
                      <div className="font-medium">High Chance</div>
                      <div className="text-gray-500 text-xs">Rank well above cutoff</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🟡</div>
                      <div className="font-medium">Medium</div>
                      <div className="text-gray-500 text-xs">Rank near cutoff</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔴</div>
                      <div className="font-medium">Dream</div>
                      <div className="text-gray-500 text-xs">Rank below cutoff</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* College Detail Modal */}
      <AnimatePresence>
        {selectedCollege && (
          <CollegeDetailModal result={selectedCollege} onClose={() => setSelectedCollege(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

