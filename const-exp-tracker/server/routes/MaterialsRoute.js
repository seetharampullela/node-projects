import { Router } from "express";
import {
  addMaterial,
  deleteMaterial,
  getMaterials,
  updateMaterial,
} from "../controllers/materialsController.js";

const router = Router();

router.get("/materials", getMaterials);
router.post("/addMaterial/", addMaterial);
router.put("/updateMaterial/:id", updateMaterial);
router.delete("/deleteMaterial/:id", deleteMaterial);

export default router;
