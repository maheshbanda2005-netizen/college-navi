'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { telanganaColleges, detailedCollegesDatabase } from '@/data/collegesData';
import toast from 'react-hot-toast';

export interface ApplicationItem {
  id: string;
  university: string;
  universityId: string;
  location: string;
  course: string;
  fees: string;
  status: 'Submitted' | 'Document Verification' | 'Review' | 'Interview' | 'Selected' | 'Admitted';
  date: string;
  color: string;
  progress: number;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  eamcetRank?: string;
  documents?: string[];
}

const defaultApplications: ApplicationItem[] = [
  {
    id: 'APP-MRCE-2026-0819',
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
];

const statusFlow: ApplicationItem['status'][] = [
  'Submitted',
  'Document Verification',
  'Review',
  'Interview',
  'Selected',
  'Admitted',
];

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  // Modals state
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);
  
  // New application form state
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>('17');
  const [selectedCourse, setSelectedCourse] = useState<string>('B.Tech Computer Science & Engineering');
  const [applicantName, setApplicantName] = useState<string>('Mahesh Kumar');
  const [applicantEmail, setApplicantEmail] = useState<string>('mahesh.student@example.com');
  const [applicantPhone, setApplicantPhone] = useState<string>('+91 98765 43210');
  const [eamcetRank, setEamcetRank] = useState<string>('18450');

  // Load applications from localStorage or defaults
  useEffect(() => {
    try {
      const stored = localStorage.getItem('edunavigator_applications');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setApplications(parsed);
          return;
        }
      }
      setApplications(defaultApplications);
      localStorage.setItem('edunavigator_applications', JSON.stringify(defaultApplications));
    } catch {
      setApplications(defaultApplications);
    }
  }, []);

  const saveApplications = (updated: ApplicationItem[]) => {
    setApplications(updated);
    try {
      localStorage.setItem('edunavigator_applications', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateNewApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const college = telanganaColleges.find((c) => c.id === selectedCollegeId) || telanganaColleges[0];
    const newApp: ApplicationItem = {
      id: `APP-${college.name.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
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
      documents: ['Application Form (Submitted)'],
    };

    const updated = [newApp, ...applications];
    saveApplications(updated);
    setIsNewAppModalOpen(false);
    toast.success(`Application submitted to ${college.name} successfully! ID: ${newApp.id}`);
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

  const filtered = filterStatus === 'All'
    ? applications
    : applications.filter((a) => a.status === filterStatus);

  const activeCollege = telanganaColleges.find((c) => c.id === selectedCollegeId) || telanganaColleges[0];
  const detailedCollege = detailedCollegesDatabase[selectedCollegeId];
  const availableCourses = detailedCollege?.courses?.map((c) => c.name) || [
    'B.Tech Computer Science & Engineering',
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
                <span>Official Admissions Portal</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My University Applications</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage, submit, and track live admission applications for Telangana colleges and universities.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsNewAppModalOpen(true)}
                className="btn-primary text-sm py-2.5 px-5 shadow-sm font-semibold flex items-center space-x-2"
              >
                <span>➕ Apply to Another College</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="card bg-white border border-gray-200 py-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">Total Applications</div>
            </div>
            <div className="card bg-amber-50/70 border border-amber-200 py-4 text-center">
              <div className="text-2xl font-bold text-amber-700">
                {applications.filter((a) => a.status === 'Review' || a.status === 'Document Verification' || a.status === 'Submitted').length}
              </div>
              <div className="text-xs text-amber-700 mt-1 font-semibold">Under Evaluation</div>
            </div>
            <div className="card bg-emerald-50/70 border border-emerald-200 py-4 text-center">
              <div className="text-2xl font-bold text-emerald-700">
                {applications.filter((a) => a.status === 'Selected' || a.status === 'Admitted').length}
              </div>
              <div className="text-xs text-emerald-700 mt-1 font-semibold">Selected / Admitted</div>
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
          {filtered.length === 0 ? (
            <div className="card text-center py-16 bg-white border border-gray-200">
              <div className="text-5xl mb-3">📭</div>
              <h3 className="text-lg font-bold text-gray-800">No applications found in this category</h3>
              <p className="text-sm text-gray-500 mt-1 mb-6">You have not submitted any applications matching the selected filter.</p>
              <button onClick={() => setIsNewAppModalOpen(true)} className="btn-primary text-sm py-2 px-6">
                Submit New Application
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((app) => {
                const currentIdx = statusFlow.indexOf(app.status);
                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card bg-white border border-gray-200 hover:shadow-md transition-shadow p-6"
                  >
                    {/* Top Row: College & Status */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-2">
                      <div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => router.push(`/universities/${app.universityId}`)}
                            className="font-bold text-lg md:text-xl text-gray-900 hover:text-primary-600 transition-colors text-left"
                          >
                            {app.university}
                          </button>
                          <span className={`badge border text-xs font-bold py-0.5 px-2.5 rounded-full ${app.color}`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                          📍 {app.location} &nbsp;|&nbsp; <strong className="text-gray-700">{app.course}</strong> &nbsp;|&nbsp; Tuition: <span className="font-semibold text-primary-600">{app.fees}</span>
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
                        <span>Application Lifecycle Progress:</span>
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
                        <span>Allotment</span>
                        <span>Admitted</span>
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
                        <button
                          onClick={() => router.push(`/universities/${app.universityId}`)}
                          className="btn-secondary text-xs py-1.5 px-3 font-semibold text-primary-700 hover:bg-primary-50"
                        >
                          🏛️ College Overview
                        </button>
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
                  <p className="text-xs text-gray-500">📍 {selectedApp.location}</p>
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
                    <span className="text-gray-500">Selected Degree Program:</span>
                    <span className="font-bold text-gray-900">{selectedApp.course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Annual Tuition Fee:</span>
                    <span className="font-bold text-primary-600">{selectedApp.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current Admission Status:</span>
                    <span className="badge bg-primary-100 text-primary-800 font-bold">{selectedApp.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Application Date:</span>
                    <span className="font-medium text-gray-700">{selectedApp.date}</span>
                  </div>
                </div>

                <div className="border rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-primary-700">Applicant Details</h4>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Full Name:</span>
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
                  <h3 className="text-lg font-bold text-gray-900">Upload Admission Documents</h3>
                  <p className="text-xs text-gray-500">For {selectedApp.university}</p>
                </div>
                <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Intermediate / 12th Standard Marksheet', icon: '📝' },
                  { name: 'TG EAPCET Official Rank Card', icon: '🏆' },
                  { name: 'Transfer Certificate (TC)', icon: '📜' },
                  { name: 'Aadhaar / Government ID Proof', icon: '🪪' },
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

      {/* MODAL 3: Apply to New College */}
      <AnimatePresence>
        {isNewAppModalOpen && (
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
                  <p className="text-xs text-gray-500">Submit an application to any college in Telangana</p>
                </div>
                <button onClick={() => setIsNewAppModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateNewApplication} className="space-y-4 text-sm">
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
                    onClick={() => setIsNewAppModalOpen(false)}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs py-2 px-5 font-bold shadow-md">
                    Submit Application
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
