import React from 'react';
import { motion } from 'framer-motion';
import { Subject } from '../types';
import { ChevronLeft, Sparkles } from 'lucide-react';

interface SubjectSelectionProps {
  subjects: Subject[];
  onSelectSubject: (subject: Subject) => void;
  onBack: () => void;
}

export const SubjectSelection: React.FC<SubjectSelectionProps> = ({ 
  subjects, 
  onSelectSubject, 
  onBack 
}) => {
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
          
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-['Fredoka_One']">
            Choose Your Challenge
          </h1>
          
          <div className="w-16" /> {/* Spacer */}
        </motion.div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => onSelectSubject(subject)}
                className={`group relative w-full p-6 rounded-2xl ${subject.gradient} hover:shadow-2xl transition-all duration-300 overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 transform rotate-12">
                    <Sparkles className="w-24 h-24" />
                  </div>
                  <div className="absolute bottom-0 left-0 transform -rotate-12">
                    <Sparkles className="w-16 h-16" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {subject.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {subject.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {subject.questions.length} questions
                  </p>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-white/60"
        >
          <p className="text-lg">Select a category to begin your quiz adventure!</p>
        </motion.div>
      </div>
    </div>
  );
};