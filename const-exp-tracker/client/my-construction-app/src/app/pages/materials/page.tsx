// pages/materials.js
"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const API_BASE = "http://localhost:5000/api"; // Change to your Express API base

export default function MaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    cost: "",
    datePurchased: "",
  });
  const [editId, setEditId] = useState(null);

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  // Fetch materials
  const fetchMaterials = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE}/materials`);
    const materials = await res.json();
    console.log("materials.data", materials.data);
    setMaterials(materials.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Handle modal open/close
  const openAddModal = () => {
    setForm({ name: "", quantity: "", cost: "", datePurchased: "" });
    setModalMode("add");
    setModalOpen(true);
  };
  const openEditModal = (material: any) => {
    setForm({
      name: material.name,
      quantity: material.quantity,
      cost: material.cost,
      datePurchased: toInputDateFormat(
        formatDate(material.datePurchased) || ""
      ),
    });
    setEditId(material._id);
    setModalMode("edit");
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // Handle menu open/close
  const handleMenuOpen = (event: any, id: any) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add/Edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    const inputDate = new Date(form.datePurchased);
    // Set time to 0 for both to compare only the date part
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate > today) {
      alert("Date of purchase cannot be in the future.");
      return;
    }
    if (modalMode === "add") {
      //const stringifiedForm: any = JSON.stringify(form);
      // console.log("stringifiedForm", stringifiedForm);
      const payload = {
        // name: stringifiedForm.name,
        // datePurchased: stringifiedForm.datePurchased,
        ...form,
        cost: parseInt(form.cost),
        quantity: parseInt(form.quantity),
      };
      console.log("payload", payload);
      const res = await fetch(`${API_BASE}/addMaterial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
      console.log("res>>>>>>>>", res);
    } else {
      console.log("editId", editId);
      console.log("JSON.stringify(form)", JSON.stringify(form));
      const res = await fetch(`${API_BASE}/updateMaterial/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      console.log("res>>>>>>>>", res);
    }
    closeModal();
    fetchMaterials();
  };

  // Delete

  const confirmDelete = async () => {
    await fetch(`${API_BASE}/deleteMaterial/${deleteId}`, { method: "DELETE" });
    setDeleteDialogOpen(false);
    fetchMaterials();
  };
  const formatDate = (datePurchased: any) => {
    const newDate = new Date(datePurchased);
    return newDate.toLocaleDateString("en-GB");
  };
  function toInputDateFormat(dateStr) {
    console.log("dateStr", dateStr);
    if (!dateStr) return "";
    // If already in yyyy-MM-dd, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    // If in dd/MM/yyyy, convert
    const parts = dateStr.split("/");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Materials</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddModal}
        >
          Add
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Cost</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Date of Purchase
              </TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : materials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No materials found.</TableCell>
              </TableRow>
            ) : (
              materials.map((mat: any) => (
                <TableRow key={mat._id}>
                  <TableCell>{mat.name}</TableCell>
                  <TableCell>{mat.quantity}</TableCell>
                  <TableCell>{mat.cost}</TableCell>
                  <TableCell>{formatDate(mat.datePurchased)}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMenuOpen(e, mat._id)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={menuId === mat._id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() => {
                          openEditModal(mat);
                          handleMenuClose();
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setDeleteId(mat._id);
                          setDeleteName(mat.name);
                          setDeleteDialogOpen(true);
                          handleMenuClose();
                          //handleDelete(mat._id);
                        }}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Add/Edit */}
      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" mb={2} color="black">
            {modalMode === "add" ? "Add Material" : "Edit Material"}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Quantity"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            type="number"
          />
          <TextField
            label="Cost"
            name="cost"
            value={form.cost}
            onChange={handleChange}
            required
            type="number"
          />
          <TextField
            label="Date of Purchase"
            name="datePurchased"
            value={form.datePurchased || ""}
            onChange={handleChange}
            required
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Modal>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the material <b>{deleteName}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>No</Button>
          <Button color="error" onClick={confirmDelete}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
