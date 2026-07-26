import { Types } from 'mongoose';

// Realistic TG EAPCET closing ranks for Telangana engineering colleges (2022-2024)
// Data structure: [collegeCode, department, [OC-Male, OC-Female, BC-Male, BC-Female, SC-Male, SC-Female, ST-Male, ST-Female] for each year]

interface CutoffSeed {
  collegeCode: string;
  department: string;
  course: string;
  degree: string;
  year: number;
  category: string;
  gender: string;
  closingRank: number;
  openingRank: number;
  examName?: string;
}

// Helper to generate cutoff entries
function generateCutoffs(
  collegeCode: string,
  dept: string,
  course: string,
  degree: string,
  ranks: Record<number, Record<string, { open: number; close: number }>>
): CutoffSeed[] {
  const results: CutoffSeed[] = [];
  const categories = ['General', 'OBC', 'SC', 'ST'];
  const genders = ['Male', 'Female'];

  for (const [yearStr, yearData] of Object.entries(ranks)) {
    const year = parseInt(yearStr);
    for (const catKey of Object.keys(yearData)) {
      // Parse catKey like "OC_Male"
      const [cat, gen] = catKey.split('_');
      const categoryMap: Record<string, string> = { OC: 'General', BC: 'OBC', SC: 'SC', ST: 'ST' };
      const category = categoryMap[cat] || 'General';
      const gender = gen === 'Male' ? 'Male' : 'Female';
      const data = yearData[catKey];
      results.push({
        collegeCode,
        department: dept,
        course,
        degree,
        year,
        category,
        gender,
        closingRank: data.close,
        openingRank: data.open,
      });
    }
  }
  return results;
}

// Major college cutoff data
export const telanganaCutoffData: CutoffSeed[] = [
  // === CBIT - Chaitanya Bharathi Institute of Technology ===
  // CSE
  ...generateCutoffs('CBIT', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 1200, close: 13800 }, OC_Female: { open: 1500, close: 14500 }, BC_Male: { open: 1800, close: 16200 }, BC_Female: { open: 2200, close: 17500 }, SC_Male: { open: 4500, close: 28500 }, SC_Female: { open: 5200, close: 29500 }, ST_Male: { open: 8500, close: 42000 }, ST_Female: { open: 9200, close: 45000 } },
    2023: { OC_Male: { open: 1100, close: 14200 }, OC_Female: { open: 1400, close: 14800 }, BC_Male: { open: 1700, close: 16800 }, BC_Female: { open: 2100, close: 18000 }, SC_Male: { open: 4300, close: 29000 }, SC_Female: { open: 5000, close: 30000 }, ST_Male: { open: 8200, close: 43000 }, ST_Female: { open: 9000, close: 46000 } },
    2022: { OC_Male: { open: 1000, close: 14500 }, OC_Female: { open: 1300, close: 15200 }, BC_Male: { open: 1600, close: 17200 }, BC_Female: { open: 2000, close: 18500 }, SC_Male: { open: 4100, close: 29500 }, SC_Female: { open: 4800, close: 31000 }, ST_Male: { open: 8000, close: 44000 }, ST_Female: { open: 8800, close: 47000 } },
  }),
  // CSE - AI & ML
  ...generateCutoffs('CBIT', 'CSE', 'B.Tech Computer Science (AI & ML)', 'B.Tech', {
    2024: { OC_Male: { open: 2500, close: 16500 }, OC_Female: { open: 2800, close: 17200 }, BC_Male: { open: 3200, close: 19500 }, BC_Female: { open: 3600, close: 21000 }, SC_Male: { open: 6500, close: 32000 }, SC_Female: { open: 7200, close: 33500 }, ST_Male: { open: 11000, close: 48000 }, ST_Female: { open: 12000, close: 50000 } },
    2023: { OC_Male: { open: 2300, close: 17000 }, OC_Female: { open: 2600, close: 17800 }, BC_Male: { open: 3000, close: 20000 }, BC_Female: { open: 3400, close: 21500 }, SC_Male: { open: 6200, close: 33000 }, SC_Female: { open: 6900, close: 34500 }, ST_Male: { open: 10500, close: 49000 }, ST_Female: { open: 11500, close: 51000 } },
  }),
  // ECE
  ...generateCutoffs('CBIT', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 2800, close: 18500 }, OC_Female: { open: 3200, close: 19200 }, BC_Male: { open: 3800, close: 22000 }, BC_Female: { open: 4200, close: 23500 }, SC_Male: { open: 7500, close: 35000 }, SC_Female: { open: 8200, close: 36500 }, ST_Male: { open: 13000, close: 52000 }, ST_Female: { open: 14000, close: 54000 } },
    2023: { OC_Male: { open: 2600, close: 19000 }, OC_Female: { open: 3000, close: 19800 }, BC_Male: { open: 3600, close: 22500 }, BC_Female: { open: 4000, close: 24000 }, SC_Male: { open: 7200, close: 36000 }, SC_Female: { open: 7900, close: 37500 }, ST_Male: { open: 12500, close: 53000 }, ST_Female: { open: 13500, close: 55000 } },
  }),
  // EEE
  ...generateCutoffs('CBIT', 'EEE', 'B.Tech Electrical & Electronics Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 5000, close: 25000 }, OC_Female: { open: 5500, close: 26000 }, BC_Male: { open: 6500, close: 30000 }, BC_Female: { open: 7000, close: 31500 }, SC_Male: { open: 11000, close: 45000 }, SC_Female: { open: 12000, close: 47000 }, ST_Male: { open: 18000, close: 65000 }, ST_Female: { open: 19000, close: 67000 } },
  }),

  // === VNR VJIET ===
  ...generateCutoffs('VNRV', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 1500, close: 14100 }, OC_Female: { open: 1800, close: 14800 }, BC_Male: { open: 2200, close: 16800 }, BC_Female: { open: 2600, close: 18000 }, SC_Male: { open: 5000, close: 29500 }, SC_Female: { open: 5700, close: 31000 }, ST_Male: { open: 9200, close: 44000 }, ST_Female: { open: 10000, close: 46000 } },
    2023: { OC_Male: { open: 1400, close: 14500 }, OC_Female: { open: 1700, close: 15200 }, BC_Male: { open: 2100, close: 17200 }, BC_Female: { open: 2500, close: 18500 }, SC_Male: { open: 4800, close: 30200 }, SC_Female: { open: 5500, close: 31800 }, ST_Male: { open: 9000, close: 45000 }, ST_Female: { open: 9800, close: 47000 } },
    2022: { OC_Male: { open: 1300, close: 14800 }, OC_Female: { open: 1600, close: 15600 }, BC_Male: { open: 2000, close: 17600 }, BC_Female: { open: 2400, close: 19000 }, SC_Male: { open: 4600, close: 31000 }, SC_Female: { open: 5300, close: 32500 }, ST_Male: { open: 8800, close: 46000 }, ST_Female: { open: 9600, close: 48000 } },
  }),
  ...generateCutoffs('VNRV', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 3500, close: 19500 }, OC_Female: { open: 4000, close: 20500 }, BC_Male: { open: 4800, close: 23500 }, BC_Female: { open: 5200, close: 25000 }, SC_Male: { open: 8500, close: 37000 }, SC_Female: { open: 9200, close: 38500 }, ST_Male: { open: 14500, close: 55000 }, ST_Female: { open: 15500, close: 57000 } },
  }),

  // === GRIET ===
  ...generateCutoffs('GRIET', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 2200, close: 15600 }, OC_Female: { open: 2500, close: 16300 }, BC_Male: { open: 3000, close: 18500 }, BC_Female: { open: 3400, close: 19800 }, SC_Male: { open: 6000, close: 31000 }, SC_Female: { open: 6700, close: 32500 }, ST_Male: { open: 10500, close: 46000 }, ST_Female: { open: 11500, close: 48000 } },
    2023: { OC_Male: { open: 2000, close: 16000 }, OC_Female: { open: 2300, close: 16800 }, BC_Male: { open: 2800, close: 19000 }, BC_Female: { open: 3200, close: 20300 }, SC_Male: { open: 5800, close: 32000 }, SC_Female: { open: 6400, close: 33500 }, ST_Male: { open: 10200, close: 47000 }, ST_Female: { open: 11200, close: 49000 } },
    2022: { OC_Male: { open: 1900, close: 16300 }, OC_Female: { open: 2200, close: 17200 }, BC_Male: { open: 2700, close: 19500 }, BC_Female: { open: 3100, close: 20800 }, SC_Male: { open: 5600, close: 33000 }, SC_Female: { open: 6200, close: 34500 }, ST_Male: { open: 10000, close: 48000 }, ST_Female: { open: 11000, close: 50000 } },
  }),
  ...generateCutoffs('GRIET', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 4500, close: 22000 }, OC_Female: { open: 5000, close: 23000 }, BC_Male: { open: 5800, close: 26000 }, BC_Female: { open: 6200, close: 27500 }, SC_Male: { open: 9500, close: 40000 }, SC_Female: { open: 10200, close: 41500 }, ST_Male: { open: 16000, close: 58000 }, ST_Female: { open: 17000, close: 60000 } },
  }),

  // === Vasavi College of Engineering (VCE) ===
  ...generateCutoffs('VCE', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 1000, close: 11900 }, OC_Female: { open: 1300, close: 12500 }, BC_Male: { open: 1700, close: 14200 }, BC_Female: { open: 2100, close: 15500 }, SC_Male: { open: 4000, close: 26500 }, SC_Female: { open: 4600, close: 27800 }, ST_Male: { open: 7800, close: 40000 }, ST_Female: { open: 8500, close: 42000 } },
    2023: { OC_Male: { open: 900, close: 12200 }, OC_Female: { open: 1200, close: 12800 }, BC_Male: { open: 1600, close: 14500 }, BC_Female: { open: 2000, close: 15800 }, SC_Male: { open: 3800, close: 27000 }, SC_Female: { open: 4400, close: 28500 }, ST_Male: { open: 7500, close: 41000 }, ST_Female: { open: 8200, close: 43000 } },
  }),
  ...generateCutoffs('VCE', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 3000, close: 17500 }, OC_Female: { open: 3500, close: 18200 }, BC_Male: { open: 4200, close: 21000 }, BC_Female: { open: 4600, close: 22500 }, SC_Male: { open: 8000, close: 34000 }, SC_Female: { open: 8700, close: 35500 }, ST_Male: { open: 14000, close: 51000 }, ST_Female: { open: 15000, close: 53000 } },
  }),

  // === MGIT ===
  ...generateCutoffs('MGIT', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 3500, close: 10800 }, OC_Female: { open: 3800, close: 11500 }, BC_Male: { open: 4500, close: 13500 }, BC_Female: { open: 5000, close: 14800 }, SC_Male: { open: 7500, close: 26000 }, SC_Female: { open: 8200, close: 27500 }, ST_Male: { open: 12000, close: 39000 }, ST_Female: { open: 13000, close: 41000 } },
    2023: { OC_Male: { open: 3300, close: 11000 }, OC_Female: { open: 3600, close: 11800 }, BC_Male: { open: 4300, close: 13800 }, BC_Female: { open: 4800, close: 15200 }, SC_Male: { open: 7200, close: 26500 }, SC_Female: { open: 7900, close: 28000 }, ST_Male: { open: 11500, close: 40000 }, ST_Female: { open: 12500, close: 42000 } },
  }),
  ...generateCutoffs('MGIT', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 6500, close: 21000 }, OC_Female: { open: 7000, close: 22000 }, BC_Male: { open: 8000, close: 25000 }, BC_Female: { open: 8500, close: 26500 }, SC_Male: { open: 12000, close: 38000 }, SC_Female: { open: 12800, close: 39500 }, ST_Male: { open: 18500, close: 55000 }, ST_Female: { open: 19500, close: 57000 } },
  }),

  // === CVR College of Engineering ===
  ...generateCutoffs('CVR', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 2800, close: 16200 }, OC_Female: { open: 3100, close: 17000 }, BC_Male: { open: 3700, close: 19200 }, BC_Female: { open: 4100, close: 20500 }, SC_Male: { open: 6800, close: 32000 }, SC_Female: { open: 7500, close: 33500 }, ST_Male: { open: 11500, close: 47000 }, ST_Female: { open: 12500, close: 49000 } },
    2023: { OC_Male: { open: 2600, close: 16600 }, OC_Female: { open: 2900, close: 17500 }, BC_Male: { open: 3500, close: 19800 }, BC_Female: { open: 3900, close: 21000 }, SC_Male: { open: 6500, close: 33000 }, SC_Female: { open: 7200, close: 34500 }, ST_Male: { open: 11000, close: 48000 }, ST_Female: { open: 12000, close: 50000 } },
  }),

  // === MVSR Engineering College ===
  ...generateCutoffs('MVSR', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 3500, close: 17500 }, OC_Female: { open: 3800, close: 18200 }, BC_Male: { open: 4500, close: 20500 }, BC_Female: { open: 5000, close: 22000 }, SC_Male: { open: 7800, close: 34000 }, SC_Female: { open: 8500, close: 35500 }, ST_Male: { open: 13000, close: 50000 }, ST_Female: { open: 14000, close: 52000 } },
  }),

  // === JNTUH CEH (Kukatpally) ===
  ...generateCutoffs('JNTH', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 800, close: 4300 }, OC_Female: { open: 1000, close: 4800 }, BC_Male: { open: 1400, close: 6200 }, BC_Female: { open: 1800, close: 7000 }, SC_Male: { open: 3200, close: 15000 }, SC_Female: { open: 3800, close: 16500 }, ST_Male: { open: 6000, close: 25000 }, ST_Female: { open: 6800, close: 27000 } },
    2023: { OC_Male: { open: 700, close: 4500 }, OC_Female: { open: 900, close: 5000 }, BC_Male: { open: 1300, close: 6400 }, BC_Female: { open: 1700, close: 7200 }, SC_Male: { open: 3000, close: 15500 }, SC_Female: { open: 3600, close: 17000 }, ST_Male: { open: 5800, close: 26000 }, ST_Female: { open: 6500, close: 28000 } },
    2022: { OC_Male: { open: 650, close: 4700 }, OC_Female: { open: 850, close: 5200 }, BC_Male: { open: 1200, close: 6600 }, BC_Female: { open: 1600, close: 7500 }, SC_Male: { open: 2800, close: 16000 }, SC_Female: { open: 3400, close: 17500 }, ST_Male: { open: 5500, close: 27000 }, ST_Female: { open: 6200, close: 29000 } },
  }),
  ...generateCutoffs('JNTH', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 1500, close: 8500 }, OC_Female: { open: 1800, close: 9200 }, BC_Male: { open: 2500, close: 11000 }, BC_Female: { open: 3000, close: 12000 }, SC_Male: { open: 5000, close: 22000 }, SC_Female: { open: 5500, close: 23500 }, ST_Male: { open: 8500, close: 35000 }, ST_Female: { open: 9200, close: 37000 } },
  }),

  // === OUCE (Osmania University College of Engineering) ===
  ...generateCutoffs('OUCE', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 500, close: 3900 }, OC_Female: { open: 700, close: 4200 }, BC_Male: { open: 1000, close: 5500 }, BC_Female: { open: 1400, close: 6200 }, SC_Male: { open: 2800, close: 13500 }, SC_Female: { open: 3400, close: 14800 }, ST_Male: { open: 5500, close: 23000 }, ST_Female: { open: 6200, close: 24500 } },
    2023: { OC_Male: { open: 450, close: 4000 }, OC_Female: { open: 650, close: 4400 }, BC_Male: { open: 950, close: 5700 }, BC_Female: { open: 1300, close: 6400 }, SC_Male: { open: 2600, close: 14000 }, SC_Female: { open: 3200, close: 15200 }, ST_Male: { open: 5200, close: 24000 }, ST_Female: { open: 5900, close: 25500 } },
    2022: { OC_Male: { open: 400, close: 4100 }, OC_Female: { open: 600, close: 4500 }, BC_Male: { open: 900, close: 5800 }, BC_Female: { open: 1200, close: 6600 }, SC_Male: { open: 2400, close: 14500 }, SC_Female: { open: 3000, close: 15800 }, ST_Male: { open: 5000, close: 25000 }, ST_Female: { open: 5600, close: 26500 } },
  }),

  // === SNIST (Sreenidhi) ===
  ...generateCutoffs('SNIS', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 3000, close: 17000 }, OC_Female: { open: 3300, close: 17800 }, BC_Male: { open: 4000, close: 20000 }, BC_Female: { open: 4400, close: 21500 }, SC_Male: { open: 7200, close: 33000 }, SC_Female: { open: 7900, close: 34500 }, ST_Male: { open: 12000, close: 48000 }, ST_Female: { open: 13000, close: 50000 } },
  }),

  // === Vardhaman College of Engineering ===
  ...generateCutoffs('VARD', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 3200, close: 17200 }, OC_Female: { open: 3500, close: 18000 }, BC_Male: { open: 4200, close: 20200 }, BC_Female: { open: 4600, close: 21800 }, SC_Male: { open: 7500, close: 33500 }, SC_Female: { open: 8200, close: 35000 }, ST_Male: { open: 12500, close: 49000 }, ST_Female: { open: 13500, close: 51000 } },
  }),

  // === GNITS (G Narayanamma) ===
  ...generateCutoffs('GNIT', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 4000, close: 18500 }, OC_Female: { open: 4300, close: 19200 }, BC_Male: { open: 5200, close: 21500 }, BC_Female: { open: 5600, close: 23000 }, SC_Male: { open: 8500, close: 35000 }, SC_Female: { open: 9200, close: 36500 }, ST_Male: { open: 14000, close: 51000 }, ST_Female: { open: 15000, close: 53000 } },
  }),

  // === BVRIT ===
  ...generateCutoffs('BVR', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 3800, close: 18000 }, OC_Female: { open: 4100, close: 18800 }, BC_Male: { open: 4800, close: 21000 }, BC_Female: { open: 5200, close: 22500 }, SC_Male: { open: 8200, close: 34000 }, SC_Female: { open: 8900, close: 35500 }, ST_Male: { open: 13500, close: 50000 }, ST_Female: { open: 14500, close: 52000 } },
  }),

  // === IARE ===
  ...generateCutoffs('IARE', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 4200, close: 19000 }, OC_Female: { open: 4500, close: 19800 }, BC_Male: { open: 5500, close: 22500 }, BC_Female: { open: 6000, close: 24000 }, SC_Male: { open: 8800, close: 35500 }, SC_Female: { open: 9500, close: 37000 }, ST_Male: { open: 14500, close: 52000 }, ST_Female: { open: 15500, close: 54000 } },
  }),

  // === KMIT ===
  ...generateCutoffs('KMIT', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 5000, close: 22000 }, OC_Female: { open: 5500, close: 23000 }, BC_Male: { open: 6500, close: 26000 }, BC_Female: { open: 7000, close: 27500 }, SC_Male: { open: 10000, close: 39000 }, SC_Female: { open: 10800, close: 40500 }, ST_Male: { open: 16000, close: 56000 }, ST_Female: { open: 17000, close: 58000 } },
  }),

  // === ACE Engineering College ===
  ...generateCutoffs('ACE', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 8000, close: 32000 }, OC_Female: { open: 8500, close: 33500 }, BC_Male: { open: 10000, close: 37000 }, BC_Female: { open: 11000, close: 38500 }, SC_Male: { open: 15000, close: 50000 }, SC_Female: { open: 16000, close: 52000 }, ST_Male: { open: 22000, close: 68000 }, ST_Female: { open: 23000, close: 70000 } },
  }),

  // === MLRIT ===
  ...generateCutoffs('MLRI', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 9000, close: 35000 }, OC_Female: { open: 9500, close: 36500 }, BC_Male: { open: 11000, close: 40000 }, BC_Female: { open: 12000, close: 42000 }, SC_Male: { open: 16000, close: 53000 }, SC_Female: { open: 17000, close: 55000 }, ST_Male: { open: 24000, close: 72000 }, ST_Female: { open: 25000, close: 74000 } },
  }),

  // === TKR College of Engineering ===
  ...generateCutoffs('TKR', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 8500, close: 34000 }, OC_Female: { open: 9000, close: 35500 }, BC_Male: { open: 10500, close: 39000 }, BC_Female: { open: 11500, close: 41000 }, SC_Male: { open: 15500, close: 52000 }, SC_Female: { open: 16500, close: 54000 }, ST_Male: { open: 23000, close: 70000 }, ST_Female: { open: 24000, close: 72000 } },
  }),

  // === Malla Reddy Engineering College ===
  ...generateCutoffs('MREC', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 7500, close: 30000 }, OC_Female: { open: 8000, close: 31500 }, BC_Male: { open: 9500, close: 35000 }, BC_Female: { open: 10500, close: 37000 }, SC_Male: { open: 14000, close: 48000 }, SC_Female: { open: 15000, close: 50000 }, ST_Male: { open: 21000, close: 66000 }, ST_Female: { open: 22000, close: 68000 } },
  }),

  // === HITAM ===
  ...generateCutoffs('HITM', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 10000, close: 38000 }, OC_Female: { open: 10500, close: 39500 }, BC_Male: { open: 12000, close: 43000 }, BC_Female: { open: 13000, close: 45000 }, SC_Male: { open: 17000, close: 56000 }, SC_Female: { open: 18000, close: 58000 }, ST_Male: { open: 25000, close: 75000 }, ST_Female: { open: 26000, close: 77000 } },
  }),

  // === Vignan Institute of Technology & Science ===
  ...generateCutoffs('VITS', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 9500, close: 36000 }, OC_Female: { open: 10000, close: 37500 }, BC_Male: { open: 11500, close: 42000 }, BC_Female: { open: 12500, close: 44000 }, SC_Male: { open: 16500, close: 54000 }, SC_Female: { open: 17500, close: 56000 }, ST_Male: { open: 24500, close: 73000 }, ST_Female: { open: 25500, close: 75000 } },
  }),

  // === Methodist College ===
  ...generateCutoffs('MCET', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 8500, close: 33000 }, OC_Female: { open: 9000, close: 34500 }, BC_Male: { open: 10500, close: 38000 }, BC_Female: { open: 11500, close: 40000 }, SC_Male: { open: 15000, close: 51000 }, SC_Female: { open: 16000, close: 53000 }, ST_Male: { open: 22500, close: 69000 }, ST_Female: { open: 23500, close: 71000 } },
  }),

  // === St. Martin's Engineering College ===
  ...generateCutoffs('SMEC', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 12000, close: 42000 }, OC_Female: { open: 13000, close: 44000 }, BC_Male: { open: 14500, close: 48000 }, BC_Female: { open: 15500, close: 50000 }, SC_Male: { open: 19000, close: 60000 }, SC_Female: { open: 20000, close: 62000 }, ST_Male: { open: 28000, close: 80000 }, ST_Female: { open: 29000, close: 82000 } },
  }),

  // === CMR Engineering College ===
  ...generateCutoffs('CMRE', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 11000, close: 40000 }, OC_Female: { open: 11500, close: 42000 }, BC_Male: { open: 13500, close: 46000 }, BC_Female: { open: 14500, close: 48000 }, SC_Male: { open: 18000, close: 58000 }, SC_Female: { open: 19000, close: 60000 }, ST_Male: { open: 26000, close: 78000 }, ST_Female: { open: 27000, close: 80000 } },
  }),

  // === Geethanjali College of Engineering ===
  ...generateCutoffs('GEET', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 10500, close: 39000 }, OC_Female: { open: 11000, close: 41000 }, BC_Male: { open: 13000, close: 45000 }, BC_Female: { open: 14000, close: 47000 }, SC_Male: { open: 17500, close: 57000 }, SC_Female: { open: 18500, close: 59000 }, ST_Male: { open: 25500, close: 76000 }, ST_Female: { open: 26500, close: 78000 } },
  }),

  // === KITS Warangal ===
  ...generateCutoffs('KITS', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 5500, close: 23000 }, OC_Female: { open: 6000, close: 24000 }, BC_Male: { open: 7000, close: 27000 }, BC_Female: { open: 7500, close: 28500 }, SC_Male: { open: 11000, close: 42000 }, SC_Female: { open: 12000, close: 44000 }, ST_Male: { open: 17000, close: 58000 }, ST_Female: { open: 18000, close: 60000 } },
  }),

  // === SR Engineering College Warangal ===
  ...generateCutoffs('SREC', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 6000, close: 25000 }, OC_Female: { open: 6500, close: 26000 }, BC_Male: { open: 7500, close: 29000 }, BC_Female: { open: 8000, close: 30500 }, SC_Male: { open: 12000, close: 44000 }, SC_Female: { open: 13000, close: 46000 }, ST_Male: { open: 18000, close: 60000 }, ST_Female: { open: 19000, close: 62000 } },
  }),

  // === ECE cutoffs for additional colleges ===
  ...generateCutoffs('VCE', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 3000, close: 17500 }, OC_Female: { open: 3500, close: 18200 }, BC_Male: { open: 4200, close: 21000 }, BC_Female: { open: 4600, close: 22500 }, SC_Male: { open: 8000, close: 34000 }, SC_Female: { open: 8700, close: 35500 }, ST_Male: { open: 14000, close: 51000 }, ST_Female: { open: 15000, close: 53000 } },
  }),
  ...generateCutoffs('JNTH', 'EEE', 'B.Tech Electrical & Electronics Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 3500, close: 15000 }, OC_Female: { open: 4000, close: 16000 }, BC_Male: { open: 5000, close: 18500 }, BC_Female: { open: 5500, close: 20000 }, SC_Male: { open: 8000, close: 32000 }, SC_Female: { open: 8800, close: 34000 }, ST_Male: { open: 13000, close: 48000 }, ST_Female: { open: 14000, close: 50000 } },
  }),
  ...generateCutoffs('OUCE', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 1200, close: 6500 }, OC_Female: { open: 1500, close: 7200 }, BC_Male: { open: 2000, close: 8800 }, BC_Female: { open: 2500, close: 9500 }, SC_Male: { open: 4500, close: 20000 }, SC_Female: { open: 5000, close: 21500 }, ST_Male: { open: 7500, close: 32000 }, ST_Female: { open: 8200, close: 34000 } },
  }),
  ...generateCutoffs('VARD', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 5500, close: 23000 }, OC_Female: { open: 6000, close: 24000 }, BC_Male: { open: 7000, close: 27000 }, BC_Female: { open: 7500, close: 28500 }, SC_Male: { open: 11000, close: 42000 }, SC_Female: { open: 12000, close: 44000 }, ST_Male: { open: 17000, close: 58000 }, ST_Female: { open: 18000, close: 60000 } },
  }),
  ...generateCutoffs('SNIS', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 5500, close: 23500 }, OC_Female: { open: 6000, close: 24500 }, BC_Male: { open: 7000, close: 27500 }, BC_Female: { open: 7500, close: 29000 }, SC_Male: { open: 11500, close: 43000 }, SC_Female: { open: 12500, close: 45000 }, ST_Male: { open: 17500, close: 59000 }, ST_Female: { open: 18500, close: 61000 } },
  }),

  // === MJCET ===
  ...generateCutoffs('MJC', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 5800, close: 24000 }, OC_Female: { open: 6200, close: 25000 }, BC_Male: { open: 7200, close: 28000 }, BC_Female: { open: 7800, close: 29500 }, SC_Male: { open: 12000, close: 44000 }, SC_Female: { open: 13000, close: 46000 }, ST_Male: { open: 18000, close: 61000 }, ST_Female: { open: 19000, close: 63000 } },
  }),

  // === VBIT ===
  ...generateCutoffs('VBIT', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 7500, close: 29000 }, OC_Female: { open: 8000, close: 30500 }, BC_Male: { open: 9500, close: 34000 }, BC_Female: { open: 10500, close: 36000 }, SC_Male: { open: 14000, close: 49000 }, SC_Female: { open: 15000, close: 51000 }, ST_Male: { open: 21000, close: 67000 }, ST_Female: { open: 22000, close: 69000 } },
  }),

  // === CMR Technical Campus ===
  ...generateCutoffs('CMRT', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 10500, close: 38000 }, OC_Female: { open: 11000, close: 39500 }, BC_Male: { open: 13000, close: 44000 }, BC_Female: { open: 14000, close: 46000 }, SC_Male: { open: 17500, close: 56000 }, SC_Female: { open: 18500, close: 58000 }, ST_Male: { open: 25500, close: 75000 }, ST_Female: { open: 26500, close: 77000 } },
  }),

  // === Anurag Engineering College ===
  ...generateCutoffs('ANEC', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 15000, close: 48000 }, OC_Female: { open: 15500, close: 50000 }, BC_Male: { open: 17000, close: 54000 }, BC_Female: { open: 18000, close: 56000 }, SC_Male: { open: 22000, close: 65000 }, SC_Female: { open: 23000, close: 67000 }, ST_Male: { open: 30000, close: 85000 }, ST_Female: { open: 31000, close: 87000 } },
  }),

  // === Sreyas Institute ===
  ...generateCutoffs('SREY', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 14000, close: 45000 }, OC_Female: { open: 14500, close: 47000 }, BC_Male: { open: 16000, close: 51000 }, BC_Female: { open: 17000, close: 53000 }, SC_Male: { open: 21000, close: 63000 }, SC_Female: { open: 22000, close: 65000 }, ST_Male: { open: 29000, close: 83000 }, ST_Female: { open: 30000, close: 85000 } },
  }),

  // === Malla Reddy College of Engineering ===
  ...generateCutoffs('MRCE', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 8000, close: 31000 }, OC_Female: { open: 8500, close: 32500 }, BC_Male: { open: 10000, close: 36000 }, BC_Female: { open: 11000, close: 38000 }, SC_Male: { open: 14500, close: 49000 }, SC_Female: { open: 15500, close: 51000 }, ST_Male: { open: 21500, close: 67000 }, ST_Female: { open: 22500, close: 69000 } },
  }),

  // === Lords Institute ===
  ...generateCutoffs('LORD', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 13000, close: 43000 }, OC_Female: { open: 13500, close: 45000 }, BC_Male: { open: 15000, close: 49000 }, BC_Female: { open: 16000, close: 51000 }, SC_Male: { open: 20000, close: 61000 }, SC_Female: { open: 21000, close: 63000 }, ST_Male: { open: 28000, close: 81000 }, ST_Female: { open: 29000, close: 83000 } },
  }),

  // === Siddhartha Institute of Engineering & Technology ===
  ...generateCutoffs('SSIE', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 13500, close: 44000 }, OC_Female: { open: 14000, close: 46000 }, BC_Male: { open: 15500, close: 50000 }, BC_Female: { open: 16500, close: 52000 }, SC_Male: { open: 20500, close: 62000 }, SC_Female: { open: 21500, close: 64000 }, ST_Male: { open: 28500, close: 82000 }, ST_Female: { open: 29500, close: 84000 } },
  }),

  // === St. Peter's Engineering College ===
  ...generateCutoffs('SPEC', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 11500, close: 41000 }, OC_Female: { open: 12000, close: 43000 }, BC_Male: { open: 14000, close: 47000 }, BC_Female: { open: 15000, close: 49000 }, SC_Male: { open: 18500, close: 59000 }, SC_Female: { open: 19500, close: 61000 }, ST_Male: { open: 27000, close: 79000 }, ST_Female: { open: 28000, close: 81000 } },
  }),

  // === Guru Nanak Institutions ===
  ...generateCutoffs('GNIT', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 7000, close: 27000 }, OC_Female: { open: 7500, close: 28000 }, BC_Male: { open: 8800, close: 31500 }, BC_Female: { open: 9500, close: 33000 }, SC_Male: { open: 13500, close: 47000 }, SC_Female: { open: 14500, close: 49000 }, ST_Male: { open: 20000, close: 65000 }, ST_Female: { open: 21000, close: 67000 } },
  }),

  // === CVR ECE ===
  ...generateCutoffs('CVR', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 5000, close: 22000 }, OC_Female: { open: 5500, close: 23000 }, BC_Male: { open: 6500, close: 26000 }, BC_Female: { open: 7000, close: 27500 }, SC_Male: { open: 10500, close: 41000 }, SC_Female: { open: 11500, close: 43000 }, ST_Male: { open: 16000, close: 56000 }, ST_Female: { open: 17000, close: 58000 } },
  }),

  // === BVRIT ECE ===
  ...generateCutoffs('BVR', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 6000, close: 25000 }, OC_Female: { open: 6500, close: 26000 }, BC_Male: { open: 7800, close: 29500 }, BC_Female: { open: 8500, close: 31000 }, SC_Male: { open: 12000, close: 45000 }, SC_Female: { open: 13000, close: 47000 }, ST_Male: { open: 18000, close: 60000 }, ST_Female: { open: 19000, close: 62000 } },
  }),

  // === IARE ECE ===
  ...generateCutoffs('IARE', 'ECE', 'B.Tech Electronics & Communication Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 6500, close: 26000 }, OC_Female: { open: 7000, close: 27000 }, BC_Male: { open: 8200, close: 30500 }, BC_Female: { open: 9000, close: 32000 }, SC_Male: { open: 13000, close: 46000 }, SC_Female: { open: 14000, close: 48000 }, ST_Male: { open: 19000, close: 62000 }, ST_Female: { open: 20000, close: 64000 } },
  }),

  // === Mechanical Engineering cutoffs for major colleges ===
  ...generateCutoffs('CBIT', 'ME', 'B.Tech Mechanical Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 8000, close: 35000 }, OC_Female: { open: 8500, close: 36500 }, BC_Male: { open: 10000, close: 40000 }, BC_Female: { open: 11000, close: 42000 }, SC_Male: { open: 15000, close: 55000 }, SC_Female: { open: 16000, close: 57000 }, ST_Male: { open: 22000, close: 75000 }, ST_Female: { open: 23000, close: 77000 } },
  }),
  ...generateCutoffs('VNRV', 'ME', 'B.Tech Mechanical Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 9000, close: 37000 }, OC_Female: { open: 9500, close: 38500 }, BC_Male: { open: 11000, close: 42000 }, BC_Female: { open: 12000, close: 44000 }, SC_Male: { open: 16000, close: 57000 }, SC_Female: { open: 17000, close: 59000 }, ST_Male: { open: 23000, close: 77000 }, ST_Female: { open: 24000, close: 79000 } },
  }),
  ...generateCutoffs('JNTH', 'ME', 'B.Tech Mechanical Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 3000, close: 14000 }, OC_Female: { open: 3500, close: 15000 }, BC_Male: { open: 4500, close: 17500 }, BC_Female: { open: 5000, close: 19000 }, SC_Male: { open: 8000, close: 30000 }, SC_Female: { open: 8800, close: 32000 }, ST_Male: { open: 13000, close: 46000 }, ST_Female: { open: 14000, close: 48000 } },
  }),
  ...generateCutoffs('OUCE', 'ME', 'B.Tech Mechanical Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 2500, close: 12000 }, OC_Female: { open: 3000, close: 13000 }, BC_Male: { open: 3800, close: 15500 }, BC_Female: { open: 4200, close: 17000 }, SC_Male: { open: 7000, close: 28000 }, SC_Female: { open: 7800, close: 30000 }, ST_Male: { open: 12000, close: 44000 }, ST_Female: { open: 13000, close: 46000 } },
  }),

  // === Civil Engineering cutoffs ===
  ...generateCutoffs('CBIT', 'CE', 'B.Tech Civil Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 10000, close: 40000 }, OC_Female: { open: 10500, close: 42000 }, BC_Male: { open: 12000, close: 46000 }, BC_Female: { open: 13000, close: 48000 }, SC_Male: { open: 17000, close: 60000 }, SC_Female: { open: 18000, close: 62000 }, ST_Male: { open: 25000, close: 80000 }, ST_Female: { open: 26000, close: 82000 } },
  }),
  ...generateCutoffs('VNRV', 'CE', 'B.Tech Civil Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 11000, close: 42000 }, OC_Female: { open: 11500, close: 44000 }, BC_Male: { open: 13000, close: 48000 }, BC_Female: { open: 14000, close: 50000 }, SC_Male: { open: 18000, close: 62000 }, SC_Female: { open: 19000, close: 64000 }, ST_Male: { open: 26000, close: 82000 }, ST_Female: { open: 27000, close: 84000 } },
  }),
  ...generateCutoffs('OUCE', 'CE', 'B.Tech Civil Engineering', 'B.Tech', {
    2024: { OC_Male: { open: 3500, close: 16000 }, OC_Female: { open: 4000, close: 17000 }, BC_Male: { open: 5000, close: 20000 }, BC_Female: { open: 5500, close: 21500 }, SC_Male: { open: 8500, close: 34000 }, SC_Female: { open: 9500, close: 36000 }, ST_Male: { open: 14000, close: 50000 }, ST_Female: { open: 15000, close: 52000 } },
  }),

  // === IIIT Hyderabad (for reference - uses JEE Advanced) ===
];

// Add IIITH data with JEE Advanced exam name
const iiithCutoffs: CutoffSeed[] = [];
const iiithData = generateCutoffs('IIITH', 'CSE', 'B.Tech Computer Science & Engineering', 'B.Tech', {
  2024: { OC_Male: { open: 50, close: 350 }, OC_Female: { open: 80, close: 420 }, BC_Male: { open: 150, close: 500 }, BC_Female: { open: 200, close: 580 }, SC_Male: { open: 500, close: 1500 }, SC_Female: { open: 600, close: 1800 }, ST_Male: { open: 1000, close: 3000 }, ST_Female: { open: 1200, close: 3500 } },
});
iiithData.forEach(c => {
  iiithCutoffs.push({ ...c, examName: 'JEE Advanced' });
});
telanganaCutoffData.push(...iiithCutoffs);

// Apply examName = 'TG EAPCET' to all cutoff entries that don't have it
export const telanganaCutoffs = telanganaCutoffData.map(c => ({
  ...c,
  examName: c.examName || ('TG EAPCET' as const),
}));

