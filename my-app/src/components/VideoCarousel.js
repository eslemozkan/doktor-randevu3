import React, { useState } from 'react';

const videoData = [
  {
    id: 1,
    title: 'Diyabet ve Beslenme',
    thumbnail: 'https://via.placeholder.com/400x250?text=Diyabet+Videosu+1',
    description: 'Diyabet hastalarının doğru beslenme stratejileri'
  },
  {
    id: 2,
    title: 'Tiroid Hastalıkları',
    thumbnail: 'https://via.placeholder.com/400x250?text=Tiroid+Videosu',
    description: 'Tiroid bezinin çalışması ve hastalıkları'
  },
  {
    id: 3,
    title: 'Metabolik Hastalıklar',
    thumbnail: 'https://via.placeholder.com/400x250?text=Metabolik+Hastalıklar',
    description: 'Metabolik hastalıklar ve tedavi yöntemleri'
  }
];

function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex === videoData.length - 1 ? 0 : prevIndex + 1;
      return nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex === 0 ? videoData.length - 1 : prevIndex - 1;
      return nextIndex;
    });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-lg">
      <div className="relative transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {videoData.map((video, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-xl font-semibold">{video.title}</h3>
              <p className="text-sm">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 w-full px-4">
        <button 
          onClick={prevSlide} 
          className="bg-white bg-opacity-50 p-2 rounded-full"
        >
          ←
        </button>
        <button 
          onClick={nextSlide} 
          className="bg-white bg-opacity-50 p-2 rounded-full"
        >
          →
        </button>
      </div>
      <div className="flex justify-center py-4">
        {videoData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default VideoCarousel;
