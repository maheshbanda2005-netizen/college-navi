'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockTests, MockTest, getRankEstimate, generateStudentTest } from '@/data/mockTests';
import toast from 'react-hot-toast';

type View = 'select' | 'quiz' | 'result';

const exams = ['All', 'TG EAPCET', 'JEE Main', 'General'];

interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  rollNumber: string;
}

const presetStudents: StudentProfile[] = [
  { id: 'STU-TS-01', name: 'Mahesh (Candidate 1)', avatar: '👨‍🎓', rollNumber: '24EAP001' },
  { id: 'STU-TS-02', name: 'Rahul Sharma (Candidate 2)', avatar: '🧑‍💻', rollNumber: '24EAP002' },
  { id: 'STU-TS-03', name: 'Ananya Reddy (Candidate 3)', avatar: '👩‍🎓', rollNumber: '24EAP003' },
  { id: 'STU-TS-04', name: 'Sravan Kumar (Candidate 4)', avatar: '👨‍🔬', rollNumber: '24EAP004' },
];

export default function MockTestsPage() {
  const [view, setView] = useState<View>('select');
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedExam, setSelectedExam] = useState('All');
  
  // Student personalization state
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(presetStudents[0]);
  const [customName, setCustomName] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [generationSeedOffset, setGenerationSeedOffset] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (view === 'quiz' && timeLeft > 0 && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    };
  }, [view, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && view === 'quiz') {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      setView('result');
    }
  }, [timeLeft, view]);

  const startTest = (baseTest: MockTest, extraSeed: number = 0) => {
    const studentName = isCustomMode && customName.trim() ? customName.trim() : currentStudent.name;
    const studentId = isCustomMode ? `STU-CUSTOM-${Date.now().toString().slice(-4)}` : currentStudent.id;
    const seedWithOffset = `${studentId}-${generationSeedOffset + extraSeed}`;

    // Generate a strictly personalized test paper unique to this student!
    const personalizedTest = generateStudentTest(baseTest, seedWithOffset, studentName);
    
    setActiveTest(personalizedTest);
    setAnswers({});
    setCurrentQuestion(0);
    setTimeLeft(baseTest.duration * 60);
    setView('quiz');
    toast.success(`Generated unique test paper for ${studentName} (${personalizedTest.paperSetCode})`);
  };

  const selectAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const finishQuiz = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setView('result');
  }, []);

  const filteredTests = selectedExam === 'All' ? mockTests : mockTests.filter((t) => t.exam === selectedExam);
  const score = activeTest ? activeTest.questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0) : 0;
  const percent = activeTest && activeTest.questions.length > 0 ? Math.round((score / activeTest.questions.length) * 100) : 0;
  const rankInfo = activeTest ? getRankEstimate(activeTest, score) : { rank: 0, percentile: 0 };
  const answeredCount = activeTest ? Object.keys(answers).length : 0;
  const mm = Math.floor(timeLeft / 60);
  const ss = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <AnimatePresence mode="wait">
        {view === 'select' && (
          <motion.div key="select" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 via-primary-950 to-indigo-950 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm mb-5 border border-white/20">
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                    Student-Adaptive Assessment Engine Active
                  </div>
                  <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    Personalized Mock Tests & <span className="text-primary-400">Rank Predictor</span>
                  </h1>
                  <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Unlike standard exams where all students get identical papers, EduNavigator dynamically samples unique 
                    question subsets, randomized question sequencing, and shuffled answer choices per student!
                  </p>
                </motion.div>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
              {/* Candidate Switcher Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200/80 p-5 md:p-6 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">👤</span>
                      <h2 className="text-lg font-bold text-gray-900">Select Test Candidate / Student Profile</h2>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      Choose different students to verify that each student gets a <strong className="text-primary-600">completely distinct test paper</strong> with different questions and order.
                    </p>
                  </div>

                  {/* Anti-Cheating badge */}
                  <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-800 text-xs font-semibold self-start lg:self-auto">
                    <span>🛡️</span>
                    <span>Different Test Per Person Active</span>
                  </div>
                </div>

                {/* Candidate Selection Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
                  {presetStudents.map((stu) => {
                    const isSelected = !isCustomMode && currentStudent.id === stu.id;
                    return (
                      <button
                        key={stu.id}
                        onClick={() => {
                          setIsCustomMode(false);
                          setCurrentStudent(stu);
                          toast.success(`Switched candidate to ${stu.name}`);
                        }}
                        className={`p-3 rounded-xl text-left border transition-all flex items-center space-x-3 ${
                          isSelected
                            ? 'bg-primary-50/80 border-primary-600 shadow-sm ring-2 ring-primary-500/20'
                            : 'bg-gray-50/50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-2xl">{stu.avatar}</span>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-gray-900 truncate">{stu.name.split(' ')[0]}</div>
                          <div className="text-[10px] text-gray-500 font-mono">{stu.rollNumber}</div>
                        </div>
                      </button>
                    );
                  })}

                  {/* Custom Candidate Option */}
                  <button
                    onClick={() => {
                      setIsCustomMode(true);
                    }}
                    className={`p-3 rounded-xl text-left border transition-all flex items-center space-x-3 ${
                      isCustomMode
                        ? 'bg-primary-50/80 border-primary-600 shadow-sm ring-2 ring-primary-500/20'
                        : 'bg-gray-50/50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-2xl">✍️</span>
                    <div>
                      <div className="font-bold text-xs text-gray-900">Custom Student</div>
                      <div className="text-[10px] text-gray-500">Enter Name</div>
                    </div>
                  </button>
                </div>

                {isCustomMode && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Enter Student / Candidate Name..."
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="input-field flex-1 text-sm py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={() => {
                        if (!customName.trim()) { toast.error('Please enter a candidate name'); return; }
                        toast.success(`Custom candidate set: ${customName}`);
                      }}
                      className="btn-primary text-xs py-2 px-4 whitespace-nowrap"
                    >
                      Save Candidate Profile
                    </button>
                  </motion.div>
                )}

                {/* Live Candidate Paper Status */}
                <div className="mt-4 p-3 bg-gray-50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border border-gray-200/60">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-700">Currently Active Candidate:</span>
                    <span className="bg-primary-100 text-primary-800 font-bold px-2 py-0.5 rounded">
                      {isCustomMode && customName.trim() ? customName : currentStudent.name}
                    </span>
                    <span className="text-gray-400 font-mono">({isCustomMode ? 'CUSTOM-ID' : currentStudent.id})</span>
                  </div>
                  <button
                    onClick={() => {
                      setGenerationSeedOffset((prev) => prev + 1);
                      toast.success('Rerolled randomizer seed! Next test will have a fresh permutation.');
                    }}
                    className="text-primary-600 hover:text-primary-800 font-semibold flex items-center space-x-1"
                  >
                    <span>🔀 Reroll Question Shuffle Seed</span>
                  </button>
                </div>
              </div>

              {/* Exam Category Filter */}
              <div className="flex flex-wrap gap-2.5 mb-8 justify-center">
                {exams.map((exam) => (
                  <button
                    key={exam}
                    onClick={() => setSelectedExam(exam)}
                    className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${
                      selectedExam === exam
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-400 hover:text-primary-600'
                    }`}
                  >
                    {exam === 'All' ? '📚 All Exams' : exam}
                  </button>
                ))}
              </div>

              {/* Available Tests Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.map((test) => (
                  <motion.div
                    key={test.id}
                    whileHover={{ y: -4 }}
                    className="card hover:shadow-xl transition-all border border-gray-200/90 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${test.color} flex items-center justify-center text-2xl shadow-md`}>
                            {test.icon}
                          </div>
                          <div>
                            <span className="badge bg-primary-50 text-primary-700 text-xs font-bold border border-primary-200">
                              {test.exam}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 mt-1">{test.subject}</h3>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          ⏱️ {test.duration} mins
                        </span>
                      </div>

                      <p className="text-xs md:text-sm text-gray-600 mb-4 leading-relaxed">
                        Complete 10 randomized multiple-choice questions. Generated uniquely for the active student profile.
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4 bg-gray-50 p-2.5 rounded-lg">
                        <div>📝 Questions: <span className="font-bold text-gray-800">10 Questions</span></div>
                        <div>👥 Tested by: <span className="font-bold text-gray-800">{(test.totalCandidates / 1000).toFixed(0)}K</span></div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <button
                        onClick={() => startTest(test)}
                        className="w-full btn-primary text-sm py-2.5 flex items-center justify-center space-x-2 shadow-sm font-semibold"
                      >
                        <span>Start Unique Test for {isCustomMode && customName.trim() ? customName.split(' ')[0] : currentStudent.name.split(' ')[0]}</span>
                        <span>→</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Quiz View */}
        {view === 'quiz' && activeTest && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header with Candidate Banner */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeTest.color} flex items-center justify-center text-xl text-white shadow`}>
                    {activeTest.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base md:text-lg">
                      {activeTest.exam} - {activeTest.subject}
                    </h2>
                    <div className="flex items-center space-x-2 text-xs mt-0.5">
                      <span className="font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-200">
                        👤 Candidate: {activeTest.studentName}
                      </span>
                      <span className="font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        📋 {activeTest.paperSetCode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center space-x-3 self-end md:self-auto">
                  <div className={`px-4 py-2 rounded-xl text-center font-mono font-bold text-lg border ${
                    timeLeft < 120 ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' : 'bg-gray-50 text-gray-800 border-gray-200'
                  }`}>
                    ⏱️ {String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}
                  </div>
                  <button onClick={finishQuiz} className="btn-secondary text-xs py-2 px-3">
                    Finish Test
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 font-medium mb-1.5">
                  <span>Question {currentQuestion + 1} of {activeTest.questions.length}</span>
                  <span>{answeredCount} of {activeTest.questions.length} Answered</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / activeTest.questions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Current Question Card */}
            <div className="card shadow-lg border border-gray-200/80 p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                    Question #{currentQuestion + 1} &nbsp;•&nbsp; {activeTest.questions[currentQuestion].topic || activeTest.subject}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 leading-relaxed">
                    {activeTest.questions[currentQuestion].question}
                  </h3>
                </div>
                <span className="badge bg-blue-50 text-blue-700 border border-blue-200 text-xs shrink-0">
                  Single Choice
                </span>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {activeTest.questions[currentQuestion].options.map((option, idx) => {
                  const isSelected = answers[currentQuestion] === idx;
                  const optionLetters = ['A', 'B', 'C', 'D'];
                  return (
                    <button
                      key={idx}
                      onClick={() => selectAnswer(idx)}
                      className={`w-full p-4 rounded-xl text-left transition-all flex items-center space-x-4 border ${
                        isSelected
                          ? 'bg-primary-50/80 border-primary-600 text-primary-900 shadow-sm ring-2 ring-primary-500/20'
                          : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {optionLetters[idx]}
                      </span>
                      <span className="text-sm md:text-base font-medium flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Question Navigation Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <button
                  onClick={() => setCurrentQuestion((q) => Math.max(0, q - 1))}
                  disabled={currentQuestion === 0}
                  className="btn-secondary text-xs md:text-sm py-2 px-4 disabled:opacity-40"
                >
                  ← Previous
                </button>

                {/* Quick Question Pallet Bubbles */}
                <div className="hidden sm:flex items-center space-x-1.5 overflow-x-auto max-w-xs">
                  {activeTest.questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQuestion(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                        currentQuestion === i
                          ? 'ring-2 ring-primary-600 font-bold bg-primary-100 text-primary-800'
                          : answers[i] !== undefined
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                {currentQuestion < activeTest.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestion((q) => q + 1)}
                    className="btn-primary text-xs md:text-sm py-2 px-5"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={finishQuiz}
                    className="btn-accent bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm py-2 px-5 font-bold shadow-md"
                  >
                    Submit Test
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Result View */}
        {view === 'result' && activeTest && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="card p-6 md:p-10 text-center mb-6 shadow-xl border border-gray-200">
              {/* Candidate Info Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-800 border border-primary-200 px-3 py-1.5 rounded-full text-xs font-bold mb-6">
                <span>👤 Candidate: {activeTest.studentName}</span>
                <span>•</span>
                <span>{activeTest.paperSetCode}</span>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-br ${activeTest.color} flex items-center justify-center text-4xl font-extrabold text-white mb-6 shadow-xl`}
              >
                {percent}%
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {percent >= 80 ? '🏆 Outstanding Performance!' : percent >= 60 ? '🎉 Good Score!' : percent >= 40 ? '💪 Keep Practicing!' : '📚 Keep Learning!'}
              </h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Candidate <span className="font-bold text-gray-900">{activeTest.studentName}</span> scored <span className="font-bold text-primary-600">{score} out of {activeTest.questions.length}</span> in {activeTest.exam} {activeTest.subject}.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-emerald-700">{score}</div>
                  <div className="text-xs text-emerald-600 mt-1 font-semibold">Correct Answers</div>
                </div>
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-rose-600">{activeTest.questions.length - score}</div>
                  <div className="text-xs text-rose-500 mt-1 font-semibold">Incorrect / Skipped</div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-700">#{rankInfo.rank.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-blue-600 mt-1 font-semibold">Estimated State Rank</div>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-700">{rankInfo.percentile}%</div>
                  <div className="text-xs text-purple-600 mt-1 font-semibold">Percentile Score</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => startTest(activeTest, 1)}
                  className="btn-primary px-6 py-2.5 font-semibold text-sm shadow-md"
                >
                  🔄 Retake with New Random Test Set
                </button>
                <button
                  onClick={() => setView('select')}
                  className="btn-secondary px-6 py-2.5 font-semibold text-sm"
                >
                  ← Select Another Subject / Candidate
                </button>
              </div>
            </div>

            {/* Answer Explanations */}
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <span>📖</span>
              <span>Detailed Question Review & Explanations</span>
            </h3>
            <div className="space-y-4">
              {activeTest.questions.map((q, i) => {
                const isCorrect = answers[i] === q.answer;
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`card border-l-4 ${isCorrect ? 'border-l-emerald-500 bg-white' : 'border-l-rose-400 bg-white'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-semibold text-gray-900 text-sm md:text-base">
                        <span className={isCorrect ? 'text-emerald-600' : 'text-rose-500'}>{isCorrect ? '✓' : '✗'}</span>{' '}
                        {q.question}
                      </p>
                      <span className="badge bg-gray-100 text-gray-600 shrink-0 text-xs font-bold">Q{i + 1}</span>
                    </div>
                    <div className="mt-3 space-y-1.5 text-sm">
                      <p className="text-emerald-700 font-medium">✅ Correct Answer: {q.options[q.answer]}</p>
                      {!isCorrect && answers[i] !== undefined && (
                        <p className="text-rose-600 font-medium">❌ Your Selected Option: {q.options[answers[i]]}</p>
                      )}
                      {answers[i] === undefined && (
                        <p className="text-amber-600 font-medium">⚠️ Question was not attempted</p>
                      )}
                      <p className="text-gray-600 text-xs mt-2 leading-relaxed bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                        💡 <strong className="text-gray-700">Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}