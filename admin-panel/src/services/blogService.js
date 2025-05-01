import { supabase } from '../supabase';

export const getBlogPosts = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getBlogPost = async (id) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const createBlogPost = async (post) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select();

  if (error) throw error;
  return data[0];
};

export const updateBlogPost = async (id, post) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

export const deleteBlogPost = async (id) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const uploadBlogImage = async (file) => {
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

  return data.publicUrl;
}; 