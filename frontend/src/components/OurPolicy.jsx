import Title from "./Title.jsx";
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

const OurPolicy = () => {
  return (
    <div className="w-full h-screen md:h-[70vh] flex items-center justify-start flex-col bg-linear-to-l from-[#141414] to-[#0c2025] gap-[50px]">
      <div className="h-[8%] w-full text-center mt-[70px]">
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className="w-full m-auto text-[13px] md:text-[20px] px-2.5 text-blue-100">
          Customer Friendly policies Committed To Your Satisfaction And Safety
        </p>
      </div>

      <div className="w-full md:min-h-[50%] h-[20%] flex items-center justify-center flex-wrap lg:gap[50px] gap-20">
        <div className="w-[400px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-2.5">
          <RiExchangeFundsLine className="md:w-[60px] md:h-[60px] w-[30px] h-[30px] text-[#90b9ff]" />
          <p className="font-semibold md:text[25px] text-[19px] text-[#a5e8f7]">
            Easy Exchange policy
          </p>
          <p className="font-semibold md:text[18px] text-[12px] text-[aliceblue] text-center">
            Exchange Made Easy - Quick, Simple and Customer Friendly Process
          </p>
        </div>
        <div className="w-[400px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-2.5">
          <TbRosetteDiscountCheckFilled className="md:w-[60px] md:h-[60px] w-[30px] h-[30px] text-[#90b9ff]" />
          <p className="font-semibold md:text[25px] text-[19px] text-[#a5e8f7]">
            7 Days Return Policy
          </p>
          <p className="font-semibold md:text[18px] text-[12px] text-[aliceblue] text-center">
            Shop With Confidence - 7 Days Easy Return Guarantee
          </p>
        </div>
        <div className="w-[400px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-2.5">
          <BiSupport className="md:w-[60px] md:h-[60px] w-[30px] h-[30px] text-[#90b9ff]" />
          <p className="font-semibold md:text[25px] text-[19px] text-[#a5e8f7]">
            Best Customer Support
          </p>
          <p className="font-semibold md:text[18px] text-[12px] text-[aliceblue] text-center">
            Trusted Customer Support - Your Satisfaction Is Our Priority
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
