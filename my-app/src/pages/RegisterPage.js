import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faHospitalUser } from '@fortawesome/free-solid-svg-icons';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Burada kayıt işlemi yapılacak
    console.log('Kayıt bilgileri:', { email, password });
    // Başarılı kayıt sonrası yönlendirme
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F7FA] to-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Sade arka plan */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#394C8C 7%, transparent 7%)',
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative z-10 max-w-lg w-full space-y-8 bg-white p-12 rounded-3xl shadow-2xl border border-[#394C8C]/10 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <FontAwesomeIcon 
              icon={faHospitalUser} 
              className="text-6xl text-[#394C8C] mb-4 opacity-80" 
            />
          </div>
          <h2 className="text-4xl font-extrabold text-[#394C8C] mb-3">
            Randevu Sistemine Katıl
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Randevu almak için lütfen kayıt olun
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="text-[#394C8C] opacity-70" 
                />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 
                           placeholder-gray-500 text-gray-900 focus:outline-none 
                           focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                           transition duration-300 ease-in-out"
                placeholder="E-posta adresinizi girin"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faLock} 
                  className="text-[#394C8C] opacity-70" 
                />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 
                           placeholder-gray-500 text-gray-900 focus:outline-none 
                           focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                           transition duration-300 ease-in-out"
                placeholder="Güçlü bir şifre belirleyin"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-6 
                         border border-transparent text-lg font-bold rounded-full 
                         text-white bg-[#394C8C] hover:bg-[#5A70B9] 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#394C8C]
                         transform transition duration-300 hover:scale-[1.02] 
                         hover:shadow-xl active:scale-95"
            >
              Hesap Oluştur
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Zaten bir hesabınız var mı?{' '}
            <Link 
              to="/login" 
              className="font-semibold text-[#394C8C] hover:text-[#5A70B9] 
                         transition duration-300 hover:underline"
            >
              Giriş Yapın
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
