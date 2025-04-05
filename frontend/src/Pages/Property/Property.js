//name, email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus
import { useEffect, useState } from "react";
import {  InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TablePagination from '@mui/material/TablePagination';


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
  FormControl,
  InputLabel,
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
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [properties, setProperties] = useState([]);
  const [searchTerm,setSearchTerm]= useState("");
  const [apiProperties,setApiProperties]=useState([]);

  const getAllProperty = async () => {
    try {
      const res = await axios.get(
       ` http://localhost:3001/property/getAllProperties`
      );
      console.log("response", res.data);
      setProperties(res.data);
      setApiProperties(res.data);
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
        setProperties(apiProperties); // Reset to full list when search is empty
        return;
    }

    const filtered = apiProperties.filter((property) => {
      return (
        property.propertyTitle.toLowerCase().includes(value) ||   // propertyTitle = gfdgf.includes(gfdgf)
        property.address.toLowerCase().includes(value) ||
        property.propertyType.toLowerCase().includes(value) ||
        property.price.toString().toLowerCase().includes(value)
      );
    });

    setProperties(filtered);
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
  const handleTitleChange = (id, newTitle) => {
    setProperties((prev) =>
      prev.map((property) => (property._id === id ? { ...property, propertyTitle: newTitle } : property))
    );
  };
  const handleTypeChange = (id, newType) => {
    setProperties((prev) =>
      prev.map((property) => (property._id === id ? { ...property, propertyType: newType } : property))
    );
  };

  const handleFurnishingChange = (id, newFurnishing) => {
    setProperties((prev) =>
      prev.map((property) => (property._id === id ? { ...property, furnishing: newFurnishing } : property))
    );
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
      
        value={searchTerm}
        onChange={handleSearchChange}
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
    startIcon={<AddIcon />}
   // color="primary" 
 //onClick={handleAddNew}
 style={{ marginBottom: '20px',textWrap:'nowrap',display:'flex',marginLeft:'40px' ,padding:'10px',borderRadius:'5px',height:'55px',width:'130px'}}

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
            whiteSpace:"nowrap"
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
            <TableCell sx={{ fontWeight: "bold",textAlign:"center" }} className="border p-2">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { properties.length>0 && 
properties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((property, index) => (
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
                <Select
                    value={property.propertyTitle}
                    variant="standard"

                    onChange={(e) => handleTitleChange(property._id, e.target.value)}
                  >
                    <MenuItem value="Luxury">Luxury</MenuItem>
                    <MenuItem value="3BHK">3BHK</MenuItem>
                    <MenuItem value="Apartment">Apartment</MenuItem>
                  </Select>
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                <Select
                      variant="standard"

                    value={property.propertyType}
                    onChange={(e) => handleTypeChange(property._id, e.target.value)}
                  >
                    <MenuItem value="Apartment">Apartment</MenuItem>
                    <MenuItem value="House">House</MenuItem>
                    <MenuItem value="Commercial">Commercial</MenuItem>
                    <MenuItem value="Land">Land</MenuItem>
                    <MenuItem value="Office">Office</MenuItem>
                    <MenuItem value="Villa">Villa</MenuItem>
                  </Select>
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {property.address}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center",}}
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
              ><Select
              value={property.furnishing}
              variant="standard"
              sx={{minWidth:'150'}}
              onChange={(e) => handleFurnishingChange(property._id, e.target.value)}
            >
              <MenuItem value="Furnished">Furnished</MenuItem>
              <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
              <MenuItem value="Unfurnished">Unfurnished</MenuItem>
            </Select>
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                <Select
                  value={property.status}
                  variant="standard"

                  onChange={(e) => handleStatusChange(property._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Sold">Sold</MenuItem>
                  <MenuItem value="Rented">Rented</MenuItem>
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
          {field === "propertyTitle" ? (
            <FormControl fullWidth>
              <InputLabel
              id="demo-simple-select-label"
              >Property Title</InputLabel>
              <Select
               labelId="demo-simple-select-label"
               id="demo-simple-select"
               variant="standard"

                value={editFormData[field] || ""}
                onChange={handleEditInputChange(field)}
              >
                <MenuItem value="Luxury">Luxury</MenuItem>
                <MenuItem value="3BHK">3BHK</MenuItem>
                <MenuItem value="Apartment">Apartment</MenuItem>
              </Select>
            </FormControl>
          ) : field === "propertyType" ? (
            <FormControl fullWidth>
              <InputLabel>Property Type</InputLabel>
              <Select
                value={editFormData[field] || ""}
                variant="standard"

                onChange={handleEditInputChange(field)}
              >
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Commercial">Commercial</MenuItem>
                <MenuItem value="Land">Land</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
                <MenuItem value="Villa">Villa</MenuItem>
              </Select>
            </FormControl>
          ) : field === "furnishing" ? (
            <FormControl fullWidth>
              <InputLabel>Furnishing</InputLabel>
              <Select
                value={editFormData[field] || ""}
                variant="standard"

                onChange={handleEditInputChange(field)}
              >
                <MenuItem value="Furnished">Furnished</MenuItem>
                <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
                <MenuItem value="Unfurnished">Unfurnished</MenuItem>
              </Select>
            </FormControl>
          )
          : field === "status" ? (
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={editFormData[field] || ""}
                variant="standard"

                onChange={handleEditInputChange(field)}
              >
                <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Sold">Sold</MenuItem>
                  <MenuItem value="Rented">Rented</MenuItem>
             </Select>
            </FormControl>
          )
          : (
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
          <Typography 
                    className="confirm_delete"

          variant="h6">Confirm Delete</Typography>
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
    <TablePagination
  rowsPerPageOptions={[5, 10, 25]}
  component="div"
  count={properties.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>

    </>
  );
};

export default PropertyTable;