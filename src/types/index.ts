export interface Question {
  id: string;
  question: string;
  answer: string;
  choices?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  questions: Question[];
}

export interface GameState {
  currentSubject: Subject | null;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
  gameMode: 'solo' | 'social';
  isPlaying: boolean;
  showAnswer: boolean;
  showPunishment: boolean;
  timeRemaining: number;
  achievements: string[];
  streak: number;
}

export interface GameSettings {
  timerDuration: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  soundEnabled: boolean;
  musicEnabled: boolean;
  darkMode: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}