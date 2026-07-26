'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';

const collegeDatabase: Record<string, any> = {
  '1': {
    id: '1', name: 'IIT Hyderabad', location: 'Hyderabad, Telangana', established: 2008,
    type: 'IIT', ranking: 8, accreditation: 'NAAC A++', campusArea: '450 Acres',
    description: 'IIT Hyderabad is a premier engineering institute known for cutting-edge research and industry partnerships.',
    aiScore: 92, roiScore: 88, campusSuitability: 85, placementRate: 96,
    courses: [
      { name: 'B.Tech CSE', duration: '4 Years', fees: '₹2.2L/yr', seats: 120, eligibility: 'JEE Advanced', cutoff: 2500 },
      { name: 'B.Tech ECE', duration: '4 Years', fees: '₹2.1L/yr', seats: 100, eligibility: 'JEE Advanced', cutoff: 3200 },
      { name: 'M.Tech AI', duration: '2 Years', fees: '₹1.5L/yr', seats: 60, eligibility: 'GATE', cutoff: 650 },
    ],
    placements: { highest: '₹2.8 Cr/yr', average: '₹24 LPA', median: '₹22 LPA', rate: 96, recruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'McKinsey', 'Flipkart'] },
    infrastructure: { library: 'Central Library with 2L+ volumes', labs: '80+ Advanced Labs', hostel: '15 Hostels', sports: 'Olympic-size pool, stadium', wifi: 'Campus-wide WiFi 6' },
    stats: { rating: 4.8, totalStudents: 8000, faculty: 600, researchPapers: 3500, patents: 120 },
    cutoffTrends: [
      { year: 2020, eamcet: 520, jeeAdvanced: 3500 },
      { year: 2021, eamcet: 480, jeeAdvanced: 3000 },
      { year: 2022, eamcet: 450, jeeAdvanced: 2800 },
      { year: 2023, eamcet: 420, jeeAdvanced: 2500 },
    ],
    salaryTrends: [
      { year: 2020, avg: 18, highest: 2.0 },
      { year: 2021, avg: 20, highest: 2.3 },
      { year: 2022, avg: 22, highest: 2.5 },
      { year: 2023, avg: 24, highest: 2.8 },
    ],
    branchStats: [
      { branch: 'CSE', placement: 100, avgPackage: 28, cutoff: 2500 },
      { branch: 'ECE', placement: 95, avgPackage: 22, cutoff: 3200 },
      { branch: 'ME', placement: 92, avgPackage: 20, cutoff: 3800 },
      { branch: 'CE', placement: 88, avgPackage: 18, cutoff: 4200 },
    ],
    alumni: [
      { name: 'Rajesh Kumar', batch: 2015, company: 'Google', position: 'Senior Engineer', package: '₹2.5 Cr' },
      { name: 'Priya Sharma', batch: 2016, company: 'Microsoft', position: 'Product Manager', package: '₹2.2 Cr' },
      { name: 'Arjun Singh', batch: 2014, company: 'Goldman Sachs', position: 'VP', package: '₹3.0 Cr' },
    ],
    reviews: [
      { name: 'Student A', rating: 5, text: 'Excellent faculty and infrastructure. Great placement opportunities.' },
      { name: 'Student B', rating: 4, text: 'Good college with strong academics. Hostel facilities could be better.' },
    ],
  },
  '2': {
    id: '2', name: 'IIIT Hyderabad', location: 'Hyderabad, Telangana', established: 1998,
    type: 'IIIT', ranking: 15, accreditation: 'NAAC A+', campusArea: '350 Acres',
    description: 'IIIT Hyderabad is a premier institute for IT education with strong industry connections.',
    aiScore: 95, roiScore: 94, campusSuitability: 90, placementRate: 98,
    courses: [
      { name: 'B.Tech CSE', duration: '4 Years', fees: '₹2.0L/yr', seats: 150, eligibility: 'JEE Advanced', cutoff: 1800 },
      { name: 'B.Tech IT', duration: '4 Years', fees: '₹2.0L/yr', seats: 100, eligibility: 'JEE Advanced', cutoff: 2000 },
      { name: 'M.Tech AI', duration: '2 Years', fees: '₹1.2L/yr', seats: 80, eligibility: 'GATE', cutoff: 600 },
    ],
    placements: { highest: '₹3.2 Cr/yr', average: '₹28 LPA', median: '₹26 LPA', rate: 98, recruiters: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Adobe'] },
    infrastructure: { library: 'Digital Library with 1.5L+ e-books', labs: '100+ Advanced Labs', hostel: '12 Hostels', sports: 'Full sports complex', wifi: 'Campus-wide WiFi 6' },
    stats: { rating: 4.9, totalStudents: 6000, faculty: 500, researchPapers: 4000, patents: 150 },
    cutoffTrends: [
      { year: 2020, eamcet: 380, jeeAdvanced: 1500 },
      { year: 2021, eamcet: 360, jeeAdvanced: 1400 },
      { year: 2022, eamcet: 340, jeeAdvanced: 1300 },
      { year: 2023, eamcet: 320, jeeAdvanced: 1200 },
    ],
    salaryTrends: [
      { year: 2020, avg: 22, highest: 2.8 },
      { year: 2021, avg: 24, highest: 3.0 },
      { year: 2022, avg: 26, highest: 3.1 },
      { year: 2023, avg: 28, highest: 3.2 },
    ],
    branchStats: [
      { branch: 'CSE', placement: 100, avgPackage: 32, cutoff: 1800 },
      { branch: 'IT', placement: 98, avgPackage: 28, cutoff: 2000 },
    ],
    alumni: [
      { name: 'Vikram Patel', batch: 2012, company: 'Google', position: 'Director', package: '₹3.5 Cr' },
      { name: 'Neha Gupta', batch: 2013, company: 'Microsoft', position: 'Senior PM', package: '₹3.0 Cr' },
    ],
    reviews: [
      { name: 'Student C', rating: 5, text: 'Best IT college in India. Amazing placements and faculty.' },
      { name: 'Student D', rating: 5, text: 'World-class infrastructure and research opportunities.' },
    ],
  },
};

export default function UniversityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const college = collegeDatabase[params.id as string] || collegeDatabase['1'];

  const tabs = ['overview', 'courses', 'placements', 'cutoffs', 'branches', 'alumni', 'reviews'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl font-bold">
                {college.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{college.name}</h1>
                <p className="text-white/80 mt-1">{college.location} | Est. {college.established}</p>
                <div className="flex items-center space-x-3 mt-2 flex-wrap">
                  <span className="badge bg-white/20 text-white border border-white/30">{college.type}</span>
                  <span className="badge bg-white/20 text-white border border-white/30">#{college.ranking} Rank</span>
                  <span className="badge bg-white/20 text-white border border-white/30">{college.accreditation}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button onClick={() => router.push('/compare')} className="btn-secondary text-white border-white/30 hover:bg-white/20 bg-transparent">
                Add to Compare
              </button>
              <button onClick={() => router.push('/admission-predictor')} className="btn-accent">
                Check Admission
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'AI Score', value: college.aiScore, color: 'blue' },
            { label: 'ROI Score', value: college.roiScore, color: 'green' },
            { label: 'Campus Fit', value: college.campusSuitability, color: 'purple' },
            { label: 'Placement', value: college.placementRate + '%', color: 'orange' },
            { label: 'Rating', value: college.stats.rating, color: 'yellow' },
          ].map((s) => (
            <div key={s.label} className={`card text-center bg-${s.color}-50 border border-${s.color}-200`}>
              <div className={`text-2xl font-bold text-${s.color}-700`}>{s.value}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize whitespace-nowrap transition-all ${activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{college.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold mb-3">Key Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Total Students</span><span className="font-bold">{college.stats.totalStudents.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Faculty</span><span className="font-bold">{college.stats.faculty}</span></div>
                  <div className="flex justify-between"><span>Research Papers</span><span className="font-bold">{college.stats.researchPapers}</span></div>
                  <div className="flex justify-between"><span>Patents</span><span className="font-bold">{college.stats.patents}</span></div>
                </div>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-3">Infrastructure</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(college.infrastructure).map(([key, value]: any) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key}</span>
                      <span className="font-bold text-primary-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            {college.courses.map((c: any, i: number) => (
              <div key={i} className="card">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{c.name}</h3>
                    <p className="text-sm text-gray-500">{c.duration} | {c.eligibility} | {c.seats} Seats</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 md:mt-0">
                    <div className="text-right">
                      <div className="font-bold text-primary-600">{c.fees}</div>
                      <div className="text-xs text-gray-500">Cutoff: {c.cutoff}</div>
                    </div>
                    <button onClick={() => toast.success('Application started!')} className="btn-primary text-sm py-1.5 px-3">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'placements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Highest', value: college.placements.highest },
                { label: 'Average', value: college.placements.average },
                { label: 'Median', value: college.placements.median },
                { label: 'Rate', value: college.placements.rate + '%' },
              ].map((p) => (
                <div key={p.label} className="card text-center">
                  <div className="text-xl font-bold text-green-600">{p.value}</div>
                  <div className="text-sm text-gray-500">{p.label}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 className="font-semibold mb-4">Salary Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={college.salaryTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avg" stroke="#3b82f6" name="Avg Package (LPA)" />
                  <Line type="monotone" dataKey="highest" stroke="#10b981" name="Highest (Cr)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-3">Top Recruiters</h3>
              <div className="flex flex-wrap gap-2">
                {college.placements.recruiters.map((r: string) => (
                  <span key={r} className="badge bg-blue-50 text-blue-700 border border-blue-200">{r}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cutoffs' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold mb-4">Cutoff Trends (EAMCET & JEE Advanced)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={college.cutoffTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="eamcet" fill="#f59e0b" name="EAMCET Rank" />
                  <Bar dataKey="jeeAdvanced" fill="#3b82f6" name="JEE Advanced Rank" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h3 className="font-semibold mb-3">Current Year Cutoffs</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <div className="text-sm text-gray-600">EAMCET Cutoff</div>
                  <div className="text-2xl font-bold text-blue-700">{college.cutoffTrends[3].eamcet}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <div className="text-sm text-gray-600">JEE Advanced Cutoff</div>
                  <div className="text-2xl font-bold text-purple-700">{college.cutoffTrends[3].jeeAdvanced}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'branches' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold mb-4">Branch-wise Statistics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={college.branchStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="branch" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="placement" fill="#10b981" name="Placement %" />
                  <Bar dataKey="avgPackage" fill="#3b82f6" name="Avg Package (LPA)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {college.branchStats.map((b: any) => (
                <div key={b.branch} className="card">
                  <h4 className="font-semibold mb-2">{b.branch}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>Placement Rate</span><span className="font-bold text-green-600">{b.placement}%</span></div>
                    <div className="flex justify-between"><span>Avg Package</span><span className="font-bold text-blue-600">₹{b.avgPackage} LPA</span></div>
                    <div className="flex justify-between"><span>Cutoff Rank</span><span className="font-bold">{b.cutoff}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'alumni' && (
          <div className="space-y-4">
            {college.alumni.map((a: any, i: number) => (
              <div key={i} className="card">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{a.name}</h3>
                    <p className="text-sm text-gray-600">Batch {a.batch} | {a.position} at {a.company}</p>
                  </div>
                  <span className="badge bg-green-50 text-green-700 border border-green-200">{a.package}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {college.reviews.map((r: any, i: number) => (
              <div key={i} className="card">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{r.name}</h4>
                  <span className="text-yellow-400">{'★'.repeat(r.rating)}</span>
                </div>
                <p className="text-gray-600 text-sm">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
