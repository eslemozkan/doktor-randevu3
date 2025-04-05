import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AllBlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Sağlıklı Beslenme İpuçları',
      excerpt: 'Günlük hayatınızda sağlıklı beslenme için pratik öneriler...',
      image: 'https://example.com/blog1.jpg',
      content: 'Detaylı sağlıklı beslenme içeriği...'
    },
    {
      id: 2,
      title: 'Egzersiz ve Sağlık',
      excerpt: 'Düzenli egzersizin sağlığınıza etkileri...',
      image: 'https://example.com/blog2.jpg',
      content: 'Egzersiz ve sağlık hakkında detaylı bilgiler...'
    },
    {
      id: 3,
      title: 'Zihinsel Sağlık Rehberi',
      excerpt: 'Zihinsel sağlığınızı korumak için pratik yöntemler...',
      image: 'https://example.com/blog3.jpg',
      content: 'Zihinsel sağlık hakkında kapsamlı içerik...'
    }
  ];

  const [selectedBlog, setSelectedBlog] = useState(null);

  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
  };

  const closeBlogModal = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto px-8 py-16">
        <div className="bg-[#F5F7FA] rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="h-[3px] w-20 bg-[#394C8C]"></div>
              <h1 className="text-5xl font-bold text-[#1E2E62]">Blog Yazıları</h1>
              <div className="h-[3px] w-20 bg-[#394C8C]"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sağlık, beslenme ve yaşam kalitesi hakkında güncel bilgiler
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group cursor-pointer"
                onClick={() => openBlogModal(post)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#1E2E62] mb-4">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-[#E6EDFF] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative p-12 border border-[#A0B4F4]">
            <button 
              onClick={closeBlogModal}
              className="absolute top-4 right-4 text-3xl text-[#394C8C] hover:text-[#5A70B9] transition-colors"
            >
              &times;
            </button>
            
            <img 
              src={selectedBlog.image} 
              alt={selectedBlog.title} 
              className="w-full h-96 object-cover rounded-2xl mb-8"
            />
            
            <h2 className="text-4xl font-bold text-[#1E2E62] mb-6">{selectedBlog.title}</h2>
            
            <div className="prose max-w-none text-[#394C8C] leading-relaxed">
              {selectedBlog.content}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AllBlogPage;
