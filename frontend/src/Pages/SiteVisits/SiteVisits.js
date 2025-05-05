//name, email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus
import { useEffect, useState } from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import TablePagination from "@mui/material/TablePagination";
import {Table,Select,MenuItem,TableHead,TableBody,TableRow,TableCell,IconButton, Modal,Box,Typography,FormControl,InputLabel, Paper,Grid, TextField, Button,TableContainer} from "@mui/material";
import {Visibility, Edit, Delete,Close as CloseIcon,} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
const SiteVisitsTable = () => {
 
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
    const [addModalOpen, setAddModalOpen] = useState(false);
  
  const [selectedSiteVisits, setSelectedSiteVisits] = useState(null);
  const [editFormData, setEditFormData] = useState({});
   const [addFormData, setAddFormData] = useState({
    PropertyId: '',
    VisitorName: '',
    ContactNo: '',
    AgentId: '',
    SheduledDate: '',
    status: '',
    });
   
  const [SiteVisits, setSiteVisits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiSiteVisits, setApiSiteVisits] = useState([]);
  const navigate = useNavigate();

  const getAllSiteVisits = async () => {
    try {
      const res = await axios.get(
        ` http://localhost:3001/SiteVisits/getAllSiteVisits`
      );
      console.log("response", res.data);
      setSiteVisits(res.data);
      setApiSiteVisits(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllSiteVisits();
  }, []);
  const handleView = (SiteVisit) => {
    setSelectedSiteVisits(SiteVisit);
    setViewModalOpen(true);
  };

  const handleEdit = (SiteVisit) => {
    setSelectedSiteVisits(SiteVisit);
    setEditFormData(SiteVisit);
    setEditModalOpen(true);
  };

  const handleDelete = (SiteVisit) => {
    setSelectedSiteVisits(SiteVisit);
    setDeleteModalOpen(true);
  };
  const handleAddNew = () => {
    setAddModalOpen(true);
  };

  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseAddModal = () => setAddModalOpen(false);

  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

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
  
    const handleAddSiteVisit = async () => {
      try {
        const response = await axios.post('http://localhost:3001/SiteVisits/createSiteVisits', addFormData);
        if (response.data.success) {
          toast.success('SiteVisit added successfully!');
          handleCloseAddModal();
          getAllSiteVisits();
          // Reset form data
          setAddFormData({
            PropertyId: '',
            VisitorName: '',
            ContactNo: '',
            AgentId: '',
            SheduledDate: '',
            status: '',
          });
        }
      } catch (error) {
        console.error('Error adding SiteVisit:', error);
        toast.error(error.response?.data?.message || 'Failed to add SiteVisit');
      }
    };
    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };
  
  
  const fieldLabels = {
    PropertyId: " Property Id",
    VisitorName: " Visitor Name",
    ContactNo: "Contact No",
    AgentId: "Agent Id",
    SheduledDate: " Sheduled Date",
    status: "Status",


    // Add all other fields you want to show with custom labels
  };

  const handleSearchChange = (e) => {
    console.log("target", e.target);

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setSiteVisits(apiSiteVisits); // Reset to full list when search is empty
      return;
    }

    const filtered = apiSiteVisits.filter((SiteVisit) => {
      return (
        SiteVisit.VisitorName.toLowerCase().includes(value) || // SiteVisitTitle = gfdgf.includes(gfdgf)
        SiteVisit.PropertyId.toLowerCase().includes(value) ||
        SiteVisit.AgentId.toLowerCase().includes(value)       );
    });

    setSiteVisits(filtered);
  };

  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected SiteVisit ", selectedSiteVisits);
    
    try {
      const res = await axios.put(
        `http://localhost:3001/SiteVisits/updateSiteVisits/${selectedSiteVisits._id}`, editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllSiteVisits();
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
        `http://localhost:3001/SiteVisits/deleteSiteVisits/${selectedSiteVisits._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllSiteVisits();
      }
    } catch (error) {
      console.log(error);
      // toast.error();
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
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          className="primary_button"

        >
          Add  Visit
        </Button>
      </div>
      <div className="table">

      <TableContainer
        component={Paper}
        style={{ overflowX: "auto", maxWidth: 1250 ,marginTop:"0"}}
      >
        <Table className="w-full border border-gray-300">
          <TableHead
            sx={{
              top: 0,
              background: "white",
              zIndex: 2,
              position: "sticky",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            <TableRow className="bg-gray-200">
              <TableCell sx={{ fontWeight: "bold" ,textAlign:"center"}} className="border p-2">
                S.No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold",textAlign:"center" }} className="border p-2">
              Property Id
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign:"center"}} className="border p-2">
              Visitor Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold",textAlign:"center" }} className="border p-2">
              Contact No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign:"center"}} className="border p-2">
              Agent Id
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign:"center"}} className="border p-2">
              SheduledDate              </TableCell>
             
              <TableCell sx={{ fontWeight: "bold",textAlign:"center" }} className="border p-2">
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
            {SiteVisits.length > 0 &&
              SiteVisits
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((SiteVisit, index) => (
                  <TableRow
                    key={SiteVisit._id}
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
                      {SiteVisit.VisitorName}
                     
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {SiteVisit.PropertyId}
                      
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {SiteVisit.ContactNo}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {SiteVisit.AgentId}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                    {SiteVisit.SheduledDate}
                    </TableCell>
                    
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >{SiteVisit.status}

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
                          onClick={() => handleView(SiteVisit)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          sx={{ color: "gray" }}
                          onClick={() => handleEdit(SiteVisit)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => handleDelete(SiteVisit)}
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
              <Typography 
              sx={{fontWeight:'bold'}}
              variant="h6">Site Visit Details</Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedSiteVisits && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(selectedSiteVisits)
                .filter(([key]) => key !== "createdAt" && key !== "updatedAt" && key !== "_id"&& key !== "__v")
                .map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <Typography>
                      <strong>{fieldLabels[key]}:</strong> {value}
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
              <Typography variant="h6">Edit SiteVisit</Typography>
              <IconButton onClick={handleCloseEditModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2} mt={2}>
              {Object.keys(editFormData)
              .filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v" && field !== "_id")

              .map((field) => (
                <Grid item xs={6} key={field}>
                  { field === "status" ? (
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={editFormData[field] || ""}
                        variant="outlined"
                        label="Status" 
                        onChange={handleEditInputChange(field)}
                      >
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Scheduled">Scheduled</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
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
              Are you sure you want to delete this SiteVisit?
            </Typography>
            <Box display="flex" justifyContent="center" gap={2}>
              <Button 
                            sx={{backgroundColor:"gray",color:"white"}}

              variant="outlined" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
         <Modal open={addModalOpen} onClose={handleCloseAddModal}>
                <Box sx={modalStyle}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">Add New SiteVisit</Typography>
                    <IconButton onClick={handleCloseAddModal}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Grid container spacing={3}>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Property Id"
                        name="PropertyId"
                        value={addFormData.PropertyId}
                        onChange={handleAddInputChange('PropertyId')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Visitor Name"
                        name="VisitorName"
                       type="string"
                        value={addFormData.VisitorName}
                        onChange={handleAddInputChange('VisitorName')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Contact No"
                        name="ContactNo"
                        type="string"
                        value={addFormData.ContactNo}
                        onChange={handleAddInputChange('ContactNo')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Agent Id"
                        name="AgentId"
                        type="string"
                        value={addFormData.AgentId}
                        onChange={handleAddInputChange('AgentId')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Sheduled Date"
                        name="SheduledDate"
                        type="date"
                        value={addFormData.SheduledDate}
                        onChange={handleAddInputChange('SheduledDate')}
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                   
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                          labelId="Status"
                          name="status"
                          label="Status" 
                          value={addFormData.status}
                          onChange={handleAddInputChange('status')}
                          required
                        >
                          <MenuItem value="Scheduled">Scheduled</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button 
                          variant="outlined" 
                          onClick={handleCloseAddModal}
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={handleAddSiteVisit}
                        >
                          Save Visit
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
        count={SiteVisits.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SiteVisitsTable;
