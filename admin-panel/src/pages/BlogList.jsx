import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, deleteBlogPost } from '../services/blogService';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogPosts();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) return;

    try {
      await deleteBlogPost(id);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-6xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#1E2E62]">Blog Yazıları</h2>
        <Link
          to="/blogs/new"
          className="bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 shadow-md"
        >
          + Yeni Yazı
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
            {blog.image_url && (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#EFF5FB] text-[#1E2E62] px-3 py-1 rounded-full text-sm">
                {blog.category}
              </span>
            </div>
            <h3 className="text-[#1E2E62] font-semibold mb-3 text-xl">{blog.title}</h3>
            <p className="text-[#394C8C] mb-6 line-clamp-3">{blog.content}</p>
            <div className="flex justify-end gap-3">
              <Link
                to={`/blogs/edit/${blog.id}`}
                className="bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200"
              >
                Düzenle
              </Link>
              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-white text-[#1E2E62] border border-[#1E2E62] px-4 py-2 rounded-lg hover:bg-[#EFF5FB] transition-all duration-200"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList; 