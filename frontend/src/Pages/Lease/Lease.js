//name, email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus
import { useEffect, useState } from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import TablePagination from "@mui/material/TablePagination";

import {
  Table,
  Select,
  MenuItem,
  TableHead,
  TableBody,
  TableRow,
  FormControl,
  InputLabel,
  TableCell,
  IconButton,
  Modal,
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
import axios from "axios";
import { toast } from "react-toastify";
const LeaseTable = () => {
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
  const [selectedLease, setSelectedLease] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({});
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    address: "",
    LeaseStartDate: "",
    LeaseEndDate: "",
    MonthlyRent: "",
    SecurityDeposit: "",
    paymentStatus: "",
    LeaseStatus: "",
  });

  const [Lease, setLease] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiLease, setApiLease] = useState([]);

  const getAllLease = async () => {
    try {
      const res = await axios.get(` http://localhost:3001/lease/getAllLeases`);
      console.log("response", res.data);
      setLease(res.data);
      setApiLease(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllLease();
  }, []);
  const handleView = (lease) => {
    setSelectedLease(lease);
    setViewModalOpen(true);
  };

  const handleEdit = (lease) => {
    setSelectedLease(lease);
    setEditFormData(lease);
    setEditModalOpen(true);
  };

  const handleDelete = (lease) => {
    setSelectedLease(lease);
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
    setEditFormData({
      ...editFormData,
      [field]: event.target.value,
    });
  };
  const handleAddInputChange = (field) => (event) => {
    setAddFormData({
      ...addFormData,
      [field]: event.target.value,
    });
  };

  const handleAddLease = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/lease/createLease",
        addFormData
      );
      if (response.data.success) {
        toast.success("Lease added successfully!");
        handleCloseAddModal();
        getAllLease();
        // Reset form data
        setAddFormData({
          name: "",
          email: "",
          mobileNo: "",
          address: "",
          LeaseStartDate: "",
          LeaseEndDate: "",
          MonthlyRent: "",
          SecurityDeposit: "",
          paymentStatus: "",
          LeaseStatus: "",
        });
      }
    } catch (error) {
      console.error("Error adding Lease:", error);
      toast.error(error.response?.data?.message || "Failed to add Lease");
    }
  };

  const handleSearchChange = (e) => {
    console.log("target", e.target);

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setLease(apiLease); // Reset to full list when search is empty
      return;
    }

    const filtered = apiLease.filter((lease) => {
      return (
        lease.name.toLowerCase().includes(value) || // propertyTitle = gfdgf.includes(gfdgf)
        lease.address.toLowerCase().includes(value) ||
        lease.email.toLowerCase().includes(value) ||
        lease.mobileNo.toString().toLowerCase().includes(value)
      );
    });

    setLease(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);

    try {
      const res = await axios.put(
        `http://localhost:3001/lease/updateLease/${selectedLease._id}`,
        editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllLease();
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
        `http://localhost:3001/lease/deleteLease/${selectedLease._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllLease();
      }
    } catch (error) {
      console.log(error);
      toast.error();
      toast.error(error.response.data.message);
    }
  };
  const handleStatusChange = (id, newStatus) => {
    setLease((prev) =>
      prev.map((lease) =>
        lease.id === id ? { ...lease, status: newStatus } : lease
      )
    );
  };
  return (
    <>
    <div className="table">
      <div className="flex">
        <TextField
        size="small"
          className="search"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          onClick={handleAddNew}
          startIcon={<AddIcon />}
          className="primary_button"
        >
          Add Lease
        </Button>
      </div>
      <div className="table">
        <TableContainer
          component={Paper}
          style={{ overflowX: "auto", maxWidth: 1250, whiteSpace: "nowrap" }}
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
                  email
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
                  Lease Start Date
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  {" "}
                  Lease End Date
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Monthly Rent
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Security Deposit
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Payment Status
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Lease Status
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
              {Lease.length > 0 &&
                Lease.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((lease, index) => (
                  <TableRow
                    key={lease._id}
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
                      {lease.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {lease.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {lease.mobileNo}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {lease.address}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {lease.LeaseStartDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {lease.LeaseEndDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {lease.MonthlyRent}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {lease.SecurityDeposit}
                    </TableCell>

                    <TableCell>{lease.paymentStatus}</TableCell>

                    {/* Lease Status Dropdown */}
                    <TableCell>{lease.LeaseStatus}</TableCell>

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
                          onClick={() => handleView(lease)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          sx={{ color: "gray" }}
                          onClick={() => handleEdit(lease)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => handleDelete(lease)}
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
                <Typography variant="h6">lease Details</Typography>
                <IconButton onClick={handleCloseViewModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {selectedLease && (
                <Grid container spacing={2} mt={2}>
                  {Object.entries(selectedLease).map(([key, value]) => (
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
                <Typography variant="h6">Edit Lease</Typography>
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
                      {/* Payment Status Dropdown */}
                      {field === "paymentStatus" ? (
                        <Select
                          fullWidth
                          variant="outlined"
                          label="Payment Status"
                          value={editFormData[field] || ""}
                          onChange={(e) => handleEditInputChange(field)(e)}
                          displayEmpty
                        >
                          <MenuItem value="Paid">Paid</MenuItem>
                          <MenuItem value="Unpaid">Unpaid</MenuItem>
                          <MenuItem value="Partial">Partial</MenuItem>
                        </Select>
                      ) : field === "LeaseStatus" ? (
                        /* Lease Status Dropdown */
                        <Select
                          fullWidth
                          variant="outlined"
                          label="Lease Status"
                          value={editFormData[field] || ""}
                          onChange={(e) => handleEditInputChange(field)(e)}
                          displayEmpty
                        >
                          <MenuItem value="" disabled>
                            Select Lease Status
                          </MenuItem>
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Expired">Expired</MenuItem>
                          <MenuItem value="Terminated">Terminated</MenuItem>
                        </Select>
                      ) : (
                        /* Default TextField for other fields */
                        <TextField
                          label={field}
                          value={editFormData[field] || ""}
                          onChange={handleEditInputChange(field)}
                          fullWidth
                        />
                      )}
                    </Grid>
                  ))}
              </Grid>

              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button variant="outlined" onClick={handleCloseEditModal}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleUpdate}
                  sx={{ ml: 2 }}
                >
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
                Are you sure you want to delete this lease?
              </Typography>
              <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  sx={{ backgroundColor: "gray", color: "white" }}
                  variant="outlined"
                  onClick={handleCloseDeleteModal}
                >
                  CANCEL
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
                  Add New Lease
                </Typography>
                <IconButton onClick={handleCloseAddModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={addFormData.name}
                    onChange={handleAddInputChange("name")}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
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
                    fullWidth
                    label="Mobile No"
                    name="mobileNo"
                    value={addFormData.mobileNo}
                    onChange={handleAddInputChange("mobileNo")}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={addFormData.address}
                    onChange={handleAddInputChange("address")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    // label="LeaseStartDate"
                    name="LeaseStartDate"
                    type="Date"
                    value={addFormData.LeaseStartDate}
                    onChange={handleAddInputChange("LeaseStartDate")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    //label=" LeaseEndDate"
                    name="LeaseEndDate"
                    type="Date"
                    value={addFormData.LeaseEndDate}
                    onChange={handleAddInputChange("LeaseEndDate")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label=" MonthlyRent"
                    name="MonthlyRent"
                    // type="number"
                    value={addFormData.MonthlyRent}
                    onChange={handleAddInputChange("MonthlyRent")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label=" SecurityDeposit"
                    name="SecurityDeposit"
                    // type="number"
                    value={addFormData.SecurityDeposit}
                    onChange={handleAddInputChange("SecurityDeposit")}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="furnishing-label">paymentStatus</InputLabel>
                    <Select
                      name="paymentStatus"
                      label="Payment Status"
                      value={addFormData.paymentStatus}
                      onChange={handleAddInputChange("paymentStatus")}
                      required
                    >
                      <MenuItem value="Paid">Paid</MenuItem>
                      <MenuItem value="Unpaid">Unpaid</MenuItem>
                      <MenuItem value="Partial">Partial</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="furnishing-label">LeaseStatus</InputLabel>
                    <Select
                      labelId="furnishing-label"
                      label="Lease Status"
                      name="LeaseStatus"
                      value={addFormData.LeaseStatus}
                      onChange={handleAddInputChange("LeaseStatus")}
                      required
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Expired">Expired</MenuItem>
                      <MenuItem value="Terminated">Terminated</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={handleCloseAddModal}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddLease}
                    >
                      Save Lease
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
        count={Lease.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default LeaseTable;
