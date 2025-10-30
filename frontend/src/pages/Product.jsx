import LatestCollections from "../components/LatestCollections.jsx";
import BestSeller from "../components/BestSeller.jsx";

const Product = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-linear-to-l from-[#141414] to-[#0c2025] items-center justify-start py-5">
      <div className="w-full min-h-[70px] flex flex-col items-center justify-center gap-2.5 ">
        <LatestCollections />
      </div>

      <div className="w-full min-h-[70px] flex flex-col items-center justify-center gap-2.5 ">
        <BestSeller />
      </div>
    </div>
  );
};

export default Product;
