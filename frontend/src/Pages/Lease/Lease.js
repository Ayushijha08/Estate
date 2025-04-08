//name, email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus
import { useEffect, useState } from "react";
import {  InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from '@mui/material/TablePagination';

import {
  Table, Select,MenuItem, TableHead,  TableBody, TableRow, TableCell,IconButton,Modal, Box,  Typography,Paper,Grid, TextField,Button,TableContainer,} from "@mui/material";
import {Visibility, Edit,Delete, Close as CloseIcon,} from "@mui/icons-material";
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
  const [editFormData, setEditFormData] = useState({});
  const [Lease, setLease] = useState([]);
  const [searchTerm,setSearchTerm]= useState("");
  const [apiLease,setApiLease]=useState([]);

  const getAllLease = async () => {
    try {
      const res = await axios.get(
       ` http://localhost:3001/lease/getAllLeases`
      );
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

  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value,
    });
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
        lease.name.toLowerCase().includes(value) ||   // propertyTitle = gfdgf.includes(gfdgf)
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
  
  const handleUpdate = () => {
    console.log("Updating lease:", editFormData);
    // Here you would typically make an API call to update the lease
    handleCloseEditModal();
  };

  const handleConfirmDelete =async () => {
    handleCloseDeleteModal();
    try{
      const res = await axios.delete(`http://localhost:3001/lease/deleteLease/${selectedLease._id}`);
      if(res.data.success){
        toast.success(res.data.message);
        getAllLease()
      }

    }
    catch(error)
    {
   console.log(error);
   toast.error()
   toast.error(error.response.data.message);
    }

  };const handleStatusChange = (id, newStatus) => {
    setLease((prev) =>
      prev.map((lease) =>
        lease.id === id ? { ...lease, status: newStatus } : lease
      )
    );
  };
  return (
    <>
    <div className='flex'>
    <TextField
           className='search'

        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        
       // fullWidth
      //  value={searchQuery}
       // onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: '20px',width:'160px',display:'flex',marginRight:'150px',justifyContent:'flex-end',marginLeft:'800px' }}
      />


    <Button 
    variant="contained" 
   // color="primary" 
 //onClick={handleAddNew}
 style={{ marginBottom: '20px',textWrap:'wrap',marginLeft:'40px' ,padding:'10px',borderRadius:'5px',height:'55px',width:'130px'}}

  >
    Add Lease
  </Button>
  </div>

    <TableContainer
      component={Paper}
      style={{ overflowX: "auto", maxWidth: 1250 ,whiteSpace:"nowrap"}}
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
              S.No
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
           Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            email
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            mobile No
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            address
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            LeaseStartDate
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              {" "}
              Lease End Date
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Monthly Rent
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Security Deposit
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            payment Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            LeaseStatus
            </TableCell>

            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { Lease.length>0 && 
    Lease.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((lease, index) => (
      <TableRow
              key={lease._id}
              className="text-center"
              sx={{ fontWeight: "bold" }}
            >
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {index+1}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {lease.name}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {lease.email}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {lease.mobileNo}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {lease.address}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {lease.LeaseStartDate}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {lease.LeaseEndDate}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {lease.MonthlyRent}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {lease.SecurityDeposit}
              </TableCell>
              
              <TableCell>
          <Select
            value={lease.paymentStatus}
            variant="standard"

            onChange={(e) => handleStatusChange(lease._id, "paymentStatus", e.target.value)}
          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
            <MenuItem value="Partial">Partial</MenuItem>
          </Select>
        </TableCell>
        
        {/* Lease Status Dropdown */}
        <TableCell>
          <Select
                        variant="standard"

            value={lease.LeaseStatus}
            onChange={(e) => handleStatusChange(lease._id, "LeaseStatus", e.target.value)}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Expired">Expired</MenuItem>
            <MenuItem value="Terminated">Terminated</MenuItem>
          </Select>
        </TableCell>
        
        
              <TableCell sx={{ fontWeight: "bolder" }} className="border p-2">
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
                    sx={{ color: "green" }}
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
                    .filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v")

      .map((field) => (
        <Grid item xs={6} key={field}>
          {/* Payment Status Dropdown */}
          {field === "paymentStatus" ? (
            <Select
              fullWidth
              variant="standard"
              value={editFormData[field] || ""}
              onChange={(e) => handleEditInputChange(field)(e)}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Payment Status</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
            </Select>
          ) : field === "LeaseStatus" ? (
            /* Lease Status Dropdown */
            <Select
              fullWidth
              variant="standard"

              value={editFormData[field] || ""}
              onChange={(e) => handleEditInputChange(field)(e)}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Lease Status</MenuItem>
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
      <Button variant="contained" onClick={handleUpdate} sx={{ ml: 2 }}>
        Update
      </Button>
    </Box>
  </Box>
</Modal>

      {/* Delete Modal */}
      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box sx={deleteModalStyle}>
          <Typography 
                    className="confirm_delete"
          variant="h6">Confirm Delete</Typography>
          <Typography my={2}>
            Are you sure you want to delete this lease?
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