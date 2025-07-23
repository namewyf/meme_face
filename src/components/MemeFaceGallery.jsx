import React, { useState, useEffect, useRef } from 'react';

const MemeFaceGallery = () => {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [imageLoadStates, setImageLoadStates] = useState({});
  const observerRef = useRef();

  // All meme images from your folder - directly listed
  const memeImages = [
    '/img/meme-face/yao-ming-face-meme-6da357_gsmi8s.png',
    '/img/meme-face/troll-face-laughing_jewhhf.gif',
    '/img/meme-face/vector-lol-guy-meme-face-any-design-isolated-eps-76971541_rqbzik.jpg',
    '/img/meme-face/vector-no-guy-meme-face-any-design-eps-77978488_jejyro.jpg',
    '/img/meme-face/s-l400_rw0tsr.jpg',
    '/img/meme-face/s-l400_znwzvp.jpg',
    '/img/meme-face/troll-face-internet-meme-hakeem-harrie-transparent_c50dpp.png',
    '/img/meme-face/rage-guy-meme-face-vector-42890681_ah7snc.jpg',
    '/img/meme-face/raf_360x360_075_t_fafafa_ca443f4786_pml4fm.jpg',
    '/img/meme-face/ops.meme_.nba_-1024x768_agbr2f.jpg',
    '/img/meme-face/ops.meme_.nba__k1hpdr.jpg',
    '/img/meme-face/raf_360x360_075_t_fafafa_ca443f4786.u1_oqw2l9.jpg',
    '/img/meme-face/noFilter_zxjdch.webp',
    '/img/meme-face/omg-sorprendido-meme_duv1ao.gif',
    '/img/meme-face/noFilter_e7wyi9.webp',
    '/img/meme-face/noFilter_l4x5yv.webp',
    '/img/meme-face/noFilter_lasxv1.webp',
    '/img/meme-face/noFilter_zqlje1.webp',
    '/img/meme-face/no-guy-meme-face-for-any-design-isolated-vector-10805681_anwd5y.jpg',
    '/img/meme-face/noFilter_anifim.webp',
    '/img/meme-face/memeface_wttuwi.webp',
    '/img/meme-face/meme-guy-face-isolated-vector-11464313_gdynrv.jpg',
    '/img/meme-face/meme-guy-face-isolated-vector-11464313_heoqac.jpg',
    '/img/meme-face/mandela_dxl9hu.gif',
    '/img/meme-face/hq720_jq3kcn.jpg',
    '/img/meme-face/internet-meme-trollface-design-vector-47388236_awsae0.jpg',
    '/img/meme-face/ltldosqddeishyyi_eo5nkc_sy7ow9.png',
    '/img/meme-face/ho7ygxu9w4c81_ytm5vf.jpg',
    '/img/meme-face/guy-meme-face-for-any-design-isolated-eps-vector-10845536_ztq2is.jpg',
    '/img/meme-face/ho7ygxu9w4c81_gbq9lz.jpg',
    '/img/meme-face/fposter_small_wall_texture_product_750x1000.u5_lzeoay.jpg',
    '/img/meme-face/fposter_small_wall_texture_product_750x1000.u5_ygxu0d.jpg',
    '/img/meme-face/flat_750x_075_f-pad_750x1000_f8f8f8_wlkj0p.jpg',
    '/img/meme-face/flat_750x_075_f-pad_750x1000_f8f8f8_uyuqoo.webp',
    '/img/meme-face/flat_750x_075_f-pad_750x1000_f8f8f8.u5_o57gup.jpg',
    '/img/meme-face/flat_750x_075_f-pad_750x1000_f8f8f8_i6hgpv.jpg',
    '/img/meme-face/flat_750x_075_f-pad_750x1000_f8f8f8_lvxbue.jpg',
    '/img/meme-face/flat_750x_075_f-pad_750x1000_f8f8f8.u10_klfk6q.jpg',
    '/img/meme-face/cb3e014d6122af3b43933bb571859ae7_fvjjop.jpg',
    '/img/meme-face/dora-you-did-it_y0sizt.gif',
    '/img/meme-face/f84be3949963ebc7962e56d827ae100f_zaid81.jpg',
    '/img/meme-face/c754e82936060a83dbd53ba8287cca32_clgnih.jpg',
    '/img/meme-face/bg_f8f8f8-flat_750x_075_f-pad_750x1000_f8f8f8_kef3co.jpg',
    '/img/meme-face/bg_f8f8f8-flat_750x_075_f-pad_750x1000_f8f8f8_pudjhu.jpg',
    '/img/meme-face/bg_f8f8f8-flat_750x_075_f-pad_750x1000_f8f8f8.u1_y1emxz.jpg',
    '/img/meme-face/be89eb65ff81e74ac63503a542580da8_pb7mhu.jpg',
    '/img/meme-face/bWn5ChatRtufu1b12ii-BA_oqmmbn.webp',
    '/img/meme-face/b710a35966ecbbf7988bf40bb47b0e4d-me-gusta-meme-face_acpw5g.png',
    '/img/meme-face/b710a35966ecbbf7988bf40bb47b0e4d-me-gusta-meme-face_jmbzn0.png',
    '/img/meme-face/ap_090911089838_sq-fccc43c53a0c4c3249cc12a938832a3c3b397aab_qnrf3g.jpg',
    '/img/meme-face/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f_ecu6ug.jpg',
    '/img/meme-face/Trollface_wamsfg.png',
    '/img/meme-face/NREKnb0errV2pWaoT3qNgosS4Le5L5dMUqKaLwr3xtJmSKSlyOnXgTQDsi0NKfJJyCid_w240-h480-rw_c88ypj.webp',
    '/img/meme-face/Screen_2520Shot_25202016-04-06_2520at_252012.58.27_2520AM_tgsyk1.png',
    '/img/meme-face/Humor-Bath-Mat-So-What-Guy-Meme-Face-Best-Avatar-WTF-Icon-Hipster-Mascot-Snobby-Sign-Picture-Non-Slip-Plush-Mat-Bathroom-Kitchen-Laundry-Room-Decor-2_b0cefe9c-7cf7-4e6a-93f5-a12c608ed53d_1.0242e749975e78f8713dbdb5f7f86278_lirwbw.jpg',
    '/img/meme-face/Humor-Bath-Mat-So-What-Guy-Meme-Face-Best-Avatar-WTF-Icon-Hipster-Mascot-Snobby-Sign-Picture-Non-Slip-Plush-Mat-Bathroom-Kitchen-Laundry-Room-Decor-2_b0cefe9c-7cf7-4e6a-93f5-a12c608ed53d_1.0242e749975e78f8713dbdb5f7f86278_ra33b7.jpg',
    '/img/meme-face/85f9128f5db8b74157f4154508f1e8f0_v6adsf.jpg',
    '/img/meme-face/7c9190c0fa15ec714bd3bea70c0ed2bb-mother-of-god-meme-face_lxutf4.png',
    '/img/meme-face/7c9190c0fa15ec714bd3bea70c0ed2bb_lpstou.svg',
    '/img/meme-face/70e36dc21ac1c46c509eac5b600c22d9-rageguy-meme-face_raghgh.png',
    '/img/meme-face/71MWZE0Qx9L_znaqci.png',
    '/img/meme-face/61s0CU9bmGL._AC_UL210_SR210_210__ltvo5c.jpg',
    '/img/meme-face/640d8a6117979b62da8fc7cbebc8c63a_8ee0214149c55f0624f1b9a55b18f653_qdypwl.jpg',
    '/img/meme-face/596_qjga0x.jpg',
    '/img/meme-face/5bc6387e6d8e0e598467bc7d18a377fe_ohqvxl.jpg',
    '/img/meme-face/51FagH84DFL._UF894_1000_QL80__p6hjac.jpg',
    '/img/meme-face/51kgT7eWF-L._UF894_1000_QL80__vmshi7.jpg',
    '/img/meme-face/41n61ReptRL.jpg_BO30_255_255_255_UF900_850_SR1910_1000_0_C_PIRIOTHREEANDHALF-medium_BottomLeft_30_-20_QL100__rp7f59.jpg',
    '/img/meme-face/473799-20_1601979571y_e2jqee.jpg',
    '/img/meme-face/51FagH84DFL._UF1000_1000_QL80__hwmzzi.jpg',
    '/img/meme-face/40130354_1_usqpee.jpg',
    '/img/meme-face/3d848b80c538c1e73430a0be61360458_kclojn.jpg',
    '/img/meme-face/37153061_0_zgp7sw.jpg',
    '/img/meme-face/1ocUUE5msa3v8jCBR38NFeUqg5oc3hsUu_f3c24868-a024-4b3f-abda-c7fb386b2d65_pp6uro.jpg',
    '/img/meme-face/310f15d0263df210f28eb6dd256da457_kbfimk.jpg',
    '/img/meme-face/36ae5aadd62b9ba1767b5dedd50c099c_xo0t63.jpg',
    '/img/meme-face/1b2a1e1747f67ce87ea8af5fdf410d23-yao-ming-face-meme_s4rhsg.png',
    '/img/meme-face/0626994ef7a02a13ab0f7912889ece0e-lol-meme-face_d844k6.png',
    '/img/meme-face/0626994ef7a02a13ab0f7912889ece0e-lol-meme-face_lpajwx.png'
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