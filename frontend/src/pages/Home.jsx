import { useState, useEffect } from "react";
import Background from "../components/Background.jsx";
import Hero from "../components/Hero.jsx";
import Product from "./Product.jsx";

const heroData = [
  { text1: "30% OFF Limited Offer", text2: "Style that Inspires" },
  { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
  { text1: "Explore the Best Collection", text2: "Shop Now!" },
  { text1: "Choose your Perfect Fashion Fit", text2: "Now On Sale!" },
  { text1: "Your Style, Your Story", text2: "Find it Today!" },
];

const Home = () => {
  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev + 1) % heroData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-linear-to-l from-[#141414] to-[#0c2025]">
      <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden relative">
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <Background heroCount={heroCount} />
        </div>

        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center px-6 md:px-16 text-white">
          <Hero
            heroData={heroData[heroCount]}
            heroCount={heroCount}
            setHeroCount={setHeroCount}
          />
        </div>
      </div>

      <section className="w-full mt-10">
        <Product />
      </section>
    </div>
  );
};

export default Home;
