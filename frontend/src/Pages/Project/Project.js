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
const ProjectTable = () => {
 
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
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [editFormData, setEditFormData] = useState({});
   const [addFormData, setAddFormData] = useState({
    ProjectName: '',
    Location: '',
    StartDate: '',
    EndDate: '',
    TotalUnits: '',
      status: '',
    });
   //ProjectName, Location, StartDate, EndDate, TotalUnits, status
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [apiprojects, setApiprojects] = useState([]);
  const navigate = useNavigate();

  const getAllProjects = async () => {
    try {
      const res = await axios.get(
        ` http://localhost:3001/project/getAllProjects`
      );
      console.log("response", res.data);
      setProjects(res.data);
      setApiprojects(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  const handleView = (project) => {
    setSelectedProject(project);
    setViewModalOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setEditFormData(project);
    setEditModalOpen(true);
  };

  const handleDelete = (project) => {
    setSelectedProject(project);
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
  
    const handleAddproject = async () => {
      try {
        const response = await axios.post('http://localhost:3001/project/createProject', addFormData);
        if (response.data.success) {
          toast.success('project added successfully!');
          handleCloseAddModal();
          getAllProjects();
          // Reset form data
          setAddFormData({
            ProjectName: '',
            Location: '',
            StartDate: '',
            EndDate: '',
            TotalUnits: '',
              status: '',
          });
        }
      } catch (error) {
        console.error('Error adding project:', error);
        toast.error(error.response?.data?.message || 'Failed to add project');
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
   ProjectName: "Project Name",
    Location: "Location",
    StartDate: "Start Date",
    EndDate: "End Date",
    TotalUnits: "Total Units",
      status: "Status",


    // Add all other fields you want to show with custom labels
  };

  const handleSearchChange = (e) => {
    console.log("target", e.target);

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setProjects(apiprojects); // Reset to full list when search is empty
      return;
    }

    const filtered = apiprojects.filter((project) => {
      return (
        project.ProjectName.toLowerCase().includes(value) || // projectTitle = gfdgf.includes(gfdgf)
        project.Location.toLowerCase().includes(value) 
      );
    });

    setProjects(filtered);
  };

  const handleUpdate = async () => {
    handleCloseEditModal();
    // console.log("selected project ", selectedProject);
    
    try {
      const res = await axios.put(
        `http://localhost:3001/project/updateProject/${selectedProject._id}`, editFormData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllProjects();
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
        `http://localhost:3001/project/deleteProject/${selectedProject._id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllProjects();
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
          Add project
        </Button>
      </div>
      <div className="table">

      <TableContainer
        component={Paper}
        style={{ overflowX: "auto", maxWidth: 1250 ,marginTop:"0"}}
      >
        <Table 
        sx={{whiteSpace:"nowrap"}}
        className="w-full border border-gray-300">
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
              Project Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign:"center"}} className="border p-2">
              Location
              </TableCell>
              <TableCell sx={{ fontWeight: "bold",textAlign:"center" }} className="border p-2">
              Start Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign:"center"}} className="border p-2">
              End Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" ,textAlign:"center"}} className="border p-2">
              Total Units
              </TableCell>
              
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
            {projects.length > 0 &&
              projects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project, index) => (
                  <TableRow
                    key={project._id}
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
                      {project.ProjectName}
                     
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {project.Location}
                      
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {project.StartDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {project.EndDate}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >
                      {project.TotalUnits}
                    </TableCell>
                    
                    <TableCell
                      sx={{
                        padding: "4px",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                      className="border p-2"
                    >{project.status}

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
                          onClick={() => handleView(project)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          sx={{ color: "gray" }}
                          onClick={() => handleEdit(project)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => handleDelete(project)}
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
              variant="h6">Project Details</Typography>
              <IconButton onClick={handleCloseViewModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {selectedProject && (
              <Grid container spacing={2} mt={2}>
                {Object.entries(selectedProject)
                .filter(([key]) => key !== "createdAt" && key !== "updatedAt"&& key !== "_id"&& key !== "__v")
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
              <Typography variant="h6">Edit project</Typography>
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
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Sold">Sold</MenuItem>
                        <MenuItem value="Rented">Rented</MenuItem>
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
              <Button 
              sx={{backgroundColor:"rgb(128,128,128)",color:"rgb(248,248,255)"}}
              variant="Standard" onClick={handleCloseEditModal}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleUpdate} sx={{ ml: 2 ,backgroundColor:"rgb(4,4,44)"}}>
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
              Are you sure you want to delete this project?
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
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">Add New project</Typography>
                    <IconButton onClick={handleCloseAddModal}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Grid container spacing={3}>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Project Name"
                        name="ProjectName"
                        value={addFormData.ProjectName}
                        onChange={handleAddInputChange('ProjectName')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Location"
                        name="Location"
                       // type="number"
                        value={addFormData.Location}
                        onChange={handleAddInputChange('Location')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Start Date"
                        name="StartDate"
                        type="Date"
                        value={addFormData.StartDate}
                        onChange={handleAddInputChange('StartDate')}

                        required
                        InputLabelProps={{
                          shrink: true,
                        }}

                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="End Date"
                        name="EndDate"
                        type="Date"
                        value={addFormData.EndDate}
                        onChange={handleAddInputChange('EndDate')}
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Total Units"
                        name="TotalUnits"
                       // type="Date"
                        value={addFormData.TotalUnits}
                        onChange={handleAddInputChange('TotalUnits')}
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
                          onChange={handleAddInputChange('status')}
                          required
                        >
                          <MenuItem value="Ongoing">Ongoing</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                          <MenuItem value="Upcoming">Upcoming</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button 
                          variant="Standard" 
                          onClick={handleCloseAddModal}
                          sx={{backgroundColor:"rgb(128,128,128)",color:"rgb(248,248,255)"}}
                        >
                          Cancel
                        </Button>
                        <Button 
                        sx={{backgroundColor:"rgb(4,4,44)"}}
                          variant="contained" 
                          color="primary"
                          onClick={handleAddproject}
                        >
                          Save project
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
        count={projects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ProjectTable;
