import React from "react";

function page() {
  return (
    <div className="relative group w-150 mx-auto mt-20">
      <div className="bg-linear-to-br from-[#175553] to-[#011627] p-6 rounded-lg border border-[#0C1616] shadow-2xl grid grid-cols-5 gap-6">
        <div className="w-full h-80 bg-[#010C15]/80 rounded-lg shadow-inner flex items-center justify-center col-span-3 relative overflow-hidden border border-[#1E2D3D]">
          <canvas className="block" />
        </div>
      </div>
    </div>
  );
}

export default page;