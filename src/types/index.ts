
export interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  mood: string;
  date: string;
  timestamp: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  date: string;
}
