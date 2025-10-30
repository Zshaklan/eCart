import { useNavigate } from "react-router-dom";
import Logo from "../assets/vcart logo.png";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContext.jsx";
import { AuthDataContext } from "../context/AuthContext.jsx";
import axios from "axios";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { serverUrl } = useContext(AuthDataContext);
  const { userData, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await axios.get(`${serverUrl}/api/auth/user/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      console.log(response.data);
    } catch (error) {
      console.log("Logout error", error);
    }
  }

  return (
    <div className="w-screen h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
      <div
        className="w-[25%] lg:w-[30%] h-20 flex items-center justify-start px-[30px] gap-2.5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="logo" className="w-10 h-10 object-contain" />
        <h1 className="text-2xl font-sans font-medium">eCart</h1>
      </div>

      <div className="w-[50%] lg:w-[40%] hidden md:flex">
        <ul className="flex items-center justify-center gap-[19px] text-white">
          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl"
            onClick={() => navigate("/")}
          >
            HOME
          </li>
          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl"
            onClick={() => navigate("/collections")}
          >
            COLLECTIONS
          </li>
          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl"
            onClick={() => navigate("/about")}
          >
            ABOUT
          </li>
          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl"
            onClick={() => navigate("/contact")}
          >
            CONTACT
          </li>
        </ul>
      </div>

      <div className="w-[30%] flex items-center justify-end gap-5 cursor-pointer">
        <IoSearchCircleOutline
          size={25}
          onClick={() => setShowSearch((prev) => !prev)}
        />
        {!userData ? (
          <FaCircleUser
            size={25}
            onClick={() => setShowProfile((prev) => !prev)}
          />
        ) : (
          <div
            className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {userData?.name.slice(0, 1)}
          </div>
        )}
        <IoMdCart size={25} className="hidden md:block" />
        <p className="absolute w-[18px] h-[18px] items-center justify-center bg-black px-[5px] py-0.5 text-white rounded-full text-[9px] top-2.5 right-[23px] hidden md:block">
          10
        </p>
      </div>

      {showSearch && (
        <div className="w-full h-20 bg-[#d8f6f6dd] absolute top-full left-0 right-0 flex items-center justify-center ">
          <input
            type="text"
            className="lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px]"
            placeholder="Search here"
          />
        </div>
      )}

      {showProfile && (
        <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-xl z-10">
          <ul className="w-full h-full flex items-start justify-around flex-col text-[17px] py-2.5 text-white">
            {!userData ? (
              <li
                className="w-full hover:bg-[#2f2f2f] px-[15px] py-2.5 cursor-pointer"
                onClick={() => {
                  setShowProfile(false);
                  navigate("/login");
                }}
              >
                Login
              </li>
            ) : (
              <li
                className="w-full hover:bg-[#2f2f2f] px-[15px] py-2.5 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                  navigate("/login");
                }}
              >
                Logout
              </li>
            )}
            <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-2.5 cursor-pointer">
              Orders
            </li>
            <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-2.5 cursor-pointer">
              About
            </li>
          </ul>
        </div>
      )}

      {/* Navigation for small devices */}
      <div className="w-screen h-[90px] flex items-center justify-between px-5 fixed bottom-0 left-0 bg-[#191818] md:hidden text-[12px] ">
        <button
          className="text-white flex items-center justify-center flex-col gap-2"
          onClick={() => navigate("/")}
        >
          <IoMdHome size={30} /> Home
        </button>
        <button
          className="text-white flex items-center justify-center flex-col gap-2"
          onClick={() => navigate("/collections")}
        >
          <HiOutlineCollection size={30} />
          Collections
        </button>
        <button
          className="text-white flex items-center justify-center flex-col gap-2"
          onClick={() => navigate("/contact")}
        >
          <MdContacts size={30} />
          Contact
        </button>
        <button
          className="text-white flex items-center justify-center flex-col gap-2 relative"
          onClick={() => navigate("/cart")}
        >
          <IoMdCart size={30} /> Cart
          <p className="absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px]  text-black rounded-full text-[12px] bottom-11 right-0 ">
            10
          </p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
