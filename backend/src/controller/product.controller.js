import Product from "../model/product.model.js";
import { uploadOnImagekit } from "../config/imagekit.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = await uploadOnImagekit(req.files.image1?.[0]);
    const image2 = await uploadOnImagekit(req.files.image2?.[0]);
    const image3 = await uploadOnImagekit(req.files.image3?.[0]);
    const image4 = await uploadOnImagekit(req.files.image4?.[0]);

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      date: Date.now(),
      image1,
      image2,
      image3,
      image4,
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json({
      success: true,
      message: "Products fetched successfully!",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(201).json({
      success: true,
      message: "Product removed successfully!",
      product,
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove product",
      error: error.message,
    });
  }
};
