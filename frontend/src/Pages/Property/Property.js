//name, email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus
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
const PropertyTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      propertyTitle: "Luxury",
      propertyType: "Apartment",
      address: "Ranchi",
      price: 100000,
      areaSqft: 100,
      furnishing: "furnished",
      status: "Active",
    },
    {
      id: 2,
      propertyTitle: "2bhk",
      propertyType: "Apartment",
      address: "Kolkata",
      price: 100000,
      areaSqft: 100,
      furnishing: "furnished",
      status: "Active",
    },
    {
      id: 3,
      propertyTitle: "1bhk",
      propertyType: "Apartment",
      address: "MP",
      price: 100000,
      areaSqft: 100,
      furnishing: "furnished",
      status: "InActive",
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

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [properties, setProperties] = useState([]);

  const getAllProperty = async () => {
    try {
      const res = await axios.get(
       ` http://localhost:3001/property/getAllProperties`
      );
      console.log("response", res.data);
      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProperty();
  }, []);
  const handleView = (property) => {
    setSelectedProperty(property);
    setViewModalOpen(true);
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setEditFormData(property);
    setEditModalOpen(true);
  };

  const handleDelete = (property) => {
    setSelectedProperty(property);
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

  const handleUpdate = () => {
    console.log("Updating property:", editFormData);
    // Here you would typically make an API call to update the property
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    console.log("Deleting property:", selectedProperty);
    // Here you would typically make an API call to delete the property
    handleCloseDeleteModal();
  };
  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
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
    Add Property
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
              S.No
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Property Title
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Property Type
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Address
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Price
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Area(Sqft)
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              {" "}
              Furnishing
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
          { properties.length>0 && properties.map((property) => (
            <TableRow
              key={property._id}
              className="text-center"
              sx={{ fontWeight: "bold" }}
            >
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {property._id}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {property.propertyTitle}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {property.propertyType}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {property.address}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {property.price}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {property.areaSqft}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {property.furnishing}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                <Select
                  value={property.status}
                  onChange={(e) => handleStatusChange(property._id, e.target.value)}
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
                    onClick={() => handleView(property)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    sx={{ color: "green" }}
                    onClick={() => handleEdit(property)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(property)}
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
            <Typography variant="h6">Property Details</Typography>
            <IconButton onClick={handleCloseViewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedProperty && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedProperty).map(([key, value]) => (
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
            <Typography variant="h6">Edit Property</Typography>
            <IconButton onClick={handleCloseEditModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2} mt={2}>
            {Object.keys(editFormData).map((field) => (
              <Grid item xs={6} key={field}>
                <TextField
                  label={field}
                  value={editFormData[field] || ""}
                  onChange={handleEditInputChange(field)}
                  fullWidth
                />
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
            Are you sure you want to delete this property?
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
    </>
  );
};

export default PropertyTable;