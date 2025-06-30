import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Summarizer from './components/Summarizer';
import GoalBreakdown from './components/GoalBreakdown';
import JournalToTasks from './components/JournalToTasks';
import VisualPlanner from './components/VisualPlanner';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'summarize':
        return <Summarizer />;
      case 'breakdown':
        return <GoalBreakdown />;
      case 'journal':
        return <JournalToTasks />;
      case 'planner':
        return <VisualPlanner />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-all duration-500">
        <Header 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="transition-all duration-500 ease-in-out">
            {renderActiveComponent()}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 mt-16 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p className="text-sm transition-colors duration-300">
                NeuroLens - Designed with love for neurodivergent minds ❤️
              </p>
              <p className="text-xs mt-1 transition-colors duration-300">
                Remember: You're not broken. Your brain just works differently, and that's your superpower.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;