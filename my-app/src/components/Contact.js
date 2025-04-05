import React from "react";
import SocialMediaCard from "./SocialMediaCard";
import AppointmentCard from "./AppointmentCard";

function Contact() {
  return (
    <section
      id="appointment"
      className="flex flex-col justify-center self-center px-11 py-20 max-w-full bg-slate-100 w-[1029px] max-md:px-5 max-md:py-24 mx-auto"
    >
      <div className="mb-0 max-md:mb-2.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-6/12 max-md:ml-0 max-md:w-full">
            <SocialMediaCard />
          </div>
          <div className="ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <AppointmentCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact; 