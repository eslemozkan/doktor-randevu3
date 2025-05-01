import { supabase } from '../supabase';

export const getBlogPosts = async () => {
  try {
    console.log('Attempting to fetch blog posts...');
    
    // Önce bağlantıyı test et
    const { error: healthError } = await supabase.from('blog_posts').select('count');
    if (healthError) {
      console.error('Connection test failed:', healthError);
      throw new Error('Database connection failed');
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*');

    if (error) {
      console.error('Error details:', error);
      throw error;
    }

    console.log('Successfully fetched blog posts:', data);
    return data || [];
  } catch (error) {
    console.error('Error in getBlogPosts:', error.message);
    throw error;
  }
};

export const createBlogPost = async (blogPost) => {
  try {
    console.log('Attempting to create blog post:', blogPost);

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          title: blogPost.title,
          content: blogPost.content,
          image_url: blogPost.image_url,
          category: blogPost.category,
          created_at: new Date().toISOString() // created_at alanını ekle
        }
      ])
      .select();

    if (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }

    console.log('Successfully created blog post:', data);
    return data;
  } catch (error) {
    console.error('Error in createBlogPost:', error.message);
    throw error;
  }
};

export const getBlogPost = async (id) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getBlogPost:', error.message);
    throw error;
  }
}; 