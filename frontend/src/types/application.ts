export type ApplicationStatus =
  | 'submitted'
  | 'document_verification'
  | 'review'
  | 'interview'
  | 'selected'
  | 'admitted'
  | 'rejected';

export interface Application {
  id: string;
  userId: string;
  universityId: string;
  courseId: string;
  status: ApplicationStatus;
  documents: string[];
  feePaid: boolean;
  offerLetter?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId?: string;
  content: string;
  type: 'text' | 'file' | 'system';
  timestamp: string;
  read: boolean;
}
