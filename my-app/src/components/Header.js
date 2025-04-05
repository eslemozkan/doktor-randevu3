import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-[#384C8C] h-[51px]">
      <div className="container mx-auto h-full flex items-center justify-between px-8">
        <div className="text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span>profdryusufozkan69@hotmail.com</span>
        </div>
        <nav className="flex gap-8">
          <Link to="/#about" className="text-white font-bold transition-colors duration-300 hover:text-gray-300">HAKKIMDA</Link>
          <Link to="/#blog" className="text-white font-bold transition-colors duration-300 hover:text-gray-300">BLOG</Link>
          <Link to="/#videos" className="text-white font-bold transition-colors duration-300 hover:text-gray-300">VİDEOLAR</Link>
          <Link to="/#appointment" className="text-white font-bold transition-colors duration-300 hover:text-gray-300">RANDEVU AL</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;