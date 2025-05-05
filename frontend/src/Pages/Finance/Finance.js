import { useEffect, useState } from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";

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
import axios from "axios";
import { toast } from "react-toastify";
const FinanceTable = () => {
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
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFinance, setSelectedFinance] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [finances, setFinance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiFinances, setApiFinances] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    Amount: "",
    transactionType: "",
    category: "",
    paymentMode: "",
    transactionDate: "",
    status: "Completed",
  });

  const getAllfinances = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/finance/getAllfinances`
      );
      console.log("response", res.data);
      setFinance(res.data);
      setApiFinances(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllfinances();
  }, []);
  const handleView = (finances) => {
    setSelectedFinance(finances);
    setViewModalOpen(true);
  };

  const handleEdit = (finances) => {
    setSelectedFinance(finances);
    setEditFormData(finances);
    setEditModalOpen(true);
  };
  const handleAddNew = () => {
    setAddModalOpen(true);
  };

  const handleDelete = (finances) => {
    setSelectedFinance(finances);
    setDeleteModalOpen(true);
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

  const handleAddFinance = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/finance/createFinance",
        addFormData
      );
      if (response.data.success) {
        toast.success("Finance added successfully!");
        handleCloseAddModal();
        getAllfinances();
        // Reset form data
        setAddFormData({
          name: "",
          Amount: "",
          transactionType: "",
          category: "",
          paymentMode: "",
          transactionDate: "",
          status: "Completed",
        });
      }
    } catch (error) {
      console.error("Error adding finance:", error);
      toast.error(error.response?.data?.message || "Failed to add finance");
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
      setFinance(apiFinances); // Reset to full list when search is empty
      return;
    }

    const filtered = apiFinances.filter((finances) => {
      return (
        finances.name.toLowerCase().includes(value) || // propertyTitle = gfdgf.includes(gfdgf)
        finances.Amount.toLowerCase().includes(value) ||
        finances.category.toLowerCase().includes(value) ||
        finances.transactionDate.toString().toLowerCase().includes(value)
      );
    });

    setFinance(filtered);
  };

  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);

    try {
      const res = await axios.put(
        `http://localhost:3001/finance/updateFinance/${selectedFinance._id}`,
        editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllfinances();
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
        `http://localhost:3001/finance/deleteFinance/${selectedFinance._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllfinances();
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
                    size="small"
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
          className="primary_button"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add finance
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
                  SI. No.
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
                  Amount
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Transaction Type
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Payment Mode
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Transaction Date
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
              {finances.length > 0 &&
                finances
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((finances, index) => (
                    <TableRow
                      key={finances._id}
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
                        {finances.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {finances.Amount}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {finances.transactionType}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {finances.category}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {finances.paymentMode}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {finances.transactionDate}
                      </TableCell>

                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {finances.status}
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
                            onClick={() => handleView(finances)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            sx={{ color: "gray" }}
                            onClick={() => handleEdit(finances)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            sx={{ color: "red" }}
                            onClick={() => handleDelete(finances)}
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
                <Typography className="confirm_delete" variant="h6">
                  Finances Details
                </Typography>
                <IconButton onClick={handleCloseViewModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {selectedFinance && (
                <Grid container spacing={2} mt={2}>
                  {Object.entries(selectedFinance).map(([key, value]) => (
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
                <Typography variant="h6">Edit finances</Typography>
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
                      {field === "transactionType" ? (
                        <FormControl fullWidth>
                          <InputLabel>Transaction Type</InputLabel>
                          <Select
                            label="Transaction Type"
                            value={editFormData[field] || ""}
                            onChange={handleEditInputChange(field)}
                            variant="outlined"
                          >
                            <MenuItem value="Credit">Credit</MenuItem>
                            <MenuItem value="Debit">Debit</MenuItem>
                          </Select>
                        </FormControl>
                      ) : field === "paymentMode" ? (
                        <FormControl fullWidth>
                          <InputLabel>Payment Mode</InputLabel>
                          <Select
                            label="Payment Mode"
                            value={editFormData[field] || ""}
                            onChange={handleEditInputChange(field)}
                            variant="outlined"
                          >
                            <MenuItem value="Cash">Cash</MenuItem>
                            <MenuItem value="Bank Transfer">
                              Bank Transfer
                            </MenuItem>
                            <MenuItem value="Credit Card">Credit Card</MenuItem>
                            <MenuItem value="Debit Card">Debit Card</MenuItem>
                            <MenuItem value="Online">Online</MenuItem>
                          </Select>
                        </FormControl>
                      ) : field === "status" ? (
                        <FormControl fullWidth>
                          <InputLabel>Status</InputLabel>
                          <Select
                            label="Status"
                            value={editFormData[field] || ""}
                            onChange={handleEditInputChange(field)}
                            variant="outlined"
                          >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Failed">Failed</MenuItem>
                          </Select>
                        </FormControl>
                      ) : field === "transactionDate" ? (
                        <TextField
                          fullWidth
                          label="Transaction Date"
                          name="transactionDate"
                          type="date"
                          value={editFormData.transactionDate || ""}
                          onChange={handleEditInputChange("transactionDate")}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      ) : (
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
                Are you sure you want to delete this finances?
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
                  Add New finance
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Amount"
                    name="Amount"
                    type="number"
                    value={addFormData.Amount}
                    onChange={handleAddInputChange("Amount")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="property-type-label">
                      Transaction Type
                    </InputLabel>
                    <Select
                      labelId="property-type-label"
                      name="transactionType"
                      label="Transaction Type"
                      value={addFormData.transactionType}
                      onChange={handleAddInputChange("transactionType")}
                      required
                    >
                      <MenuItem value="Credit">Credit</MenuItem>
                      <MenuItem value="Debit">Debit</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="category"
                    name="category"
                    type="number"
                    value={addFormData.category}
                    onChange={handleAddInputChange("category")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="furnishing-label">payment Mode</InputLabel>
                    <Select
                      labelId="furnishing-label"
                      name="paymentMode"
                      value={addFormData.paymentMode}
                      onChange={handleAddInputChange("paymentMode")}
                      required
                    >
                      <MenuItem value="Cash">Cash</MenuItem>
                      <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                      <MenuItem value="Credit Card">Credit Card</MenuItem>
                      <MenuItem value="Debit Card">Debit Card</MenuItem>
                      <MenuItem value="Online">Online</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Transaction Date"
                    name="transactionDate"
                    type="Date"
                    value={addFormData.transactionDate}
                    onChange={handleAddInputChange("transactionDate")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      name="status"
                      label="Status"
                      value={addFormData.status}
                      onChange={handleAddInputChange("status")}
                      required
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Failed">Failed</MenuItem>
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
                      onClick={handleAddFinance}
                    >
                      Save finance
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
        count={finances.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default FinanceTable;
