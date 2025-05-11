import React, { useState } from 'react';
import { supabase } from '../supabase';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    if (password !== passwordAgain) {
      setMessage('Şifreler eşleşmiyor.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage('Bir hata oluştu: ' + error.message);
    } else {
      setMessage('Şifreniz başarıyla güncellendi. Giriş yapabilirsiniz.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-2">Yeni Şifre Belirle</h1>
        <p className="text-center text-gray-600 mb-4">
          Lütfen yeni şifrenizi girin.
        </p>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            required
            className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#394C8C] focus:border-transparent"
            placeholder="Yeni Şifre"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            required
            className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#394C8C] focus:border-transparent"
            placeholder="Şifre Tekrar"
            value={passwordAgain}
            onChange={e => setPasswordAgain(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#394C8C] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#2D3E73] transition-colors duration-300 disabled:opacity-70"
          >
            {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
          </button>
        </form>
        {message && (
          <div className={`text-center text-sm mt-2 ${message.includes('hata') || message.includes('eşleşmiyor') ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage; 