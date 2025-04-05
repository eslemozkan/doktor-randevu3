import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlayCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Videos = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    { 
      id: 1, 
      title: 'Miladın Mutfağı', 
      description: 'Televizyon Programı', 
      youtubeId: 'xjwQju1p2_w',
      thumbnail: 'https://img.youtube.com/vi/xjwQju1p2_w/maxresdefault.jpg'
    },
    { 
      id: 2, 
      title: 'Fırat\'ta Gündem Opr Dr Ali Şekerlisoy Prof Dr Yusuf Özkan 07 01 2021', 
      description: 'Televizyon Programı', 
      youtubeId: 'GDD7Daj4Ujw',
      thumbnail: 'https://img.youtube.com/vi/GDD7Daj4Ujw/maxresdefault.jpg'
    },
    { 
      id: 3, 
      title: 'Miladın Mutfağı', 
      description: 'Televizyon Programı', 
      youtubeId: '0_nCWRqtoVw',
      thumbnail: 'https://img.youtube.com/vi/0_nCWRqtoVw/maxresdefault.jpg'
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
  };

  const getVisibleVideos = () => {
    return [
      videos[currentIndex],
      videos[(currentIndex + 1) % videos.length],
      videos[(currentIndex + 2) % videos.length]
    ];
  };

  const handleAllVideos = () => {
    navigate('/videolar');
  };

  return (
    <section id="videos" className="py-20 bg-gradient-to-r from-[#F5F7FA] to-[#EFF5FB]">
      <div className="container mx-auto px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-[3px] w-20 bg-[#394C8C]"></div>
            <h2 className="text-4xl font-bold text-[#1E2E62]">Videolar</h2>
            <div className="h-[3px] w-20 bg-[#394C8C]"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sağlık ve yaşam kalitesi hakkında güncel bilgiler ve profesyonel yaklaşımlar
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <button 
            onClick={handlePrev}
            className="absolute left-0 z-10 w-12 h-12 bg-[#394C8C] text-white rounded-full 
                       flex items-center justify-center hover:bg-opacity-90 transition-all"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 z-10 w-12 h-12 bg-[#394C8C] text-white rounded-full 
                       flex items-center justify-center hover:bg-opacity-90 transition-all"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          
          <div className="grid grid-cols-3 gap-8 mx-16 overflow-hidden">
            {getVisibleVideos().map((video, index) => (
              <div 
                key={video.id} 
                className={`relative group overflow-hidden rounded-2xl shadow-lg 
                            transition-all duration-500 ease-in-out
                            ${index === 1 
                              ? 'scale-105 z-10' 
                              : 'scale-90 opacity-70 z-0'}`}
                style={{
                  transitionProperty: 'transform, opacity, z-index',
                  willChange: 'transform, opacity'
                }}
              >
                <div className="relative w-full aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => {
                      window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank');
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300 
                                  flex items-center justify-center">
                    <FontAwesomeIcon 
                      icon={faPlayCircle} 
                      className="text-white text-5xl opacity-80 hover:opacity-100 
                                 transform hover:scale-110 transition-all cursor-pointer"
                      onClick={() => {
                        window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank');
                      }}
                    />
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                                from-black to-transparent p-4 text-white">
                  <h3 className="font-bold text-lg">{video.title}</h3>
                  <p className="text-sm opacity-80">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button 
            onClick={handleAllVideos}
            className="group flex items-center space-x-3 bg-[#394C8C] text-white 
                       px-8 py-4 rounded-full font-semibold hover:bg-[#5A70B9] 
                       transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Tüm Videoları Gör</span>
            <FontAwesomeIcon 
              icon={faArrowRight} 
              className="transform transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Videos;
