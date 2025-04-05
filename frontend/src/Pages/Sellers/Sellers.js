
import { useEffect, useState } from "react";
import {  InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
import TablePagination from '@mui/material/TablePagination';

import axios from "axios";
const SellersTable = () => {
  const [data, setData] = useState([
    {// name, email, mobileNo, address, PropertyId, ListedPrice, Status
      id: 1,
      name: "Luxury",
      email: "Apartment",
      mobileNo:"121324",
      address: "Ranchi",
      PropertyId:"423",
      ListedPrice:"5",
      status: "Active",
    },
    
  ]);

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
  const [searchTerm,setSearchTerm]= useState("");
    const [apiSellers,setApiSellers]=useState([]);
  

  const getAllsellers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/Sellers/getAllSellers`      );
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

  const handleCloseViewModal = () => setViewModalOpen(false);
  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleEditInputChange = (field) => (event) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: event.target.value, 
    }));
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
        sellers.name.toLowerCase().includes(value) ||   // propertyTitle = gfdgf.includes(gfdgf)
        sellers.address.toLowerCase().includes(value) ||
        sellers.mobileNo.toLowerCase().includes(value) ||
        sellers.email.toString().toLowerCase().includes(value)
      );
    });

    setSellers(filtered);
};

  const handleUpdate = () => {
    console.log("Updating sellers:", editFormData);
    // Here you would typically make an API call to update the sellers
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    console.log("Deleting sellers:", selectedSellers);
    // Here you would typically make an API call to delete the sellers
    handleCloseDeleteModal();
  };
  const handleStatusChange = (id, newStatus) => {
    setSellers((prevSellers) =>
      prevSellers.map((seller) =>
        seller._id === id ? { ...seller, status: newStatus } : seller
      )
    );
  
    // Also update edit form data if it's being edited
    if (editFormData && editFormData._id === id) {
      setEditFormData((prev) => ({ ...prev, status: newStatus }));
    }
  };
  
  return (
    <>
    <div className='flex'>
    <TextField
           className='search'

        label="Search"
        variant="outlined"
       // fullWidth
       value={searchTerm}
        onChange={handleSearchChange}
        
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
    Add sellers
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
            email
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            mobileNo
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            address
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            PropertyId
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              {" "}
              ListedPrice
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
          { sellers.length>0 && sellers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // ✅ Apply pagination here
      .map((sellers) => (
            <TableRow
              key={sellers._id}
              className="text-center"
              sx={{ fontWeight: "bold" }}
            >
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {sellers._id}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >          
                {sellers.name}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {sellers.email}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {sellers.mobileNo}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {sellers.address}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {sellers.PropertyId}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {sellers.ListedPrice}
              </TableCell>
             
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                <Select
                  value={sellers.status}
                  variant="standard"
                  onChange={(e) => handleStatusChange(sellers._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
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
                    onClick={() => handleView(sellers)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    sx={{ color: "green" }}
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
      {Object.keys(editFormData).map((field) => (
        <Grid item xs={6} key={field}>
          {field === "status" ? (
  <FormControl fullWidth variant="standard">
    <InputLabel>Status</InputLabel>
    <Select
      value={editFormData.status || ""}
      onChange={handleEditInputChange("status")}
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
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography my={2}>
            Are you sure you want to delete this sellers?
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