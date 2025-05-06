import Material from "../models/Materials.js";
// Get All Materials
export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find({});
    res.status(200).json({ success: true, data: materials });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// Add Material
export const addMaterial = async (req, res) => {
  const material = req.body;
  console.log("material", material);
  if (!material.name || !material.quantity || !material.cost) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  try {
    const newMaterial = new Material(material);
    await newMaterial.save();
    res.status(200).json({
      success: true,
      data: newMaterial,
      message: "Material added succesfully",
    });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Error while adding material" });
  }
};
// Update Material
export const updateMaterial = async (req, res) => {
  const materialId = req.params.id;

  try {
    const updatedData = await Material.findByIdAndUpdate(materialId, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedData,
      message: "Material Updated succesfully",
    });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Error while updating material" });
  }
};
// Delete Material
export const deleteMaterial = async (req, res) => {
  const materialId = req.params.id;
  if (!materialId) {
    return res.status(404).json({ message: "Material not found" });
  }
  try {
    const updatedData = await Material.findByIdAndDelete(materialId, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedData,
      message: "Material deleted succesfully",
    });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Error while deleting material" });
  }
};
