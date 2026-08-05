export interface ScholarshipEligibility {
  minIncome?: number;
  maxIncome?: number;
  category?: string;
  gender?: string;
  state?: string;
  minMarks?: number;
  disability?: boolean;
  sports?: boolean;
  minorityStatus?: boolean;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: number;
  eligibility: ScholarshipEligibility;
  deadline: string;
  description: string;
  documentChecklist: string[];
  category: string;
}
