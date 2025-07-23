import React, { useState, useRef, useEffect } from 'react';

const MemeFaceGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState('#ffffff');
  const [textStroke, setTextStroke] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateMeme = () => {
    if (!selectedImage) return;

    setIsGenerating(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Configure text style
      ctx.font = `bold ${fontSize}px Impact, Arial, sans-serif`;
      ctx.fillStyle = textColor;
      ctx.strokeStyle = textStroke;
      ctx.lineWidth = strokeWidth;
      ctx.textAlign = 'center';

      // Draw top text
      if (topText) {
        ctx.fillText(topText, canvas.width / 2, fontSize + 10);
        ctx.strokeText(topText, canvas.width / 2, fontSize + 10);
      }

      // Draw bottom text
      if (bottomText) {
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
      }

      setIsGenerating(false);
    };
    img.src = selectedImage;
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'meme-face.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const shareMeme = async () => {
    const canvas = canvasRef.current;
    const blob = await new Promise(resolve => canvas.toBlob(resolve));
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '我的表情包',
          text: '用Meme Face制作的表情包',
          files: [new File([blob], 'meme-face.png', { type: 'image/png' })]
        });
      } catch (error) {
        console.log('分享失败:', error);
      }
    } else {
      // Fallback: copy to clipboard or download
      downloadMeme();
    }
  };

  useEffect(() => {
    if (selectedImage) {
      generateMeme();
    }
  }, [selectedImage, topText, bottomText, fontSize, textColor, textStroke, strokeWidth]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Customize Settings</h3>
          
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
              </label>
            </div>
          </div>

          {/* Text Inputs */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Top Text
              </label>
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                placeholder="Enter top text..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bottom Text
              </label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                placeholder="Enter bottom text..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Style Controls */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stroke Color
              </label>
              <input
                type="color"
                value={textStroke}
                onChange={(e) => setTextStroke(e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stroke Width: {strokeWidth}px
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={downloadMeme}
              disabled={!selectedImage || isGenerating}
              className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Download Meme
            </button>
            <button
              onClick={shareMeme}
              disabled={!selectedImage || isGenerating}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Share Meme
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Preview</h3>
          <div className="flex justify-center">
            {selectedImage ? (
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto border border-gray-300 rounded-lg"
                  style={{ maxHeight: '500px' }}
                />
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <div className="text-white">Generating...</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>Upload an image to start creating your meme</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeFaceGenerator; 