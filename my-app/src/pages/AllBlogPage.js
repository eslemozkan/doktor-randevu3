import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getBlogPosts } from '../services/blogService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AllBlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts();
        setBlogPosts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Blog yazıları yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#394C8C] mx-auto"></div>
              <p className="text-[#394C8C] mt-4">Yükleniyor...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#394C8C]">Henüz blog yazısı bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group cursor-pointer"
                  onClick={() => openBlogModal(post)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image_url || '/default-blog-image.jpg'} 
                      alt={post.title} 
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/default-blog-image.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#1E2E62] mb-4">{post.title}</h3>
                    <p className="text-gray-600">{post.content?.substring(0, 150)}...</p>
                    {post.category && (
                      <div className="mt-4">
                        <span className="inline-block bg-[#394C8C] text-white px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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

      <Footer />
    </div>
  );
};

export default AllBlogPage;
