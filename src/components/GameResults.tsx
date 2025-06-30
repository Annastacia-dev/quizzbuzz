import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D } from '@react-three/drei';
import { Trophy, Target, RotateCcw, Home, Share2 } from 'lucide-react';
import { GameState } from '../types';

interface GameResultsProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const TrophyFloat = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <Text3D
        font="/fonts/fredoka-one.json"
        size={1.5}
        height={0.3}
        curveSegments={12}
        position={[-2, 0, 0]}
      >
        🏆
        <meshStandardMaterial 
          color="#ffd700" 
          roughness={0.1}
          metalness={0.8}
        />
      </Text3D>
    </Float>
  );
};

export const GameResults: React.FC<GameResultsProps> = ({
  gameState,
  onPlayAgain,
  onBackToMenu
}) => {
  const percentage = Math.round((gameState.score / gameState.totalQuestions) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-400', message: 'Outstanding!' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-300', message: 'Excellent!' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-400', message: 'Great job!' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-400', message: 'Good effort!' };
    return { grade: 'D', color: 'text-red-400', message: 'Keep practicing!' };
  };

  const { grade, color, message } = getGrade();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              i % 4 === 0 ? 'bg-yellow-400' :
              i % 4 === 1 ? 'bg-pink-400' :
              i % 4 === 2 ? 'bg-cyan-400' : 'bg-purple-400'
            }`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -10,
              rotation: 0,
            }}
            animate={{
              y: window.innerHeight + 10,
              rotation: 360,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 3D Trophy Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <TrophyFloat />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        {/* Main Results Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 font-['Fredoka_One']"
          >
            Quiz Complete!
          </motion.h1>

          {/* Score Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 2.51} 251`}
                initial={{ strokeDasharray: "0 251" }}
                animate={{ strokeDasharray: `${percentage * 2.51} 251` }}
                transition={{ delay: 0.7, duration: 1.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${color}`}>{grade}</span>
              <span className="text-white/70 text-sm">{percentage}%</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 gap-6 mb-8"
          >
            <div className="bg-green-500/20 rounded-2xl p-4 border border-green-500/30">
              <Trophy className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{gameState.score}</div>
              <div className="text-green-300 text-sm">Correct</div>
            </div>
            <div className="bg-blue-500/20 rounded-2xl p-4 border border-blue-500/30">
              <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{gameState.totalQuestions}</div>
              <div className="text-blue-300 text-sm">Total</div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-2xl font-bold text-white mb-2"
          >
            {message}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-white/70 mb-8"
          >
            You answered {gameState.score} out of {gameState.totalQuestions} questions correctly in {gameState.currentSubject?.name}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={onPlayAgain}
              className="group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3">
                <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                <span>Play Again</span>
              </div>
            </button>

            <button
              onClick={onBackToMenu}
              className="group bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3">
                <Home className="w-5 h-5" />
                <span>Main Menu</span>
              </div>
            </button>
          </motion.div>

          {/* Share Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="group mt-4 text-white/70 hover:text-white transition-colors"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'QuizBuzz Results',
                  text: `I just scored ${percentage}% on ${gameState.currentSubject?.name} in QuizBuzz!`,
                });
              }
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share Results</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};