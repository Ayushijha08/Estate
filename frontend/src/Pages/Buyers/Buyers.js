import { useEffect, useState } from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TablePagination from "@mui/material/TablePagination";

import {
  Table,
  Select,
  MenuItem,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  FormControl,
  InputLabel,
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
const BuyersTable = () => {
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
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [buyers, setBuyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiBuyers, setApiBuyers] = useState([]);

  const getAllbuyers = async () => {
    try {
      const res = await axios.get(` http://localhost:3001/buyer/getAllBuyers`);
      console.log("response", res.data);
      setBuyers(res.data);
      setApiBuyers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllbuyers();
  }, []);
  const handleView = (buyer) => {
    setSelectedBuyer(buyer);
    setViewModalOpen(true);
  };

  const handleEdit = (buyer) => {
    setSelectedBuyer(buyer);
    setEditFormData(buyer);
    setEditModalOpen(true);
  };

  const handleDelete = (buyer) => {
    setSelectedBuyer(buyer);
    setDeleteModalOpen(true);
  };

  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value,
    });
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
      setBuyers(apiBuyers); // Reset to full list when search is empty
      return;
    }

    const filtered = apiBuyers.filter((buyer) => {
      return (
        buyer.name.toLowerCase().includes(value) || // propertyTitle = gfdgf.includes(gfdgf)
        buyer.address.toLowerCase().includes(value) ||
        buyer.email.toLowerCase().includes(value) ||
        buyer.mobileNo.toString().toLowerCase().includes(value)
      );
    });

    setBuyers(filtered);
  };

  const handleUpdate = () => {
    console.log("Updating buyer:", editFormData);
    // Here you would typically make an API call to update the buyer
    handleCloseEditModal();
  };

  const handleConfirmDelete = async () => {
    handleCloseDeleteModal();
    try {
      const res = await axios.delete(
        `http://localhost:3001/buyer/deleteBuyer/${selectedBuyer._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllbuyers();
      }
    } catch (error) {
      console.log(error);
      toast.error();
      toast.error(error.response.data.message);
    }
  };
  const handleStatusChange = (id, newStatus) => {
    setBuyers((prev) =>
      prev.map((buyer) =>
        buyer.id === id ? { ...buyer, status: newStatus } : buyer
      )
    );
  };
  return (
    <>
      <div className="flex">
        <TextField
          className="search"
          label="Search"
          variant="outlined"
          // fullWidth
          //  value={searchQuery}
          // onChange={handleSearchChange}
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{
            marginBottom: "20px",
            width: "160px",
            display: "flex",
            marginRight: "150px",
            justifyContent: "flex-end",
            marginLeft: "800px",
          }}
        />

        <Button
          variant="contained"
          //onClick={handleAddNew}
          style={{
            marginBottom: "20px",
            textWrap: "wrap",
            marginLeft: "40px",
            padding: "10px",
            borderRadius: "5px",
            height: "55px",
            width: "130px",
          }}
        >
          Add Buyer
        </Button>
      </div>

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
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                E-mail
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Mobile No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Address
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Room No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buyers.length > 0 &&
              buyers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((buyer, index) => (
                  <TableRow
                    key={buyer._id}
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
                      {buyer.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {buyer.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {buyer.mobileNo}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {buyer.address}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {buyer.RoomNo}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      <Select
                        value={buyer.status}
                        variant="standard"
                        onChange={(e) =>
                          handleStatusChange(buyer._id, e.target.value)
                        }
                        className="border p-1 rounded"
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="InActive">InActive</MenuItem>
                      </Select>
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
                          onClick={() => handleView(buyer)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          sx={{ color: "green" }}
                          onClick={() => handleEdit(buyer)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => handleDelete(buyer)}
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
              <Typography variant="h6">buyer Details</Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedBuyer && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(selectedBuyer).map(([key, value]) => (
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
              <Typography variant="h6">Edit Buyer</Typography>
              <IconButton onClick={handleCloseEditModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2} mt={2}>
              {Object.keys(editFormData)
              .filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v")
              .map((field) => (
                <Grid item xs={6} key={field}>
                  {field === "status" ? (
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={editFormData[field] || ""}
                        onChange={handleEditInputChange(field)}
                        label="Status"
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
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
              Are you sure you want to delete this buyer?
            </Typography>
            <Box display="flex" justifyContent="center" gap={2}>
              <Button variant="outlined" onClick={handleCloseDeleteModal}>
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
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={buyers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default BuyersTable;
