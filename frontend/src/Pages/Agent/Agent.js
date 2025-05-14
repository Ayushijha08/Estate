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

const AgentTable = () => {
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
  const [selectedAgents, setSelectedAgents] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    address: "",
    licenseNo: "",
    experience: "",
    commissionRate: "",
    status: "",
  });

  const [apiAgents, setApiAgents] = useState([]);

  const getAllAgents = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/agent/getAllAgents`);
      console.log("response", res.data);
      setAgents(res.data);
      setApiAgents(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAgents();
  }, []);
  const handleView = (Agents) => {
    setSelectedAgents(Agents);
    setViewModalOpen(true);
  };

  const handleEdit = (Agents) => {
    setSelectedAgents(Agents);
    setEditFormData(Agents);
    setEditModalOpen(true);
  };

  const handleDelete = (Agents) => {
    setSelectedAgents(Agents);
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

  const handleAddAgent = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/agent/createAgent",
        addFormData
      );
      if (response.data.success) {
        toast.success("Agents added successfully!");
        handleCloseAddModal();
        getAllAgents();
        // Reset form data
        setAddFormData({
          name: "",
          email: "",
          mobileNo: "",
          address: "",
          licenseNo: "",
          experience: "",
          commissionRate: "",
          status: "",
        });
      }
    } catch (error) {
      console.error("Error adding Agents:", error);
      toast.error(error.response?.data?.message || "Failed to add Agents");
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
      setAgents(apiAgents); // Reset to full list when search is empty
      return;
    }

    const filtered = apiAgents.filter((Agents) => {
      return (
        Agents.name.toLowerCase().includes(value) || // propertyTitle = gfdgf.includes(gfdgf)
        Agents.address.toLowerCase().includes(value) ||
        Agents.email.toLowerCase().includes(value) ||
        Agents.mobileNo.toString().toLowerCase().includes(value)
      );
    });

    setAgents(filtered);
  };
  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected property ", selectedProperty);

    try {
      const res = await axios.put(
        `http://localhost:3001/agent/updateAgent/${selectedAgents._id}`,
        editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllAgents();
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
        `http://localhost:3001/agent/deleteAgent/${selectedAgents._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllAgents();
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
          size="small"
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
          Add Agent
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
                  ID
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
                  Lisence No
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Experience
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                  className="border p-2"
                >
                  Commission Rate
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
              {agents.length > 0 &&
                agents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((Agents, index) => (
                    <TableRow
                      key={Agents._id}
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
                        {Agents.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {Agents.email}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {Agents.mobileNo}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {Agents.address}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {Agents.licenseNo}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {Agents.experience}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {Agents.commissionRate}
                      </TableCell>
                      <TableCell
                        sx={{
                          padding: "4px",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                        className="border p-2"
                      >
                        {Agents.status}
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
                            onClick={() => handleView(Agents)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            sx={{ color: "gray" }}
                            onClick={() => handleEdit(Agents)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            sx={{ color: "red" }}
                            onClick={() => handleDelete(Agents)}
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
                <Typography variant="h6">Agents Details</Typography>
                <IconButton onClick={handleCloseViewModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {selectedAgents && (
                <Grid container spacing={2} mt={2}>
                  {Object.entries(selectedAgents).map(([key, value]) => (
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
                <Typography variant="h6">Edit Agents</Typography>
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
                      {field === "status" ? (
                        <FormControl fullWidth>
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={editFormData[field] || ""}
                            onChange={handleEditInputChange(field)}
                            label="Status"
                          >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="InActive">InActive</MenuItem>
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
                Are you sure you want to delete this Agents?
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
                  Add New Buyer
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
                    label="license No"
                    name="licenseNo"
                    // type="number"
                    value={addFormData.licenseNo}
                    onChange={handleAddInputChange("licenseNo")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="experience"
                    name="experience"
                    // type="number"
                    value={addFormData.experience}
                    onChange={handleAddInputChange("experience")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="commission Rate"
                    name="commissionRate"
                    // type="number"
                    value={addFormData.commissionRate}
                    onChange={handleAddInputChange("commissionRate")}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="furnishing-label">Status</InputLabel>
                    <Select
                      labelId="furnishing-label"
                      name="status"
                      value={addFormData.status}
                      onChange={handleAddInputChange("status")}
                      required
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
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
                      onClick={handleAddAgent}
                    >
                      Save Agent
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
        count={agents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default AgentTable;
