export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  topic?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface MockTest {
  id: string;
  exam: string;
  subject: string;
  icon: string;
  color: string;
  duration: number;
  totalCandidates: number;
  questions: QuizQuestion[];
  // Student-specific test metadata
  studentId?: string;
  studentName?: string;
  paperSetCode?: string;
}

// Master Question Pools for each subject (Each has 20+ questions for rich randomized selection)
const eapcetPhysicsPool: QuizQuestion[] = [
  { id: 101, question: 'The SI unit of electric charge is:', options: ['Volt', 'Ampere', 'Coulomb', 'Ohm'], answer: 2, explanation: 'The SI unit of electric charge is the coulomb (C), named after Charles-Augustin de Coulomb.', topic: 'Electrostatics' },
  { id: 102, question: 'A body moving with uniform acceleration has:', options: ['Constant velocity', 'Constant speed', 'Increasing acceleration', 'Increasing velocity at a constant rate'], answer: 3, explanation: 'Uniform acceleration means velocity changes by equal amounts in equal time intervals.', topic: 'Kinematics' },
  { id: 103, question: 'Which of the following is a vector quantity?', options: ['Mass', 'Energy', 'Displacement', 'Time'], answer: 2, explanation: 'Displacement has both magnitude and direction, making it a vector. Mass, energy and time are scalars.', topic: 'Vectors' },
  { id: 104, question: 'The escape velocity from Earth is approximately:', options: ['7.9 km/s', '11.2 km/s', '9.8 km/s', '3.0 × 10⁸ m/s'], answer: 1, explanation: 'Escape velocity of Earth is about 11.2 km/s, the minimum speed needed to escape Earth gravity.', topic: 'Gravitation' },
  { id: 105, question: 'Ohm\'s law states that:', options: ['V = IR', 'P = VI', 'V = I²R', 'E = mc²'], answer: 0, explanation: 'Ohm\'s law: voltage (V) equals current (I) times resistance (R).', topic: 'Current Electricity' },
  { id: 106, question: 'The dimensional formula of force is:', options: ['[MLT⁻¹]', '[MLT⁻²]', '[ML²T⁻²]', '[ML⁻¹T⁻²]'], answer: 1, explanation: 'Force = mass × acceleration = [M][LT⁻²] = [MLT⁻²].', topic: 'Units & Dimensions' },
  { id: 107, question: 'Light year is a unit of:', options: ['Time', 'Speed', 'Distance', 'Luminosity'], answer: 2, explanation: 'A light year is the distance light travels in one year, about 9.46 × 10¹⁵ m.', topic: 'Units' },
  { id: 108, question: 'When a ray of light enters from air into glass, it:', options: ['Bends towards the normal', 'Bends away from the normal', 'Continues straight', 'Reflects completely'], answer: 0, explanation: 'Light bends towards the normal when entering a denser medium (glass has higher refractive index than air).', topic: 'Ray Optics' },
  { id: 109, question: 'The work done by a conservative force in a closed path is:', options: ['Positive', 'Negative', 'Zero', 'Infinite'], answer: 2, explanation: 'Conservative forces (like gravity) do zero net work over a closed loop; energy is conserved.', topic: 'Work & Energy' },
  { id: 110, question: 'Kirchhoff\'s loop rule is a consequence of conservation of:', options: ['Mass', 'Charge', 'Energy', 'Momentum'], answer: 2, explanation: 'Kirchhoff\'s voltage (loop) rule follows from the conservation of energy in a closed circuit.', topic: 'Circuits' },
  { id: 111, question: 'The acceleration due to gravity at the center of the Earth is:', options: ['9.8 m/s²', '0 m/s²', 'Infinity', '4.9 m/s²'], answer: 1, explanation: 'At the center of the Earth, gravitational pulls from all directions cancel out, making g = 0.', topic: 'Gravitation' },
  { id: 112, question: 'Bernoulli\'s theorem is based on the law of conservation of:', options: ['Mass', 'Momentum', 'Energy', 'Angular momentum'], answer: 2, explanation: 'Bernoulli\'s principle is an expression of the principle of conservation of energy for flowing fluids.', topic: 'Fluid Mechanics' },
  { id: 113, question: 'In a simple harmonic motion, the kinetic energy is maximum at:', options: ['Extreme position', 'Mean position', 'Quarter displacement', 'Zero everywhere'], answer: 1, explanation: 'At the mean position, speed is maximum (v = Aω), so kinetic energy is at its peak.', topic: 'Oscillations' },
  { id: 114, question: 'A transformer works on the principle of:', options: ['Self-induction', 'Mutual induction', 'Lorentz force', 'Seebeck effect'], answer: 1, explanation: 'Transformers transfer energy between circuits through mutual electromagnetic induction.', topic: 'EMI' },
  { id: 115, question: 'The velocity of sound is maximum in which medium?', options: ['Air', 'Water', 'Steel (Solid)', 'Vacuum'], answer: 2, explanation: 'Sound travels fastest in solids due to high elasticity and density coupling.', topic: 'Waves' },
  { id: 116, question: 'What type of lens is used to correct myopia (nearsightedness)?', options: ['Convex lens', 'Concave lens', 'Cylindrical lens', 'Bifocal lens'], answer: 1, explanation: 'Concave lenses diverge incoming light rays before entering the eye, focusing them onto the retina.', topic: 'Optics' },
  { id: 117, question: 'Capacitance of a parallel plate capacitor increases when:', options: ['Area decreases', 'Plate distance decreases', 'Dielectric constant decreases', 'Voltage decreases'], answer: 1, explanation: 'C = εA/d; decreasing distance d increases capacitance C.', topic: 'Electrostatics' },
  { id: 118, question: 'A step-up transformer increases:', options: ['Current', 'Voltage', 'Power', 'Frequency'], answer: 1, explanation: 'A step-up transformer increases secondary voltage while decreasing secondary current.', topic: 'AC' },
];

const eapcetChemistryPool: QuizQuestion[] = [
  { id: 201, question: 'The pH of pure water at 25°C is:', options: ['0', '7', '14', '1'], answer: 1, explanation: 'Pure water has equal H⁺ and OH⁻ concentrations, giving a neutral pH of 7 at 25°C.', topic: 'Equilibrium' },
  { id: 202, question: 'Avogadro\'s number is approximately:', options: ['6.022 × 10²³', '3.14 × 10²³', '9.11 × 10⁻³¹', '1.6 × 10⁻¹⁹'], answer: 0, explanation: 'Avogadro\'s number (NA) = 6.022 × 10²³ particles per mole.', topic: 'Mole Concept' },
  { id: 203, question: 'Which gas is known as "laughing gas"?', options: ['CO₂', 'NO', 'N₂O', 'NH₃'], answer: 2, explanation: 'Nitrous oxide (N₂O) is called laughing gas due to its euphoric effects when inhaled.', topic: 'Inorganic' },
  { id: 204, question: 'The most abundant element in Earth\'s crust is:', options: ['Oxygen', 'Silicon', 'Iron', 'Aluminium'], answer: 0, explanation: 'Oxygen (~46.6%) is the most abundant element in the Earth\'s crust, followed by silicon.', topic: 'General' },
  { id: 205, question: 'In a redox reaction, the substance that loses electrons is:', options: ['Oxidized', 'Reduced', 'Neutralized', 'Precipitated'], answer: 0, explanation: 'Loss of electrons is oxidation (OIL RIG: Oxidation Is Loss, Reduction Is Gain).', topic: 'Redox' },
  { id: 206, question: 'The chemical formula of common salt is:', options: ['KCl', 'NaCl', 'CaCl₂', 'Na₂CO₃'], answer: 1, explanation: 'Common salt is sodium chloride (NaCl).', topic: 'Inorganic' },
  { id: 207, question: 'Which allotrope of carbon is used in pencils?', options: ['Diamond', 'Graphene', 'Graphite', 'Fullerene'], answer: 2, explanation: 'Graphite is soft and layered, making it suitable for pencil leads.', topic: 'Carbon Family' },
  { id: 208, question: 'The process of converting a solid directly into gas is called:', options: ['Condensation', 'Sublimation', 'Evaporation', 'Melting'], answer: 1, explanation: 'Sublimation is the direct transition of a solid to a gas (e.g., dry ice, camphor).', topic: 'States of Matter' },
  { id: 209, question: 'The bond angle in a water molecule is approximately:', options: ['90°', '104.5°', '109.5°', '120°'], answer: 1, explanation: 'Water has a bent shape with a bond angle of about 104.5° due to lone pairs on oxygen.', topic: 'Chemical Bonding' },
  { id: 210, question: 'Which of the following is an example of an amphoteric oxide?', options: ['Na₂O', 'Al₂O₃', 'CO₂', 'SO₂'], answer: 1, explanation: 'Al₂O₃ reacts with both acids and bases, making it amphoteric.', topic: 'Periodic Table' },
  { id: 211, question: 'What is the oxidation state of Chromium in K₂Cr₂O₇?', options: ['+3', '+5', '+6', '+7'], answer: 2, explanation: 'In K₂Cr₂O₇: 2(+1) + 2(Cr) + 7(-2) = 0 => 2Cr - 12 = 0 => Cr = +6.', topic: 'Redox' },
  { id: 212, question: 'Which gas turns lime water milky?', options: ['Oxygen', 'Hydrogen', 'Carbon dioxide', 'Methane'], answer: 2, explanation: 'CO₂ reacts with Ca(OH)₂ to form insoluble calcium carbonate (CaCO₃ precipitate).', topic: 'Inorganic' },
  { id: 213, question: 'Boyle\'s Law relates:', options: ['Pressure and Temperature', 'Pressure and Volume at constant T', 'Volume and Temperature', 'Moles and Volume'], answer: 1, explanation: 'Boyle\'s law states P ∝ 1/V at constant temperature.', topic: 'Gaseous State' },
  { id: 214, question: 'The monomer of natural rubber is:', options: ['Ethene', 'Isoprene (2-methyl-1,3-butadiene)', 'Styrene', 'Chloroprene'], answer: 1, explanation: 'Natural rubber is a polymer of cis-1,4-polyisoprene.', topic: 'Polymers' },
  { id: 215, question: 'Which of the following is a noble gas with highest abundance in atmosphere?', options: ['Helium', 'Argon', 'Neon', 'Krypton'], answer: 1, explanation: 'Argon comprises approximately 0.93% of Earth atmosphere, the most abundant noble gas.', topic: 'Noble Gases' },
  { id: 216, question: 'The primary source of biogas is:', options: ['Petroleum', 'Cow dung (gobar)', 'Coal', 'Natural gas'], answer: 1, explanation: 'Biogas (primarily methane) is produced by anaerobic digestion of agricultural waste and cow dung.', topic: 'Environmental' },
];

const eapcetMathsPool: QuizQuestion[] = [
  { id: 301, question: 'The derivative of x² with respect to x is:', options: ['x', '2x', 'x²/2', '2'], answer: 1, explanation: 'd/dx (x²) = 2x by the power rule.', topic: 'Calculus' },
  { id: 302, question: 'The value of sin 90° is:', options: ['0', '0.5', '1', '√2/2'], answer: 2, explanation: 'sin 90° = 1, the maximum value of the sine function.', topic: 'Trigonometry' },
  { id: 303, question: 'If A = {1, 2, 3} and B = {2, 3, 4}, then A ∩ B is:', options: ['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', '{}'], answer: 1, explanation: 'The intersection contains elements common to both sets: {2, 3}.', topic: 'Set Theory' },
  { id: 304, question: 'The roots of x² - 5x + 6 = 0 are:', options: ['2 and 3', '-2 and -3', '1 and 6', '0 and 6'], answer: 0, explanation: 'x² - 5x + 6 = (x - 2)(x - 3), so roots are 2 and 3.', topic: 'Algebra' },
  { id: 305, question: 'The value of ∫₀¹ x dx is:', options: ['0', '0.5', '1', '2'], answer: 1, explanation: '∫₀¹ x dx = [x²/2]₀¹ = 1/2.', topic: 'Definite Integrals' },
  { id: 306, question: 'The sum of the first n natural numbers is:', options: ['n²', 'n(n+1)/2', 'n(n-1)/2', '2n'], answer: 1, explanation: 'Sum of first n natural numbers = n(n+1)/2.', topic: 'Sequences' },
  { id: 307, question: 'The determinant of the identity matrix of order 3 is:', options: ['0', '1', '3', '6'], answer: 1, explanation: 'The determinant of any identity matrix is 1.', topic: 'Matrices' },
  { id: 308, question: 'If the probability of an event is 0.3, the probability of its complement is:', options: ['0.3', '0.7', '1.3', '0.03'], answer: 1, explanation: 'P(A\') = 1 - P(A) = 1 - 0.3 = 0.7.', topic: 'Probability' },
  { id: 309, question: 'The focus of the parabola y² = 4ax is:', options: ['(a, 0)', '(0, a)', '(-a, 0)', '(0, -a)'], answer: 0, explanation: 'For y² = 4ax, the focus lies at (a, 0).', topic: 'Conics' },
  { id: 310, question: 'The number of ways to arrange 3 distinct books on a shelf is:', options: ['3', '6', '9', '27'], answer: 1, explanation: '3! = 3 × 2 × 1 = 6 permutations.', topic: 'Permutations' },
  { id: 311, question: 'The value of cos²(θ) + sin²(θ) is always equal to:', options: ['0', '1', '-1', 'tan θ'], answer: 1, explanation: 'The fundamental Pythagorean trigonometric identity is cos²θ + sin²θ = 1.', topic: 'Trigonometry' },
  { id: 312, question: 'The slope of the line perpendicular to 2x + 3y = 5 is:', options: ['-2/3', '3/2', '-3/2', '2/3'], answer: 1, explanation: 'Slope of given line is -2/3. Slope of perpendicular line m = -1/(-2/3) = 3/2.', topic: 'Coordinate Geometry' },
  { id: 313, question: 'If matrix A is symmetric, then Aᵀ is equal to:', options: ['-A', 'A', 'A⁻¹', 'I'], answer: 1, explanation: 'By definition, a symmetric matrix satisfies Aᵀ = A.', topic: 'Matrices' },
  { id: 314, question: 'The distance between points (0, 0) and (3, 4) is:', options: ['7', '5', '1', '12'], answer: 1, explanation: 'Distance d = √(3² + 4²) = √25 = 5.', topic: 'Coordinate Geometry' },
  { id: 315, question: 'The derivative of ln(x) with respect to x is:', options: ['1/x', 'eˣ', 'x', '1/x²'], answer: 0, explanation: 'd/dx (ln x) = 1/x for x > 0.', topic: 'Calculus' },
  { id: 316, question: 'The centroid of a triangle with vertices (0,0), (3,0), and (0,6) is:', options: ['(1, 2)', '(3, 6)', '(1.5, 3)', '(2, 1)'], answer: 0, explanation: 'Centroid = ((0+3+0)/3, (0+0+6)/3) = (1, 2).', topic: 'Geometry' },
];

const generalAptitudePool: QuizQuestion[] = [
  { id: 401, question: 'If a train travels 300 km in 3 hours, its speed is:', options: ['50 km/h', '80 km/h', '100 km/h', '120 km/h'], answer: 2, explanation: 'Speed = distance/time = 300/3 = 100 km/h.', topic: 'Speed & Distance' },
  { id: 402, question: 'What is the capital of Telangana?', options: ['Warangal', 'Nizamabad', 'Hyderabad', 'Karimnagar'], answer: 2, explanation: 'Hyderabad is the capital city of Telangana.', topic: 'General Knowledge' },
  { id: 403, question: 'A shopkeeper sells an item for ₹120 at a 20% profit. The cost price is:', options: ['₹96', '₹100', '₹110', '₹144'], answer: 1, explanation: 'CP = SP/(1 + profit%) = 120/1.2 = ₹100.', topic: 'Profit & Loss' },
  { id: 404, question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 1, explanation: 'Mars appears red due to iron oxide (rust) on its surface.', topic: 'Science' },
  { id: 405, question: 'The next number in the series 2, 6, 12, 20, 30, __ is:', options: ['36', '40', '42', '44'], answer: 2, explanation: 'Differences are 4, 6, 8, 10, so the next difference is 12: 30 + 12 = 42.', topic: 'Series' },
  { id: 406, question: 'Who is known as the Father of the Indian Constitution?', options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'B. R. Ambedkar', 'Sardar Patel'], answer: 2, explanation: 'Dr. B. R. Ambedkar chaired the Drafting Committee of the Constitution.', topic: 'Polity' },
  { id: 407, question: 'If 5 pens cost ₹60, the cost of 8 pens is:', options: ['₹90', '₹96', '₹100', '₹108'], answer: 1, explanation: 'Cost per pen = 60/5 = ₹12; 8 pens = ₹96.', topic: 'Arithmetic' },
  { id: 408, question: 'Which is the largest ocean in the world?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], answer: 2, explanation: 'The Pacific Ocean is the largest, covering about a third of Earth\'s surface.', topic: 'Geography' },
  { id: 409, question: 'A clock shows 3:15. The angle between the hands is:', options: ['0°', '7.5°', '15°', '30°'], answer: 1, explanation: 'At 3:15, the hour hand has moved 7.5° past 3 (15 min = 7.5°), so the angle is 7.5°.', topic: 'Clocks' },
  { id: 410, question: 'The first Indian to win an individual Olympic gold medal is:', options: ['Milkha Singh', 'Abhinav Bindra', 'Neeraj Chopra', 'P. T. Usha'], answer: 1, explanation: 'Abhinav Bindra won gold in 10m air rifle at the 2008 Beijing Olympics.', topic: 'Sports' },
  { id: 411, question: 'If \'CAT\' is coded as 3120, how is \'DOG\' coded (A=1, B=2...)?', options: ['4157', '4127', '4147', '4167'], answer: 0, explanation: 'D=4, O=15, G=7 -> 4157.', topic: 'Coding & Decoding' },
  { id: 412, question: 'What is 15% of 400?', options: ['50', '60', '70', '80'], answer: 1, explanation: '15/100 × 400 = 60.', topic: 'Percentages' },
  { id: 413, question: 'Which institution conducts the TG EAPCET examination?', options: ['JNTU Hyderabad', 'Osmania University', 'IIT Hyderabad', 'Kakatiya University'], answer: 0, explanation: 'TG EAPCET (formerly TS EAMCET) is traditionally conducted by JNTUH on behalf of TSCHE.', topic: 'Telangana Admissions' },
  { id: 414, question: 'A man walks 3 km North, then 4 km East. How far is he from his starting point?', options: ['7 km', '5 km', '1 km', '12 km'], answer: 1, explanation: 'By Pythagoras theorem: √(3² + 4²) = 5 km.', topic: 'Directions' },
];

export const mockTests: MockTest[] = [
  {
    id: 'eapcet-physics',
    exam: 'TG EAPCET',
    subject: 'Physics',
    icon: '⚛️',
    color: 'from-blue-500 to-blue-700',
    duration: 10,
    totalCandidates: 250000,
    questions: eapcetPhysicsPool.slice(0, 10),
  },
  {
    id: 'eapcet-chemistry',
    exam: 'TG EAPCET',
    subject: 'Chemistry',
    icon: '🧪',
    color: 'from-emerald-500 to-emerald-700',
    duration: 10,
    totalCandidates: 250000,
    questions: eapcetChemistryPool.slice(0, 10),
  },
  {
    id: 'eapcet-maths',
    exam: 'TG EAPCET',
    subject: 'Mathematics',
    icon: '📐',
    color: 'from-purple-500 to-purple-700',
    duration: 10,
    totalCandidates: 250000,
    questions: eapcetMathsPool.slice(0, 10),
  },
  {
    id: 'jee-physics',
    exam: 'JEE Main',
    subject: 'Physics',
    icon: '🔭',
    color: 'from-indigo-500 to-indigo-700',
    duration: 10,
    totalCandidates: 1200000,
    questions: eapcetPhysicsPool.slice(3, 13),
  },
  {
    id: 'jee-chemistry',
    exam: 'JEE Main',
    subject: 'Chemistry',
    icon: '⚗️',
    color: 'from-teal-500 to-teal-700',
    duration: 10,
    totalCandidates: 1200000,
    questions: eapcetChemistryPool.slice(2, 12),
  },
  {
    id: 'jee-maths',
    exam: 'JEE Main',
    subject: 'Mathematics',
    icon: '📊',
    color: 'from-rose-500 to-rose-700',
    duration: 10,
    totalCandidates: 1200000,
    questions: eapcetMathsPool.slice(2, 12),
  },
  {
    id: 'general-quiz',
    exam: 'General',
    subject: 'Aptitude & GK',
    icon: '🧠',
    color: 'from-orange-500 to-orange-700',
    duration: 10,
    totalCandidates: 100000,
    questions: generalAptitudePool.slice(0, 10),
  },
];

// Helper to get question pool for any test id
function getSubjectPool(testId: string): QuizQuestion[] {
  if (testId.includes('physics')) return eapcetPhysicsPool;
  if (testId.includes('chemistry')) return eapcetChemistryPool;
  if (testId.includes('math')) return eapcetMathsPool;
  return generalAptitudePool;
}

// Deterministic or pseudorandom string hash generator
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Generates a completely customized, distinct test paper for a specific student!
 * Different student IDs or candidate names will receive different sets of questions,
 * shuffled question orders, and shuffled multiple-choice options.
 */
export function generateStudentTest(
  baseTest: MockTest,
  studentId: string = 'STU-001',
  studentName: string = 'Student Candidate',
  questionCount: number = 10
): MockTest {
  const pool = [...getSubjectPool(baseTest.id)];
  const seed = simpleHash(`${studentId}-${studentName}-${baseTest.id}`);

  // Fisher-Yates shuffle driven by student seed + randomized offset
  const shuffledPool = [...pool];
  for (let i = shuffledPool.length - 1; i > 0; i--) {
    const pseudoRandomIndex = (seed * (i + 13) + (i * 7)) % (i + 1);
    const temp = shuffledPool[i];
    shuffledPool[i] = shuffledPool[pseudoRandomIndex];
    shuffledPool[pseudoRandomIndex] = temp;
  }

  // Pick required number of questions
  const selectedQuestions = shuffledPool.slice(0, Math.min(questionCount, shuffledPool.length));

  // Also shuffle options for each question so even the key choices (A, B, C, D) are unique
  const customizedQuestions: QuizQuestion[] = selectedQuestions.map((q, qIndex) => {
    const originalAnswerText = q.options[q.answer];
    const optionsWithIndices = q.options.map((opt, idx) => ({ opt, originalIndex: idx }));

    // Shuffle options based on student seed + question index
    for (let i = optionsWithIndices.length - 1; i > 0; i--) {
      const optRand = (seed + qIndex * 17 + i * 3) % (i + 1);
      const temp = optionsWithIndices[i];
      optionsWithIndices[i] = optionsWithIndices[optRand];
      optionsWithIndices[optRand] = temp;
    }

    const newOptions = optionsWithIndices.map(o => o.opt);
    const newAnswerIndex = newOptions.indexOf(originalAnswerText);

    return {
      ...q,
      id: qIndex + 1,
      options: newOptions,
      answer: newAnswerIndex !== -1 ? newAnswerIndex : q.answer,
    };
  });

  const setLetter = ['Set A', 'Set B', 'Set C', 'Set D', 'Set E'][seed % 5];
  const paperCode = `PAPER-${baseTest.subject.toUpperCase().slice(0, 3)}-${setLetter.replace(' ', '')}-${(seed % 9000) + 1000}`;

  return {
    ...baseTest,
    studentId,
    studentName,
    paperSetCode: `${setLetter} (#${paperCode})`,
    questions: customizedQuestions,
  };
}

export function getRankEstimate(test: MockTest, score: number): { rank: number; percentile: number } {
  const percent = (score / test.questions.length) * 100;
  const percentile = Math.min(99.9, Math.max(0.1, Math.round((percent * 0.85 + 10) * 10) / 10));
  const rank = Math.max(1, Math.round(test.totalCandidates * (1 - percentile / 100)));
  return { rank, percentile };
}