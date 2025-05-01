import { supabase } from './supabase';

export const getBlogPosts = async () => {
  try {
    console.log('getBlogPosts çağrıldı'); // Debug için
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    console.log('Çekilen blog verileri:', data); // Debug için
    return data || [];
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return [];
  }
};

export const getBlogPost = async (id: string) => {
  try {
    console.log('getBlogPost çağrıldı, id:', id); // Debug için
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    console.log('Çekilen blog verisi:', data); // Debug için
    return data;
  } catch (error) {
    console.error('Error in getBlogPost:', error);
    return null;
  }
};

export const createBlogPost = async (post: {
  title: string;
  content: string;
  image_url?: string;
  category: string;
}) => {
  try {
    console.log('createBlogPost çağrıldı, post:', post); // Debug için
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog post:', error);
      return null;
    }

    console.log('Oluşturulan blog:', data); // Debug için
    return data;
  } catch (error) {
    console.error('Error in createBlogPost:', error);
    return null;
  }
};

export const updateBlogPost = async (id: string, post: {
  title: string;
  category: string;
  content: string;
  image_url?: string;
}) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

export const deleteBlogPost = async (id: string) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const uploadBlogImage = async (file: File) => {
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