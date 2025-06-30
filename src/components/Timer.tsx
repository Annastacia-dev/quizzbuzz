import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, totalTime, isActive }) => {
  const progress = ((totalTime - timeRemaining) / totalTime) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (timeRemaining <= 5) return 'text-red-500';
    if (timeRemaining <= 10) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRingColor = () => {
    if (timeRemaining <= 5) return 'stroke-red-500';
    if (timeRemaining <= 10) return 'stroke-yellow-500';
    return 'stroke-green-500';
  };

  return (
    <div className="relative w-24 h-24 mx-auto">
      {/* Background Circle */}
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className={getRingColor()}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Timer Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Clock className={`w-4 h-4 mb-1 ${getColor()}`} />
        <motion.span
          className={`text-xl font-bold ${getColor()}`}
          animate={timeRemaining <= 5 && isActive ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, repeat: timeRemaining <= 5 && isActive ? Infinity : 0 }}
        >
          {timeRemaining}
        </motion.span>
      </div>

      {/* Pulsing Effect for Low Time */}
      {timeRemaining <= 5 && isActive && (
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-red-500"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </div>
  );
};