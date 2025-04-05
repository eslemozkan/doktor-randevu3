import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-[#384C8C] text-white py-12">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">İletişim</h3>
            <p className="text-gray-300 mb-2">Email: profdryusufozkan69@hotmail.com</p>
            <p className="text-gray-300">Telefon: +90 XXX XXX XX XX</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Hızlı Linkler</h3>
            <div className="space-y-2">
              <Link to="/#about" className="text-gray-300 hover:text-white transition-colors">Hakkımda</Link>
              <Link to="/#blog" className="block text-gray-300 hover:text-white transition-colors">Blog</Link>
              <Link to="/#videos" className="block text-gray-300 hover:text-white transition-colors">Videolar</Link>
              <Link to="/#appointment" className="block text-gray-300 hover:text-white transition-colors">Randevu Al</Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Sosyal Medya</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/profdr.yusufozkan" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 flex items-center">
                <FontAwesomeIcon icon={faInstagram} className="mr-2" /> Instagram
              </a>
              <a href="https://linkedin.com/in/yusufozkan" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 flex items-center">
                <FontAwesomeIcon icon={faLinkedin} className="mr-2" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Prof. Dr. Yusuf Özkan. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;