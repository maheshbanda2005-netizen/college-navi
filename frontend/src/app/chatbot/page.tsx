'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Message { id: string; content: string; role: 'user' | 'bot'; timestamp: Date; }

const quickActions = [
  'Best colleges for MCA?', 'Compare IITs and NITs',
  'Scholarships available?', 'Admission deadlines for 2025?',
  'Career advice for AI/ML?', 'What is my admission chance?',
];

const botResponses: Record<string, string> = {
  'best colleges for mca': 'Top MCA colleges in India:\n1. NIT Trichy\n2. NIT Warangal\n3. JNU New Delhi\n4. University of Hyderabad\n5. VIT Vellore\n\nWould you like details on any specific college?',
  'compare iits and nits': 'Key differences:\n• IITs: Higher ranking, better research, tougher entrance (JEE Advanced)\n• NITs: Excellent value, good placements, JEE Mains\n• Both have strong industry connections\n• IITs have higher avg packages (25-30 LPA vs 18-22 LPA)',
  'scholarships available': 'Available scholarships:\n1. National Merit (₹50K/yr)\n2. SC/ST Full Tuition\n3. Girl Child Education Fund\n4. Sports Excellence\n5. Disability Support\n\nCheck /scholarships for details!',
  'admission deadlines': 'Typical timelines:\n• IITs: June (JEE Advanced) + Counselling July\n• NITs: April (JEE Mains) + Counselling June\n• Private: Jan-Mar applications\n• Central Universities: May-June',
  'career advice': 'For AI/ML career:\n1. Learn Python, TensorFlow, PyTorch\n2. Build projects (NLP, CV, etc.)\n3. Kaggle competitions\n4. Internships in AI/ML roles\n5. Advanced degree (M.Tech/MS)\n\nAvg salary: ₹25-35 LPA',
  'what is my admission chance': 'Use our Admission Predictor at /admission-predictor!\nEnter your marks, entrance score, and category to get AI-powered admission probability analysis.',
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', content: 'Hi! I\'m your AI counselor. Ask me anything about universities, admissions, scholarships, or careers!', role: 'bot', timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const getBotResponse = (userMsg: string): string => {
    const lower = userMsg.toLowerCase();
    for (const [key, response] of Object.entries(botResponses)) {
      if (lower.includes(key)) return response;
    }
    return 'I can help you with university recommendations, admission guidance, scholarship info, and career advice. Could you please be more specific about what you\'d like to know?';
  };

  const handleSend = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput('');
    const userMessage: Message = { id: Date.now().toString(), content: msg, role: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1000));
    const botMessage: Message = {
      id: (Date.now() + 1).toString(), content: getBotResponse(msg), role: 'bot', timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-[calc(100vh-12rem)] flex flex-col">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">AI Counselor</h1>
          <p className="text-gray-600">Ask anything about your education journey</p>
        </div>

        <div className="flex flex-1 gap-4 min-h-0">
          <div className="hidden md:flex flex-col space-y-2 w-64 overflow-y-auto">
            <p className="text-sm font-medium text-gray-500 mb-2">Quick Questions</p>
            {quickActions.map((q) => (
              <button key={q} onClick={() => handleSend(q)}
                className="text-left px-3 py-2 text-sm bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'}`}>
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-primary-200' : 'text-gray-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-100 p-4">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  className="flex-1 input-field" placeholder="Type your question..."
                />
                <button type="submit" className="btn-primary px-6">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
