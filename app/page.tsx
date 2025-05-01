import Link from 'next/link';
import { getBlogPosts } from './lib/blogService';

export default async function Home() {
  const blogs = await getBlogPosts();

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Hoş Geldiniz</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Son Blog Yazıları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.slice(0, 3).map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {blog.image_url && (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {blog.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-gray-600 line-clamp-3">{blog.content}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tüm Blog Yazıları
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
} 