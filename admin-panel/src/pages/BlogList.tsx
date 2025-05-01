import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Blog } from '../types/blog';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Yazıları</h1>
        <Link
          to="/blogs/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Yeni Blog Yazısı
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {blog.image_url && (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
              <div className="flex justify-end space-x-2">
                <Link
                  to={`/blogs/edit/${blog.id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList; 