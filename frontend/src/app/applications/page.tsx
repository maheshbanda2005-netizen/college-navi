'use client';
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { telanganaColleges, detailedCollegesDatabase } from '@/data/collegesData';
import toast from 'react-hot-toast';

export interface ApplicationItem {
  id: string;
  type: 'college' | 'scholarship';
  university: string;
  universityId?: string;
  enrolledCollege?: string;
  location?: string;
  course: string;
  fees: string;
  provider?: string;
  status: 'Submitted' | 'Document Verification' | 'Review' | 'Interview' | 'Selected' | 'Admitted';
  date: string;
  color: string;
  progress: number;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  income?: string;
  eamcetRank?: string;
  documents?: string[];
}

const defaultApplications: ApplicationItem[] = [
  {
    id: 'APP-MRCE-2026-0819',
    type: 'college',
    university: 'Malla Reddy College of Engineering',
    universityId: '17',
    location: 'Maisammaguda, Dhulapally, Secunderabad',
    course: 'B.Tech Computer Science & Engineering (CSE)',
    fees: '₹95,000/yr',
    status: 'Review',
    date: '2026-09-02',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    progress: 50,
    applicantName: 'Mahesh Kumar',
    applicantEmail: 'mahesh.student@example.com',
    applicantPhone: '+91 98765 43210',
    eamcetRank: '18,450',
    documents: ['10th Marksheet (Verified)', '12th Marksheet (Verified)', 'TG EAPCET Rank Card (Under Review)'],
  },
  {
    id: 'APP-CBIT-2026-0422',
    type: 'college',
    university: 'Chaitanya Bharathi Institute of Technology (CBIT)',
    universityId: '5',
    location: 'Gandipet, Hyderabad, Telangana',
    course: 'B.Tech Artificial Intelligence & Data Science',
    fees: '₹1.8L/yr',
    status: 'Document Verification',
    date: '2026-08-28',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    progress: 35,
    applicantName: 'Mahesh Kumar',
    applicantEmail: 'mahesh.student@example.com',
    applicantPhone: '+91 98765 43210',
    eamcetRank: '1,420',
    documents: ['12th Marksheet (Pending Original Upload)'],
  },
  {
    id: 'APP-VNRV-2026-0105',
    type: 'college',
    university: 'VNR Vignana Jyothi Institute of Engineering & Technology',
    universityId: '6',
    location: 'Bachupally, Nizampet, Hyderabad',
    course: 'B.Tech Information Technology',
    fees: '₹1.5L/yr',
    status: 'Selected',
    date: '2026-08-15',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 85,
    applicantName: 'Mahesh Kumar',
    applicantEmail: 'mahesh.student@example.com',
    applicantPhone: '+91 98765 43210',
    eamcetRank: '2,080',
    documents: ['All Documents Verified', 'Allotment Letter Issued'],
  },
  {
    id: 'SCH-TGTS-2026-0912',
    type: 'scholarship',
    university: 'Telangana EAPCET Rank Scholarship',
    enrolledCollege: 'Malla Reddy College of Engineering',
    provider: 'Govt of Telangana',
    course: 'State Rank Scholarship Grant (₹25,000/yr)',
    fees: '₹25,000/yr',
    status: 'Selected',
    date: '2026-08-22',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 85,
    applicantName: 'Mahesh Kumar',
    applicantEmail: 'mahesh.student@example.com',
    applicantPhone: '+91 98765 43210',
    income: '₹3.2 Lakhs/yr',
    eamcetRank: '18,450',
    documents: ['EAPCET Rank Card (Verified)', 'Income Certificate (Verified)', 'College Admission Receipt (Approved)'],
  },
  {
    id: 'SCH-NMS-2026-0441',
    type: 'scholarship',
    university: 'National Merit Scholarship',
    enrolledCollege: 'Chaitanya Bharathi Institute of Technology (CBIT)',
    provider: 'Government of India',
    course: 'National Merit Financial Grant (₹50,000/yr)',
    fees: '₹50,000/yr',
    status: 'Document Verification',
    date: '2026-08-30',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    progress: 35,
    applicantName: 'Mahesh Kumar',
    applicantEmail: 'mahesh.student@example.com',
    applicantPhone: '+91 98765 43210',
    income: '₹4.5 Lakhs/yr',
    eamcetRank: '1,420',
    documents: ['Income Certificate (Submitted)', '12th Marksheet (Verified)'],
  },
];

const statusFlow: ApplicationItem['status'][] = [
  'Submitted',
  'Document Verification',
  'Review',
  'Interview',
  'Selected',
  'Admitted',
];

function ApplicationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'college' | 'scholarship'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Modals
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewCollegeModalOpen, setIsNewCollegeModalOpen] = useState(false);
  const [isNewScholarshipModalOpen, setIsNewScholarshipModalOpen] = useState(false);

  // College form state
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>('17');
  const [selectedCourse, setSelectedCourse] = useState<string>('B.Tech Computer Science & Engineering (CSE)');
  const [applicantName, setApplicantName] = useState<string>('Mahesh Kumar');
  const [applicantEmail, setApplicantEmail] = useState<string>('mahesh.student@example.com');
  const [applicantPhone, setApplicantPhone] = useState<string>('+91 98765 43210');
  const [eamcetRank, setEamcetRank] = useState<string>('18450');

  // Scholarship form state
  const [scholarshipName, setScholarshipName] = useState<string>('National Merit Scholarship');
  const [scholarshipProvider, setScholarshipProvider] = useState<string>('Government of India');
  const [scholarshipAmount, setScholarshipAmount] = useState<string>('₹50,000/yr');
  const [enrolledCollege, setEnrolledCollege] = useState<string>('Malla Reddy College of Engineering');
  const [familyIncome, setFamilyIncome] = useState<string>('₹3.5 Lakhs');

  // Load applications from localStorage or defaults
  useEffect(() => {
    try {
      const stored = localStorage.getItem('edunavigator_applications');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setApplications(parsed);
        } else {
          setApplications(defaultApplications);
          localStorage.setItem('edunavigator_applications', JSON.stringify(defaultApplications));
        }
      } else {
        setApplications(defaultApplications);
        localStorage.setItem('edunavigator_applications', JSON.stringify(defaultApplications));
      }
    } catch {
      setApplications(defaultApplications);
    }
  }, []);

  // Handle URL redirect query parameters (e.g. from /scholarships or /scholarship-finder)
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const nameParam = searchParams.get('name');
    const amountParam = searchParams.get('amount');
    const providerParam = searchParams.get('provider');

    if (typeParam === 'scholarship' || nameParam) {
      setActiveCategoryTab('scholarship');
      if (nameParam) setScholarshipName(nameParam);
      if (amountParam) setScholarshipAmount(amountParam);
      if (providerParam) setScholarshipProvider(providerParam);
      setIsNewScholarshipModalOpen(true);
      toast.success(`Ready to apply for ${nameParam || 'Scholarship'}! Fill details below.`);
    }
  }, [searchParams]);

  const saveApplications = (updated: ApplicationItem[]) => {
    setApplications(updated);
    try {
      localStorage.setItem('edunavigator_applications', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateCollegeApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const college = telanganaColleges.find((c) => c.id === selectedCollegeId) || telanganaColleges[0];
    const newApp: ApplicationItem = {
      id: `APP-${college.name.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'college',
      university: college.name,
      universityId: college.id,
      location: college.location,
      course: selectedCourse,
      fees: college.fees,
      status: 'Submitted',
      date: new Date().toISOString().split('T')[0],
      color: 'bg-purple-100 text-purple-800 border-purple-300',
      progress: 20,
      applicantName,
      applicantEmail,
      applicantPhone,
      eamcetRank,
      documents: ['Application Form (Submitted via Portal)'],
    };

    const updated = [newApp, ...applications];
    saveApplications(updated);
    setIsNewCollegeModalOpen(false);
    toast.success(`Application submitted to ${college.name} successfully! (ID: ${newApp.id})`);
  };

  const handleCreateScholarshipApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: ApplicationItem = {
      id: `SCH-${scholarshipName.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'scholarship',
      university: scholarshipName,
      enrolledCollege,
      provider: scholarshipProvider,
      course: `Scholarship Grant (${scholarshipAmount})`,
      fees: scholarshipAmount,
      status: 'Submitted',
      date: new Date().toISOString().split('T')[0],
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      progress: 20,
      applicantName,
      applicantEmail,
      applicantPhone,
      income: familyIncome,
      eamcetRank,
      documents: ['Scholarship Grant Form', 'Income Declaration Certificate'],
    };

    const updated = [newApp, ...applications];
    saveApplications(updated);
    setIsNewScholarshipModalOpen(false);
    setActiveCategoryTab('scholarship');
    toast.success(`Scholarship application submitted for ${scholarshipName}! Tracking ID: ${newApp.id}`);
  };

  const handleWithdraw = (appId: string) => {
    if (confirm('Are you sure you want to withdraw this application?')) {
      const updated = applications.filter((a) => a.id !== appId);
      saveApplications(updated);
      toast.success('Application withdrawn.');
      if (selectedApp?.id === appId) setIsViewModalOpen(false);
    }
  };

  const handleDocumentUpload = (docName: string) => {
    if (!selectedApp) return;
    const updatedDocs = [...(selectedApp.documents || []), `${docName} (Uploaded on ${new Date().toLocaleDateString()})`];
    const updated = applications.map((a) =>
      a.id === selectedApp.id ? { ...a, documents: updatedDocs } : a
    );
    saveApplications(updated);
    setSelectedApp({ ...selectedApp, documents: updatedDocs });
    toast.success(`${docName} uploaded successfully!`);
    setIsUploadModalOpen(false);
  };

  // Filter by category tab (All, College, Scholarship) and by status
  const categoryFiltered = applications.filter((app) => {
    if (activeCategoryTab === 'college') return app.type === 'college' || !app.type;
    if (activeCategoryTab === 'scholarship') return app.type === 'scholarship';
    return true;
  });

  const finalFiltered = filterStatus === 'All'
    ? categoryFiltered
    : categoryFiltered.filter((a) => a.status === filterStatus);

  const collegeCount = applications.filter((a) => a.type === 'college' || !a.type).length;
  const scholarshipCount = applications.filter((a) => a.type === 'scholarship').length;

  const activeCollege = telanganaColleges.find((c) => c.id === selectedCollegeId) || telanganaColleges[0];
  const detailedCollege = detailedCollegesDatabase[selectedCollegeId];
  const availableCourses = detailedCollege?.courses?.map((c) => c.name) || [
    'B.Tech Computer Science & Engineering (CSE)',
    'B.Tech AI & Machine Learning',
    'B.Tech Information Technology',
    'B.Tech Electronics & Communication Engineering',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div>
              <div className="flex items-center space-x-2 text-sm text-primary-700 font-semibold mb-1">
                <span>📋</span>
                <span>Central Admissions & Grants Desk</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Applications & Scholarships</h1>
              <p className="text-sm text-gray-500 mt-1">
                Directly submit and track your college admissions and scholarship funding grants in one place.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsNewScholarshipModalOpen(true)}
                className="btn-secondary text-xs md:text-sm py-2 px-4 font-semibold text-emerald-700 border-emerald-300 hover:bg-emerald-50 shadow-sm flex items-center space-x-1.5"
              >
                <span>🎓 Apply for Scholarship</span>
              </button>
              <button
                onClick={() => setIsNewCollegeModalOpen(true)}
                className="btn-primary text-xs md:text-sm py-2 px-4 shadow-sm font-semibold flex items-center space-x-1.5"
              >
                <span>🏛️ Apply to College</span>
              </button>
            </div>
          </div>

          {/* Primary Category Selector Tabs */}
          <div className="flex items-center space-x-2 mb-6 border-b border-gray-200 pb-3">
            <button
              onClick={() => setActiveCategoryTab('all')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center space-x-2 ${
                activeCategoryTab === 'all'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>📑 All Applications</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategoryTab === 'all' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'}`}>
                {applications.length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategoryTab('college')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center space-x-2 ${
                activeCategoryTab === 'college'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>🏛️ College Admissions</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategoryTab === 'college' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'}`}>
                {collegeCount}
              </span>
            </button>

            <button
              onClick={() => setActiveCategoryTab('scholarship')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center space-x-2 ${
                activeCategoryTab === 'scholarship'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>🎓 Scholarship Grants</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategoryTab === 'scholarship' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'}`}>
                {scholarshipCount}
              </span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="card bg-white border border-gray-200 py-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{categoryFiltered.length}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">Tracked Records</div>
            </div>
            <div className="card bg-amber-50/70 border border-amber-200 py-4 text-center">
              <div className="text-2xl font-bold text-amber-700">
                {categoryFiltered.filter((a) => a.status === 'Review' || a.status === 'Document Verification' || a.status === 'Submitted').length}
              </div>
              <div className="text-xs text-amber-700 mt-1 font-semibold">Under Evaluation</div>
            </div>
            <div className="card bg-emerald-50/70 border border-emerald-200 py-4 text-center">
              <div className="text-2xl font-bold text-emerald-700">
                {categoryFiltered.filter((a) => a.status === 'Selected' || a.status === 'Admitted').length}
              </div>
              <div className="text-xs text-emerald-700 mt-1 font-semibold">Selected / Awarded</div>
            </div>
            <div className="card bg-indigo-50/70 border border-indigo-200 py-4 text-center">
              <div className="text-2xl font-bold text-indigo-700">100%</div>
              <div className="text-xs text-indigo-700 mt-1 font-semibold">Official Verification Rate</div>
            </div>
          </div>

          {/* Status Filter Chips */}
          <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
            <span className="text-xs font-bold text-gray-500 uppercase shrink-0">Filter by Status:</span>
            {['All', 'Submitted', 'Document Verification', 'Review', 'Selected', 'Admitted'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterStatus === st
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Applications List */}
          {finalFiltered.length === 0 ? (
            <div className="card text-center py-16 bg-white border border-gray-200">
              <div className="text-5xl mb-3">📭</div>
              <h3 className="text-lg font-bold text-gray-800">No applications found in this category</h3>
              <p className="text-sm text-gray-500 mt-1 mb-6">You have not submitted any applications matching the selected criteria.</p>
              <div className="flex justify-center space-x-3">
                <button onClick={() => setIsNewCollegeModalOpen(true)} className="btn-primary text-xs py-2 px-5 font-semibold">
                  Apply to College
                </button>
                <button onClick={() => setIsNewScholarshipModalOpen(true)} className="btn-secondary text-xs py-2 px-5 font-semibold">
                  Apply for Scholarship
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {finalFiltered.map((app) => {
                const currentIdx = statusFlow.indexOf(app.status);
                const isScholarship = app.type === 'scholarship';
                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card bg-white border border-gray-200 hover:shadow-md transition-shadow p-6"
                  >
                    {/* Top Row: Title, Badge, Dates */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-2">
                      <div>
                        <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                          <span className={`badge text-xs font-bold py-0.5 px-2.5 rounded-md ${
                            isScholarship ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-blue-50 text-blue-800 border border-blue-300'
                          }`}>
                            {isScholarship ? '🎓 Scholarship Grant' : '🏛️ College Admission'}
                          </span>
                          <h3 className="font-bold text-lg md:text-xl text-gray-900">
                            {app.university}
                          </h3>
                          <span className={`badge border text-xs font-bold py-0.5 px-2.5 rounded-full ${app.color}`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-600 mt-1.5">
                          {isScholarship ? (
                            <>
                              Provider: <strong className="text-gray-800">{app.provider}</strong> &nbsp;|&nbsp; Enrolled College: <strong className="text-primary-700">{app.enrolledCollege || 'Any Approved TS College'}</strong> &nbsp;|&nbsp; Grant Amount: <span className="font-bold text-emerald-700">{app.fees}</span>
                            </>
                          ) : (
                            <>
                              📍 {app.location} &nbsp;|&nbsp; <strong className="text-gray-800">{app.course}</strong> &nbsp;|&nbsp; Tuition: <span className="font-semibold text-primary-600">{app.fees}</span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded font-semibold text-gray-700">
                          {app.id}
                        </span>
                        <span>Applied on {app.date}</span>
                      </div>
                    </div>

                    {/* Progress Track Step Bar */}
                    <div className="my-5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="text-xs font-semibold text-gray-600 mb-3 flex items-center justify-between">
                        <span>Application Status Workflow:</span>
                        <span className="text-primary-700 font-bold">Stage {currentIdx + 1} of {statusFlow.length} ({app.status})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {statusFlow.map((step, i) => {
                          const isCompleted = i < currentIdx;
                          const isCurrent = i === currentIdx;
                          return (
                            <div key={step} className="flex-1 flex items-center">
                              <div
                                title={step}
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all ${
                                  isCompleted
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : isCurrent
                                    ? 'bg-primary-600 text-white ring-2 ring-primary-300 animate-pulse'
                                    : 'bg-gray-200 text-gray-500'
                                }`}
                              >
                                {isCompleted ? '✓' : i + 1}
                              </div>
                              {i < statusFlow.length - 1 && (
                                <div
                                  className={`flex-1 h-1.5 mx-1 rounded-full ${
                                    isCompleted
                                      ? 'bg-emerald-500'
                                      : isCurrent
                                      ? 'bg-primary-300'
                                      : 'bg-gray-200'
                                  }`}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                        <span>Submitted</span>
                        <span className="hidden sm:inline">Verification</span>
                        <span>Evaluation</span>
                        <span className="hidden sm:inline">Interview</span>
                        <span>Sanctioned</span>
                        <span>Awarded</span>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100 gap-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setIsViewModalOpen(true);
                          }}
                          className="btn-secondary text-xs py-1.5 px-3 font-semibold"
                        >
                          📄 View Full Details
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setIsUploadModalOpen(true);
                          }}
                          className="btn-secondary text-xs py-1.5 px-3 font-semibold"
                        >
                          📤 Upload Documents
                        </button>
                        {app.universityId && (
                          <button
                            onClick={() => router.push(`/universities/${app.universityId}`)}
                            className="btn-secondary text-xs py-1.5 px-3 font-semibold text-primary-700 hover:bg-primary-50"
                          >
                            🏛️ View College
                          </button>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleWithdraw(app.id)}
                          className="text-xs text-rose-600 hover:text-rose-800 font-semibold py-1.5 px-2.5 rounded hover:bg-rose-50"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* MODAL 1: View Full Application Details */}
      <AnimatePresence>
        {isViewModalOpen && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b pb-4 mb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-primary-600">{selectedApp.id}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{selectedApp.university}</h3>
                  <p className="text-xs text-gray-500">{selectedApp.type === 'scholarship' ? `Provider: ${selectedApp.provider}` : `📍 ${selectedApp.location}`}</p>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Program / Scheme:</span>
                    <span className="font-bold text-gray-900">{selectedApp.course}</span>
                  </div>
                  {selectedApp.enrolledCollege && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Enrolled College:</span>
                      <span className="font-bold text-primary-700">{selectedApp.enrolledCollege}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">{selectedApp.type === 'scholarship' ? 'Scholarship Grant Value:' : 'Annual Tuition Fee:'}</span>
                    <span className="font-bold text-emerald-600">{selectedApp.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current Status:</span>
                    <span className="badge bg-primary-100 text-primary-800 font-bold">{selectedApp.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Submission Date:</span>
                    <span className="font-medium text-gray-700">{selectedApp.date}</span>
                  </div>
                </div>

                <div className="border rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-primary-700">Applicant Details</h4>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Candidate Full Name:</span>
                    <span className="font-semibold text-gray-800">{selectedApp.applicantName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Email Address:</span>
                    <span className="font-semibold text-gray-800">{selectedApp.applicantEmail}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Contact Number:</span>
                    <span className="font-semibold text-gray-800">{selectedApp.applicantPhone}</span>
                  </div>
                  {selectedApp.income && (
                    <div className="flex justify-between py-1 border-b border-gray-100">
                      <span className="text-gray-500">Declared Family Income:</span>
                      <span className="font-semibold text-gray-800">{selectedApp.income}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">TG EAPCET / Rank:</span>
                    <span className="font-bold text-emerald-600">Rank #{selectedApp.eamcetRank || 'N/A'}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-primary-700 mb-2">Attached Verification Documents</h4>
                  <div className="space-y-1.5">
                    {selectedApp.documents?.map((doc, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-200">
                        <span>📄</span>
                        <span className="font-medium">{doc}</span>
                      </div>
                    )) || <div className="text-xs text-gray-400">No documents attached yet.</div>}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    setIsUploadModalOpen(true);
                  }}
                  className="btn-primary text-xs py-2 px-4"
                >
                  Upload More Documents
                </button>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Document Upload */}
      <AnimatePresence>
        {isUploadModalOpen && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full p-6"
            >
              <div className="flex items-start justify-between border-b pb-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Upload Verification Documents</h3>
                  <p className="text-xs text-gray-500">For {selectedApp.university}</p>
                </div>
                <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Income Certificate (Issued by MRO/Tahsildar)', icon: '📜' },
                  { name: 'TG EAPCET Official Rank Card', icon: '🏆' },
                  { name: 'Intermediate / 12th Marks Sheet', icon: '📝' },
                  { name: 'Aadhaar / Government Identity Card', icon: '🪪' },
                  { name: 'College Admission / Fee Receipt', icon: '🧾' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-gray-800">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    <button
                      onClick={() => handleDocumentUpload(item.name)}
                      className="btn-primary text-xs py-1 px-3 shadow-none"
                    >
                      Upload
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t flex justify-end">
                <button onClick={() => setIsUploadModalOpen(false)} className="btn-secondary text-xs py-2 px-4">
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: Direct Apply to College */}
      <AnimatePresence>
        {isNewCollegeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b pb-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Apply to Telangana College</h3>
                  <p className="text-xs text-gray-500">Submit an admission application to any college in Telangana</p>
                </div>
                <button onClick={() => setIsNewCollegeModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateCollegeApplication} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Select College / University:</label>
                  <select
                    value={selectedCollegeId}
                    onChange={(e) => {
                      setSelectedCollegeId(e.target.value);
                      const matched = detailedCollegesDatabase[e.target.value];
                      if (matched?.courses?.[0]) setSelectedCourse(matched.courses[0].name);
                    }}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary-500 bg-white"
                  >
                    {telanganaColleges.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.type} - {c.location})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Degree Program / Course:</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-primary-500 bg-white"
                  >
                    {availableCourses.map((crs) => (
                      <option key={crs} value={crs}>
                        {crs}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-primary-50 rounded-xl border border-primary-200 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selected College:</span>
                    <span className="font-bold text-primary-900">{activeCollege.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuition Fee:</span>
                    <span className="font-bold text-primary-900">{activeCollege.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected EAMCET Cutoff:</span>
                    <span className="font-bold text-primary-900">Rank ~{activeCollege.eamcetCutoff}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Candidate Full Name:</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">TG EAPCET Rank:</label>
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
                    onClick={() => setIsNewCollegeModalOpen(false)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs py-2 px-5 font-bold shadow-md">
                    Submit Admission Application
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 4: Direct Apply to Scholarship */}
      <AnimatePresence>
        {isNewScholarshipModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b pb-3 mb-4">
                <div>
                  <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded mb-1">
                    <span>🎓</span>
                    <span>Official Scholarship Application</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{scholarshipName}</h3>
                  <p className="text-xs text-gray-500">Provider: {scholarshipProvider} • Benefit: {scholarshipAmount}</p>
                </div>
                <button onClick={() => setIsNewScholarshipModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateScholarshipApplication} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Scholarship Scheme:</label>
                  <input
                    type="text"
                    required
                    value={scholarshipName}
                    onChange={(e) => setScholarshipName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Provider Agency:</label>
                    <input
                      type="text"
                      required
                      value={scholarshipProvider}
                      onChange={(e) => setScholarshipProvider(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Grant / Scholarship Amount:</label>
                    <input
                      type="text"
                      required
                      value={scholarshipAmount}
                      onChange={(e) => setScholarshipAmount(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Enrolled College in Telangana:</label>
                  <select
                    value={enrolledCollege}
                    onChange={(e) => setEnrolledCollege(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {telanganaColleges.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Applicant Name:</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Annual Family Income:</label>
                    <input
                      type="text"
                      required
                      value={familyIncome}
                      onChange={(e) => setFamilyIncome(e.target.value)}
                      placeholder="e.g. ₹3.5 Lakhs"
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-500"
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
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number:</label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsNewScholarshipModalOpen(false)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs py-2 px-5 font-bold shadow-md bg-emerald-600 hover:bg-emerald-700"
                  >
                    Submit Scholarship Application
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

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">Loading Applications Desk...</div>}>
      <ApplicationsContent />
    </Suspense>
  );
}
