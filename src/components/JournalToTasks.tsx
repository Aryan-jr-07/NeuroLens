import React, { useState } from 'react';
import { BookOpen, Mic, FileText, CheckSquare, Lightbulb } from 'lucide-react';

interface ExtractedTask {
  id: number;
  text: string;
  category: 'urgent' | 'important' | 'routine' | 'idea';
  priority: number;
}

const JournalToTasks: React.FC = () => {
  const [journalInput, setJournalInput] = useState('');
  const [extractedTasks, setExtractedTasks] = useState<ExtractedTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleExtractTasks = async () => {
    if (!journalInput.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call with mock extracted tasks
    setTimeout(() => {
      const mockTasks: ExtractedTask[] = [
        {
          id: 1,
          text: "Call mom back about dinner plans",
          category: 'urgent',
          priority: 1
        },
        {
          id: 2,
          text: "Schedule dentist appointment",
          category: 'important',
          priority: 2
        },
        {
          id: 3,
          text: "Buy groceries for the week",
          category: 'routine',
          priority: 3
        },
        {
          id: 4,
          text: "Research vacation destinations for summer",
          category: 'idea',
          priority: 4
        },
        {
          id: 5,
          text: "Update resume with recent projects",
          category: 'important',
          priority: 2
        }
      ];
      
      setExtractedTasks(mockTasks);
      setIsLoading(false);
    }, 2000);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        setJournalInput(prev => prev + "\n\nI had a good day today but feeling overwhelmed. Need to call mom back about dinner plans this weekend. Also haven't been to the dentist in ages, should probably schedule that appointment I've been putting off. Running low on groceries again, need to make a proper shopping list. Been thinking about planning a vacation for summer, maybe somewhere warm? Oh and I should update my resume with that project I finished last month.");
      }, 3000);
    }
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'important': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'routine': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'idea': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'urgent': return '🚨';
      case 'important': return '⭐';
      case 'routine': return '📋';
      case 'idea': return '💡';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <BookOpen className="w-8 h-8 text-orange-500" />
          <h2 className="text-3xl font-bold text-gray-900">Journal to Tasks</h2>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Share your thoughts, brain dumps, or voice recordings. I'll help you identify actionable tasks 
          and organize them by priority - perfect for when your mind is racing with ideas!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Share your thoughts:
              </label>
              <button
                onClick={handleVoiceRecord}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isRecording 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                }`}
              >
                <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
                <span>{isRecording ? 'Recording...' : 'Voice Record'}</span>
              </button>
            </div>
            
            <textarea
              value={journalInput}
              onChange={(e) => setJournalInput(e.target.value)}
              placeholder="Write freely about your day, thoughts, worries, or ideas... I'll find the actionable items for you!

Example: 'Had a stressful day at work, need to finish that report by Friday. Mom called about dinner plans. Should probably book that doctor appointment I've been putting off. Feeling overwhelmed with everything...'"
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
            />
            
            <button
              onClick={handleExtractTasks}
              disabled={!journalInput.trim() || isLoading}
              className="mt-4 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Extracting tasks...</span>
                </>
              ) : (
                <>
                  <CheckSquare className="w-5 h-5" />
                  <span>Find My Tasks</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          {extractedTasks.length > 0 ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Found {extractedTasks.length} actionable items!</h3>
                </div>
                <p className="text-gray-700">
                  I've organized them by category and priority. You can tackle them one at a time when you're ready.
                </p>
              </div>

              <div className="space-y-4">
                {extractedTasks
                  .sort((a, b) => a.priority - b.priority)
                  .map((task) => (
                    <div 
                      key={task.id}
                      className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-xl mt-1">{getCategoryIcon(task.category)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 font-medium mb-2">{task.text}</p>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryStyle(task.category)}`}>
                              {task.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              Priority: {task.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-start space-x-3">
                  <span className="text-xl">🌟</span>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">ADHD-Friendly Tip:</h4>
                    <p className="text-gray-700">
                      Start with one urgent item, then one routine task. Alternate between different types 
                      to keep your brain engaged. It's okay to save ideas for later!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Your extracted tasks will appear here once you share your thoughts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalToTasks;