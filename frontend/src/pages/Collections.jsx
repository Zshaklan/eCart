import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title.jsx";
import { ShopDataContext } from "../context/ShopContext.jsx";
import Card from "../components/Card.jsx";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const Collections = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const { products, search, showSearch } = useContext(ShopDataContext);

  function toggleCategory(e) {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  }

  function toggleSubCategory(e) {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  }

  function applyFilter() {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProduct(productCopy);
  }

  function sortProducts() {
    let filterProductCopy = filterProduct.slice();

    switch (sortType) {
      case "low-high":
        filterProductCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filterProductCopy.sort((a, b) => b.price - a.price);
        break;

      default:
        applyFilter();
        break;
    }

    setFilterProduct(filterProductCopy);
  }

  useEffect(() => {
    sortProducts();
    // eslint-disable-next-line
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-linear-to-l from-[#141414] to-[#0c2025] items-start justify-start pt-[70px] z-2 overflow-x-hidden pb-[110px]">
      <div
        className={`md:w-[30vw] lg:w-[20vw] w-full h-full ${
          showFilter ? "h-[45vh]" : "h-[8vh]"
        } p-5 border-r border-gray-400 text-[#aaf5fa] lg:fixed`}
      >
        <p
          className="text-[25px] font-semibold flex gap-[5px] items-center justify-start"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
          {showFilter ? <FaChevronDown /> : <FaChevronRight />}
        </p>

        <div
          className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa]">CATEGORIES</p>

          <div className="w-[230px] h-[120px] flex items-start justify-center gap-2.5 flex-col">
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input
                type="checkbox"
                value={"Men"}
                className="w-3"
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input
                type="checkbox"
                value={"Women"}
                className="w-3"
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input
                type="checkbox"
                value={"Kids"}
                className="w-3"
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        <div
          className={`border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa]">SUB CATEGORIES</p>

          <div className="w-[230px] h-[120px] flex items-start justify-center gap-2.5 flex-col">
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input
                type="checkbox"
                value={"TopWear"}
                className="w-3"
                onChange={toggleSubCategory}
              />
              TopWear
            </p>
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input
                type="checkbox"
                value={"BottomWear"}
                className="w-3"
                onChange={toggleSubCategory}
              />
              BottomWear
            </p>
            <p className="flex items-center justify-center gap-2.5 text-[16px] font-light">
              <input
                type="checkbox"
                value={"WinterWear"}
                className="w-3"
                onChange={toggleSubCategory}
              />
              WinterWear
            </p>
          </div>
        </div>
      </div>

      <div className="lg:pl-[20%] md:py-2.5">
        <div className="md:w-[80vw] w-full p-2.5 flex justify-between flex-col lg:flex-row lg:px-[50px]">
          <Title text1={"All"} text2={"Collections"} />

          <select
            name=""
            id=""
            className="bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-2.5 text-white rounded-lg hover:border-[#46d1f7] border-2"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant" className="w-full h-full">
              Sort By : Relevant
            </option>
            <option value="low-high" className="w-full h-full">
              Sort By : Low to High
            </option>
            <option value="high-low" className="w-full h-full">
              Sort By : High to Low
            </option>
          </select>
        </div>

        <div className="lg:w-[80vw] md:w-[60vw] w-full min-h[70vh] flex items-center justify-center flex-wrap gap-[30px]">
          {filterProduct.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              image={item.image1}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
