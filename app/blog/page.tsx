import { getBlogPosts } from '../lib/blogService';
import Link from 'next/link';

export default async function BlogPage() {
  const blogs = await getBlogPosts();

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Blog Yazıları</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 line-clamp-3 mb-4">{blog.content}</p>
                  <Link
                    href={`/blog/${blog.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Devamını Oku
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p>Henüz blog yazısı bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 