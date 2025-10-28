const Hero = ({ heroData }) => {
  return (
    <div className="flex flex-col items-start text-left gap-4 max-w-md">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
        {heroData.text1}
      </h2>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
        {heroData.text2}
      </p>

      <button className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-200 transition-all duration-300 cursor-pointer">
        Shop Now
      </button>
    </div>
  );
};

export default Hero;
