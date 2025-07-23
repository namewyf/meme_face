import React, { useState, useEffect, useRef } from 'react';

const MemeFaceGallery = () => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [imageLoadStates, setImageLoadStates] = useState({});
  const observerRef = useRef();

  // All meme images from your folder - updated with new filenames
  const memeImages = [
    '/img/meme-face/yao-ming-face-meme.png',
    '/img/meme-face/troll-face-laughing.gif',
    '/img/meme-face/vector-lol-guy-meme-face.jpg',
    '/img/meme-face/vector-no-guy-meme-face.jpg',
    '/img/meme-face/sad-face-meme-2.jpg',
    '/img/meme-face/sad-face-meme-3.jpg',
    '/img/meme-face/troll-face-transparent.png',
    '/img/meme-face/rage-guy-meme-face.jpg',
    '/img/meme-face/raf-meme-face.jpg',
    '/img/meme-face/ops-meme-nba-2.jpg',
    '/img/meme-face/ops-meme-nba.jpg',
    '/img/meme-face/raf-meme-face-2.jpg',
    '/img/meme-face/no-filter-meme-6.webp',
    '/img/meme-face/omg-surprised-meme.gif',
    '/img/meme-face/no-filter-meme-2.webp',
    '/img/meme-face/no-filter-meme-3.webp',
    '/img/meme-face/no-filter-meme-4.webp',
    '/img/meme-face/no-filter-meme-5.webp',
    '/img/meme-face/no-guy-meme-face.jpg',
    '/img/meme-face/no-filter-meme-1.webp',
    '/img/meme-face/meme-face-icon.webp',
    '/img/meme-face/meme-guy-face.jpg',
    '/img/meme-face/meme-guy-face-2.jpg',
    '/img/meme-face/mandela-meme.gif',
    '/img/meme-face/laughing-guy-meme.jpg',
    '/img/meme-face/mysterious-face-meme.png',
    '/img/meme-face/troll-face-design.jpg',
    '/img/meme-face/confused-guy-meme-3.jpg',
    '/img/meme-face/guy-meme-face.jpg',
    '/img/meme-face/surprised-guy-meme-2.jpg',
    '/img/meme-face/cool-guy-meme.jpg',
    '/img/meme-face/happy-guy-meme.jpg',
    '/img/meme-face/embarrassed-face-meme.jpg',
    '/img/meme-face/worried-face-meme.webp',
    '/img/meme-face/bored-face-meme.jpg',
    '/img/meme-face/excited-face-meme-2.jpg',
    '/img/meme-face/tired-face-meme.jpg',
    '/img/meme-face/nervous-face-meme.jpg',
    '/img/meme-face/annoyed-face-meme.jpg',
    '/img/meme-face/dora-you-did-it-meme.gif',
    '/img/meme-face/silly-face-meme.jpg',
    '/img/meme-face/skeptical-face-meme.jpg',
    '/img/meme-face/neutral-face-meme.jpg',
    '/img/meme-face/serious-face-meme.jpg',
    '/img/meme-face/determined-face-meme.jpg',
    '/img/meme-face/confused-guy-meme-2.jpg',
    '/img/meme-face/troll-face-laughing.webp',
    '/img/meme-face/me-gusta-meme-face-small.png',
    '/img/meme-face/me-gusta-meme-face.png',
    '/img/meme-face/shocked-guy-meme.jpg',
    '/img/meme-face/confused-guy-meme.jpg',
    '/img/meme-face/trollface.png',
    '/img/meme-face/mysterious-meme.webp',
    '/img/meme-face/screen-shot-meme.png',
    '/img/meme-face/so-what-guy-meme-2.jpg',
    '/img/meme-face/so-what-guy-meme.jpg',
    '/img/meme-face/surprised-guy-meme.jpg',
    '/img/meme-face/mother-of-god-meme-face.png',
    '/img/meme-face/mother-of-god-meme.svg',
    '/img/meme-face/rage-guy-meme-face.png',
    '/img/meme-face/troll-face-variant.png',
    '/img/meme-face/disappointed-face-meme.jpg',
    '/img/meme-face/smug-face-meme.jpg',
    '/img/meme-face/cool-face-meme.jpg',
    '/img/meme-face/winking-face-meme.jpg',
    '/img/meme-face/excited-face-meme.jpg',
    '/img/meme-face/happy-face-meme.jpg',
    '/img/meme-face/crying-face-meme.jpg',
    '/img/meme-face/sad-face-meme.jpg',
    '/img/meme-face/troll-face-classic.jpg',
    '/img/meme-face/angry-face-meme.jpg',
    '/img/meme-face/shocked-face-meme.jpg',
    '/img/meme-face/laughing-face-meme.jpg',
    '/img/meme-face/smiling-face-meme.jpg',
    '/img/meme-face/surprised-face-meme.jpg',
    '/img/meme-face/thinking-face-meme.jpg',
    '/img/meme-face/yao-ming-meme-face.png',
    '/img/meme-face/lol-meme-face-small.png',
    '/img/meme-face/lol-meme-face.png'
  ];

  const categories = ['Funny', 'Animals', 'Daily', 'Gaming', 'Movies', 'Reaction'];
  const allCategories = ['All', ...categories];

  // Create memes from all images
  const createMemesFromImages = () => {
    return memeImages.map((image, index) => {
      // Extract filename for title
      const filename = image.split('/').pop().split('.')[0];
      const cleanTitle = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      return {
        id: index,
        title: cleanTitle,
        image: image,
        category: categories[index % categories.length],
        likes: Math.floor(Math.random() * 1000) + 10,
        shares: Math.floor(Math.random() * 500) + 5,
        width: 300,
        height: 300
      };
    });
  };

  // Load all memes
  useEffect(() => {
    const loadMemes = async () => {
      setLoading(true);
      // Small delay for loading effect
      await new Promise(resolve => setTimeout(resolve, 300));
      const allMemes = createMemesFromImages();
      setMemes(allMemes);
      setFilteredMemes(allMemes);
      setLoading(false);
    };
    
    loadMemes();
  }, []);

  // Filter memes based on search and category
  useEffect(() => {
    let filtered = memes;
    
    if (searchTerm) {
      filtered = filtered.filter(meme => 
        meme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meme.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(meme => meme.category === selectedCategory);
    }
    
    setFilteredMemes(filtered);
  }, [searchTerm, selectedCategory, memes]);

  const handleLike = (id) => {
    setMemes(prev => prev.map(meme => 
      meme.id === id ? { ...meme, likes: meme.likes + 1 } : meme
    ));
  };

  const handleShare = (id) => {
    setMemes(prev => prev.map(meme => 
      meme.id === id ? { ...meme, shares: meme.shares + 1 } : meme
    ));
    
    // Copy meme URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert('Meme link copied to clipboard!');
  };

  const handleDownload = (meme) => {
    const link = document.createElement('a');
    link.href = meme.image;
    link.download = `meme-${meme.id}.jpg`;
    link.click();
  };

  // Handle image load
  const handleImageLoad = (memeId, event) => {
    const img = event.target;
    const { naturalWidth, naturalHeight } = img;
    
    console.log(`Image loaded: ${memeId}, dimensions: ${naturalWidth}x${naturalHeight}`);
    
    // Update meme with actual dimensions
    setMemes(prev => prev.map(meme => 
      meme.id === memeId 
        ? { ...meme, width: naturalWidth, height: naturalHeight }
        : meme
    ));
    
    setImageLoadStates(prev => ({
      ...prev,
      [memeId]: true
    }));
  };

  const handleImageError = (memeId) => {
    console.log(`Image failed to load: ${memeId}`);
    setImageLoadStates(prev => ({
      ...prev,
      [memeId]: 'error'
    }));
  };

  // Skeleton component for loading state
  const MemeSkeleton = ({ height = null }) => {
    const skeletonHeight = height || Math.floor(Math.random() * 200) + 200;
    
    return (
      <div className="break-inside-avoid mb-4 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="animate-pulse">
          <div 
            className="bg-gray-300 w-full" 
            style={{ height: `${skeletonHeight}px` }}
          ></div>
          <div className="p-3">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="h-3 bg-gray-300 rounded w-8"></div>
                <div className="h-3 bg-gray-300 rounded w-8"></div>
              </div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-20 z-40">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search memes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredMemes.length} memes
        </div>
      </div>

      {/* Waterfall Gallery */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
        {/* Show skeletons while loading */}
        {loading && (
          <>
            {Array.from({ length: 20 }).map((_, index) => (
              <MemeSkeleton 
                key={`skeleton-${index}`} 
                height={Math.floor(Math.random() * 200) + 200}
              />
            ))}
          </>
        )}
        
        {/* Show actual memes */}
        {!loading && filteredMemes.map((meme) => (
          <div
            key={meme.id}
            className="break-inside-avoid mb-4 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Meme Image with Loading State */}
            <div className="relative group" style={{ minHeight: '150px' }}>
              {/* Skeleton for image loading */}
              {!imageLoadStates[meme.id] && (
                <div 
                  className="animate-pulse bg-gray-300 w-full absolute inset-0"
                  style={{ 
                    height: `${Math.floor((meme.height / meme.width) * 300)}px`,
                    maxHeight: '600px',
                    minHeight: '150px',
                    zIndex: 0
                  }}
                ></div>
              )}
              
              {/* Error state */}
              {imageLoadStates[meme.id] === 'error' && (
                <div 
                  className="bg-gray-200 w-full flex items-center justify-center"
                  style={{ 
                    height: `${Math.floor((meme.height / meme.width) * 300)}px`,
                    maxHeight: '600px',
                    minHeight: '150px'
                  }}
                >
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Failed to load</p>
                  </div>
                </div>
              )}
              
              {/* Actual image */}
              <img
                src={meme.image}
                alt={meme.title}
                className={`w-full h-auto object-cover transition-opacity duration-300 ${
                  imageLoadStates[meme.id] ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={(e) => handleImageLoad(meme.id, e)}
                onError={() => handleImageError(meme.id)}
                style={{ 
                  display: imageLoadStates[meme.id] === 'error' ? 'none' : 'block',
                  position: 'relative',
                  zIndex: 1
                }}
              />
              
              {/* Overlay Actions - only show when image is loaded */}
              {imageLoadStates[meme.id] && imageLoadStates[meme.id] !== 'error' && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <button
                      onClick={() => handleLike(meme.id)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-red-500 transition-colors"
                      title="Like"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare(meme.id)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-green-500 transition-colors"
                      title="Share"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDownload(meme)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-500 transition-colors"
                      title="Download"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Meme Info */}
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 mb-2">{meme.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{meme.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>{meme.shares}</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                  {meme.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {!loading && filteredMemes.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">😅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No memes found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or category filter
          </p>
        </div>
      )}
    </div>
  );
};

export default MemeFaceGallery; 