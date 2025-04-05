import React from "react";

function Hero() {
  return (
    <section className="flex relative flex-col justify-center py-px mb-0 w-full font-semibold bg-slate-50 bg-opacity-10 shadow-[0px_4px_4px_rgba(92,114,170,0.25)] text-blue-950 max-md:mb-2.5 max-md:max-w-full">
      <div className="flex flex-col items-center px-20 pt-20 pb-40 w-full max-md:px-5 max-md:pb-24 max-md:max-w-full">
        <div className="flex flex-col mb-0 w-full max-w-[1018px] max-md:mb-2.5 max-md:max-w-full">
          <h2 className="self-center text-2xl text-center max-md:max-w-full">
            Endokrinoloji ve Metabolizma Hastalıkları Uzmanı
          </h2>
          <div className="flex gap-5 items-center mt-3 text-4xl max-md:flex-col max-md:items-center">
            <div className="shrink-0 self-stretch my-auto max-w-full h-0 border border-solid border-slate-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[291px] max-md:w-full" />
            <h1 className="grow shrink self-stretch w-[309px] text-center">
              Prof. Dr. Yusuf Özkan
            </h1>
            <div className="shrink-0 self-stretch my-auto max-w-full h-0 border border-solid border-slate-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[306px] max-md:w-full" />
          </div>
          <p className="mt-20 text-lg font-medium text-black max-md:mt-10 max-md:px-4 max-md:max-w-full">
            <span className="text-center block">
              Diyabet (Şeker) Hastalığı, Tiroid Bezi Hastalıkları, Hipertansiyon
              (Yüksek Tansiyon), Yağ metabolizması ile ilgili hastalıklar (yüksek
              kolesterol), Obezite, Metabolik bozukluklar, Osteoporoz (kemik
              erimesi) ve Diğer Metabolik Kemik Hastalıkları, Paratiroid Bezi
              Hastalıkları, Kısırlık, Sekreter bezlerin tümörleri, Hipofiz Bezi
              Hastalıkları, Adrenal Bez Hastalıkları, İnsülin Direnci Durumları,
              Aşırı kıllanma (hirsutizm), Polikistik Over Hastalığı
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero; 