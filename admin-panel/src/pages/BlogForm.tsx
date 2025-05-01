import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Blog } from '../types/blog';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<Partial<Blog>>({
    title: '',
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
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        const { error } = await supabase
          .from('blogs')
          .update({
            ...blog,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert({
            ...blog,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (error) throw error;
      }

      navigate('/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setBlog((prev) => ({ ...prev, image_url: data.publicUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Başlık
          </label>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => setBlog((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            İçerik
          </label>
          <ReactQuill
            value={blog.content}
            onChange={(content) => setBlog((prev) => ({ ...prev, content }))}
            className="h-64 mb-12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm; 