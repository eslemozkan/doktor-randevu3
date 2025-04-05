import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faUserMd, 
  faCalendar, 
  faUniversity,
  faAward,
  faShieldAlt,
  faHeartPulse,
  faUserGroup,
  faNewspaper,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import Footer from './Footer';
import PublicationsModal from './PublicationsModal';

const TimelineItem = ({ icon, title, institution, period, description, isSpecial }) => (
  <div className={`relative pl-12 pb-8 ${isSpecial ? 'border-l-4 border-[#FF6B6B]' : 'border-l-4 border-[#394C8C]'}`}>
    <div className={`absolute -left-[26px] top-0 w-12 h-12 ${isSpecial ? 'bg-[#FF6B6B]' : 'bg-[#394C8C]'} text-white rounded-full flex items-center justify-center`}>
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className="ml-6">
      <h3 className="text-xl font-semibold text-[#1E2E62]">{title}</h3>
      <p className="text-gray-600 font-medium">{institution}</p>
      <p className="text-sm text-gray-500 mb-2">{period}</p>
      {description && <p className="text-gray-700">{description}</p>}
    </div>
  </div>
);

const AboutDetail = () => {
  const [isPublicationsOpen, setIsPublicationsOpen] = useState(false);
  const interestAreas = [
    "Diabetes Mellitus (Şeker Hastalığı)",
    "Tiroid Bezi Hastalıkları (Hipotiroidi, Hipertiroidi, Tiroid nodülleri, Tiroid kanseri tanı ve takibi)",
    "Hipertansiyon (Tansiyon Yüksekliği)",
    "Yağ metabolizması ile ilgili hastalıklar (kolesterol yüksekliği)",
    "Şişmanlık (obezite)",
    "Metabolik bozukluklar",
    "Hormonların fazla ya da az üretimi",
    "Osteoporoz (kemik Erimesi) ve Diğer Metabolik Kemik Hastalıkları",
    "Paratiroid Bezi Hastalıkları (Kalsiyum düşüklüğü ya da yüksekliği)",
    "İnfertilite (kısırlık)",
    "Salgı bezlerinin tümörleri",
    "Hipofiz Bezi Hastalıkları",
    "Böbreküstü bezi Hastalıkları",
    "İnsülin direnci durumları",
    "Aşırı tüylenme (hirsutizm), Polikistik Over Hastalığı"
  ];

  const professionalAssociations = [
    "Türkiye Endokrinoloji ve Metabolizma Derneği",
    "Türk İç Hastalıkları Uzmanlık Derneği", 
    "American Diabetes Association",
    "The Endocrine Society"
  ];

  const scientificRoles = [
    "Fırat Tıp Dergisi Yayın Kurulu Üyeliği",
    "Türkiye Klinikleri Endokrinoloji Dergisi Yayın Kurulu Üyeliği",
    "Türkiye Klinikleri Tıp Bilimleri Dergisi Hakemliği",
    "Dicle Tıp Dergisi Danışma Kurulu Üyeliği",
    "Fırat Tıp Dergisi Hakemliği",
    "European Journal of General Medicine Hakemliği",
    "Journal of the National Medical Association Hakemliği"
  ];

  const researchWorks = [
    {
      title: "Profesörlük Başlıca Araştırma Eseri",
      citation: "Ozkan Y, Aydin S, Donder E, Koca SS, Aydin S, Ozkan B, Sahin I. \"Effect of orlistat on the total ghrelin and leptin levels in obese patients\". J Physiol Biochem. 2009 Sep;65(3):215–23."
    }
  ];

  return (
    <div>
      <Header />
      <div className="bg-gradient-to-br from-[#F5F7FA] to-[#EFF5FB] min-h-screen py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-white shadow-2xl rounded-3xl p-8 lg:p-12">
            <div className="flex items-center mb-12">
              <div className="h-[3px] w-20 bg-[#394C8C] mr-4"></div>
              <h1 className="text-4xl font-bold text-[#1E2E62]">Detaylı Özgeçmiş</h1>
            </div>

            {/* Profesyonel Tanıtım Kutusu */}
            <div className="bg-[#F0F4F8] rounded-2xl p-8 mb-12 shadow-md">
              <div className="text-gray-700 leading-relaxed text-lg">
                1969 yılında Düziçi/Osmaniye'de doğdum. 1986 yılında Düziçi Anadolu Öğretmen lisesinden, 1992 yılında ise Çukurova Üniversitesi Tıp Fakültesinden Mezun oldum. Çorum/Boğazkale ilçesinde mecburi hizmet görevimi, Amasya/Merzifon Hava Hastanesinde Askerlik görevimi yaptım. 1995-1999 yılları arasında Fırat Üniversitesi Tıp Fakültesi İç Hastalıkları kliniğinde ihtisasımı yaptım. 2000 yılında yardımcı doçent, 2006 yılında Endokrinoloji ve metabolizma yan dal uzmanı ve İç Hastalıkları Doçenti oldum. 2012 yılında profesör oldum. Uzun yıllar Fırat Üniversitesi Tıp Fakültesi Hastanesinde Endokrinoloji ve Metabolizma Kliniği başkanlığını yürüttüm, 2022 yılında emekli oldum. Şu an özel bir hastanede İç Hastalıkları, Endokrinoloji ve Metabolizma Hastalıkları uzmanı olarak çalışmaktayım. Çok sayıda yurt içi ve yurt dışı dergilerde yayınlanmış makalelerim mevcuttur.
              </div>
            </div>

            {/* Yayınlar Butonu */}
            <div className="flex justify-center my-8">
              <button
                onClick={() => setIsPublicationsOpen(true)}
                className="bg-[#394C8C] text-white px-8 py-3 rounded-full hover:bg-[#2C3A6A] transition-colors
                           flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
                Akademik Yayınları Görüntüle
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Tıp Eğitimi */}
              <div>
                <h2 className="text-2xl font-semibold text-[#394C8C] mb-8 flex items-center">
                  <FontAwesomeIcon icon={faGraduationCap} className="mr-4" />
                  Tıp Eğitimi
                </h2>
                <div className="space-y-6">
                  <TimelineItem 
                    icon={faUniversity}
                    title="Tıp Fakültesi"
                    institution="Çukurova Üniversitesi"
                    period="1992"
                  />
                  <TimelineItem 
                    icon={faUniversity}
                    title="Uzmanlık Eğitimi"
                    institution="Fırat Üniversitesi"
                    period="1999"
                  />
                  <TimelineItem 
                    icon={faUniversity}
                    title="Doktora"
                    institution="Fırat Üniversitesi"
                    period="2006"
                  />
                </div>
              </div>

              {/* Kariyer */}
              <div>
                <h2 className="text-2xl font-semibold text-[#394C8C] mb-8 flex items-center">
                  <FontAwesomeIcon icon={faAward} className="mr-4" />
                  Akademik Kariyer
                </h2>
                <div className="space-y-6">
                  <TimelineItem 
                    icon={faUserMd}
                    title="Genel Pratisyen"
                    institution="Boğazkale Merkez Sağlık Merkezi"
                    period="1992-1995"
                  />
                  <TimelineItem 
                    icon={faShieldAlt}
                    title="Askerlik Hizmeti"
                    institution="Merzifon Asker Hastanesi"
                    period="1994-1995"
                    isSpecial={true}
                  />
                  <TimelineItem 
                    icon={faUserMd}
                    title="Uzman Doktor"
                    institution="Fırat Üniversitesi"
                    period="1995-1999"
                  />
                  <TimelineItem 
                    icon={faUserMd}
                    title="Doçent Doktor"
                    institution="Fırat Üniversitesi"
                    period="2000-2012"
                  />
                  <TimelineItem 
                    icon={faUserMd}
                    title="Profesör Doktor"
                    institution="Fırat Üniversitesi"
                    period="2012-2016"
                  />
                  <TimelineItem 
                    icon={faUserMd}
                    title="Profesör Doktor"
                    institution="Medikal Hastanesi"
                    period="2012-2016"
                  />
                </div>
              </div>
            </div>

            {/* İlgi Alanları */}
            <div className="mt-12 bg-[#F0F4F8] rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-semibold text-[#394C8C] mb-6 flex items-center">
                <FontAwesomeIcon icon={faHeartPulse} className="mr-4" />
                İlgi Alanları
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {interestAreas.map((area, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <span className="mr-3 text-[#394C8C]">•</span>
                    {area}
                  </div>
                ))}
              </div>
            </div>

            {/* Mesleki Kuruluşlar */}
            <div className="mt-12 bg-[#F0F4F8] rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-semibold text-[#394C8C] mb-6 flex items-center">
                <FontAwesomeIcon icon={faUserGroup} className="mr-4" />
                Üyesi Olduğu Mesleki Kuruluşlar
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {professionalAssociations.map((association, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <span className="mr-3 text-[#394C8C]">•</span>
                    {association}
                  </div>
                ))}
              </div>
            </div>

            {/* Bilimsel ve Mesleki Bilirkişilik Görevleri */}
            <div className="mt-12 bg-[#F0F4F8] rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-semibold text-[#394C8C] mb-6 flex items-center">
                <FontAwesomeIcon icon={faNewspaper} className="mr-4" />
                Bilimsel ve Mesleki Bilirkişilik Görevleri
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {scientificRoles.map((role, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <span className="mr-3 text-[#394C8C]">•</span>
                    {role}
                  </div>
                ))}
              </div>
            </div>

            {/* Araştırma Eserleri */}
            <div className="mt-12 bg-[#F0F4F8] rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-semibold text-[#394C8C] mb-6 flex items-center">
                <FontAwesomeIcon icon={faBook} className="mr-4" />
                Başlıca Araştırma Eserleri
              </h2>
              <div className="space-y-4">
                {researchWorks.map((work, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-[#1E2E62] mb-2">{work.title}</h3>
                    <p className="text-gray-700 italic">{work.citation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <PublicationsModal
        isOpen={isPublicationsOpen}
        onClose={() => setIsPublicationsOpen(false)}
      />
    </div>
  );
};

export default AboutDetail;
