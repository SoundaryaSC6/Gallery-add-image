import React, { useState } from 'react';
import imageHolder from '../image holder.png';

const GalleryWidget = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBlueShadow, setShowBlueShadow] = useState(false);
  
  const [images, setImages] = useState([
    {
      id: 1,
      url: imageHolder,
      alt: 'Image Holder 1'
    },
    {
      id: 2,
      url: imageHolder,
      alt: 'Image Holder 2'
    },
    {
      id: 3,
      url: imageHolder,
      alt: 'Image Holder 3'
    }
  ]);

  const handlePrevious = () => {
    setShowBlueShadow(true);
    setCurrentImageIndex((prev) => 
      prev === 0 ? Math.max(0, images.length - 3) : prev - 1
    );
    setTimeout(() => setShowBlueShadow(false), 500);
  };

  const handleNext = () => {
    setShowBlueShadow(true);
    setCurrentImageIndex((prev) => 
      prev >= Math.max(0, images.length - 3) ? 0 : prev + 1
    );
    setTimeout(() => setShowBlueShadow(false), 500);
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
        // Add new image at the beginning (left to right)
        setImages([newImage, ...images]);
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

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
           <div className="bg-gray-800 rounded-2xl px-8 py-4 shadow-inner">
             <h2 className="text-white text-base font-medium">Gallery</h2>
           </div>
           
           <div className="flex justify-center md:justify-end">
             <button
               onClick={handleAddImage}
               className="bg-gray-700 text-white px-5 py-3 rounded-full text-base font-semibold shadow-[4px_4px_8px_rgba(0,0,0,0.3),-6px_-6px_8px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.4),-3px_-3px_6px_rgba(255,255,255,0.15)] transition-all duration-200 hover:scale-105"
             >
               + ADD IMAGE
             </button>
           </div>
           
           <div className="flex justify-center gap-2">  
             <button
               onClick={handlePrevious}
               className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center shadow-[4px_4px_8px_rgba(0,0,0,0.3),-2px_-2px_4px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.4),-3px_-3px_6px_rgba(255,255,255,0.15)] transition-all duration-200 hover:scale-105"
             >
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                 <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </button>
 
             <button
               onClick={handleNext}
               className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center shadow-[2px_2px_4px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(255,255,255,0.05)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-2px_-2px_4px_rgba(255,255,255,0.1)] transition-all duration-200 hover:scale-105"
             >
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                 <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </button>
           </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-2">
           {getVisibleImages().map((image, index) => (
             <div key={`${image.id}-${currentImageIndex}-${index}`} className="aspect-square relative">
               <img
                 src={image.url}
                 alt={image.alt}
                 className={`w-full h-full object-cover rounded-xl shadow-[4px_4px_8px_rgba(0,0,0,0.3),-2px_-2px_4px_rgba(255,255,255,0.1)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.4),-3px_-3px_6px_rgba(255,255,255,0.15)] transition-all duration-200 hover:scale-105 hover:rotate-1 ${
                   showBlueShadow && index === 0 ? 'filter brightness-75 sepia-100 hue-rotate-200 saturate-200' : ''
                 }`}
                 onLoad={() => console.log('Image loaded successfully:', image.url)}
                 onError={(e) => {
                   console.error('Image failed to load:', image.url);
                   e.target.src = 'https://via.placeholder.com/400x400/4B5563/9CA3AF?text=Image+Holder';
                 }}
               />
               {showBlueShadow && index === 0 && (
                 <div className="absolute inset-0 bg-blue-500/20 rounded-xl pointer-events-none transition-opacity duration-300"></div>
               )}
             </div>
           ))}
         </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent rounded-b-3xl"></div>
    </div>
  );
};

export default GalleryWidget;
