import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[18%] min-h-screen border-r py-[60] fixed left-0 top-20">
      <div className="flex flex-col gap-10 pt-10 pl-[20%] text-[15px]">
        <div
          className="flex items-center justify-center md:justify-start gap-5 border border-gray-200 border-r-0 px-3 py-2 text-white cursor-pointer hover:bg-[#2c7b89]"
          onClick={() => navigate("/add")}
        >
          <IoIosAddCircleOutline size={25} className="w-[8] h-[8]" />
          <p className="hidden md:block">Add Items</p>
        </div>

        <div
          className="flex items-center justify-center md:justify-start gap-5 border border-gray-200 border-r-0 px-3 py-2 text-white cursor-pointer hover:bg-[#2c7b89]"
          onClick={() => navigate("/lists")}
        >
          <FaRegListAlt size={25} className="w-[8] h-[8]" />
          <p className="hidden md:block">List Items</p>
        </div>

        <div
          className="flex items-center justify-center md:justify-start gap-5 border border-gray-200 border-r-0 px-3 py-2 text-white cursor-pointer hover:bg-[#2c7b89]"
          onClick={() => navigate("/orders")}
        >
          <SiTicktick size={25} className="w-[8] h-[8]" />
          <p className="hidden md:block">View Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
