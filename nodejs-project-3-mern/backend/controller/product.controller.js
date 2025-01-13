import mongoose from "mongoose";
import Product from "../../models/product.model.js";

/* Find all products */
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
/* Add product */
export const addProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
/* Delete a product using id */
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: `${product.name} deleted succesfully.`,
    });
  } catch (error) {
    console.log("errorr", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
/* Update a product using id */
export const updateProduct = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: `Updated succesfully.`,
    });
  } catch (error) {
    console.log("errorr", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
