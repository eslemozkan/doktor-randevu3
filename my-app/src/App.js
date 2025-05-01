import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHeartPulse, faNotesMedical, faDisease, faStethoscope, faArrowRight, faCalendarAlt, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import Videos from './Videos';
import About from './components/About';
import AboutDetail from './components/AboutDetail';
import AllVideosPage from './pages/AllVideosPage';
import AllBlogPage from './pages/AllBlogPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AppointmentFormPage from './pages/AppointmentFormPage';
import { getVideos } from './services/videoService';
import { getBlogPosts, createBlogPost } from './services/blogService';
import { extractYouTubeId } from './utils/videoUtils';

// Font Awesome kütüphanesini başlat
library.add(fab);
library.add(
  faHeartPulse, 
  faNotesMedical, 
  faDisease, 
  faStethoscope, 
  faArrowRight,
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faTimes
);

// Özel kartlar için veri
const specialtyCards = [
  { 
    icon: faDisease, 
    title: 'Diyabet', 
    description: 'Diyabet tedavisi ve yönetimi' 
  },
  { 
    icon: faStethoscope, 
    title: 'Tiroid', 
    description: 'Tiroid bezi hastalıkları' 
  },
  { 
    icon: faHeartPulse, 
    title: 'Metabolik', 
    description: 'Metabolik hastalıklar' 
  },
  { 
    icon: faNotesMedical, 
    title: 'Hormon', 
    description: 'Hormon dengesi ve tedavisi' 
  }
];

function App() {
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePrevBlog = () => {
    setCurrentBlogIndex((prevIndex) => (prevIndex === 0 ? blogs.length - 1 : prevIndex - 1));
  };

  const handleNextBlog = () => {
    setCurrentBlogIndex((prevIndex) => (prevIndex === blogs.length - 1 ? 0 : prevIndex + 1));
  };

  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
  };

  const closeBlogModal = () => {
    setSelectedBlog(null);
  };

  const getVisibleBlogs = () => {
    console.log('Current blogs state:', blogs); // Debug log
    if (!blogs || blogs.length === 0) {
      console.log('No blogs available'); // Debug log
      return [];
    }
    const visibleBlogs = [
      blogs[currentBlogIndex],
      blogs[(currentBlogIndex + 1) % blogs.length],
      blogs[(currentBlogIndex + 2) % blogs.length]
    ];
    console.log('Visible blogs:', visibleBlogs); // Debug log
    return visibleBlogs;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Hata durumunu sıfırla
        
        // Test blog yazısı ekle
        const testBlog = {
          title: "Diyabet Hakkında Bilmeniz Gerekenler",
          content: "Diyabet, vücudunuzun şekeri (glukozu) enerjiye dönüştürmek için kullandığı insülin hormonunu üretmediğinde veya etkili bir şekilde kullanamadığında ortaya çıkan kronik bir hastalıktır. Bu durumda kan şekeri (kan glukozu) seviyeleri yükselir. Uzun vadede yüksek kan şekeri seviyeleri, kalp hastalığı, görme kaybı, böbrek hastalığı ve sinir hasarı gibi ciddi sağlık sorunlarına yol açabilir.",
          image_url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
          category: "Sağlık"
        };

        try {
          await createBlogPost(testBlog);
          console.log('Test blog post created successfully');
        } catch (createError) {
          console.error('Error creating test blog:', createError);
          // Blog oluşturma hatası olsa bile devam et
        }

        // Video ve blog verilerini paralel olarak çek
        const [videoData, blogData] = await Promise.all([
          getVideos(),
          getBlogPosts()
        ]);

        console.log('Fetched blog data:', blogData);

        if (!Array.isArray(blogData)) {
          throw new Error('Blog data is not in expected format');
        }

        // Sadece video_url'i dolu olanları al
        setVideos(videoData.filter(v => v.video_url && v.video_url.trim() !== ""));
        setBlogs(blogData);

        console.log('Set blogs state:', blogData);
        setLoading(false);
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError(err.message || 'Veri yüklenirken bir hata oluştu');
        setLoading(false);
        setBlogs([]); // Hata durumunda blogs state'ini boş array yap
      }
    };
    fetchData();
  }, []);

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const getVisibleVideos = () => {
    if (!videos || videos.length === 0) return [];
    const visibleVideos = [];
    for (let i = 0; i < 3; i++) {
      visibleVideos.push(videos[(currentVideoIndex + i) % videos.length]);
    }
    return visibleVideos;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={
          <>
            {/* Header */}
            <header className="bg-[#384C8C] h-[51px]">
              <div className="container mx-auto h-full flex items-center justify-between px-8">
                <div className="text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>profdryusufozkan69@hotmail.com</span>
                </div>
                <nav className="flex gap-8">
                  <a href="#about" className="text-white font-bold transition-colors duration-300 hover:text-gray-300">HAKKIMDA</a>
                  <a href="#blog" className="text-white font-bold transition-colors duration-300 hover:text-gray-300">BLOG</a>
                  <a href="#videos" className="text-white font-bold transition-colors duration-300 hover:text-gray-300">VİDEOLAR</a>
                  <a href="#appointment" className="text-white font-bold transition-colors duration-300 hover:text-gray-300">RANDEVU AL</a>
                </nav>
              </div>
            </header>
            
            {/* Hero Section */}
            <section className="relative bg-[#EFF5FB] py-16">
              <div className="container mx-auto px-8 flex items-center justify-between">
                <div className="w-1/2 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-[2px] w-16 bg-[#394C8C]"></div>
                    <h2 className="text-[#394C8C] text-xl font-medium">
                      Endokrinoloji ve Metabolizma Hastalıkları Uzmanı
                    </h2>
                  </div>
                  <h1 className="text-[#1E2E62] text-5xl font-bold leading-tight">
                    Prof. Dr. Yusuf Özkan
                  </h1>
                  <p className="text-gray-700 text-lg leading-relaxed max-w-xl">
                    Diyabet (Şeker) Hastalığı, Tiroid Bezi Hastalıkları, Hipertansiyon 
                    (Yüksek Tansiyon), Yağ metabolizması ile ilgili hastalıklar (yüksek 
                    kolesterol), Obezite, Metabolik bozukluklar ve daha fazlası...
                  </p>
                  <div className="flex space-x-6">
                    <a 
                      href="#appointment" 
                      className="bg-[#394C8C] text-white px-10 py-4 rounded-full 
                                 font-semibold hover:bg-opacity-90 transition-colors 
                                 shadow-lg hover:shadow-xl"
                    >
                      Randevu Al
                    </a>
                    <a 
                      href="#about" 
                      className="border-2 border-[#394C8C] text-[#394C8C] px-10 py-4 
                                 rounded-full font-semibold hover:bg-[#394C8C] 
                                 hover:text-white transition-colors shadow-lg hover:shadow-xl"
                    >
                      Hakkımda
                    </a>
                  </div>
                </div>
                <div className="w-1/2 grid grid-cols-2 gap-6">
                  {specialtyCards.map((card, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
                                transform transition-all duration-300 hover:-translate-y-2
                                border-2 border-transparent hover:border-[#394C8C]"
                    >
                      <div className="text-[#394C8C] text-4xl mb-4 flex justify-center">
                        <FontAwesomeIcon icon={card.icon} />
                      </div>
                      <h3 className="text-xl font-bold text-[#1E2E62] text-center mb-3">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-center">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about">
              <About />
            </section>

            {/* Videos Section */}
            <section id="videos" className="py-20 bg-gradient-to-r from-[#F5F7FA] to-[#EFF5FB]">
              <div className="container mx-auto px-8">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="h-[3px] w-20 bg-[#394C8C]"></div>
                    <h2 className="text-4xl font-bold text-[#1E2E62]">Videolar</h2>
                    <div className="h-[3px] w-20 bg-[#394C8C]"></div>
                  </div>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Sağlık ve tedavi hakkında bilgilendirici videolar
                  </p>
                </div>

                {loading ? (
                  <div className="text-center">Yükleniyor...</div>
                ) : error ? (
                  <div className="text-center text-red-500">Hata: {error}</div>
                ) : videos.length > 0 ? (
                  <div className="relative">
                    <button
                      onClick={handlePrevVideo}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#394C8C] text-white rounded-full flex items-center justify-center hover:bg-[#5A70B9] transition-all"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    <div className="mx-16">
                      <div className="grid grid-cols-3 gap-8">
                        {getVisibleVideos().map((video, index) => (
                          <div key={video.id} className={`bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 ${index === 1 ? 'scale-105 z-10' : 'scale-90 opacity-70 z-0'}`}>
                            <div className="relative pb-[56.25%]">
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
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-[#1E2E62] mb-2">{video.title}</h3>
                              <p className="text-gray-600">{video.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleNextVideo}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#394C8C] text-white rounded-full flex items-center justify-center hover:bg-[#5A70B9] transition-all"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">Henüz video eklenmemiş.</div>
                )}

                <div className="flex justify-center mt-12">
                  <Link
                    to="/videolar"
                    className="group flex items-center space-x-3 bg-[#394C8C] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#5A70B9] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Tüm Videolar</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </section>
            
            {/* Blog Section */}
            <section id="blog" className="py-20 bg-gradient-to-r from-[#F5F7FA] to-[#EFF5FB]">
              <div className="container mx-auto px-8">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="h-[3px] w-20 bg-[#394C8C]"></div>
                    <h2 className="text-4xl font-bold text-[#1E2E62]">Blog Yazıları</h2>
                    <div className="h-[3px] w-20 bg-[#394C8C]"></div>
                  </div>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Sağlık, beslenme ve yaşam kalitesi hakkında güncel bilgiler
                  </p>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-xl text-gray-600">Yükleniyor...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <p className="text-xl text-red-600">Hata: {error}</p>
                  </div>
                ) : blogs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-xl text-gray-600">Henüz blog yazısı bulunmamaktadır.</p>
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center">
                    <button 
                      onClick={handlePrevBlog}
                      className="absolute left-0 z-10 w-12 h-12 bg-[#394C8C] text-white rounded-full 
                               flex items-center justify-center hover:bg-opacity-90 transition-all"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    
                    <button 
                      onClick={handleNextBlog}
                      className="absolute right-0 z-10 w-12 h-12 bg-[#394C8C] text-white rounded-full 
                               flex items-center justify-center hover:bg-opacity-90 transition-all"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>

                    <div className="grid grid-cols-3 gap-8 mx-16 overflow-hidden">
                      {getVisibleBlogs().map((post, index) => (
                        <div 
                          key={post.id} 
                          className={`bg-white rounded-2xl overflow-hidden shadow-lg 
                                    transform transition-all duration-300 hover:-translate-y-2 
                                    hover:shadow-xl group
                                    ${index === 1 ? 'scale-105 z-10' : 'scale-90 opacity-70 z-0'}`}
                        >
                          <div className="relative overflow-hidden">
                            <img 
                              src={post.image_url || '/default-blog-image.jpg'} 
                              alt={post.title} 
                              className="w-full h-[250px] object-cover 
                                       transform transition-transform duration-300 
                                       group-hover:scale-110"
                              onError={(e) => {
                                e.target.src = '/default-blog-image.jpg';
                              }}
                            />
                          </div>
                          
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-[#1E2E62] mb-3 
                                         group-hover:text-[#394C8C] transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {post.content?.substring(0, 150)}...
                            </p>
                            
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                openBlogModal(post);
                              }}
                              className="group flex items-center space-x-2 text-[#394C8C] 
                                       font-semibold hover:text-[#5A70B9] transition-colors"
                            >
                              <span>Devamını Oku</span>
                              <FontAwesomeIcon 
                                icon={faArrowRight} 
                                className="transform transition-transform group-hover:translate-x-1"
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-center mt-12">
                  <Link 
                    to="/blog"
                    className="group flex items-center space-x-3 bg-[#394C8C] text-white 
                               px-8 py-4 rounded-full font-semibold hover:bg-[#5A70B9] 
                               transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Tüm Blog Yazıları</span>
                    <FontAwesomeIcon 
                      icon={faArrowRight} 
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </section>

            {/* Social Media & Appointment Section */}
            <section id="appointment" className="py-16 bg-[#EFF5FB]">
              <div className="container mx-auto px-8">
                <div className="grid grid-cols-12 gap-12">
                  <div className="col-span-6">
                    <div className="bg-[#394C8C] rounded-[31px] p-8 transition-all duration-300 hover:shadow-xl">
                      <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                        <FontAwesomeIcon icon={['fab', 'share-alt']} className="mr-4" /> 
                        Sosyal Medya Hesaplarımız
                      </h2>
                      <div className="space-y-4">
                        <a 
                          href="https://facebook.com/profdr.yusufozkan" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full bg-[#5A70B9] text-white py-4 px-6 rounded-[17px] font-bold text-left flex items-center 
                                     transition-all duration-300 hover:bg-blue-600 group"
                        >
                          <FontAwesomeIcon icon={['fab', 'facebook']} className="mr-3 text-xl group-hover:scale-110 transition-transform" /> 
                          Facebook Sayfamız
                        </a>
                        <a 
                          href="https://twitter.com/profdr_yusufozkan" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full bg-[#5A70B9] text-white py-4 px-6 rounded-[17px] font-bold text-left flex items-center 
                                     transition-all duration-300 hover:bg-blue-400 group"
                        >
                          <FontAwesomeIcon icon={['fab', 'twitter']} className="mr-3 text-xl group-hover:scale-110 transition-transform" /> 
                          Twitter Hesabımız
                        </a>
                        <a 
                          href="https://instagram.com/profdr.yusufozkan" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full bg-[#5A70B9] text-white py-4 px-6 rounded-[17px] font-bold text-left flex items-center 
                                     transition-all duration-300 hover:bg-pink-600 group"
                        >
                          <FontAwesomeIcon icon={['fab', 'instagram']} className="mr-3 text-xl group-hover:scale-110 transition-transform" /> 
                          Instagram Sayfamız
                        </a>
                        <a 
                          href="https://linkedin.com/in/profdryusufozkan" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full bg-[#5A70B9] text-white py-4 px-6 rounded-[17px] font-bold text-left flex items-center 
                                     transition-all duration-300 hover:bg-blue-700 group"
                        >
                          <FontAwesomeIcon icon={['fab', 'linkedin']} className="mr-3 text-xl group-hover:scale-110 transition-transform" /> 
                          LinkedIn Profilimiz
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 flex flex-col items-center justify-center bg-white rounded-[31px] p-10 shadow-xl">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-[#394C8C] mb-4">
                        Hemen Randevu Oluşturun
                      </h2>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Sağlık danışmanlığı ve muayene için hızlı ve kolay bir şekilde randevu alabilirsiniz.
                      </p>
                    </div>
                    
                    <div className="flex items-center bg-[#EFF5FB] p-4 rounded-xl w-full">
                      <div className="mr-4">
                        <FontAwesomeIcon 
                          icon={faCalendarAlt} 
                          className="text-3xl text-[#394C8C]" 
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1E2E62]">Hızlı Randevu</h3>
                        <p className="text-sm text-gray-600">
                          Online olarak dakikalar içinde randevu alın
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      className="mt-8 bg-[#394C8C] text-white px-12 py-4 rounded-full font-semibold text-xl 
                                 transition-all duration-300 hover:bg-[#5A70B9] hover:shadow-xl"
                      onClick={() => navigate('/register')}
                    >
                      Randevu Oluştur
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#384C8C] text-white py-12">
              <div className="container mx-auto px-8">
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Hakkımda</h3>
                    <p>Prof. Dr. Yusuf Özkan - Endokrinoloji ve Metabolizma Hastalıkları Uzmanı</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Hızlı Erişim</h3>
                    <ul className="space-y-2">
                      <li><a href="#about" className="hover:text-gray-300">Hakkımda</a></li>
                      <li><a href="#blog" className="hover:text-gray-300">Blog</a></li>
                      <li><a href="#videos" className="hover:text-gray-300">Videolar</a></li>
                      <li><a href="#appointment" className="hover:text-gray-300">Randevu Al</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">İletişim</h3>
                    <div className="space-y-2">
                      <p>Email: profdryusufozkan69@hotmail.com</p>
                      <p>Telefon: +90 XXX XXX XX XX</p>
                      <p>Adres: Elazığ, Türkiye</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Sosyal Medya</h3>
                    <div className="flex space-x-4">
                      <a href="https://facebook.com/profdr.yusufozkan" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 flex items-center">
                        <FontAwesomeIcon icon={['fab', 'facebook']} className="mr-2" /> Facebook
                      </a>
                      <a href="https://twitter.com/profdr_yusufozkan" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 flex items-center">
                        <FontAwesomeIcon icon={['fab', 'twitter']} className="mr-2" /> Twitter
                      </a>
                      <a href="https://instagram.com/profdr.yusufozkan" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 flex items-center">
                        <FontAwesomeIcon icon={['fab', 'instagram']} className="mr-2" /> Instagram
                      </a>
                      <a href="https://linkedin.com/in/yusufozkan" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 flex items-center">
                        <FontAwesomeIcon icon={['fab', 'linkedin']} className="mr-2" /> LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-700 text-center">
                  <p>&copy; {new Date().getFullYear()} Prof. Dr. Yusuf Özkan. Tüm hakları saklıdır.</p>
                </div>
              </div>
            </footer>
          </>
        } />
        <Route path="/hakkimda-detay" element={<AboutDetail />} />
        <Route path="/videolar" element={<AllVideosPage />} />
        <Route path="/blog" element={<AllBlogPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/appointment-form" element={<AppointmentFormPage />} />
      </Routes>

      {/* Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#E6EDFF] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative p-8 md:p-12 border border-[#A0B4F4]">
            <button 
              onClick={closeBlogModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#394C8C] text-white hover:bg-[#5A70B9] transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            
            <img 
              src={selectedBlog.image_url || '/default-blog-image.jpg'} 
              alt={selectedBlog.title} 
              className="w-full h-96 object-cover rounded-2xl mb-8"
              onError={(e) => {
                e.target.src = '/default-blog-image.jpg';
              }}
            />
            
            <h2 className="text-4xl font-bold text-[#1E2E62] mb-6">{selectedBlog.title}</h2>
            
            {selectedBlog.category && (
              <div className="mb-6">
                <span className="inline-block bg-[#394C8C] text-white px-4 py-2 rounded-full">
                  {selectedBlog.category}
                </span>
              </div>
            )}
            
            <div className="prose max-w-none text-[#394C8C] leading-relaxed">
              {selectedBlog.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;