import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Home = () => {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row bg-linear-to-l from-[#141414] to-[#0c2025] overflow-hidden relative">
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default Home;
