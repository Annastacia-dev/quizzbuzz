import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D } from '@react-three/drei';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  gameMode: 'solo' | 'social';
  onAnswer?: (answer: string, isCorrect: boolean) => void;
  showAnswer: boolean;
}

const FloatingCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 5, 0.2]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.1} metalness={0.8} />
      </mesh>
      {children}
    </Float>
  );
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  gameMode, 
  onAnswer, 
  showAnswer 
}) => {
  const handleAnswerClick = (answer: string) => {
    if (showAnswer || !onAnswer) return;
    const isCorrect = answer === question.answer;
    onAnswer(answer, isCorrect);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingCard>
            <Text3D
              font="/fonts/inter.json"
              size={0.3}
              height={0.1}
              position={[-3, 0, 0.2]}
            >
              ?
              <meshStandardMaterial color="#ffffff" />
            </Text3D>
          </FloatingCard>
        </Canvas>
      </div>

      {/* Question Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
      >
        {/* Question */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            {question.question}
          </h2>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            question.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
            question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            {question.difficulty.toUpperCase()}
          </div>
        </motion.div>

        {/* Solo Mode - Multiple Choice */}
        {gameMode === 'solo' && question.choices && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.choices.map((choice, index) => {
              const isCorrect = choice === question.answer;
              const buttonColor = showAnswer 
                ? isCorrect 
                  ? 'bg-green-500 hover:bg-green-600 border-green-400' 
                  : 'bg-red-500/50 border-red-400'
                : 'bg-white/10 hover:bg-white/20 border-white/30';

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={() => handleAnswerClick(choice)}
                  disabled={showAnswer}
                  className={`p-4 rounded-2xl border-2 text-white font-semibold text-left transition-all duration-300 transform hover:scale-105 ${buttonColor}`}
                  whileHover={!showAnswer ? { scale: 1.02 } : {}}
                  whileTap={!showAnswer ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{choice}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Social Mode - No Choices */}
        {gameMode === 'social' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-8 border border-pink-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                🎤 Shout Your Answers!
              </h3>
              <p className="text-white/70 text-lg">
                First person to call out the correct answer wins!
              </p>
            </div>
          </motion.div>
        )}

        {/* Answer Reveal */}
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
              <h3 className="text-2xl font-bold text-green-300 mb-2">
                ✅ Correct Answer
              </h3>
              <p className="text-3xl font-bold text-white mb-2">
                {question.answer}
              </p>
              {question.explanation && (
                <p className="text-white/70">
                  {question.explanation}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};