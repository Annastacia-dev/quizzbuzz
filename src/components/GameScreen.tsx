import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, SkipForward, Trophy, Target } from 'lucide-react';
import { Timer } from './Timer';
import { QuestionCard } from './QuestionCard';
import { PunishmentDisplay } from './PunishmentDisplay';
import { useTimer } from '../hooks/useTimer';
import { GameState } from '../types';

interface GameScreenProps {
  gameState: GameState;
  currentPunishment: string;
  timerDuration: number;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  onTimeUp: () => void;
  onNextQuestion: () => void;
  onBack: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  gameState,
  currentPunishment,
  timerDuration,
  onAnswer,
  onTimeUp,
  onNextQuestion,
  onBack
}) => {
  const { timeRemaining, isActive, start, reset } = useTimer(timerDuration, onTimeUp);

  useEffect(() => {
    if (gameState.currentQuestion && !gameState.showAnswer) {
      reset(timerDuration);
      start();
    }
  }, [gameState.currentQuestion, gameState.showAnswer, reset, start, timerDuration]);

  if (!gameState.currentSubject || !gameState.currentQuestion) {
    return null;
  }

  const progress = ((gameState.currentQuestionIndex + 1) / gameState.totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-6">
            {/* Score */}
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">
                {gameState.score}/{gameState.totalQuestions}
              </span>
            </div>

            {/* Streak */}
            {gameState.streak > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-orange-500/20 rounded-full px-4 py-2 border border-orange-500/30"
              >
                <Target className="w-5 h-5 text-orange-400" />
                <span className="text-orange-300 font-semibold">
                  {gameState.streak} streak!
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between text-white/70 text-sm mb-2">
            <span>Question {gameState.currentQuestionIndex + 1} of {gameState.totalQuestions}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Timer 
            timeRemaining={timeRemaining}
            totalTime={timerDuration}
            isActive={isActive && !gameState.showAnswer}
          />
        </motion.div>

        {/* Question Card */}
        <QuestionCard
          question={gameState.currentQuestion}
          gameMode={gameState.gameMode}
          onAnswer={onAnswer}
          showAnswer={gameState.showAnswer}
        />

        {/* Next Button */}
        <AnimatePresence>
          {gameState.showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mt-8"
            >
              <button
                onClick={onNextQuestion}
                className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <span>Next Question</span>
                  <SkipForward className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Punishment Modal */}
        <AnimatePresence>
          {gameState.showPunishment && currentPunishment && (
            <PunishmentDisplay
              punishment={currentPunishment}
              onContinue={onNextQuestion}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};