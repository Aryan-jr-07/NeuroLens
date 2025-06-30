import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit3, Palette } from 'lucide-react';

interface PlanItem {
  id: number;
  title: string;
  time: string;
  duration: number;
  category: 'work' | 'personal' | 'health' | 'creative' | 'break';
  color: string;
  energy: 'high' | 'medium' | 'low';
}

const VisualPlanner: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [planItems, setPlanItems] = useState<PlanItem[]>([
    {
      id: 1,
      title: "Morning routine & coffee",
      time: "08:00",
      duration: 30,
      category: 'personal',
      color: 'bg-blue-100 border-blue-300',
      energy: 'medium'
    },
    {
      id: 2,
      title: "Deep work - Project report",
      time: "09:00",
      duration: 120,
      category: 'work',
      color: 'bg-green-100 border-green-300',
      energy: 'high'
    },
    {
      id: 3,
      title: "Quick walk outside",
      time: "11:00",
      duration: 15,
      category: 'break',
      color: 'bg-yellow-100 border-yellow-300',
      energy: 'low'
    },
    {
      id: 4,
      title: "Lunch & rest",
      time: "12:00",
      duration: 60,
      category: 'personal',
      color: 'bg-blue-100 border-blue-300',
      energy: 'low'
    },
    {
      id: 5,
      title: "Meetings & calls",
      time: "13:00",
      duration: 90,
      category: 'work',
      color: 'bg-green-100 border-green-300',
      energy: 'medium'
    },
    {
      id: 6,
      title: "Creative brainstorming",
      time: "15:00",
      duration: 45,
      category: 'creative',
      color: 'bg-purple-100 border-purple-300',
      energy: 'high'
    }
  ]);

  const [newItem, setNewItem] = useState({
    title: '',
    time: '',
    duration: 30,
    category: 'work' as const,
    energy: 'medium' as const
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const categoryColors = {
    work: 'bg-green-100 border-green-300 text-green-800',
    personal: 'bg-blue-100 border-blue-300 text-blue-800',
    health: 'bg-red-100 border-red-300 text-red-800',
    creative: 'bg-purple-100 border-purple-300 text-purple-800',
    break: 'bg-yellow-100 border-yellow-300 text-yellow-800'
  };

  const energyIcons = {
    high: '🔥',
    medium: '⚡',
    low: '🌱'
  };

  const addNewItem = () => {
    if (!newItem.title || !newItem.time) return;
    
    const item: PlanItem = {
      id: Date.now(),
      ...newItem,
      color: categoryColors[newItem.category]
    };
    
    setPlanItems([...planItems, item].sort((a, b) => a.time.localeCompare(b.time)));
    setNewItem({ title: '', time: '', duration: 30, category: 'work', energy: 'medium' });
    setShowAddForm(false);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getTotalTime = () => {
    return planItems.reduce((total, item) => total + item.duration, 0);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Calendar className="w-8 h-8 text-teal-500" />
          <h2 className="text-3xl font-bold text-gray-900">Visual Planner</h2>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Create color-coded, energy-aware schedules that work with your ADHD brain. 
          Plan around your natural rhythms and energy levels.
        </p>
      </div>

      {/* Date Selector & Stats */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <div className="text-sm text-gray-600">
              {planItems.length} items planned • {Math.floor(getTotalTime() / 60)}h {getTotalTime() % 60}m total
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="What are you planning?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={newItem.time}
                onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={newItem.duration}
                onChange={(e) => setNewItem({ ...newItem, duration: parseInt(e.target.value) || 30 })}
                min="5"
                step="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
                <option value="creative">Creative</option>
                <option value="break">Break</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <label className="block text-sm font-medium text-gray-700">Energy Level:</label>
              {(['high', 'medium', 'low'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setNewItem({ ...newItem, energy: level })}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    newItem.energy === level 
                      ? 'bg-teal-100 text-teal-700 border border-teal-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{energyIcons[level]}</span>
                  <span className="capitalize">{level}</span>
                </button>
              ))}
            </div>
            <button
              onClick={addNewItem}
              disabled={!newItem.title || !newItem.time}
              className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Add Item
            </button>
          </div>
        </div>
      )}

      {/* Timeline View */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Palette className="w-5 h-5 text-teal-500" />
          <h3 className="text-xl font-semibold text-gray-900">Your Visual Timeline</h3>
        </div>
        
        <div className="space-y-4">
          {planItems.map((item) => (
            <div 
              key={item.id}
              className={`${item.color} rounded-lg p-4 border-l-4 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">{formatTime(item.time)}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium text-gray-900">{item.title}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{item.duration}min</span>
                  <span className="flex items-center space-x-1">
                    <span>{energyIcons[item.energy]}</span>
                    <span className="text-xs text-gray-600 capitalize">{item.energy}</span>
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                    categoryColors[item.category]
                  }`}>
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Energy Tips */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">🧠</span>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Energy Management Tips:</h4>
            <ul className="text-gray-700 space-y-1">
              <li>• Schedule high-energy tasks (🔥) during your peak focus hours</li>
              <li>• Use medium-energy tasks (⚡) as transitions between intense work</li>
              <li>• Plan low-energy activities (🌱) for when you need to recharge</li>
              <li>• Build in buffer time between tasks to avoid rushing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualPlanner;