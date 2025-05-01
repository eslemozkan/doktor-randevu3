import { getBlogPost } from '../../lib/blogService';
import Link from 'next/link';

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const blog = await getBlogPost(params.id);

  if (!blog) {
    return (
      <main className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Yazısı Bulunamadı</h1>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Blog sayfasına dön
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link
          href="/blog"
          className="inline-block mb-8 text-blue-600 hover:text-blue-800"
        >
          ← Blog sayfasına dön
        </Link>
        
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {blog.image_url && (
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-96 object-cover"
            />
          )}
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {blog.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <div className="prose max-w-none">
              {blog.content}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
} 