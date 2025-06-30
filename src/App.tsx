import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SplashScreen } from './components/SplashScreen';
import { SubjectSelection } from './components/SubjectSelection';
import { GameModeSelector } from './components/GameModeSelector';
import { GameScreen } from './components/GameScreen';
import { GameResults } from './components/GameResults';
import { useQuizGame } from './hooks/useQuizGame';
import { subjects } from './data/subjects';
import { Subject } from './types';

type AppState = 'splash' | 'subjects' | 'modes' | 'playing' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  
  const {
    gameState,
    settings,
    currentPunishment,
    startGame,
    nextQuestion,
    answerQuestion,
    timeUp,
    resetGame
  } = useQuizGame();

  const handleStart = () => {
    setCurrentState('subjects');
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentState('modes');
  };

  const handleModeSelect = (mode: 'solo' | 'social') => {
    if (selectedSubject) {
      startGame(selectedSubject, mode);
      setCurrentState('playing');
    }
  };

  const handleNextQuestion = () => {
    if (gameState.currentQuestionIndex + 1 >= gameState.totalQuestions) {
      setCurrentState('results');
    } else {
      nextQuestion();
    }
  };

  const handlePlayAgain = () => {
    if (selectedSubject) {
      startGame(selectedSubject, gameState.gameMode);
      setCurrentState('playing');
    }
  };

  const handleBackToMenu = () => {
    resetGame();
    setSelectedSubject(null);
    setCurrentState('splash');
  };

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'splash':
        return <SplashScreen onStart={handleStart} />;
      
      case 'subjects':
        return (
          <SubjectSelection
            subjects={subjects}
            onSelectSubject={handleSubjectSelect}
            onBack={() => setCurrentState('splash')}
          />
        );
      
      case 'modes':
        return selectedSubject ? (
          <GameModeSelector
            subject={selectedSubject}
            onSelectMode={handleModeSelect}
            onBack={() => setCurrentState('subjects')}
          />
        ) : null;
      
      case 'playing':
        return (
          <GameScreen
            gameState={gameState}
            currentPunishment={currentPunishment}
            timerDuration={settings.timerDuration}
            onAnswer={answerQuestion}
            onTimeUp={timeUp}
            onNextQuestion={handleNextQuestion}
            onBack={() => setCurrentState('modes')}
          />
        );
      
      case 'results':
        return (
          <GameResults
            gameState={gameState}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={handleBackToMenu}
          />
        );
      
      default:
        return <SplashScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {renderCurrentScreen()}
      </AnimatePresence>
    </div>
  );
}

export default App;