import React, { useEffect, useState } from 'react';
import { getVideos } from '../services/videoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

function extractYouTubeId(url) {
  const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return (match && match[1]) ? match[1] : null;
}

const AllVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideos().then(data => {
      setVideos(data.filter(v => v.video_url && v.video_url.trim() !== ""));
      setLoading(false);
    });
  }, []);

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

          {loading ? (
            <div className="text-center">Yükleniyor...</div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {videos.map((video) => (
                <div 
                  key={video.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
                >
                  <div className="relative w-full aspect-video">
                    {video.video_url && (video.video_url.includes('youtube.com') || video.video_url.includes('youtu.be')) ? (
                      extractYouTubeId(video.video_url) ? (
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${extractYouTubeId(video.video_url)}`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Geçersiz YouTube linki</span>
                        </div>
                      )
                    ) : (
                      <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Sadece YouTube linkleri destekleniyor</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#1E2E62] group-hover:text-[#394C8C] transition-colors truncate mb-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllVideosPage;
