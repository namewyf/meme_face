import React, { useState } from 'react';

const PopularMemes = () => {
  const [memes, setMemes] = useState([
    {
      id: 1,
      title: "Shocked Meme",
      image: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=😱",
      likes: 1234,
      shares: 567,
      category: "Funny",
      isLiked: false
    },
    {
      id: 2,
      title: "Helpless Meme",
      image: "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=😅",
      likes: 987,
      shares: 234,
      category: "Daily",
      isLiked: false
    },
    {
      id: 3,
      title: "Cool Meme",
      image: "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=😎",
      likes: 756,
      shares: 189,
      category: "Funny",
      isLiked: false
    },
    {
      id: 4,
      title: "Crying Meme",
      image: "https://via.placeholder.com/300x300/96CEB4/FFFFFF?text=😭",
      likes: 654,
      shares: 123,
      category: "Emotion",
      isLiked: false
    },
    {
      id: 5,
      title: "Angry Meme",
      image: "https://via.placeholder.com/300x300/FFEAA7/FFFFFF?text=😠",
      likes: 432,
      shares: 98,
      category: "Emotion",
      isLiked: false
    },
    {
      id: 6,
      title: "Shy Meme",
      image: "https://via.placeholder.com/300x300/DDA0DD/FFFFFF?text=😳",
      likes: 321,
      shares: 76,
      category: "Daily",
      isLiked: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Funny', 'Daily', 'Emotion', 'Animals', 'Movies'];

  const handleLike = (id) => {
    setMemes(memes.map(meme => 
      meme.id === id 
        ? { ...meme, likes: meme.isLiked ? meme.likes - 1 : meme.likes + 1, isLiked: !meme.isLiked }
        : meme
    ));
  };

  const handleShare = (id) => {
    setMemes(memes.map(meme => 
      meme.id === id 
        ? { ...meme, shares: meme.shares + 1 }
        : meme
    ));
    
    // 模拟分享功能
    if (navigator.share) {
      navigator.share({
        title: '分享表情包',
        text: '看看这个有趣的表情包！',
        url: window.location.href
      });
    } else {
      // Fallback: 复制链接
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板！');
    }
  };

  const filteredMemes = selectedCategory === 'All' 
    ? memes 
    : memes.filter(meme => meme.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Memes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemes.map(meme => (
          <div key={meme.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative group">
              <img
                src={meme.image}
                alt={meme.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-4">
                  <button
                    onClick={() => handleLike(meme.id)}
                    className={`p-3 rounded-full ${
                      meme.isLiked 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
                    } transition-colors`}
                  >
                    <svg className="w-6 h-6" fill={meme.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleShare(meme.id)}
                    className="p-3 rounded-full bg-white text-gray-700 hover:bg-green-500 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{meme.title}</h3>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                  {meme.category}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill={meme.isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{meme.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>{meme.shares}</span>
                  </div>
                </div>
                                 <button className="text-purple-600 hover:text-purple-700 font-medium">
                   Use Template
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
          Load More Memes
        </button>
      </div>
    </div>
  );
};

export default PopularMemes; 