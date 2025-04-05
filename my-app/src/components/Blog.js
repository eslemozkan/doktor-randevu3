import React, { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Diyabet ve Beslenme",
    description: "Diyabet hastalarının doğru beslenme stratejileri"
  },
  {
    id: 2,
    title: "Tiroid Hastalıkları",
    description: "Tiroid bezinin çalışması ve hastalıkları"
  },
  {
    id: 3,
    title: "Metabolik Hastalıklar",
    description: "Metabolik hastalıklar ve tedavi yöntemleri"
  }
];

function Blog() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === blogPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? blogPosts.length - 1 : prevIndex - 1
    );
  };
  return (
    <section id="blog" className="relative w-full max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg p-6">
      <h2 className="text-3xl font-semibold text-center mb-8 text-[#394C8C]">Blog</h2>
      <div className="relative">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {blogPosts.map((post, index) => (
            <div key={post.id} className="flex-shrink-0 w-full px-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-zinc-300 h-48 w-full"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-[#394C8C]">{post.title}</h3>
                  <p className="text-gray-600">{post.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-lg hover:bg-opacity-75 transition-all z-10"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89e7fbaadc1fc89796dedfdeb0a2f29c089c768e?placeholderIfAbsent=true&apiKey=2700ab3a3a4f4b8a8b2827e6c4722a8f"
            className="w-8 h-8"
            alt="Previous"
          />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-lg hover:bg-opacity-75 transition-all z-10"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6599f21c8991cae059984f2d489a968740ac6103?placeholderIfAbsent=true&apiKey=2700ab3a3a4f4b8a8b2827e6c4722a8f"
            className="w-8 h-8"
            alt="Next"
          />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {blogPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? 'bg-[#394C8C]' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="px-8 py-3 text-white bg-[#394C8C] rounded-full hover:bg-[#2d3b66] transition-colors font-medium">
          Tümünü Gör
        </button>
      </div>
    </section>
  );
}

export default Blog; 