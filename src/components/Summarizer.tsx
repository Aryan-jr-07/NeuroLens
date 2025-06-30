import React, { useState } from 'react';
import { FileText, Sparkles, Copy, CheckCircle } from 'lucide-react';

const Summarizer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockSummary = {
        summary: [
          "This content discusses productivity strategies for neurodivergent individuals",
          "Key points include time-blocking, energy management, and reducing decision fatigue",
          "Emphasizes the importance of self-compassion and realistic goal-setting"
        ],
        tasks: [
          "Try the Pomodoro Technique for 25-minute focused work sessions",
          "Identify your peak energy hours and schedule important tasks then",
          "Create a 'brain dump' list to capture all thoughts and ideas"
        ],
        tip: "Remember: Your brain works differently, and that's your superpower! Work with your natural rhythms, not against them."
      };
      
      setSummary(JSON.stringify(mockSummary));
      setIsLoading(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parsedSummary = summary ? JSON.parse(summary) : null;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <FileText className="w-8 h-8 text-green-500" />
          <h2 className="text-3xl font-bold text-gray-900">Content Summarizer</h2>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Paste long articles, emails, or documents here. I'll break them down into digestible, 
          ADHD-friendly summaries with actionable takeaways.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Paste your content here:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your article, email, meeting notes, or any long text here..."
            className="w-full h-80 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
          />
          <button
            onClick={handleSummarize}
            disabled={!inputText.trim() || isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Summarize Content</span>
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          {parsedSummary ? (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Your Summary</h3>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Summary Points */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🧠</span>
                  <h4 className="font-medium text-gray-900">Summary:</h4>
                </div>
                <ul className="space-y-2 ml-6">
                  {parsedSummary.summary.map((point: string, index: number) => (
                    <li key={index} className="text-gray-700 flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">✅</span>
                  <h4 className="font-medium text-gray-900">Try This:</h4>
                </div>
                <ul className="space-y-2 ml-6">
                  {parsedSummary.tasks.map((task: string, index: number) => (
                    <li key={index} className="text-gray-700 flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tip */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-start space-x-2">
                  <span className="text-lg">💡</span>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Tip:</h4>
                    <p className="text-gray-700">{parsedSummary.tip}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Your summary will appear here once you process your content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summarizer;