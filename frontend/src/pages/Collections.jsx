import React, { useState } from "react";

const Collections = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-linear-to-l from-[#141414] to-[#0c2025] items-start justify-start pt-[70px] z-2 overflow-x-hidden">
      <div className="md:w-[30vw] lg:w-[20vw] w-screen min-h-screen p-5 border-r border-gray-400 text-[#aaf5fa] lg:fixed">
        <p
          className="text-[25px] font-semibold flex gap-[5px] items-center justify-start"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
        </p>

        <div
          className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa]">CATEGORIES</p>

          <div className="w-[230px] h-[120px] flex items-start justify-center gap-2.5 flex-col">
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input type="checkbox" value={"Men"} className="w-3" />
              Men
            </p>
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input type="checkbox" value={"Women"} className="w-3" />
              Women
            </p>
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input type="checkbox" value={"Kids"} className="w-3" />
              Kids
            </p>
          </div>
        </div>

        <div
          className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa]">SUB CATEGORIES</p>

          <div className="w-[230px] h-[120px] flex items-start justify-center gap-2.5 flex-col">
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input type="checkbox" value={"TopWear"} className="w-3" />
              TopWear
            </p>
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input type="checkbox" value={"BottomWear"} className="w-3" />
              BottomWear
            </p>
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input type="checkbox" value={"WinterWear"} className="w-3" />
              WinterWear
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
