import { supabase } from '../lib/supabase';

export const getBlogPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getBlogPosts:', error);
    return [];
  }
};

export const getBlogPost = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getBlogPost:', error);
    return null;
  }
}; 