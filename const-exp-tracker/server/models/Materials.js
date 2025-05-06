import mongoose from "mongoose";

const materialsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uom: { type: String, required: true },
  quantity: { type: Number, required: true },
  cost: { type: Number, required: true },
  datePurchased: { type: Date, default: Date.now },
});

const Material = mongoose.model("Material", materialsSchema);
export default Material;
