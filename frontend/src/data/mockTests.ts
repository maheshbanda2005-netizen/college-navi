export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
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
}

export const mockTests: MockTest[] = [
  {
    id: 'eapcet-physics',
    exam: 'TG EAPCET',
    subject: 'Physics',
    icon: '⚛️',
    color: 'from-blue-500 to-blue-700',
    duration: 10,
    totalCandidates: 250000,
    questions: [
      { id: 1, question: 'The SI unit of electric charge is:', options: ['Volt', 'Ampere', 'Coulomb', 'Ohm'], answer: 2, explanation: 'The SI unit of electric charge is the coulomb (C), named after Charles-Augustin de Coulomb.' },
      { id: 2, question: 'A body moving with uniform acceleration has:', options: ['Constant velocity', 'Constant speed', 'Increasing acceleration', 'Increasing velocity at a constant rate'], answer: 3, explanation: 'Uniform acceleration means velocity changes by equal amounts in equal time intervals.' },
      { id: 3, question: 'Which of the following is a vector quantity?', options: ['Mass', 'Energy', 'Displacement', 'Time'], answer: 2, explanation: 'Displacement has both magnitude and direction, making it a vector. Mass, energy and time are scalars.' },
      { id: 4, question: 'The escape velocity from Earth is approximately:', options: ['7.9 km/s', '11.2 km/s', '9.8 km/s', '3.0 × 10⁸ m/s'], answer: 1, explanation: 'Escape velocity of Earth is about 11.2 km/s, the minimum speed needed to escape Earth gravity.' },
      { id: 5, question: 'Ohm\'s law states that:', options: ['V = IR', 'P = VI', 'V = I²R', 'E = mc²'], answer: 0, explanation: 'Ohm\'s law: voltage (V) equals current (I) times resistance (R).' },
      { id: 6, question: 'The dimensional formula of force is:', options: ['[MLT⁻¹]', '[MLT⁻²]', '[ML²T⁻²]', '[ML⁻¹T⁻²]'], answer: 1, explanation: 'Force = mass × acceleration = [M][LT⁻²] = [MLT⁻²].' },
      { id: 7, question: 'Light year is a unit of:', options: ['Time', 'Speed', 'Distance', 'Luminosity'], answer: 2, explanation: 'A light year is the distance light travels in one year, about 9.46 × 10¹⁵ m.' },
      { id: 8, question: 'When a ray of light enters from air into glass, it:', options: ['Bends towards the normal', 'Bends away from the normal', 'Continues straight', 'Reflects completely'], answer: 0, explanation: 'Light bends towards the normal when entering a denser medium (glass has higher refractive index than air).' },
      { id: 9, question: 'The work done by a conservative force in a closed path is:', options: ['Positive', 'Negative', 'Zero', 'Infinite'], answer: 2, explanation: 'Conservative forces (like gravity) do zero net work over a closed loop; energy is conserved.' },
      { id: 10, question: 'Kirchhoff\'s loop rule is a consequence of conservation of:', options: ['Mass', 'Charge', 'Energy', 'Momentum'], answer: 2, explanation: 'Kirchhoff\'s voltage (loop) rule follows from the conservation of energy in a closed circuit.' },
    ],
  },
  {
    id: 'eapcet-chemistry',
    exam: 'TG EAPCET',
    subject: 'Chemistry',
    icon: '🧪',
    color: 'from-emerald-500 to-emerald-700',
    duration: 10,
    totalCandidates: 250000,
    questions: [
      { id: 1, question: 'The pH of pure water at 25°C is:', options: ['0', '7', '14', '1'], answer: 1, explanation: 'Pure water has equal H⁺ and OH⁻ concentrations, giving a neutral pH of 7 at 25°C.' },
      { id: 2, question: 'Avogadro\'s number is approximately:', options: ['6.022 × 10²³', '3.14 × 10²³', '9.11 × 10⁻³¹', '1.6 × 10⁻¹⁹'], answer: 0, explanation: 'Avogadro\'s number (NA) = 6.022 × 10²³ particles per mole.' },
      { id: 3, question: 'Which gas is known as "laughing gas"?', options: ['CO₂', 'NO', 'N₂O', 'NH₃'], answer: 2, explanation: 'Nitrous oxide (N₂O) is called laughing gas due to its euphoric effects when inhaled.' },
      { id: 4, question: 'The most abundant element in Earth\'s crust is:', options: ['Oxygen', 'Silicon', 'Iron', 'Aluminium'], answer: 0, explanation: 'Oxygen (~46.6%) is the most abundant element in the Earth\'s crust, followed by silicon.' },
      { id: 5, question: 'In a redox reaction, the substance that loses electrons is:', options: ['Oxidized', 'Reduced', 'Neutralized', 'Precipitated'], answer: 0, explanation: 'Loss of electrons is oxidation (OIL RIG: Oxidation Is Loss, Reduction Is Gain).' },
      { id: 6, question: 'The chemical formula of common salt is:', options: ['KCl', 'NaCl', 'CaCl₂', 'Na₂CO₃'], answer: 1, explanation: 'Common salt is sodium chloride (NaCl).' },
      { id: 7, question: 'Which allotrope of carbon is used in pencils?', options: ['Diamond', 'Graphene', 'Graphite', 'Fullerene'], answer: 2, explanation: 'Graphite is soft and layered, making it suitable for pencil leads.' },
      { id: 8, question: 'The process of converting a solid directly into gas is called:', options: ['Condensation', 'Sublimation', 'Evaporation', 'Melting'], answer: 1, explanation: 'Sublimation is the direct transition of a solid to a gas (e.g., dry ice, camphor).' },
      { id: 9, question: 'The bond angle in a water molecule is approximately:', options: ['90°', '104.5°', '109.5°', '120°'], answer: 1, explanation: 'Water has a bent shape with a bond angle of about 104.5° due to lone pairs on oxygen.' },
      { id: 10, question: 'Which of the following is an example of an amphoteric oxide?', options: ['Na₂O', 'Al₂O₃', 'CO₂', 'SO₂'], answer: 1, explanation: 'Al₂O₃ reacts with both acids and bases, making it amphoteric.' },
    ],
  },
  {
    id: 'eapcet-maths',
    exam: 'TG EAPCET',
    subject: 'Mathematics',
    icon: '📐',
    color: 'from-purple-500 to-purple-700',
    duration: 10,
    totalCandidates: 250000,
    questions: [
      { id: 1, question: 'The derivative of x² with respect to x is:', options: ['x', '2x', 'x²/2', '2'], answer: 1, explanation: 'd/dx (x²) = 2x by the power rule.' },
      { id: 2, question: 'The value of sin 90° is:', options: ['0', '0.5', '1', '√2/2'], answer: 2, explanation: 'sin 90° = 1, the maximum value of the sine function.' },
      { id: 3, question: 'If A = {1, 2, 3} and B = {2, 3, 4}, then A ∩ B is:', options: ['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', '{}'], answer: 1, explanation: 'The intersection contains elements common to both sets: {2, 3}.' },
      { id: 4, question: 'The roots of x² - 5x + 6 = 0 are:', options: ['2 and 3', '-2 and -3', '1 and 6', '0 and 6'], answer: 0, explanation: 'x² - 5x + 6 = (x - 2)(x - 3), so roots are 2 and 3.' },
      { id: 5, question: 'The value of ∫₀¹ x dx is:', options: ['0', '0.5', '1', '2'], answer: 1, explanation: '∫₀¹ x dx = [x²/2]₀¹ = 1/2.' },
      { id: 6, question: 'The sum of the first n natural numbers is:', options: ['n²', 'n(n+1)/2', 'n(n-1)/2', '2n'], answer: 1, explanation: 'Sum of first n natural numbers = n(n+1)/2.' },
      { id: 7, question: 'The determinant of the identity matrix of order 3 is:', options: ['0', '1', '3', '6'], answer: 1, explanation: 'The determinant of any identity matrix is 1.' },
      { id: 8, question: 'If the probability of an event is 0.3, the probability of its complement is:', options: ['0.3', '0.7', '1.3', '0.03'], answer: 1, explanation: 'P(A\') = 1 - P(A) = 1 - 0.3 = 0.7.' },
      { id: 9, question: 'The focus of the parabola y² = 4ax is:', options: ['(a, 0)', '(0, a)', '(-a, 0)', '(0, -a)'], answer: 0, explanation: 'For y² = 4ax, the focus lies at (a, 0).' },
      { id: 10, question: 'The number of ways to arrange 3 distinct books on a shelf is:', options: ['3', '6', '9', '27'], answer: 1, explanation: '3! = 3 × 2 × 1 = 6 permutations.' },
    ],
  },
  {
    id: 'jee-physics',
    exam: 'JEE Main',
    subject: 'Physics',
    icon: '🔭',
    color: 'from-indigo-500 to-indigo-700',
    duration: 10,
    totalCandidates: 1200000,
    questions: [
      { id: 1, question: 'A projectile is launched at 45°. Its range is maximum when the angle is:', options: ['30°', '45°', '60°', '90°'], answer: 1, explanation: 'Range R = u²sin2θ/g is maximum when sin2θ = 1, i.e., θ = 45°.' },
      { id: 2, question: 'The momentum of a photon of wavelength λ is:', options: ['hλ', 'h/λ', 'λ/h', 'hc/λ'], answer: 1, explanation: 'Photon momentum p = h/λ, from de Broglie\'s relation.' },
      { id: 3, question: 'In SHM, the acceleration is maximum at:', options: ['Mean position', 'Extreme position', 'Midway point', 'Everywhere equal'], answer: 1, explanation: 'Acceleration a = -ω²x is maximum at the extreme positions where displacement is maximum.' },
      { id: 4, question: 'The internal resistance of an ideal voltmeter is:', options: ['Zero', 'Infinite', 'Equal to load', '1 Ω'], answer: 1, explanation: 'An ideal voltmeter has infinite resistance so it draws no current from the circuit.' },
      { id: 5, question: 'The number of significant figures in 0.00450 is:', options: ['3', '4', '5', '2'], answer: 0, explanation: 'Leading zeros are not significant; 450 has 3 significant figures.' },
      { id: 6, question: 'A Carnot engine operates between 300 K and 600 K. Its efficiency is:', options: ['25%', '50%', '75%', '100%'], answer: 1, explanation: 'η = 1 - T₂/T₁ = 1 - 300/600 = 0.5 = 50%.' },
      { id: 7, question: 'The unit of Planck\'s constant is:', options: ['J·s', 'J/s', 'N·m', 'W'], answer: 0, explanation: 'Planck\'s constant h has units of J·s (action).' },
      { id: 8, question: 'Two resistors 2Ω and 3Ω are in series. The equivalent resistance is:', options: ['1.2Ω', '5Ω', '6Ω', '2.5Ω'], answer: 1, explanation: 'Series resistance: R = 2 + 3 = 5Ω.' },
      { id: 9, question: 'The magnetic field inside a long solenoid is:', options: ['Zero', 'Uniform', 'Varies linearly', 'Maximum at ends'], answer: 1, explanation: 'The field inside a long solenoid is uniform (B = μ₀nI) and parallel to the axis.' },
      { id: 10, question: 'The phenomenon of interference of light was first demonstrated by:', options: ['Newton', 'Young', 'Huygens', 'Maxwell'], answer: 1, explanation: 'Thomas Young\'s double-slit experiment (1801) demonstrated wave interference of light.' },
    ],
  },
  {
    id: 'jee-chemistry',
    exam: 'JEE Main',
    subject: 'Chemistry',
    icon: '⚗️',
    color: 'from-teal-500 to-teal-700',
    duration: 10,
    totalCandidates: 1200000,
    questions: [
      { id: 1, question: 'The hybridization of carbon in methane (CH₄) is:', options: ['sp', 'sp²', 'sp³', 'sp³d'], answer: 2, explanation: 'Methane has tetrahedral geometry with sp³ hybridization.' },
      { id: 2, question: 'Which of the following is a strong electrolyte?', options: ['CH₃COOH', 'NH₄OH', 'NaCl', 'H₂CO₃'], answer: 2, explanation: 'NaCl fully dissociates in water, making it a strong electrolyte. The others are weak.' },
      { id: 3, question: 'The number of unpaired electrons in Fe³⁺ (Z = 26) is:', options: ['3', '4', '5', '6'], answer: 2, explanation: 'Fe³⁺ has configuration [Ar]3d⁵ with five unpaired electrons in the d-orbitals.' },
      { id: 4, question: 'The most electronegative element is:', options: ['Oxygen', 'Fluorine', 'Chlorine', 'Nitrogen'], answer: 1, explanation: 'Fluorine (3.98) is the most electronegative element on the Pauling scale.' },
      { id: 5, question: 'The IUPAC name of CH₃CH₂CH₂OH is:', options: ['Propan-1-ol', 'Propan-2-ol', 'Propane', 'Propanal'], answer: 0, explanation: 'CH₃CH₂CH₂OH is propan-1-ol (OH on the first carbon of a 3-carbon chain).' },
      { id: 6, question: 'Which law states that volume of a gas is directly proportional to temperature at constant pressure?', options: ['Boyle\'s law', 'Charles\'s law', 'Avogadro\'s law', 'Graham\'s law'], answer: 1, explanation: 'Charles\'s law: V ∝ T at constant pressure.' },
      { id: 7, question: 'The colour of the flame test for sodium is:', options: ['Crimson red', 'Golden yellow', 'Lilac', 'Green'], answer: 1, explanation: 'Sodium gives a characteristic golden yellow flame in flame tests.' },
      { id: 8, question: 'In a galvanic cell, oxidation occurs at the:', options: ['Anode', 'Cathode', 'Salt bridge', 'Electrolyte'], answer: 0, explanation: 'Oxidation always occurs at the anode; reduction at the cathode.' },
      { id: 9, question: 'The number of stereoisomers of 2-butene is:', options: ['1', '2', '3', '4'], answer: 1, explanation: '2-butene shows cis-trans (geometrical) isomerism, giving 2 stereoisomers.' },
      { id: 10, question: 'The catalyst used in the Haber process is:', options: ['V₂O₅', 'Fe with promoters', 'Ni', 'Pt'], answer: 1, explanation: 'The Haber process (NH₃ synthesis) uses iron as the catalyst with promoters like Al₂O₃ and K₂O.' },
    ],
  },
  {
    id: 'jee-maths',
    exam: 'JEE Main',
    subject: 'Mathematics',
    icon: '📊',
    color: 'from-rose-500 to-rose-700',
    duration: 10,
    totalCandidates: 1200000,
    questions: [
      { id: 1, question: 'The limit of (sin x)/x as x → 0 is:', options: ['0', '1', '∞', 'Undefined'], answer: 1, explanation: 'The standard limit lim(x→0) sin x / x = 1.' },
      { id: 2, question: 'If A is a 3×3 matrix with |A| = 2, then |2A| is:', options: ['2', '4', '8', '16'], answer: 2, explanation: '|kA| = kⁿ|A| for an n×n matrix. |2A| = 2³ × 2 = 16.' },
      { id: 3, question: 'The eccentricity of a circle is:', options: ['0', '1', '< 1', '> 1'], answer: 0, explanation: 'A circle is a conic with eccentricity e = 0.' },
      { id: 4, question: 'The coefficient of x² in the expansion of (1 + x)⁵ is:', options: ['5', '10', '20', '15'], answer: 1, explanation: 'C(5,2) = 10 from the binomial theorem.' },
      { id: 5, question: 'If f(x) = eˣ, then f\'(x) is:', options: ['eˣ', 'xeˣ', 'eˣ/x', 'ln x'], answer: 0, explanation: 'The derivative of eˣ is itself: d/dx(eˣ) = eˣ.' },
      { id: 6, question: 'The general solution of dy/dx = 1 is:', options: ['y = x + c', 'y = c', 'y = 1', 'x = y + c'], answer: 0, explanation: 'Integrating dy/dx = 1 gives y = x + c where c is the constant of integration.' },
      { id: 7, question: 'The angle between the vectors i + j and i - j is:', options: ['0°', '45°', '90°', '180°'], answer: 2, explanation: 'Their dot product is 1 - 1 = 0, so the vectors are perpendicular (90°).' },
      { id: 8, question: 'The number of onto functions from a set of 3 elements to a set of 3 elements is:', options: ['3', '6', '9', '27'], answer: 1, explanation: 'For finite sets of equal size, onto functions = permutations = 3! = 6.' },
      { id: 9, question: 'The equation of the tangent to y = x² at (1, 1) is:', options: ['y = 2x - 1', 'y = x', 'y = 2x + 1', 'y = x - 1'], answer: 0, explanation: 'Slope = 2x = 2 at x=1; tangent: y - 1 = 2(x - 1) → y = 2x - 1.' },
      { id: 10, question: 'If z = 3 + 4i, then |z| is:', options: ['5', '7', '25', '1'], answer: 0, explanation: '|z| = √(3² + 4²) = √25 = 5.' },
    ],
  },
  {
    id: 'neet-biology',
    exam: 'NEET',
    subject: 'Biology',
    icon: '🧬',
    color: 'from-green-500 to-green-700',
    duration: 10,
    totalCandidates: 2400000,
    questions: [
      { id: 1, question: 'The powerhouse of the cell is the:', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], answer: 2, explanation: 'Mitochondria generate ATP through cellular respiration, earning the name "powerhouse of the cell".' },
      { id: 2, question: 'DNA replication is:', options: ['Conservative', 'Semi-conservative', 'Dispersive', 'Random'], answer: 1, explanation: 'Meselson-Stahl experiment proved DNA replication is semi-conservative.' },
      { id: 3, question: 'The largest gland in the human body is:', options: ['Pancreas', 'Thyroid', 'Liver', 'Pituitary'], answer: 2, explanation: 'The liver is the largest gland, weighing about 1.5 kg in adults.' },
      { id: 4, question: 'Which blood group is known as the universal donor?', options: ['A', 'B', 'AB', 'O'], answer: 3, explanation: 'Group O lacks A and B antigens, so it can be donated to any blood group.' },
      { id: 5, question: 'The number of chromosomes in a human cell is:', options: ['23', '44', '46', '48'], answer: 2, explanation: 'Humans have 46 chromosomes (23 pairs) in somatic cells.' },
      { id: 6, question: 'Photosynthesis takes place in the:', options: ['Mitochondria', 'Chloroplast', 'Nucleus', 'Vacuole'], answer: 1, explanation: 'Chloroplasts contain chlorophyll and are the site of photosynthesis.' },
      { id: 7, question: 'The disease caused by a deficiency of insulin is:', options: ['Goitre', 'Diabetes mellitus', 'Anaemia', 'Rickets'], answer: 1, explanation: 'Diabetes mellitus results from insufficient insulin or insulin resistance.' },
      { id: 8, question: 'The basic unit of heredity is the:', options: ['Cell', 'Gene', 'Chromosome', 'Protein'], answer: 1, explanation: 'Genes are segments of DNA that carry hereditary information.' },
      { id: 9, question: 'Which vitamin is synthesized in the skin in sunlight?', options: ['Vitamin A', 'Vitamin B12', 'Vitamin D', 'Vitamin C'], answer: 2, explanation: 'UV sunlight converts 7-dehydrocholesterol to Vitamin D in the skin.' },
      { id: 10, question: 'The exchange of gases in human lungs occurs in the:', options: ['Bronchi', 'Trachea', 'Alveoli', 'Larynx'], answer: 2, explanation: 'Alveoli are tiny air sacs where O₂ and CO₂ are exchanged with blood.' },
    ],
  },
  {
    id: 'neet-physics',
    exam: 'NEET',
    subject: 'Physics',
    icon: '🔬',
    color: 'from-cyan-500 to-cyan-700',
    duration: 10,
    totalCandidates: 2400000,
    questions: [
      { id: 1, question: 'The SI unit of power is:', options: ['Joule', 'Watt', 'Newton', 'Pascal'], answer: 1, explanation: 'Power is measured in watts (W), equal to one joule per second.' },
      { id: 2, question: 'The force of gravity acting on a body of mass 10 kg on Earth (g = 10 m/s²) is:', options: ['10 N', '50 N', '100 N', '1000 N'], answer: 2, explanation: 'W = mg = 10 × 10 = 100 N.' },
      { id: 3, question: 'A convex lens is also known as a:', options: ['Diverging lens', 'Converging lens', 'Cylindrical lens', 'Plano lens'], answer: 1, explanation: 'A convex lens converges parallel rays to a focus, so it is a converging lens.' },
      { id: 4, question: 'The frequency of AC power in India is:', options: ['40 Hz', '50 Hz', '60 Hz', '100 Hz'], answer: 1, explanation: 'India uses 230 V AC at 50 Hz frequency.' },
      { id: 5, question: 'Sound cannot travel through:', options: ['Air', 'Water', 'Steel', 'Vacuum'], answer: 3, explanation: 'Sound needs a medium; it cannot travel through a vacuum.' },
      { id: 6, question: 'The speed of light in vacuum is approximately:', options: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '3 × 10⁵ m/s'], answer: 1, explanation: 'Light travels at 3 × 10⁸ m/s in a vacuum.' },
      { id: 7, question: 'The unit of electric current is:', options: ['Volt', 'Ohm', 'Ampere', 'Coulomb'], answer: 2, explanation: 'Electric current is measured in amperes (A).' },
      { id: 8, question: 'Which device converts mechanical energy to electrical energy?', options: ['Motor', 'Generator', 'Transformer', 'Battery'], answer: 1, explanation: 'A generator converts mechanical energy into electrical energy; a motor does the reverse.' },
      { id: 9, question: 'The apparent depth of a fish in a pond is less than its real depth due to:', options: ['Reflection', 'Refraction', 'Diffraction', 'Dispersion'], answer: 1, explanation: 'Light refracts at the water-air boundary, making objects appear shallower than they are.' },
      { id: 10, question: 'The formula for kinetic energy is:', options: ['mv', 'mv²/2', 'mgh', 'ma'], answer: 1, explanation: 'Kinetic energy KE = ½mv².' },
    ],
  },
  {
    id: 'neet-chemistry',
    exam: 'NEET',
    subject: 'Chemistry',
    icon: '🧫',
    color: 'from-lime-500 to-lime-700',
    duration: 10,
    totalCandidates: 2400000,
    questions: [
      { id: 1, question: 'The chemical formula of washing soda is:', options: ['NaHCO₃', 'Na₂CO₃·10H₂O', 'NaOH', 'NaCl'], answer: 1, explanation: 'Washing soda is sodium carbonate decahydrate, Na₂CO₃·10H₂O.' },
      { id: 2, question: 'The bond between hydrogen and oxygen in water is:', options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], answer: 1, explanation: 'Water has polar covalent O–H bonds formed by shared electron pairs.' },
      { id: 3, question: 'The gas released when metal reacts with an acid is:', options: ['Oxygen', 'Carbon dioxide', 'Hydrogen', 'Nitrogen'], answer: 2, explanation: 'Metal + acid → salt + hydrogen gas.' },
      { id: 4, question: 'Which element is present in all organic compounds?', options: ['Oxygen', 'Carbon', 'Nitrogen', 'Hydrogen'], answer: 1, explanation: 'Carbon is the defining element of organic compounds.' },
      { id: 5, question: 'The atomic number of carbon is:', options: ['6', '8', '12', '14'], answer: 0, explanation: 'Carbon has atomic number 6 and atomic mass 12.' },
      { id: 6, question: 'Rusting of iron requires:', options: ['Only oxygen', 'Only water', 'Oxygen and water', 'Carbon dioxide'], answer: 2, explanation: 'Rusting needs both oxygen and moisture (water) to form hydrated iron(III) oxide.' },
      { id: 7, question: 'The pH of lemon juice is approximately:', options: ['2', '7', '9', '12'], answer: 0, explanation: 'Lemon juice contains citric acid, making it acidic with pH around 2.' },
      { id: 8, question: 'The hardest natural substance is:', options: ['Iron', 'Quartz', 'Diamond', 'Granite'], answer: 2, explanation: 'Diamond is the hardest naturally occurring material (Mohs hardness 10).' },
      { id: 9, question: 'The process of electrolysis is used to:', options: ['Separate mixtures', 'Decompose compounds', 'Filter solutions', 'Crystallize salts'], answer: 1, explanation: 'Electrolysis uses electric current to decompose chemical compounds (e.g., water into H₂ and O₂).' },
      { id: 10, question: 'The formula for ozone is:', options: ['O₂', 'O₃', 'CO₂', 'SO₂'], answer: 1, explanation: 'Ozone is a triatomic molecule of oxygen with formula O₃.' },
    ],
  },
  {
    id: 'general-quiz',
    exam: 'General',
    subject: 'Aptitude & GK',
    icon: '🧠',
    color: 'from-orange-500 to-orange-700',
    duration: 10,
    totalCandidates: 100000,
    questions: [
      { id: 1, question: 'If a train travels 300 km in 3 hours, its speed is:', options: ['50 km/h', '80 km/h', '100 km/h', '120 km/h'], answer: 2, explanation: 'Speed = distance/time = 300/3 = 100 km/h.' },
      { id: 2, question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], answer: 2, explanation: 'Canberra is the capital city of Australia.' },
      { id: 3, question: 'A shopkeeper sells an item for ₹120 at a 20% profit. The cost price is:', options: ['₹96', '₹100', '₹110', '₹144'], answer: 1, explanation: 'CP = SP/(1 + profit%) = 120/1.2 = ₹100.' },
      { id: 4, question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 1, explanation: 'Mars appears red due to iron oxide (rust) on its surface.' },
      { id: 5, question: 'The next number in the series 2, 6, 12, 20, 30, __ is:', options: ['36', '40', '42', '44'], answer: 2, explanation: 'Differences are 4, 6, 8, 10, so the next difference is 12: 30 + 12 = 42.' },
      { id: 6, question: 'Who is known as the Father of the Indian Constitution?', options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'B. R. Ambedkar', 'Sardar Patel'], answer: 2, explanation: 'Dr. B. R. Ambedkar chaired the Drafting Committee of the Constitution.' },
      { id: 7, question: 'If 5 pens cost ₹60, the cost of 8 pens is:', options: ['₹90', '₹96', '₹100', '₹108'], answer: 1, explanation: 'Cost per pen = 60/5 = ₹12; 8 pens = ₹96.' },
      { id: 8, question: 'Which is the largest ocean in the world?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], answer: 2, explanation: 'The Pacific Ocean is the largest, covering about a third of Earth\'s surface.' },
      { id: 9, question: 'A clock shows 3:15. The angle between the hands is:', options: ['0°', '7.5°', '15°', '30°'], answer: 1, explanation: 'At 3:15, the hour hand has moved 7.5° past 3 (15 min = 7.5°), so the angle is 7.5°.' },
      { id: 10, question: 'The first Indian to win an individual Olympic gold medal is:', options: ['Milkha Singh', 'Abhinav Bindra', 'Neeraj Chopra', 'P. T. Usha'], answer: 1, explanation: 'Abhinav Bindra won gold in 10m air rifle at the 2008 Beijing Olympics.' },
    ],
  },
];

export function getRankEstimate(test: MockTest, score: number): { rank: number; percentile: number } {
  const percent = (score / test.questions.length) * 100;
  const percentile = Math.min(99.9, Math.max(0.1, Math.round((percent * 0.85 + 10) * 10) / 10));
  const rank = Math.max(1, Math.round(test.totalCandidates * (1 - percentile / 100)));
  return { rank, percentile };
}