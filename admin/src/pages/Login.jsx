import { useNavigate } from "react-router-dom";
import Logo from "../assets/vcart logo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext.jsx";
import { AdminDataContext } from "../context/AdminContext.jsx";

const Login = () => {
  const [show, setShow] = useState(false);
  const { serverUrl } = useContext(AuthDataContext);
  const { getAdmin } = useContext(AdminDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function adminLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/user/admin-login`,
        { email, password },
        { withCredentials: true }
      );

      console.log(response.data);
      setEmail("");
      setPassword("");
      getAdmin();
      navigate("/");
    } catch (error) {
      console.log("Register error ", error);
    }
  }

  return (
    <div className="w-screen h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div
        className="w-screen h-20 flex items-center justify-start px-[30px] gap-2.5 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="logo" className="w-10" />
        <h1 className="text-[22px] font-sans">eCart</h1>
      </div>
      <div className="w-screen h-[100px] flex items-center justify-center flex-col gap-2.5">
        <span className="text-[25px] font-semibold">Login Page</span>
        <span className="text-[16px]">
          Welcome to eCart, Apply to Admin Login
        </span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
          onSubmit={adminLogin}
          action=""
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-5"
        >
          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="email"
              className="w-full h-[50px] border-2 border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-5 font-semibold"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type={show ? "text" : "password"}
              className="w-full h-[50px] border-2 border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-5 font-semibold"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show ? (
              <FaEyeSlash
                className="w-5 h-5 cursor-pointer absolute right-[5%] bottom-[55%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <FaEye
                className="w-5 h-5 cursor-pointer absolute right-[5%] bottom-[55%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}

            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-5 text-[17px] font-semibold">
              Login
            </button>

            <p className="flex gap-2.5">
              You haven't any account ?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create new account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
