import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
    });
    if (error) {
      setMessage('Bir hata oluştu: ' + error.message);
    } else {
      setMessage('Şifre sıfırlama bağlantısı email adresinize gönderildi.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 space-y-6">
        <button
          className="text-sm text-[#394C8C] hover:underline mb-2"
          onClick={() => navigate('/login')}
        >
          ← Giriş Sayfasına Dön
        </button>
        <h1 className="text-2xl font-bold text-center mb-2">Şifremi Unuttum</h1>
        <p className="text-center text-gray-600 mb-4">
          Email adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
        </p>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            required
            className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#394C8C] focus:border-transparent"
            placeholder="ornek@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#394C8C] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#2D3E73] transition-colors duration-300 disabled:opacity-70"
          >
            {loading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
          </button>
        </form>
        {message && (
          <div className={`text-center text-sm mt-2 ${message.includes('hata') ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 