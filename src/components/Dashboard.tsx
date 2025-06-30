import React from 'react';
import { CheckCircle, Clock, Target, Lightbulb, TrendingUp, Heart, Sparkles } from 'lucide-react';

const Dashboard: React.FC = () => {
  const todaysTasks = [
    { id: 1, text: 'Review client emails', completed: true, priority: 'high' },
    { id: 2, text: 'Complete project proposal', completed: false, priority: 'high' },
    { id: 3, text: 'Schedule doctor appointment', completed: false, priority: 'medium' },
    { id: 4, text: 'Take a 15-minute walk', completed: true, priority: 'low' }
  ];

  const completedCount = todaysTasks.filter(task => task.completed).length;
  const progressPercentage = (completedCount / todaysTasks.length) * 100;

  const encouragements = [
    "You've got this! One step at a time. 🌟",
    "Progress over perfection - you're doing great! 💪",
    "Remember: it's okay to take breaks when you need them. 🌸",
    "Small wins add up to big victories! 🎉"
  ];

  const todaysEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800 backdrop-blur-sm transition-all duration-500 hover:shadow-lg group">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-6 h-6 text-pink-500 dark:text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back!</h2>
          <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400 animate-pulse" />
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{todaysEncouragement}</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-xl hover:scale-105 group">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <CheckCircle className="w-8 h-8 text-green-500 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Today's Progress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tasks completed</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{completedCount}/{todaysTasks.length}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-xl hover:scale-105 group">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Clock className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Focus Time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's deep work</p>
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">2h 30m</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">Great job maintaining focus!</p>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-xl hover:scale-105 group">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Target className="w-8 h-8 text-purple-500 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Weekly Goals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">On track</p>
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">3/5</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">You're making great progress!</p>
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <span>Today's Tasks</span>
        </h3>
        <div className="space-y-3">
          {todaysTasks.map((task, index) => (
            <div 
              key={task.id}
              className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${
                task.completed 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                task.completed 
                  ? 'bg-green-500 border-green-500 scale-110' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
              }`}>
                {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
              </div>
              <span className={`flex-1 transition-all duration-300 ${
                task.completed ? 'text-gray-600 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'
              }`}>
                {task.text}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                task.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                task.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              }`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 transition-all duration-500 hover:shadow-lg group">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl group-hover:bounce">
            <Lightbulb className="w-6 h-6 text-amber-500 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Today's ADHD-Friendly Tip</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Try the "2-minute rule" - if a task takes less than 2 minutes, do it right away. 
              This prevents small tasks from piling up and becoming overwhelming.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;