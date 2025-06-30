import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialTime: number, onTimeUp?: () => void) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const start = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const reset = useCallback((newTime?: number) => {
    setIsActive(false);
    setIsPaused(false);
    setTimeRemaining(newTime || initialTime);
  }, [initialTime]);

  const stop = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsActive(false);
            onTimeUp?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, timeRemaining, onTimeUp]);

  const progress = ((initialTime - timeRemaining) / initialTime) * 100;

  return {
    timeRemaining,
    isActive,
    isPaused,
    progress,
    start,
    pause,
    resume,
    reset,
    stop
  };
};