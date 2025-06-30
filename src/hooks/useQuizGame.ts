import { useState, useCallback } from 'react';
import { GameState, Subject, Question, GameSettings } from '../types';
import { getRandomPunishment } from '../data/punishments';

const initialGameState: GameState = {
  currentSubject: null,
  currentQuestion: null,
  currentQuestionIndex: 0,
  score: 0,
  totalQuestions: 0,
  gameMode: 'solo',
  isPlaying: false,
  showAnswer: false,
  showPunishment: false,
  timeRemaining: 30,
  achievements: [],
  streak: 0
};

const initialSettings: GameSettings = {
  timerDuration: 30,
  difficulty: 'mixed',
  soundEnabled: true,
  musicEnabled: true,
  darkMode: false
};

export const useQuizGame = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [settings, setSettings] = useState<GameSettings>(initialSettings);
  const [currentPunishment, setCurrentPunishment] = useState<string>('');

  const startGame = useCallback((subject: Subject, mode: 'solo' | 'social') => {
    const filteredQuestions = settings.difficulty === 'mixed' 
      ? subject.questions 
      : subject.questions.filter(q => q.difficulty === settings.difficulty);

    setGameState({
      ...initialGameState,
      currentSubject: subject,
      currentQuestion: filteredQuestions[0] || null,
      gameMode: mode,
      isPlaying: true,
      totalQuestions: filteredQuestions.length,
      timeRemaining: settings.timerDuration
    });
  }, [settings]);

  const nextQuestion = useCallback(() => {
    const { currentSubject, currentQuestionIndex } = gameState;
    if (!currentSubject) return;

    const filteredQuestions = settings.difficulty === 'mixed' 
      ? currentSubject.questions 
      : currentSubject.questions.filter(q => q.difficulty === settings.difficulty);

    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex >= filteredQuestions.length) {
      // Game over
      setGameState(prev => ({
        ...prev,
        isPlaying: false,
        showAnswer: false,
        showPunishment: false
      }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: nextIndex,
      currentQuestion: filteredQuestions[nextIndex],
      showAnswer: false,
      showPunishment: false,
      timeRemaining: settings.timerDuration
    }));
  }, [gameState, settings]);

  const answerQuestion = useCallback((answer: string, isCorrect: boolean) => {
    setGameState(prev => ({
      ...prev,
      showAnswer: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      streak: isCorrect ? prev.streak + 1 : 0
    }));

    if (!isCorrect) {
      setCurrentPunishment(getRandomPunishment());
      setGameState(prev => ({ ...prev, showPunishment: true }));
    }
  }, []);

  const timeUp = useCallback(() => {
    setCurrentPunishment(getRandomPunishment());
    setGameState(prev => ({
      ...prev,
      showAnswer: true,
      showPunishment: true,
      streak: 0
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
    setCurrentPunishment('');
  }, []);

  const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return {
    gameState,
    settings,
    currentPunishment,
    startGame,
    nextQuestion,
    answerQuestion,
    timeUp,
    resetGame,
    updateSettings
  };
};