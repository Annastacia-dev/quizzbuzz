import React from 'react';
import { motion } from 'framer-motion';
import { Users, User, ChevronLeft, Gamepad2, Timer } from 'lucide-react';
import { Subject } from '../types';

interface GameModeSelectorProps {
  subject: Subject;
  onSelectMode: (mode: 'solo' | 'social') => void;
  onBack: () => void;
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({ 
  subject, 
  onSelectMode, 
  onBack 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
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
          
          <div className="text-center">
            <div className="text-4xl mb-2">{subject.icon}</div>
            <h1 className="text-2xl md:text-4xl font-black text-white font-['Fredoka_One']">
              {subject.name}
            </h1>
          </div>
          
          <div className="w-16" />
        </motion.div>

        {/* Mode Selection */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4 font-['Fredoka_One']">
            Choose Your Mode
          </h2>
          <p className="text-white/70 text-lg">
            How do you want to play today?
          </p>
        </div>

        {/* Game Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Solo Mode */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => onSelectMode('solo')}
              className="group relative w-full p-8 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Background Elements */}
              <div className="absolute inset-0 opacity-10">
                <User className="absolute top-4 right-4 w-24 h-24 transform rotate-12" />
                <Gamepad2 className="absolute bottom-4 left-4 w-16 h-16 transform -rotate-12" />
              </div>

              <div className="relative z-10 text-center text-white">
                <div className="mb-6">
                  <User className="w-16 h-16 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4">Solo Mode</h3>
                
                <div className="space-y-3 text-white/90">
                  <div className="flex items-center justify-center gap-2">
                    <Timer className="w-4 h-4" />
                    <span>Multiple choice questions</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Gamepad2 className="w-4 h-4" />
                    <span>Perfect for practice</span>
                  </div>
                </div>
                
                <p className="text-white/70 text-sm mt-4">
                  Challenge yourself with timed questions and track your progress
                </p>
              </div>

              <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>

          {/* Social Mode */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => onSelectMode('social')}
              className="group relative w-full p-8 rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Background Elements */}
              <div className="absolute inset-0 opacity-10">
                <Users className="absolute top-4 right-4 w-24 h-24 transform rotate-12" />
                <Timer className="absolute bottom-4 left-4 w-16 h-16 transform -rotate-12" />
              </div>

              <div className="relative z-10 text-center text-white">
                <div className="mb-6">
                  <Users className="w-16 h-16 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4">Social Mode</h3>
                
                <div className="space-y-3 text-white/90">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Shout out answers</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Timer className="w-4 h-4" />
                    <span>Fun punishments</span>
                  </div>
                </div>
                
                <p className="text-white/70 text-sm mt-4">
                  Perfect for parties and group fun with hilarious consequences
                </p>
              </div>

              <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-white/60"
        >
          <p className="text-lg">
            Ready to test your knowledge in <span className="text-white font-semibold">{subject.name}</span>?
          </p>
        </motion.div>
      </div>
    </div>
  );
};