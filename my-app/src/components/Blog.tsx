import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface BlogProps {
  blogs: any[];
  onPrevClick: () => void;
  onNextClick: () => void;
}

const Blog: React.FC<BlogProps> = ({ blogs, onPrevClick, onNextClick }) => {
  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-[3px] w-20 bg-[#394C8C]"></div>
            <h2 className="text-4xl font-bold text-[#1E2E62]">Blog Yazıları</h2>
            <div className="h-[3px] w-20 bg-[#394C8C]"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sağlık, beslenme ve yaşam kalitesi hakkında güncel bilgiler
          </p>
        </div>

        <div className="relative">
          <button
            onClick={onPrevClick}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6
                     bg-[#394C8C] text-white w-12 h-12 rounded-full flex items-center 
                     justify-center hover:bg-opacity-90 transition-colors z-10"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden 
                         transform transition-all duration-300 hover:-translate-y-2"
              >
                {blog.image_url && (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1E2E62] mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-[#394C8C] font-semibold flex items-center gap-2 
                             hover:text-opacity-80 transition-colors"
                  >
                    Devamını Oku
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onNextClick}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6
                     bg-[#394C8C] text-white w-12 h-12 rounded-full flex items-center 
                     justify-center hover:bg-opacity-90 transition-colors z-10"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#394C8C] text-white 
                     px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 
                     transition-colors"
          >
            <span>Tüm Blog Yazıları</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog; 