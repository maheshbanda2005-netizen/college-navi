'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCompare } from '@/store/store';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { getCollegeById, CollegeDetail } from '@/data/collegesData';
import { api } from '@/lib/api';

export default function UniversityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('overview');
  const collegeId = (params?.id as string) || '17';
  const [college, setCollege] = useState<CollegeDetail>(() => getCollegeById(collegeId));

  // Application modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedCourseToApply, setSelectedCourseToApply] = useState<any>(null);
  const [applicantName, setApplicantName] = useState('Mahesh Kumar');
  const [applicantPhone, setApplicantPhone] = useState('+91 98765 43210');
  const [applicantEmail, setApplicantEmail] = useState('mahesh.student@example.com');
  const [eamcetRank, setEamcetRank] = useState('18450');

  useEffect(() => {
    const localData = getCollegeById(collegeId);
    setCollege(localData);

    // If ID looks like a backend MongoDB ObjectId, fetch additional details from API
    if (collegeId && /^[0-9a-fA-F]{24}$/.test(collegeId)) {
      api.universities.getById(collegeId)
        .then((res: any) => {
          if (res.data?.success && res.data?.data) {
            const apiData = res.data.data;
            setCollege((prev) => ({
              ...prev,
              name: apiData.name || prev.name,
              location: `${apiData.city || ''}, ${apiData.state || ''}`.replace(/^, /, '') || prev.location,
              description: apiData.description || prev.description,
              established: apiData.establishmentYear || prev.established,
              type: apiData.collegeType || prev.type,
              ranking: apiData.ranking?.nirf || prev.ranking,
              accreditation: apiData.accreditation || prev.accreditation,
              campusArea: apiData.campusArea || prev.campusArea,
            }));
          }
        })
        .catch(() => {
          // Keep localData on network failure
        });
    }
  }, [collegeId]);

  const handleAddToCompare = () => {
    dispatch(addToCompare({
      id: college.id,
      name: college.name,
      ranking: college.ranking,
      avgPackage: college.placements.average,
      fees: college.courses[0]?.fees || '₹95K/yr',
      rating: college.stats.rating,
      type: college.type,
      courses: college.courses.length,
      location: college.location,
    } as any));
    toast.success(`${college.name} added to comparison!`);
  };

  const handleOpenApplyModal = (course?: any) => {
    const crs = course || college.courses[0];
    setSelectedCourseToApply(crs);
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseToApply) return;
    
    const shortCode = (college.shortName || college.name.slice(0, 4)).toUpperCase().replace(/[^A-Z]/g, '');
    const appId = `APP-${shortCode}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApplication = {
      id: appId,
      university: college.name,
      universityId: college.id,
      location: college.location,
      course: selectedCourseToApply.name,
      fees: selectedCourseToApply.fees,
      status: 'Submitted' as const,
      date: new Date().toISOString().split('T')[0],
      color: 'bg-purple-100 text-purple-800 border-purple-300',
      progress: 20,
      applicantName,
      applicantEmail,
      applicantPhone,
      eamcetRank,
      documents: ['Application Form (Submitted via Portal)'],
    };

    try {
      const stored = localStorage.getItem('edunavigator_applications');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newApplication);
      localStorage.setItem('edunavigator_applications', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }

    setIsApplyModalOpen(false);
    toast.success(`Application submitted to ${college.name}! Redirecting to Applications...`);
    setTimeout(() => {
      router.push('/applications');
    }, 1200);
  };

  const tabs = ['overview', 'courses', 'placements', 'cutoffs', 'branches', 'alumni', 'reviews'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button 
            onClick={() => router.push('/universities')}
            className="hover:text-primary-600 font-medium flex items-center space-x-1"
          >
            <span>← Back to Telangana Colleges</span>
          </button>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-md">{college.name}</span>
        </div>

        {/* Hero Header Card */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-800 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start md:items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl font-bold shadow-inner flex-shrink-0">
                {college.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{college.name}</h1>
                <p className="text-white/80 mt-1 text-sm md:text-base">
                  📍 {college.location} | Est. {college.established}
                </p>
                <div className="flex items-center space-x-2 md:space-x-3 mt-3 flex-wrap gap-y-2">
                  <span className="badge bg-white/20 text-white border border-white/30 text-xs md:text-sm">{college.type}</span>
                  <span className="badge bg-white/20 text-white border border-white/30 text-xs md:text-sm">#{college.ranking} Rank</span>
                  <span className="badge bg-white/20 text-white border border-white/30 text-xs md:text-sm">{college.accreditation}</span>
                  <span className="badge bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-xs md:text-sm">Campus: {college.campusArea}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <button 
                onClick={handleAddToCompare} 
                className="btn-secondary text-white border-white/40 hover:bg-white/20 bg-white/10 flex-1 md:flex-initial text-sm"
              >
                Add to Compare
              </button>
              <button 
                onClick={() => handleOpenApplyModal()} 
                className="btn-accent bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex-1 md:flex-initial text-sm shadow-lg"
              >
                Apply for Admission
              </button>
            </div>
          </div>
        </div>

        {/* Quick Highlights / KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'AI Match Score', value: `${college.aiScore}/100`, color: 'blue', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
            { label: 'ROI Score', value: `${college.roiScore}/100`, color: 'green', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
            { label: 'Campus Fit', value: `${college.campusSuitability}/100`, color: 'purple', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
            { label: 'Placement Rate', value: `${college.placementRate}%`, color: 'orange', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' },
            { label: 'Student Rating', value: `★ ${college.stats.rating} / 5`, color: 'yellow', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' },
          ].map((s) => (
            <div key={s.label} className={`card text-center ${s.bg} border ${s.border} shadow-sm py-4`}>
              <div className={`text-2xl font-bold ${s.text}`}>{s.value}</div>
              <div className="text-xs md:text-sm text-gray-600 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100/80 p-1.5 rounded-xl overflow-x-auto border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-white text-primary-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About {college.name}</h2>
              <p className="text-gray-600 leading-relaxed text-base">{college.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center space-x-2">
                  <span>📊</span>
                  <span>Institutional Key Stats</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Total Enrolled Students</span>
                    <span className="font-bold text-gray-900">{college.stats.totalStudents.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Faculty Members</span>
                    <span className="font-bold text-gray-900">{college.stats.faculty}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Research Publications</span>
                    <span className="font-bold text-gray-900">{college.stats.researchPapers}+</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-600">Patents Filed & Published</span>
                    <span className="font-bold text-gray-900">{college.stats.patents}</span>
                  </div>
                </div>
              </div>
              <div className="card">
                <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center space-x-2">
                  <span>🏛️</span>
                  <span>Campus Infrastructure</span>
                </h3>
                <div className="space-y-3 text-sm">
                  {Object.entries(college.infrastructure || {}).map(([key, value]: any) => (
                    <div key={key} className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
                      <span className="capitalize font-medium text-gray-700">{key}</span>
                      <span className="font-semibold text-primary-600 text-right max-w-[65%]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            {college.courses.map((c: any, i: number) => (
              <div key={i} className="card hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{c.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      ⏳ {c.duration} &nbsp;|&nbsp; 📋 {c.eligibility} &nbsp;|&nbsp; 👥 {c.seats} Intake Seats
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-bold text-lg text-primary-600">{c.fees}</div>
                      <div className="text-xs text-gray-500 font-medium">Cutoff: {c.cutoff}</div>
                    </div>
                    <button 
                      onClick={() => handleOpenApplyModal(c)} 
                      className="btn-primary text-sm py-2 px-4 shadow-sm"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Placements */}
        {activeTab === 'placements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Highest Package', value: college.placements.highest },
                { label: 'Average Package', value: college.placements.average },
                { label: 'Median Package', value: college.placements.median },
                { label: 'Placement Percentage', value: college.placements.rate + '%' },
              ].map((p) => (
                <div key={p.label} className="card text-center bg-white shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-emerald-600">{p.value}</div>
                  <div className="text-xs md:text-sm text-gray-500 mt-1 font-medium">{p.label}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Salary Package Trends (Last 4 Years)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={college.salaryTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avg" stroke="#3b82f6" name="Average Package (LPA)" strokeWidth={2} />
                  <Line type="monotone" dataKey="highest" stroke="#10b981" name="Highest Package" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h3 className="font-bold text-gray-900 text-lg mb-3">Top Recruiting Companies</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {college.placements.recruiters.map((r: string) => (
                  <span key={r} className="badge bg-blue-50 text-blue-800 border border-blue-200 py-1 px-3 text-sm font-medium">
                    🏢 {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Cutoffs */}
        {activeTab === 'cutoffs' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-bold text-gray-900 text-lg mb-4">EAMCET / Entrance Cutoff Trends (Last 4 Years)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={college.cutoffTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="eamcet" fill="#f59e0b" name="TG EAPCET Closing Rank" />
                  <Bar dataKey="jeeAdvanced" fill="#3b82f6" name="National / JEE Rank" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <h3 className="font-bold text-gray-900 text-lg mb-3">Latest Qualifying Cutoffs</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl">
                  <div className="text-sm font-semibold text-amber-800">TG EAPCET Expected Closing Rank</div>
                  <div className="text-3xl font-extrabold text-amber-700 mt-2">
                    {college.cutoffTrends?.[3]?.eamcet ?? college.cutoffTrends?.[college.cutoffTrends.length - 1]?.eamcet ?? 'N/A'}
                  </div>
                  <div className="text-xs text-amber-600 mt-1">General Category • Round 1 Final</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
                  <div className="text-sm font-semibold text-blue-800">JEE Main / Advanced Expected Cutoff</div>
                  <div className="text-3xl font-extrabold text-blue-700 mt-2">
                    {college.cutoffTrends?.[3]?.jeeAdvanced ?? college.cutoffTrends?.[college.cutoffTrends.length - 1]?.jeeAdvanced ?? 'N/A'}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">National Quota • Closing Rank</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Branch Statistics */}
        {activeTab === 'branches' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Branch-wise Placement % & Package Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={college.branchStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="branch" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="placement" fill="#10b981" name="Placement Rate (%)" />
                  <Bar dataKey="avgPackage" fill="#3b82f6" name="Avg Package (LPA)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {college.branchStats.map((b: any) => (
                <div key={b.branch} className="card border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-gray-900 text-base mb-3 flex items-center justify-between">
                    <span>Department of {b.branch}</span>
                    <span className="badge bg-primary-50 text-primary-700 text-xs">Active</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500">Placement Rate</span>
                      <span className="font-bold text-emerald-600">{b.placement}%</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500">Average Package</span>
                      <span className="font-bold text-blue-600">₹{b.avgPackage} LPA</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Closing Cutoff Rank</span>
                      <span className="font-bold text-gray-800">{b.cutoff}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Alumni Network */}
        {activeTab === 'alumni' && (
          <div className="space-y-4">
            <div className="card mb-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-100">
              <h3 className="font-bold text-gray-900 text-lg">Notable Alumni Network</h3>
              <p className="text-sm text-gray-600 mt-1">
                Graduates from {college.name} leading engineering teams across global tech companies.
              </p>
            </div>
            {college.alumni.map((a: any, i: number) => (
              <div key={i} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                      {a.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{a.name}</h3>
                      <p className="text-sm text-gray-600">
                        Batch of {a.batch} &nbsp;|&nbsp; <span className="font-semibold text-gray-800">{a.position}</span> at <span className="text-primary-700 font-semibold">{a.company}</span>
                      </p>
                    </div>
                  </div>
                  <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 py-1 px-2.5 text-xs font-semibold">
                    {a.package}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 7: Student Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="card mb-4 bg-gradient-to-r from-gray-50 to-amber-50 border border-amber-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Student & Alumni Feedback</h3>
                <p className="text-sm text-gray-600 mt-1">Verified reviews from students and recent graduates</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-amber-500">★ {college.stats.rating}</div>
                <div className="text-xs text-gray-500 font-medium">Overall Score</div>
              </div>
            </div>
            {college.reviews.map((r: any, i: number) => (
              <div key={i} className="card hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{r.name}</h4>
                  <span className="text-amber-400 text-lg tracking-wider">{'★'.repeat(r.rating)}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Direct Application Submission Modal */}
      <AnimatePresence>
        {isApplyModalOpen && selectedCourseToApply && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b pb-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Apply for Admission</h3>
                  <p className="text-xs text-gray-500">{college.name}</p>
                </div>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-4 text-sm">
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-3.5 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">College / Institution:</span>
                    <span className="font-bold text-primary-950">{college.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campus Location:</span>
                    <span className="font-semibold text-primary-900">{college.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selected Program:</span>
                    <span className="font-bold text-primary-900">{selectedCourseToApply.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Tuition Fee:</span>
                    <span className="font-bold text-emerald-700">{selectedCourseToApply.fees}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Student Full Name:</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">TG EAPCET / Rank:</label>
                    <input
                      type="text"
                      required
                      value={eamcetRank}
                      onChange={(e) => setEamcetRank(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address:</label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number:</label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs py-2 px-5 font-bold shadow-md bg-emerald-600 hover:bg-emerald-700"
                  >
                    Confirm & Submit Application
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
