import React, { useState } from 'react';

const MemeCategories = () => {
  const [activeCategory, setActiveCategory] = useState('Funny');

  const categories = [
    {
      id: 'Funny',
      name: 'Funny Memes',
      icon: '😂',
      description: 'The funniest internet memes',
      count: 1250,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'Daily',
      name: 'Daily Life',
      icon: '😊',
      description: 'Everyday life expressions',
      count: 890,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'Emotion',
      name: 'Emotional',
      icon: '❤️',
      description: 'Express various emotions',
      count: 756,
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'Animals',
      name: 'Animal Memes',
      icon: '🐱',
      description: 'Cute animal memes',
      count: 634,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'Movies',
      name: 'Movie Memes',
      icon: '🎬',
      description: 'Classic movie memes',
      count: 445,
      color: 'from-purple-400 to-violet-500'
    },
    {
      id: 'Gaming',
      name: 'Gaming',
      icon: '🎮',
      description: 'Popular gaming memes',
      count: 567,
      color: 'from-indigo-400 to-blue-500'
    },
    {
      id: 'Internet',
      name: 'Internet Slang',
      icon: '🔥',
      description: 'Latest internet slang memes',
      count: 789,
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 'Work',
      name: 'Workplace',
      icon: '💼',
      description: 'Workplace related memes',
      count: 432,
      color: 'from-gray-400 to-slate-500'
    }
  ];

  const categoryMemes = {
    'Funny': [
      { id: 1, title: 'LOL', image: 'https://via.placeholder.com/200x200/FFD93D/FFFFFF?text=😂', likes: 1234 },
      { id: 2, title: 'So Funny', image: 'https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=🤣', likes: 987 },
      { id: 3, title: 'ROFL', image: 'https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=😆', likes: 756 }
    ],
    'Daily': [
      { id: 4, title: 'Good Mood', image: 'https://via.placeholder.com/200x200/45B7D1/FFFFFF?text=😊', likes: 654 },
      { id: 5, title: 'Sleepy', image: 'https://via.placeholder.com/200x200/96CEB4/FFFFFF?text=😴', likes: 543 },
      { id: 6, title: 'Hungry', image: 'https://via.placeholder.com/200x200/FFEAA7/FFFFFF?text=😋', likes: 432 }
    ],
    'Emotion': [
      { id: 7, title: 'I Love You', image: 'https://via.placeholder.com/200x200/DDA0DD/FFFFFF?text=❤️', likes: 876 },
      { id: 8, title: 'Sad', image: 'https://via.placeholder.com/200x200/98D8C8/FFFFFF?text=😢', likes: 654 },
      { id: 9, title: 'Angry', image: 'https://via.placeholder.com/200x200/F7DC6F/FFFFFF?text=😠', likes: 543 }
    ]
  };

  const currentMemes = categoryMemes[activeCategory] || [];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`relative p-6 rounded-lg text-center transition-all duration-300 hover:scale-105 ${
              activeCategory === category.id
                ? 'ring-4 ring-purple-500 ring-opacity-50'
                : 'hover:shadow-lg'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-lg opacity-10`}></div>
            <div className="relative z-10">
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{category.description}</p>
              <span className="text-xs text-gray-500">{category.count} 个表情包</span>
            </div>
          </button>
        ))}
      </div>

      {/* Category Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <p className="text-gray-600">
              {categories.find(c => c.id === activeCategory)?.description}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">
              {categories.find(c => c.id === activeCategory)?.count}
            </div>
            <div className="text-sm text-gray-500">个表情包</div>
          </div>
        </div>

        {/* Memes in Category */}
        {currentMemes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMemes.map(meme => (
              <div key={meme.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="relative mb-3">
                  <img
                    src={meme.image}
                    alt={meme.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {meme.likes} 赞
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{meme.title}</h3>
                <div className="flex justify-between items-center">
                                   <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                   Use Template
                 </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Memes Yet
            </h3>
            <p className="text-gray-600">
              This category doesn't have any memes yet. Please check back later!
            </p>
          </div>
        )}

        {/* Category Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">5,234</div>
          <div className="text-sm opacity-90">Total Memes</div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">8</div>
          <div className="text-sm opacity-90">Meme Categories</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-6 text-center">
          <div className="text-3xl font-bold mb-2">12,456</div>
          <div className="text-sm opacity-90">Today's Usage</div>
        </div>
      </div>
    </div>
  );
};

export default MemeCategories; 