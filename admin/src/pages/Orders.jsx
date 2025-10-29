import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Orders = () => {
  return (
    <div className="w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] overflow-x-hidden relative">
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default Orders;
