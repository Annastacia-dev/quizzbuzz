import React from 'react';
import { motion } from 'framer-motion';
import { Zap, RotateCcw } from 'lucide-react';

interface PunishmentDisplayProps {
  punishment: string;
  onContinue: () => void;
}

export const PunishmentDisplay: React.FC<PunishmentDisplayProps> = ({ 
  punishment, 
  onContinue 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl p-8 max-w-md w-full text-center border-4 border-white/20 shadow-2xl"
      >
        {/* Lightning Animation */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 5, -5, 0],
            scale: [1, 1.1, 1, 1.05, 1]
          }}
          transition={{ duration: 0.6, repeat: 2 }}
          className="mb-6"
        >
          <Zap className="w-16 h-16 mx-auto text-yellow-300" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-black text-white mb-4 font-['Fredoka_One']"
        >
          Time for Your Punishment!
        </motion.h2>

        {/* Punishment Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/20 rounded-2xl p-6 mb-8"
        >
          <p className="text-xl md:text-2xl font-bold text-white">
            {punishment}
          </p>
        </motion.div>

        {/* Floating Emojis */}
        <div className="absolute inset-0 pointer-events-none">
          {['😅', '🎭', '💃', '🎪', '🎨'].map((emoji, index) => (
            <motion.div
              key={index}
              className="absolute text-2xl"
              style={{
                left: `${20 + index * 15}%`,
                top: `${20 + (index % 2) * 40}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 2 + index * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          onClick={onContinue}
          className="group bg-white text-red-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
            <span>I Did It! Continue</span>
          </div>
        </motion.button>

        {/* Fun Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-white/70 text-sm mt-4"
        >
          Don't worry, we've all been there! 😄
        </motion.p>
      </motion.div>
    </motion.div>
  );
};