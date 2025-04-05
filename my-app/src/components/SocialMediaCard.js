import React from "react";

function SocialMediaCard() {
  return (
    <div className="flex flex-col px-8 pt-6 pb-16 mx-auto w-full text-2xl font-bold text-center text-white bg-blue-900 rounded-[31px] max-md:px-5 max-md:mt-10">
      <h3 className="self-start ml-3.5 text-3xl max-md:ml-2.5">Sosyal Medya</h3>
      <a
        href="#"
        className="flex gap-4 px-3.5 py-3.5 mt-8 whitespace-nowrap rounded-2xl shadow-sm bg-slate-500 hover:bg-slate-600 transition-colors"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd69f49d832796360fa998a7b93f6632f7eb5b0f?placeholderIfAbsent=true&apiKey=2700ab3a3a4f4b8a8b2827e6c4722a8f"
          className="object-contain overflow-hidden shrink-0 aspect-square w-[37px]"
          alt="Social media icon"
        />
        <span className="flex-auto w-[251px]">@profdryusufozkan</span>
      </a>
      <a
        href="#"
        className="flex gap-4 px-4 py-3.5 mt-10 whitespace-nowrap rounded-2xl shadow-sm bg-slate-500 hover:bg-slate-600 transition-colors"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0acd7502701ab3aa1280f03f9d376932f634c2ee?placeholderIfAbsent=true&apiKey=2700ab3a3a4f4b8a8b2827e6c4722a8f"
          className="object-contain overflow-hidden shrink-0 aspect-square w-[37px]"
          alt="Social media icon"
        />
        <span className="flex-auto w-[250px]">@profdryusufozkan</span>
      </a>
      <a
        href="#"
        className="flex gap-4 px-5 py-4 mt-10 whitespace-nowrap rounded-2xl shadow-sm bg-slate-500 hover:bg-slate-600 transition-colors max-md:mt-10"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/69b554403a309e4af2655cf3e96791edd4ba33b4?placeholderIfAbsent=true&apiKey=2700ab3a3a4f4b8a8b2827e6c4722a8f"
          className="object-contain overflow-hidden shrink-0 self-start aspect-square w-[33px]"
          alt="Social media icon"
        />
        <span className="flex-auto w-[245px]">@profdryusufozkan</span>
      </a>
      <a
        href="#"
        className="flex gap-3 px-5 py-3.5 mt-10 whitespace-nowrap rounded-2xl shadow-sm bg-slate-500 hover:bg-slate-600 transition-colors max-md:mt-10"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/965aa2d665d11f18448d427eebb61e3bce702f63?placeholderIfAbsent=true&apiKey=2700ab3a3a4f4b8a8b2827e6c4722a8f"
          className="object-contain overflow-hidden shrink-0 w-9 aspect-square"
          alt="Social media icon"
        />
        <span className="flex-auto w-[245px]">@profdryusufozkan</span>
      </a>
    </div>
  );
}

export default SocialMediaCard; 