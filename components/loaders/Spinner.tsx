import React from "react";

export default function Spinner() {
  return (
    <div className="w-full lg:shadow-custom2 bg-white lg:rounded-2xl p-6 min-h-[400px] h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
