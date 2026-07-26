'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, removeFromCompare, clearCompare } from '@/store/store';
import { motion } from 'framer-motion';

export default function ComparePage() {
  const { universities } = useSelector((state: RootState) => state.compare);
  const dispatch = useDispatch();

  const parameters = [
    { key: 'ranking', label: 'Ranking' }, { key: 'avgPackage', label: 'Avg Package' },
    { key: 'fees', label: 'Fees/yr' }, { key: 'rating', label: 'Rating' },
    { key: 'type', label: 'Type' }, { key: 'courses', label: 'Courses' },
  ];

  if (universities.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Compare Universities</h1>
        <p className="text-gray-600 mb-8">Add universities from the search page to compare them side by side</p>
        <a href="/universities" className="btn-primary">Browse Universities</a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Compare Universities</h1>
            <p className="text-gray-600 mt-1">Side-by-side comparison of {universities.length} institutions</p>
          </div>
          <button onClick={() => dispatch(clearCompare())} className="btn-danger text-sm">Clear All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 bg-gray-50 border-b-2 border-gray-200 min-w-[150px]">Parameter</th>
                {universities.map((u) => (
                  <th key={u.id} className="p-4 bg-gray-50 border-b-2 border-gray-200 text-center min-w-[200px]">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center font-bold text-primary-700">
                        {u.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-sm">{u.name}</div>
                        <div className="text-xs text-gray-500">{(u as any).location}</div>
                      </div>
                      <button onClick={() => dispatch(removeFromCompare(u.id))} className="text-red-400 hover:text-red-600 ml-2">
                        ✕
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parameters.map((param, i) => (
                <tr key={param.key} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-4 font-medium text-gray-700 border-b">{param.label}</td>
                  {universities.map((u: any) => (
                    <td key={u.id} className="p-4 text-center border-b">
                      <span className="font-semibold">
                        {param.key === 'rating' ? `★ ${u[param.key]}` : u[param.key]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 card">
          <h3 className="font-semibold text-lg mb-4">AI Recommendation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Best for Budget', 'Best for Placement', 'Best for Research', 'Overall Score'].map((category) => {
              const winner = universities[0];
              return (
                <div key={category} className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{category}</div>
                  <div className="font-bold text-primary-700">{winner?.name?.charAt(0) || '-'}</div>
                  <div className="text-xs text-gray-500">{winner?.name || '-'}</div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
