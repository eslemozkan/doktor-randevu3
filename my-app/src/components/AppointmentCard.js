import React from "react";

function AppointmentCard() {
  const handleAppointment = () => {
    // Appointment booking logic would go here
    console.log("Appointment requested");
  };

  return (
    <div className="flex flex-col self-stretch my-auto text-center max-md:mt-10 max-md:max-w-full">
      <h3 className="text-4xl font-bold text-blue-900 max-md:max-w-full">
        Hemen Randevu Oluşturun
      </h3>
      <button
        onClick={handleAppointment}
        className="self-center px-16 py-4 mt-9 max-w-full text-3xl font-semibold text-white bg-blue-900 rounded-[33px] w-[386px] max-md:px-5 hover:bg-blue-800 transition-colors"
      >
        Randevu Oluştur
      </button>
    </div>
  );
}

export default AppointmentCard; 