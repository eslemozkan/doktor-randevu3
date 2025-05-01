import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogPost, createBlogPost, updateBlogPost, uploadBlogImage } from '../services/blogService';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({
    title: '',
    category: '',
    content: '',
    image_url: '',
  });

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const data = await getBlogPost(id);
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await updateBlogPost(id, blog);
      } else {
        await createBlogPost(blog);
      }
      navigate('/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadBlogImage(file);
      setBlog((prev) => ({ ...prev, image_url: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-6xl mx-auto animate-fadeIn">
      <h2 className="text-3xl font-bold text-[#1E2E62] mb-8">
        {id ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#1E2E62] mb-2">
            Başlık
          </label>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#394C8C] text-[#1E2E62]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E2E62] mb-2">
            Kategori
          </label>
          <input
            type="text"
            value={blog.category}
            onChange={(e) => setBlog((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#394C8C] text-[#1E2E62]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E2E62] mb-2">
            İçerik
          </label>
          <textarea
            value={blog.content}
            onChange={(e) => setBlog((prev) => ({ ...prev, content: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#394C8C] text-[#1E2E62] h-64"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E2E62] mb-2">
            Görsel
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
          {blog.image_url && (
            <img
              src={blog.image_url}
              alt="Preview"
              className="mt-2 max-h-48 rounded"
            />
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            className="bg-white text-[#1E2E62] border border-[#1E2E62] px-6 py-3 rounded-xl hover:bg-[#EFF5FB] transition-all duration-200"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 shadow-md disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm; 