import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Logo from "../assets/vcart logo.png";
import axios from "axios";
import { AdminDataContext } from "../context/AdminContext.jsx";
import { AuthDataContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { serverUrl } = useContext(AuthDataContext);
  const { setAdminData, getAdmin } = useContext(AdminDataContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await axios.get(`${serverUrl}/api/auth/user/logout`, {
        withCredentials: true,
      });
      console.log(response.data);
      getAdmin();
      setAdminData(null);
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

      <button
        className="text-[15px] text-white hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-2xl"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
