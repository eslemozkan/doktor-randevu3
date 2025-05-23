import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faPhone, faCalendarAlt, 
  faNotesMedical, faFileUpload, faClock 
} from '@fortawesome/free-solid-svg-icons';
import { uploadMedicalFile } from '../services/uploadMedicalFile';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { getUnavailableTimes } from '../services/unavailableService';

function AppointmentFormPage() {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [userEmail, setUserEmail] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    complaint: '',
    selectedDate: '',
    medicalFile: null
  });

  const navigate = useNavigate();

  // Kullanıcı email'ini al
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      }
    };
    getUser();
  }, []);

  // Örnek dinamik saat listesi (gerçek senaryoda admin panelden gelecek)
  const availableTimes = [
    '09:00:00', '10:00:00', '11:00:00', '13:00:00', 
    '14:00:00', '15:00:00', '16:00:00', '17:00:00'
  ];

  const [unavailableTimes, setUnavailableTimes] = useState([]);

  useEffect(() => {
    if (formData.selectedDate) {
      getUnavailableTimes(formData.selectedDate).then(times => {
        setUnavailableTimes(times);
        console.log('Seçili gün:', formData.selectedDate);
        console.log('Müsait olmayan saatler:', times);
      });
    } else {
      setUnavailableTimes([]);
    }
  }, [formData.selectedDate]);

  const now = new Date();
  const isToday = formData.selectedDate === now.toISOString().slice(0, 10);

  const selectableTimes = availableTimes.filter(time => {
    if (unavailableTimes.includes(time)) return false;
    if (isToday) {
      // Saatin geçmiş olup olmadığını kontrol et
      const [hour, minute, second] = time.split(":").map(Number);
      if (hour < now.getHours()) return false;
      if (hour === now.getHours() && minute <= now.getMinutes()) return false;
    }
    return true;
  });

  // Günleri ve ayları oluştur
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const days = Array.from(
    {length: getDaysInMonth(selectedMonth, new Date().getFullYear())}, 
    (_, i) => i + 1
  );
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 
    'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 
    'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  const currentYear = new Date().getFullYear();

  const handleMonthSelect = (month) => {
    setSelectedMonth(months.indexOf(month));
  };

  const handleDateSelect = (day, month) => {
    const monthIndex = months.indexOf(month) + 1;
    const formattedDate = `${currentYear}-${monthIndex.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setSelectedDate(`${day} ${month} ${currentYear}`);
    setFormData(prev => ({...prev, selectedDate: formattedDate}));
    setIsDateModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleTimeSelect = (time) => {
    let formatted = time;
    if (!time.includes(':')) {
      formatted = time.padStart(2, '0') + ':00:00';
    } else if (time.length === 5) {
      formatted = time + ':00';
    }
    setSelectedTime(formatted);
    setIsTimeModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDateObj = new Date(formData.selectedDate);
    if (selectedDateObj.getDay() === 0 || selectedDateObj.getDay() === 6) {
      alert('Hafta sonu randevu alınamaz!');
      return;
    }
    // Geçmiş tarih/saat kontrolü
    const selectedDateTime = new Date(`${formData.selectedDate}T${selectedTime}`);
    if (selectedDateTime < new Date()) {
      alert('Geçmiş bir tarih/saat için randevu alınamaz!');
      return;
    }
    let fileUrl = null;
    if (formData.medicalFile) {
      try {
        fileUrl = await uploadMedicalFile(formData.medicalFile);
      } catch (err) {
        alert('Dosya yüklenirken hata oluştu!');
        return;
      }
    }

    let timeToSave = selectedTime;
    if (timeToSave && timeToSave.length === 5) {
      timeToSave = timeToSave + ':00';
    }

    const { error } = await supabase
      .from('appointments')
      .insert([{
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        date: formData.selectedDate,
        time: timeToSave,
        complaint: formData.complaint,
        medical_file_url: fileUrl,
        email: userEmail
      }]);

    if (error) {
      alert('Kayıt sırasında hata oluştu!');
    } else {
      alert('Randevu talebiniz başarıyla alındı!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F7FA] to-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#394C8C 7%, transparent 7%)',
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative z-10 max-w-xl w-full space-y-8 bg-white p-16 rounded-3xl shadow-2xl border border-[#394C8C]/10 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#394C8C]/10 p-6 rounded-full">
              <FontAwesomeIcon 
                icon={faCalendarAlt} 
                className="text-6xl text-[#394C8C] opacity-80" 
              />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-[#394C8C] mb-3 tracking-tight">
            Randevu Oluştur
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto opacity-75">
            Size uygun olan tarih ve saati seçin
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* Ad Soyad */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all" 
                />
              </div>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 
                           placeholder-gray-500 text-gray-900 focus:outline-none 
                           focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                           transition duration-300 ease-in-out 
                           hover:shadow-sm group-focus-within:shadow-md"
                placeholder="Ad Soyad"
              />
            </div>

            {/* Telefon Numarası */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faPhone} 
                  className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all" 
                />
              </div>
              <input
                type="tel"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 
                           placeholder-gray-500 text-gray-900 focus:outline-none 
                           focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                           transition duration-300 ease-in-out 
                           hover:shadow-sm group-focus-within:shadow-md"
                placeholder="Telefon Numarası (Başında 0 olmadan)"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Tarih Seçimi */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faCalendarAlt} 
                  className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all" 
                />
              </div>
              <button
                type="button"
                onClick={() => setIsDateModalOpen(true)}
                className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 
                           placeholder-gray-500 text-gray-900 focus:outline-none 
                           focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                           transition duration-300 ease-in-out text-left
                           hover:shadow-sm"
              >
                {selectedDate ? `Seçilen Tarih: ${selectedDate}` : 'Tarih Seç'}
              </button>
            </div>

            {/* Saat Seçimi */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon 
                  icon={faClock} 
                  className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all" 
                />
              </div>
              <button
                type="button"
                onClick={() => setIsTimeModalOpen(true)}
                className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 
                           placeholder-gray-500 text-gray-900 focus:outline-none 
                           focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                           transition duration-300 ease-in-out text-left
                           hover:shadow-sm"
              >
                {selectedTime ? `Seçilen Saat: ${selectedTime.slice(0,2)}:00` : 'Saat Seç'}
              </button>
            </div>
          </div>

          {/* Dosya Yükleme */}
          <div className="relative group">
            <div className="text-xs text-gray-500 mb-2 pl-12 flex items-center">
              Tahlil sonuçlarınızı PDF veya görüntü formatında yükleyebilirsiniz
            </div>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FontAwesomeIcon 
                icon={faFileUpload} 
                className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all absolute top-[65%] transform -translate-y-1/2 text-base" 
              />
            </div>
            <input
              type="file"
              name="medicalFile"
              onChange={handleChange}
              className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 
                         placeholder-gray-500 text-gray-900 focus:outline-none 
                         focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                         transition duration-300 ease-in-out 
                         hover:shadow-sm group-focus-within:shadow-md
                         file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                         file:text-sm file:font-semibold file:bg-[#394C8C]/10 file:text-[#394C8C]
                         hover:file:bg-[#394C8C]/20"
              placeholder="Tahlil Sonuçları"
            />
          </div>

          {/* Şikayet Açıklaması */}
          <div className="relative group">
            <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
              <FontAwesomeIcon 
                icon={faNotesMedical} 
                className="text-[#394C8C] opacity-70 group-focus-within:opacity-100 transition-all" 
              />
            </div>
            <textarea
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
              className="appearance-none rounded-xl relative block w-full px-12 py-4 border border-gray-300 
                         placeholder-gray-500 text-gray-900 focus:outline-none 
                         focus:ring-2 focus:ring-[#394C8C] focus:border-[#394C8C] 
                         transition duration-300 ease-in-out min-h-[150px]
                         hover:shadow-sm group-focus-within:shadow-md"
              placeholder="Şikayetinizi detaylı olarak açıklayın"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-6 
                         border border-transparent text-lg font-bold rounded-full 
                         text-white bg-gradient-to-r from-[#394C8C] to-[#5A70B9]
                         hover:from-[#5A70B9] hover:to-[#394C8C]
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#394C8C]
                         transform transition duration-300 hover:scale-[1.02] 
                         hover:shadow-xl active:scale-95"
            >
              Randevu Talebi Gönder
            </button>
          </div>
        </form>
      </div>

      {/* Tarih Seçim Modalı */}
      {isDateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full">
            <h3 className="text-2xl font-bold text-[#394C8C] mb-4">Tarih Seçin</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => handleMonthSelect(month)}
                  className={`text-center font-semibold py-2 px-4 rounded-lg transition-all duration-300
                    ${selectedMonth === months.indexOf(month)
                      ? 'bg-[#394C8C] text-white'
                      : 'text-[#394C8C] opacity-70 hover:bg-[#394C8C]/10'
                    }`}
                >
                  {month}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => {
                const dateObj = new Date(currentYear, selectedMonth, day);
                const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
                const isPastDate = dateObj < new Date(new Date().setHours(0,0,0,0));

                return (
                  <button
                    key={day}
                    onClick={() => !isWeekend && !isPastDate && handleDateSelect(day, months[selectedMonth])}
                    className={`py-2 px-4 rounded-lg transition-all duration-300 
                      ${isWeekend || isPastDate
                        ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                        : 'hover:bg-[#5A70B9] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#394C8C]'
                      }`}
                    disabled={isWeekend || isPastDate}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setIsDateModalOpen(false)}
              className="mt-4 w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Saat Seçim Modalı */}
      {isTimeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full">
            <h3 className="text-2xl font-bold text-[#394C8C] mb-4">Saat Seçin</h3>
            <div className="grid grid-cols-4 gap-4">
              {selectableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`py-2 px-4 rounded-lg transition-all duration-300 
                    ${selectedTime === time 
                      ? 'bg-[#394C8C] text-white' 
                      : 'bg-gray-200 hover:bg-[#5A70B9] hover:text-white'}`}
                >
                  {time.slice(0,2)}:00
                </button>
              ))}
              {selectableTimes.length === 0 && (
                <div className="col-span-4 text-center text-gray-500">Bu gün için uygun saat yok.</div>
              )}
            </div>
            <button
              onClick={() => setIsTimeModalOpen(false)}
              className="mt-4 w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentFormPage;
