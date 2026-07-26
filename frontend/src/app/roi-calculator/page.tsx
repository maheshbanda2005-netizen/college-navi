'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const colleges = [
  { name: 'IIT Hyderabad', totalFees: 8.8, avgPackage: 24, placementRate: 96, roiScore: 88, breakEvenYears: 0.4 },
  { name: 'IIIT Hyderabad', totalFees: 8.0, avgPackage: 28, placementRate: 98, roiScore: 94, breakEvenYears: 0.3 },
  { name: 'CBIT Hyderabad', totalFees: 7.2, avgPackage: 18, placementRate: 88, roiScore: 85, breakEvenYears: 0.5 },
];

const roiTrendData = [
  { year: 1, iit: 15.2, iiit: 20.0, cbit: 10.8 },
  { year: 2, iit: 32.4, iiit: 44.0, cbit: 23.6 },
  { year: 3, iit: 51.6, iiit: 68.0, cbit: 36.4 },
  { year: 4, iit: 72.8, iiit: 94.0, cbit: 51.2 },
  { year: 5, iit: 96.0, iiit: 122.0, cbit: 68.0 },
];

export default function ROICalculatorPage() {
  const [form, setForm] = useState({ college: 'IIT Hyderabad', loanAmount: 0, interestRate: 8, loanTenure: 5, additionalCosts: 0 });
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const calculateROI = (e: React.FormEvent) => {
    e.preventDefault();
    const college = colleges.find(c => c.name === form.college)!;
    const totalInvestment = college.totalFees + form.loanAmount + form.additionalCosts;
    const monthlyPackage = college.avgPackage / 12;
    const monthlyLoanEMI = form.loanAmount > 0 ? (form.loanAmount * (form.interestRate / 100 / 12) * Math.pow(1 + form.interestRate / 100 / 12, form.loanTenure * 12)) / (Math.pow(1 + form.interestRate / 100 / 12, form.loanTenure * 12) - 1) : 0;
    const monthlyNetIncome = monthlyPackage - monthlyLoanEMI;
    const annualNetIncome = monthlyNetIncome * 12;
    const breakEvenMonths = totalInvestment > 0 ? (totalInvestment / annualNetIncome) * 12 : 0;
    const roi5Year = ((annualNetIncome * 5 - totalInvestment) / totalInvestment) * 100;

    setResult({
      college: college.name,
      totalInvestment: totalInvestment.toFixed(2),
      monthlyPackage: monthlyPackage.toFixed(2),
      monthlyEMI: monthlyLoanEMI.toFixed(2),
      monthlyNetIncome: monthlyNetIncome.toFixed(2),
      annualNetIncome: annualNetIncome.toFixed(2),
      breakEvenMonths: breakEvenMonths.toFixed(1),
      roi5Year: roi5Year.toFixed(2),
      roiScore: college.roiScore,
      placementRate: college.placementRate,
    });
    toast.success('ROI calculated!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ROI Calculator</h1>
        <p className="text-gray-600 mb-8">Calculate investment returns for engineering colleges</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="card">
              <form onSubmit={calculateROI} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                  <select name="college" value={form.college} onChange={handleChange} className="input-field">
                    {colleges.map(c => (<option key={c.name} value={c.name}>{c.name}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Education Loan (₹L)</label>
                  <input name="loanAmount" value={form.loanAmount} onChange={handleChange} className="input-field" type="number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                  <input name="interestRate" value={form.interestRate} onChange={handleChange} className="input-field" type="number" step="0.1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loan Tenure (Years)</label>
                  <input name="loanTenure" value={form.loanTenure} onChange={handleChange} className="input-field" type="number" />
                </div>
                <button type="submit" className="btn-primary w-full">Calculate</button>
              </form>
            </div>
          </div>

          <div className="md:col-span-2">
            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="card bg-blue-50 border border-blue-200">
                    <div className="text-sm text-gray-600">Total Investment</div>
                    <div className="text-2xl font-bold text-blue-700">₹{result.totalInvestment}L</div>
                  </div>
                  <div className="card bg-green-50 border border-green-200">
                    <div className="text-sm text-gray-600">Monthly Package</div>
                    <div className="text-2xl font-bold text-green-700">₹{result.monthlyPackage}K</div>
                  </div>
                  <div className="card bg-orange-50 border border-orange-200">
                    <div className="text-sm text-gray-600">Break-Even</div>
                    <div className="text-2xl font-bold text-orange-700">{result.breakEvenMonths} mo</div>
                  </div>
                  <div className="card bg-purple-50 border border-purple-200">
                    <div className="text-sm text-gray-600">5-Year ROI</div>
                    <div className="text-2xl font-bold text-purple-700">{result.roi5Year}%</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 card">
          <h3 className="font-semibold mb-4">ROI Comparison (5-Year)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={roiTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="iit" stroke="#3b82f6" name="IIT Hyderabad" />
              <Line type="monotone" dataKey="iiit" stroke="#10b981" name="IIIT Hyderabad" />
              <Line type="monotone" dataKey="cbit" stroke="#f59e0b" name="CBIT" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
