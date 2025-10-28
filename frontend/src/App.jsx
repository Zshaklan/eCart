import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import { UserDataContext } from "../src/context/UserContext.jsx";
import { useContext } from "react";

const App = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <>
      {userData && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
