import React, { useState } from 'react';
import { Target, Plus, CheckCircle, Calendar, AlertCircle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const GoalBreakdown: React.FC = () => {
  const [goalInput, setGoalInput] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleBreakdown = async () => {
    if (!goalInput.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockTasks: Task[] = [
        {
          id: 1,
          title: "Research and list target colleges (3-5 schools)",
          deadline: "2024-02-15",
          priority: 'high',
          completed: false
        },
        {
          id: 2,
          title: "Request official transcripts from high school",
          deadline: "2024-02-10",
          priority: 'high',
          completed: false
        },
        {
          id: 3,
          title: "Draft personal statement (first version)",
          deadline: "2024-02-20",
          priority: 'high',
          completed: false
        },
        {
          id: 4,
          title: "Reach out to 2 teachers for recommendation letters",
          deadline: "2024-02-08",
          priority: 'medium',
          completed: false
        },
        {
          id: 5,
          title: "Complete FAFSA application",
          deadline: "2024-02-25",
          priority: 'medium',
          completed: false
        },
        {
          id: 6,
          title: "Schedule and take SAT/ACT if needed",
          deadline: "2024-02-28",
          priority: 'low',
          completed: false
        }
      ];
      
      setTasks(mockTasks);
      setIsLoading(false);
    }, 2000);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDeadlineStatus = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { color: 'text-red-600', text: 'Overdue' };
    if (diffDays === 0) return { color: 'text-orange-600', text: 'Due today' };
    if (diffDays <= 3) return { color: 'text-orange-600', text: `Due in ${diffDays} days` };
    return { color: 'text-gray-600', text: `Due in ${diffDays} days` };
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Target className="w-8 h-8 text-purple-500" />
          <h2 className="text-3xl font-bold text-gray-900">Goal Breakdown</h2>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Tell me about a big goal or project that feels overwhelming. I'll break it down into 
          manageable, ADHD-friendly steps with clear deadlines.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What goal would you like to break down?
        </label>
        <textarea
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          placeholder="Example: 'I want to apply to college but it feels overwhelming' or 'I need to organize my entire apartment' or 'I want to start a side business'"
          className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
        />
        <button
          onClick={handleBreakdown}
          disabled={!goalInput.trim() || isLoading}
          className="mt-4 w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Breaking it down...</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span>Break Down Goal</span>
            </>
          )}
        </button>
      </div>

      {/* Tasks List */}
      {tasks.length > 0 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">🎯 Your Action Plan</h3>
            <p className="text-gray-700">
              Great! I've broken down your goal into {tasks.length} manageable steps. 
              Focus on one at a time, and remember - progress over perfection!
            </p>
          </div>

          <div className="space-y-4">
            {tasks.map((task, index) => {
              const deadlineStatus = getDeadlineStatus(task.deadline);
              return (
                <div 
                  key={task.id}
                  className={`bg-white rounded-xl p-6 border transition-all duration-200 hover:shadow-md ${
                    task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        task.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300 hover:border-purple-400'
                      }`}
                    >
                      {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className={`font-medium text-lg ${
                          task.completed ? 'text-gray-600 line-through' : 'text-gray-900'
                        }`}>
                          Step {index + 1}: {task.title}
                        </h4>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority} priority
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            Due: {new Date(task.deadline).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className={`w-4 h-4 ${deadlineStatus.color.replace('text-', 'text-')}`} />
                          <span className={deadlineStatus.color}>
                            {deadlineStatus.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Encouragement */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💪</span>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">You've got this!</h4>
                <p className="text-gray-700">
                  Remember: it's okay to adjust deadlines if needed. The goal is progress, not perfection. 
                  Celebrate each completed step - they all add up to big wins!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalBreakdown;