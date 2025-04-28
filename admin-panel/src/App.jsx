import { useState } from 'react'
import './App.css'

function App() {
  const [activeComponent, setActiveComponent] = useState('randevular');
  const [showTimeSettings, setShowTimeSettings] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [availableHours, setAvailableHours] = useState({
    '09:00': true,
    '10:00': true,
    '11:00': true,
    '14:00': true,
    '15:00': true,
    '16:00': true,
  });

  // Randevular Bileşeni
  const RandevularComponent = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-6xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#1E2E62]">Randevular</h2>
        <button className="bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 shadow-md">
          + Yeni Randevu
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-[#1E2E62] to-[#394C8C] rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <h3 className="text-lg font-semibold mb-3">Bugünkü Randevular</h3>
          <p className="text-4xl font-bold">12</p>
        </div>
        <div className="bg-gradient-to-br from-[#1E2E62] to-[#394C8C] rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <h3 className="text-lg font-semibold mb-3">Bekleyen Randevular</h3>
          <p className="text-4xl font-bold">25</p>
        </div>
        <div className="bg-gradient-to-br from-[#1E2E62] to-[#394C8C] rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <h3 className="text-lg font-semibold mb-3">Toplam Randevular</h3>
          <p className="text-4xl font-bold">156</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#EFF5FB]">
              <th className="px-6 py-4 text-left text-[#1E2E62] font-semibold">Hasta Adı</th>
              <th className="px-6 py-4 text-left text-[#1E2E62] font-semibold">Tarih/Saat</th>
              <th className="px-6 py-4 text-left text-[#1E2E62] font-semibold">Şikayet</th>
              <th className="px-6 py-4 text-left text-[#1E2E62] font-semibold">Durum</th>
              <th className="px-6 py-4 text-left text-[#1E2E62] font-semibold">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-[#EFF5FB] transition-colors duration-200">
              <td className="px-6 py-4 text-[#1E2E62]">Ahmet Yılmaz</td>
              <td className="px-6 py-4 text-[#1E2E62]">2024-03-20 14:30</td>
              <td className="px-6 py-4 text-[#1E2E62]">Baş ağrısı</td>
              <td className="px-6 py-4">
                <span className="bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Bekliyor
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white px-4 py-2 rounded-lg mr-2 hover:opacity-90 transition-all duration-200">
                  Onayla
                </button>
                <button className="bg-white text-[#1E2E62] border border-[#1E2E62] px-4 py-2 rounded-lg hover:bg-[#EFF5FB] transition-all duration-200">
                  İptal Et
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Videolar Bileşeni
  const VideolarComponent = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-6xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#1E2E62]">Videolar</h2>
        <button className="bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 shadow-md">
          + Yeni Video
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4"></div>
          <h3 className="text-[#1E2E62] font-semibold mb-3 text-lg">Video Başlığı</h3>
          <p className="text-[#394C8C] mb-6">Video açıklaması burada yer alacak...</p>
          <div className="flex justify-end gap-3">
            <button className="bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200">
              Düzenle
            </button>
            <button className="bg-white text-[#1E2E62] border border-[#1E2E62] px-4 py-2 rounded-lg hover:bg-[#EFF5FB] transition-all duration-200">
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Blog Bileşeni
  const BlogComponent = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-6xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#1E2E62]">Blog Yazıları</h2>
        <button className="bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 shadow-md">
          + Yeni Yazı
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
          <h3 className="text-[#1E2E62] font-semibold mb-3 text-xl">Blog Başlığı</h3>
          <p className="text-[#394C8C] mb-6">Blog yazısının özeti burada yer alacak...</p>
          <div className="flex justify-end gap-3">
            <button className="bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200">
              Düzenle
            </button>
            <button className="bg-white text-[#1E2E62] border border-[#1E2E62] px-4 py-2 rounded-lg hover:bg-[#EFF5FB] transition-all duration-200">
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#EFF5FB] to-white flex">
      {/* Sol Menü */}
      <div className="w-80 bg-white shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#1E2E62] mb-10 text-center">Admin Panel</h1>
        <nav className="space-y-3">
          <button
            onClick={() => setActiveComponent('randevular')}
            className={`w-full text-left px-6 py-3 rounded-xl transition-all duration-300 ${
              activeComponent === 'randevular'
                ? 'bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white shadow-md'
                : 'text-[#1E2E62] hover:bg-[#EFF5FB]'
            }`}
          >
            Randevular
          </button>
          <button
            onClick={() => setActiveComponent('videolar')}
            className={`w-full text-left px-6 py-3 rounded-xl transition-all duration-300 ${
              activeComponent === 'videolar'
                ? 'bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white shadow-md'
                : 'text-[#1E2E62] hover:bg-[#EFF5FB]'
            }`}
          >
            Videolar
          </button>
          <button
            onClick={() => setActiveComponent('blog')}
            className={`w-full text-left px-6 py-3 rounded-xl transition-all duration-300 ${
              activeComponent === 'blog'
                ? 'bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white shadow-md'
                : 'text-[#1E2E62] hover:bg-[#EFF5FB]'
            }`}
          >
            Blog Yazıları
          </button>
        </nav>
      </div>

      {/* Ana İçerik */}
      <div className="flex-1 p-10">
        {activeComponent === 'randevular' && <RandevularComponent />}
        {activeComponent === 'videolar' && <VideolarComponent />}
        {activeComponent === 'blog' && <BlogComponent />}
      </div>

      {/* Müsait Saat Ayarlama Modal */}
      {showTimeSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[600px] shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#1E2E62]">Müsait Saatleri Ayarla</h2>
              <button 
                onClick={() => setShowTimeSettings(false)}
                className="text-[#1E2E62] hover:text-[#394C8C] text-2xl transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1E2E62] mb-2">
                Tarih Seçin
              </label>
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#394C8C] text-[#1E2E62]"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-[#1E2E62] mb-3">
                Müsait Saatler
              </label>
              <div className="grid grid-cols-3 gap-3">
                {Object.keys(availableHours).map((hour) => (
                  <label key={hour} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-[#EFF5FB] transition-colors duration-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availableHours[hour]}
                      onChange={() => setAvailableHours(prev => ({
                        ...prev,
                        [hour]: !prev[hour]
                      }))}
                      className="text-[#1E2E62] rounded-md w-5 h-5"
                    />
                    <span className="text-[#1E2E62] font-medium">{hour}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowTimeSettings(false)}
                className="bg-white text-[#1E2E62] border border-[#1E2E62] px-6 py-3 rounded-xl hover:bg-[#EFF5FB] transition-all duration-200"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  setShowTimeSettings(false);
                }}
                className="bg-gradient-to-r from-[#1E2E62] to-[#394C8C] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 shadow-md"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
