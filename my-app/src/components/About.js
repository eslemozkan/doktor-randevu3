import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUserMd } from '@fortawesome/free-solid-svg-icons';

function About() {
  return (
    <section 
      id="about" 
      className="relative bg-gradient-to-r from-[#F5F7FA] to-[#EFF5FB] py-20 overflow-hidden"
    >
      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-7 space-y-8 pr-16">
            <div className="flex items-center space-x-4">
              <div className="h-[3px] w-20 bg-[#394C8C]"></div>
              <h2 className="text-4xl font-bold text-[#1E2E62] flex items-center space-x-3">
                <FontAwesomeIcon icon={faUserMd} className="text-[#394C8C] mr-3" />
                Hakkımda
              </h2>
            </div>
            
            <p className="text-xl text-gray-700 leading-relaxed">
              Endokrinoloji ve Metabolizma Hastalıkları alanında uzman bir hekim olarak, 
              hastalarımın sağlığına ve yaşam kalitesine odaklanıyorum. Diyabet, tiroid 
              hastalıkları, hormon bozuklukları gibi karmaşık sağlık sorunlarında 
              profesyonel ve kapsamlı tedavi yaklaşımları sunuyorum.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#394C8C] text-white rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <span className="text-lg font-semibold text-[#1E2E62]">
                  +20 Yıllık Deneyim Uzmanı
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#394C8C] text-white rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
                <span className="text-lg font-semibold text-[#1E2E62]">
                  Ulusal ve Uluslararası Kongre Katılımları
                </span>
              </div>
            </div>
            
            <Link 
              to="/hakkimda-detay" 
              className="group flex items-center space-x-3 bg-[#394C8C] text-white 
                         px-8 py-4 rounded-full font-semibold hover:bg-[#5A70B9] 
                         transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Detaylı Özgeçmiş</span>
              <FontAwesomeIcon 
                icon={faArrowRight} 
                className="transform transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
          
          <div className="col-span-5 relative">
            <div className="absolute -left-16 -top-16 w-96 h-96 bg-[#394C8C] opacity-10 rounded-full"></div>
            <div className="relative z-10">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5bedf5daa1fa33924ca0fa3b917efebf9d03dec?placeholderIfAbsent=true&apiKey=2700ab3a3a4f4b8a8b2827e6c4722a8f"
                alt="Prof. Dr. Yusuf Özkan"
                className="w-full rounded-3xl shadow-2xl object-cover aspect-[3/4]"
              />
              <div className="absolute inset-0 bg-[#394C8C] opacity-20 rounded-3xl hover:opacity-0 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Arka plan gradient dekorasyonu */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#394C8C] to-transparent opacity-5"></div>
    </section>
  );
}

export default About;