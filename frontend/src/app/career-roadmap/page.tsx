'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const careerPaths = [
  {
    career: 'Software Engineer',
    skills: ['Python', 'Java', 'JavaScript', 'SQL', 'Git', 'REST APIs', 'Docker', 'Kubernetes'],
    timeline: [
      { month: 0, title: 'Fundamentals', tasks: ['Learn Python', 'Data Structures', 'Algorithms'] },
      { month: 3, title: 'Web Development', tasks: ['HTML/CSS', 'JavaScript', 'React'] },
      { month: 6, title: 'Backend', tasks: ['Node.js', 'Databases', 'APIs'] },
      { month: 9, title: 'DevOps', tasks: ['Docker', 'CI/CD', 'Cloud'] },
      { month: 12, title: 'Advanced', tasks: ['System Design', 'Microservices', 'Scaling'] },
    ],
    salary: { year1: 8, year3: 15, year5: 25 },
  },
  {
    career: 'Data Scientist',
    skills: ['Python', 'R', 'SQL', 'ML', 'Statistics', 'Tableau', 'TensorFlow', 'Spark'],
    timeline: [
      { month: 0, title: 'Math & Stats', tasks: ['Linear Algebra', 'Probability', 'Statistics'] },
      { month: 3, title: 'Python & SQL', tasks: ['Python', 'Pandas', 'SQL'] },
      { month: 6, title: 'ML Basics', tasks: ['Supervised Learning', 'Unsupervised Learning'] },
      { month: 9, title: 'Deep Learning', tasks: ['Neural Networks', 'TensorFlow', 'NLP'] },
      { month: 12, title: 'Projects', tasks: ['Real-world Projects', 'Kaggle', 'Portfolio'] },
    ],
    salary: { year1: 10, year3: 18, year5: 28 },
  },
];

export default function CareerRoadmapPage() {
  const [selectedCareer, setSelectedCareer] = useState(0);
  const career = careerPaths[selectedCareer];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Roadmap</h1>
        <p className="text-gray-600 mb-8">Personalized learning paths for your career goals</p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {careerPaths.map((c, i) => (
            <motion.button
              key={i}
              onClick={() => setSelectedCareer(i)}
              whileHover={{ scale: 1.02 }}
              className={`card cursor-pointer transition-all ${selectedCareer === i ? 'ring-2 ring-primary-600 bg-primary-50' : ''}`}
            >
              <h3 className="font-semibold text-lg">{c.career}</h3>
              <div className="mt-3 text-sm text-gray-600">
                <div className="mb-2">Skills: {c.skills.length}</div>
                <div>Salary: ₹{c.salary.year1}L → ₹{c.salary.year5}L</div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="card mb-8">
          <h3 className="font-semibold mb-4">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {career.skills.map(skill => (
              <span key={skill} className="badge bg-blue-50 text-blue-700 border border-blue-200">{skill}</span>
            ))}
          </div>
        </div>

        <div className="card mb-8">
          <h3 className="font-semibold mb-4">Salary Progression</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded text-center">
              <div className="text-2xl font-bold text-blue-700">₹{career.salary.year1}L</div>
              <div className="text-sm text-gray-600">Year 1</div>
            </div>
            <div className="bg-purple-50 p-4 rounded text-center">
              <div className="text-2xl font-bold text-purple-700">₹{career.salary.year3}L</div>
              <div className="text-sm text-gray-600">Year 3</div>
            </div>
            <div className="bg-green-50 p-4 rounded text-center">
              <div className="text-2xl font-bold text-green-700">₹{career.salary.year5}L</div>
              <div className="text-sm text-gray-600">Year 5</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">12-Month Learning Timeline</h3>
          {career.timeline.map((phase, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="card">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-600 text-white font-bold">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Month {phase.month}: {phase.title}</h4>
                  <ul className="mt-2 space-y-1">
                    {phase.tasks.map(task => (
                      <li key={task} className="text-sm text-gray-600 flex items-center space-x-2">
                        <span>✓</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
