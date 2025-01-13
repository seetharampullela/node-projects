import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controller/product.controller.js";

const router = Router();

router.get("/", getProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
