import React, { useState } from 'react';

const GalleryWidget = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const [images, setImages] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
      alt: 'Image 1'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop',
      alt: 'Image 2'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&h=200&fit=crop',
      alt: 'Image 3'
    }
  ]);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddImage = () => {
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now(),
          url: e.target.result,
          alt: file.name
        };
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentImageIndex + i) % images.length;
      visible.push(images[index]);
    }
    return visible;
  };

  return (
    <div className="w-full rounded-3xl p-5 relative bg-gray-600 shadow-2xl">
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      <div className="absolute left-3 top-4 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
        <span className="text-gray-300 text-base font-bold">?</span>
      </div>

      <div className="absolute left-3 top-14 w-6 h-6 grid grid-cols-3 gap-0.5 p-0.5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-400 rounded-sm"></div>
        ))}
      </div>

      <div className="ml-14">

        <div className="grid grid-cols-[auto_2fr_auto] items-center gap-1 mb-4">
          <div className="bg-gray-800 rounded-2xl px-8 py-4">
            <h2 className="text-white text-base font-medium">Gallery</h2>
          </div>
          
          <div className="flex justify-self-end">
            <button
              onClick={handleAddImage}
              className="bg-gradient-to-br from-gray-700 text-white px-5 py-3 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              + ADD IMAGE
            </button>
          </div>
          
          <div className="grid grid-cols-[auto_auto] gap-2">  
        <button
          onClick={handlePrevious}
          className="w-9 h-9 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
        <svg width="30" height="16" viewBox="0 0 20 16" fill="none">
        <path d="M12 8H6M6 8L10 4M6 8L10 12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
      onClick={handleNext}
      className="w-9 h-9 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
      <svg width="30" height="16" viewBox="0 0 20 16" fill="none">
      <path d="M8 8H14M14 8L10 4M14 8L10 12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-1 pb-2">
          {getVisibleImages().map((image, index) => (
            <div key={`${image.id}-${currentImageIndex}-${index}`} className="aspect-square">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover:rotate-1 grayscale"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/190x190/4B5563/9CA3AF?text=Image';
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-b-3xl"></div>
    </div>
  );
};

export default GalleryWidget;