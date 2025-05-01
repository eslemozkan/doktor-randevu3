import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user, error } = await loginUser(email, password);
      
      if (error) {
        setError(error);
        return;
      }

      if (user) {
        // Başarılı giriş sonrası ana sayfaya yönlendir
        navigate('/');
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF5FB] to-[#F5F7FA] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1E2E62]">Giriş Yap</h1>
          <p className="text-gray-600 mt-2">
            Hesabınıza giriş yaparak randevu alabilirsiniz.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Adresi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#394C8C] focus:border-transparent"
                placeholder="ornek@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#394C8C] focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#394C8C] text-white py-3 px-4 rounded-lg font-semibold 
                       hover:bg-[#2D3E73] transition-colors duration-300 
                       ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Hesabınız yok mu?{' '}
            <Link to="/register" className="text-[#394C8C] font-semibold hover:text-[#2D3E73]">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
