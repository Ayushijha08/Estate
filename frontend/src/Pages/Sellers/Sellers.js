import { useEffect, useState } from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import {
  Table,
  Select,
  MenuItem,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Modal,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  TableContainer,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete,
  Close as CloseIcon,
} from "@mui/icons-material";
import TablePagination from "@mui/material/TablePagination";

import axios from "axios";
import { toast } from "react-toastify";
const SellersTable = () => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    maxHeight: "90vh",
    overflow: "auto",
  };

  const deleteModalStyle = {
    ...modalStyle,
    width: 400,
    textAlign: "center",
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSellers, setSelectedSellers] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [sellers, setSellers] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [apiSellers, setApiSellers] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    address: "",
    PropertyId: "",
    ListedPrice: "",

    Status: "Active",
  });

  const getAllsellers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/Sellers/getAllSellers`
      );
      console.log("response", res.data);
      setSellers(res.data);
      setApiSellers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllsellers();
  }, []);
  const handleView = (sellers) => {
    setSelectedSellers(sellers);
    setViewModalOpen(true);
  };

  const handleEdit = (sellers) => {
    setSelectedSellers(sellers);
    setEditFormData(sellers);
    setEditModalOpen(true);
  };

  const handleDelete = (sellers) => {
    setSelectedSellers(sellers);
    setDeleteModalOpen(true);
  };
  const handleAddNew = () => {
    setAddModalOpen(true);
  };

  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);
  const handleCloseAddModal = () => setAddModalOpen(false);

  const handleEditInputChange = (field) => (event) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };
  const handleAddInputChange = (field) => (event) => {
    setAddFormData({
      ...addFormData,
      [field]: event.target.value,
    });
  };

  const handleAddSeller = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/Sellers/createSeller",
        addFormData
      );
      if (response.data.success) {
        toast.success("Seller added successfully!");
        handleCloseAddModal();
        getAllsellers();
        // Reset form data
        setAddFormData({
          name: "",
          email: "",
          mobileNo: "",
          address: "",
          PropertyId: "",
          ListedPrice: "",
          Status: "Active",
        });
      }
    } catch (error) {
      console.error("Error adding Seller:", error);
      toast.error(error.response?.data?.message || "Failed to add Seller");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const handleSearchChange = (e) => {
    console.log("target", e.target);

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setSellers(apiSellers); // Reset to full list when search is empty
      return;
    }

    const filtered = apiSellers.filter((sellers) => {
      return (
        sellers.name.toLowerCase().includes(value) || // propertyTitle = gfdgf.includes(gfdgf)
        sellers.address.toLowerCase().includes(value) ||
        sellers.mobileNo.toLowerCase().includes(value) ||
        sellers.email.toString().toLowerCase().includes(value)
      );
    });

    setSellers(filtered);
  };

  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);

    try {
      const res = await axios.put(
        `http://localhost:3001/Sellers/updateSeller/${selectedSellers._id}`,
        editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllsellers();
        // reset the editFormData
        setEditFormData({});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleConfirmDelete = async () => {
    handleCloseDeleteModal();
    try {
      const res = await axios.delete(
        `http://localhost:3001/Sellers/deleteSeller/${selectedSellers._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllsellers();
      }
    } catch (error) {
      console.log(error);
      toast.error();
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
<div className="table">
      <div className="flex">
        <TextField
          className="search"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
                    size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
       
        />

        <Button
          variant="contained"
          // color="primary"
          onClick={handleAddNew}
         className="primary_button"
        >
          Add sellers
        </Button>
      </div>
      <div className="table">

      <TableContainer
        component={Paper}
        style={{ overflowX: "auto", maxWidth: 1250 }}
      >
        <Table className="w-full border border-gray-300">
          <TableHead
            sx={{
              top: 0,
              background: "white",
              zIndex: 2,
              position: "sticky",
              fontWeight: "bold",
            }}
          >
            <TableRow className="bg-gray-200">
              <TableCell
                sx={{ fontWeight: "bold", textAlign: "center" }}
                className="border p-2"
              >
                SI.No
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", textAlign: "center" }}
                className="border p-2"
              >
                Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", textAlign: "center" }}
                className="border p-2"
              >
                E-mail
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", textAlign: "center" }}
                className="border p-2"
              >
                Mobile No
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", textAlign: "center" }}
                className="border p-2"
              >
                Address
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", textAlign: "center" }}
                className="border p-2"
              >
                Property Id
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", textAlign: "center" }}
                className="border p-2"
              >
                Listed Price
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", textAlign: "center" }}
                className="border p-2"
              >
                Status
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", textAlign: "center" }}
                className="border p-2"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.length > 0 &&
              sellers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // ✅ Apply pagination here
                .map((sellers, index) => (
                  <TableRow
                    key={sellers._id}
                    className="text-center"
                    sx={{ fontWeight: "bold" }}
                  >
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {sellers.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {sellers.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {sellers.mobileNo}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {sellers.address}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {sellers.PropertyId}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {sellers.ListedPrice}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {sellers.Status}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bolder" }}
                      className="border p-2"
                    >
                      <TableContainer
                        style={{
                          display: "flex",
                          gap: "5px",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          sx={{ color: "blue" }}
                          fontweight="bolder"
                          onClick={() => handleView(sellers)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          sx={{ color: "gray" }}
                          onClick={() => handleEdit(sellers)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => handleDelete(sellers)}
                        >
                          <Delete />
                        </IconButton>
                      </TableContainer>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        {/* View Modal */}
        <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">sellers Details</Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedSellers && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(selectedSellers).map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <Typography>
                      <strong>{key}:</strong> {value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Modal>

        {/* Edit Modal */}
        <Modal open={editModalOpen} onClose={handleCloseEditModal}>
          <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Edit Seller</Typography>
              <IconButton onClick={handleCloseEditModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2} mt={2}>
              {Object.keys(editFormData)
                .filter(
                  (field) =>
                    field !== "createdAt" &&
                    field !== "updatedAt" &&
                    field !== "__v" &&
                    field !== "_id"
                )
                .map((field) => (
                  <Grid item xs={6} key={field}>
                    {field === "Status" ? (
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={editFormData.Status || ""}
                          onChange={handleEditInputChange("Status")}
                          label="Status"
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    ) : field === "name" ? (
                      <TextField
                        label="Name"
                        type="string"
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        fullWidth
                        variant="outlined"
                      />
                    ) : field === "email" ? (
                      <TextField
                        label="E-mail"
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        fullWidth
                        variant="outlined"
                      />
                    ) :field === "mobileNo" ? (
                      <TextField
                        label="Mobile No"
                        type="tel"
                        inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
                        value={editFormData[field] || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,10}$/.test(value)) {
                            handleEditInputChange(field)(e);
                          }
                        }}
                        fullWidth
                        variant="outlined"
                        required
                      />
                    )
                     : field === "address" ? (
                      <TextField
                        label="Address"
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        fullWidth
                        variant="outlined"
                      />
                    ) : field === "ListedPrice" ? (
                      <TextField
                        label="Listed Price"
                        type="number"
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        fullWidth
                        variant="outlined"
                      />
                    ) : field === "PropertyId" ? (
                      <TextField
                        label="Property Id"
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        fullWidth
                        variant="outlined"
                      />
                    ) : (
                      <TextField
                        label={field}
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  </Grid>
                ))}
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button variant="outlined" onClick={handleCloseEditModal}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleUpdate} sx={{ ml: 2 }}>
                Update
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Delete Modal */}
        <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
          <Box sx={deleteModalStyle}>
            <Typography className="confirm_delete" variant="h6">
              Confirm Delete
            </Typography>
            <Typography my={2}>
              Are you sure you want to delete this sellers?
            </Typography>
            <Box display="flex" justifyContent="center" gap={2}>
              <Button 
                            sx={{backgroundColor:"gray",color:"white"}}

              variant="outlined" onClick={handleCloseDeleteModal}>
                CANCLE
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
              >
                DELETE
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal open={addModalOpen} onClose={handleCloseAddModal}>
          <Box sx={modalStyle}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Add New Seller
              </Typography>
              <IconButton onClick={handleCloseAddModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                 sx={{
                  '& .MuiInputLabel-asterisk': {
                    color: 'red',
                  },
                }}
                  fullWidth
                  label="Name"
                  name="name"
                  type="string"
                  value={addFormData.name}
                  onChange={handleAddInputChange("name")}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                 sx={{
                  '& .MuiInputLabel-asterisk': {
                    color: 'red',
                  },
                }}
                  fullWidth
                  label="E-mail"
                  name="email"
                  value={addFormData.email}
                  onChange={handleAddInputChange("email")}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                 sx={{
                  '& .MuiInputLabel-asterisk': {
                    color: 'red',
                  },
                }}
                  fullWidth
                  label="Mobile No"
                  name="mobileNo"
                  type="tel"
                  inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
                  value={addFormData.mobileNo}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleAddInputChange("mobileNo")(e);
                    }
                  }}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  sx={{
                    '& .MuiInputLabel-asterisk': {
                      color: 'red',
                    },
                  }}
                  label="Address"
                  name="address"
                  value={addFormData.address}
                  onChange={handleAddInputChange("address")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                 sx={{
                  '& .MuiInputLabel-asterisk': {
                    color: 'red',
                  },
                }}
                  fullWidth
                  label="Property Id"
                  name="PropertyId"
                  // type="number"
                  value={addFormData.PropertyId}
                  onChange={handleAddInputChange("PropertyId")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ListedPrice"
                  name="ListedPrice"
                  type="number"
                  value={addFormData.ListedPrice}
                  onChange={handleAddInputChange("ListedPrice")}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="furnishing-label">Status</InputLabel>
                  <Select
                    labelId="furnishing-label"
                    label="Status"
                    name="Status"
                    value={addFormData.Status}
                    onChange={handleAddInputChange("Status")}
                    required
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                   variant="outlined" onClick={handleCloseAddModal}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddSeller}
                  >
                    Save Seller
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </TableContainer>
      </div>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sellers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SellersTable;
