'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockTests, MockTest, getRankEstimate } from '@/data/mockTests';

type View = 'select' | 'quiz' | 'result';

const exams = ['All', 'TG EAPCET', 'JEE Main', 'NEET', 'General'];

export default function MockTestsPage() {
  const [view, setView] = useState<View>('select');
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedExam, setSelectedExam] = useState('All');
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

  const startTest = (test: MockTest) => {
    setActiveTest(test);
    setAnswers({});
    setCurrentQuestion(0);
    setTimeLeft(test.duration * 60);
    setView('quiz');
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
  const percent = activeTest ? Math.round((score / activeTest.questions.length) * 100) : 0;
  const rankInfo = activeTest ? getRankEstimate(activeTest, score) : { rank: 0, percentile: 0 };
  const answeredCount = activeTest ? Object.keys(answers).length : 0;
  const mm = Math.floor(timeLeft / 60);
  const ss = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {view === 'select' && (
          <motion.div key="select" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <section className="bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/20">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    Practice & Rank Estimation
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Mock Tests & <span className="gradient-text-sweep gradient-text-animate">Quizzes</span>
                  </h1>
                  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    Practice subject-wise mock tests for TG EAPCET, JEE Main and NEET. Get instant scores,
                    explanations, and estimated ranks to know where you stand.
                  </p>
                </motion.div>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-wrap gap-3 mb-8 justify-center">
                {exams.map((exam) => (
                  <button
                    key={exam}
                    onClick={() => setSelectedExam(exam)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedExam === exam
                        ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-400 hover:text-primary-600'
                    }`}
                  >
                    {exam === 'All' ? '📚 All Exams' : exam}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.map((test, i) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="card group hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${test.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                        {test.icon}
                      </div>
                      <span className="badge-primary">{test.exam}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{test.subject}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span>📝 {test.questions.length} Questions</span>
                      <span>⏱️ {test.duration} min</span>
                    </div>
                    <button onClick={() => startTest(test)} className="btn-primary mt-auto w-full">
                      Start Test
                    </button>
                  </motion.div>
                ))}
              </div>

              {filteredTests.length === 0 && (
                <div className="card text-center py-12">
                  <p className="text-gray-500">No tests available for this exam yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {view === 'quiz' && activeTest && (
          <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="card p-6 md:p-8">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{activeTest.exam} — {activeTest.subject}</h2>
                  <p className="text-sm text-gray-500 mt-1">Question {currentQuestion + 1} of {activeTest.questions.length}</p>
                </div>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono font-bold text-lg ${timeLeft <= 60 ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-700'}`}>
                  ⏱️ {mm}:{ss.toString().padStart(2, '0')}
                </div>
              </div>

              <div className="h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  animate={{ width: `${((currentQuestion + 1) / activeTest.questions.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
                    {activeTest.questions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {activeTest.questions[currentQuestion].options.map((option, idx) => {
                      const selected = answers[currentQuestion] === idx;
                      const letter = String.fromCharCode(65 + idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => selectAnswer(idx)}
                          className={`w-full text-left flex items-center space-x-4 p-4 rounded-xl border-2 transition-all ${
                            selected
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${selected ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                            {letter}
                          </span>
                          <span className={`font-medium ${selected ? 'text-primary-700' : 'text-gray-700'}`}>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setCurrentQuestion((q) => Math.max(0, q - 1))}
                  disabled={currentQuestion === 0}
                  className="btn-secondary text-sm px-5 py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <div className="flex items-center space-x-2">
                  {answeredCount < activeTest.questions.length && (
                    <span className="text-xs text-gray-500 mr-2">{answeredCount}/{activeTest.questions.length} answered</span>
                  )}
                  {currentQuestion < activeTest.questions.length - 1 ? (
                    <button onClick={() => setCurrentQuestion((q) => q + 1)} className="btn-primary text-sm px-5 py-2">
                      Next →
                    </button>
                  ) : (
                    <button onClick={finishQuiz} className="btn-accent text-sm px-5 py-2">
                      Submit Test
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'result' && activeTest && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="card p-6 md:p-10 text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-br ${activeTest.color} flex items-center justify-center text-4xl font-extrabold text-white mb-6 shadow-xl`}
              >
                {percent}%
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {percent >= 80 ? '🏆 Outstanding!' : percent >= 60 ? '🎉 Great Job!' : percent >= 40 ? '💪 Keep Practicing!' : '📚 Keep Learning!'}
              </h2>
              <p className="text-gray-600 mb-6">
                You scored <span className="font-bold text-primary-600">{score}/{activeTest.questions.length}</span> in {activeTest.exam} {activeTest.subject}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-gray-900">{score}</div>
                  <div className="text-xs text-gray-500 mt-1">Correct</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-red-500">{activeTest.questions.length - score}</div>
                  <div className="text-xs text-gray-500 mt-1">Incorrect</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-700">#{rankInfo.rank.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-blue-600 mt-1">Est. Rank</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-700">{rankInfo.percentile}%</div>
                  <div className="text-xs text-green-600 mt-1">Est. Percentile</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => startTest(activeTest)} className="btn-primary px-6">
                  🔄 Retake Test
                </button>
                <button onClick={() => setView('select')} className="btn-secondary px-6">
                  ← All Tests
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4">📖 Review Answers</h3>
            <div className="space-y-4">
              {activeTest.questions.map((q, i) => {
                const isCorrect = answers[i] === q.answer;
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`card border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-400'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-gray-900">
                        <span className={isCorrect ? 'text-green-600' : 'text-red-500'}>{isCorrect ? '✓' : '✗'}</span>{' '}
                        {q.question}
                      </p>
                      <span className="badge bg-gray-100 text-gray-600 shrink-0">{i + 1}</span>
                    </div>
                    <div className="mt-3 space-y-1 text-sm">
                      <p className="text-green-700">✅ Correct: {q.options[q.answer]}</p>
                      {!isCorrect && answers[i] !== undefined && (
                        <p className="text-red-500">❌ Your answer: {q.options[answers[i]]}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-2 leading-relaxed">💡 {q.explanation}</p>
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