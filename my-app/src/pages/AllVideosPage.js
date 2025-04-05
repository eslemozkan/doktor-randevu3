import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AllVideosPage = () => {
  // Şimdilik statik veri, ileride veritabanından gelecek
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-8 py-16">
        <div className="bg-[#F5F7FA] rounded-3xl p-16 shadow-lg">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-[3px] w-20 bg-[#394C8C]"></div>
              <h1 className="text-5xl font-bold text-[#1E2E62]">Tüm Videolar</h1>
              <div className="h-[3px] w-20 bg-[#394C8C]"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sağlık, yaşam kalitesi ve tıbbi konularda profesyonel bakış açısıyla hazırlanmış 
              bilgilendirici ve güncel video içeriklerimiz
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg 
                           transform transition-all duration-300 hover:-translate-y-2 
                           hover:shadow-xl group"
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
                      className="text-white text-4xl opacity-80 hover:opacity-100 
                                 transform hover:scale-110 transition-all cursor-pointer"
                      onClick={() => {
                        window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank');
                      }}
                    />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#1E2E62] 
                                 group-hover:text-[#394C8C] transition-colors truncate mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllVideosPage;
