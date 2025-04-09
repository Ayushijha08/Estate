//name, email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus
import { useEffect, useState } from "react";
import TablePagination from '@mui/material/TablePagination';

import {  FormControl, InputAdornment, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { Table, Select, MenuItem,TableHead,TableBody,TableRow,TableCell, IconButton,Modal, Box, Typography,  Paper,Grid,TextField,Button, TableContainer,} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete, Close as CloseIcon,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
const BookingTable = () => {
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
  const [selectedBooking, setselectedBooking] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [addFormData, setAddFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    address: '',
    check_in_date: '',
    check_out_date: '',
    TotalAmountUnit: '',
    paymentStatus: '',
    Bookingstatus: '',

      });
  
  const [bookings, setBookings] = useState([]);
  const [searchTerm,setSearchTerm]= useState("");
    const [apiBookings,setApiBookings]=useState([]);
          const [addModalOpen, setAddModalOpen] = useState(false);
    
  

  const getAllbooking = async () => {
    try {
      const res = await axios.get(
       ` http://localhost:3001/booking/getAllBookings`
      );
      console.log("response", res.data);
      setBookings(res.data);
      setApiBookings(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllbooking();
  }, []);
  const handleView = (booking) => {
    setselectedBooking(booking);
    setViewModalOpen(true);
  };

  const handleEdit = (booking) => {
    setselectedBooking(booking);
    setEditFormData(booking);
    setEditModalOpen(true);
  };
    

  const handleDelete = (booking) => {
    setselectedBooking(booking);
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
  const handleAddNew = () => {
    setAddModalOpen(true);
  };

   const handleAddInputChange = (field) => (event) => {
      setAddFormData({
        ...addFormData,
        [field]: event.target.value,
      });
    };
  
    const handleAddBooking = async () => {
      try {
        const response = await axios.post('http://localhost:3001/booking/createBooking', addFormData);
        if (response.data.success) {
          toast.success('Booking added successfully!');
          handleCloseAddModal();
          getAllbooking();
          // Reset form data
          setAddFormData({
  
            name: '',
            email: '',
            mobileNo: '',
            address: '',
            check_in_date: '',
            check_out_date: '',
            TotalAmountUnit: '',
            paymentStatus: '',
            Bookingstatus: '',
           });
        }
      } catch (error) {
        console.error('Error adding Booking:', error);
        toast.error(error.response?.data?.message || 'Failed to add booking');
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
        setBookings(apiBookings); // Reset to full list when search is empty
        return;
    }

    const filtered = apiBookings.filter((booking) => {
      return (
        booking.name.toLowerCase().includes(value) ||   // propertyTitle = gfdgf.includes(gfdgf)
        booking.address.toLowerCase().includes(value) ||
        booking.email.toLowerCase().includes(value) ||
        booking.mobileNo.toString().toLowerCase().includes(value)
      );
    });

    setBookings(filtered);
};

  const handleUpdate = () => {
    console.log("Updating booking:", editFormData);
    // Here you would typically make an API call to update the booking
    handleCloseEditModal();
  };

  const handleConfirmDelete =async () => {
    handleCloseDeleteModal();
    try{
      const res = await axios.delete(`http://localhost:3001/booking/deleteBooking/${selectedBooking._id}`);
      if(res.data.success){
        toast.success(res.data.message);
       getAllbooking()
      }

    }
    catch(error)
    {
   console.log(error);
   toast.error()
   toast.error(error.response.data.message);
    }

  };
  return (
    <>
    
    <div className='flex'>
    <h1
className="heading"
>BOOKING DETAILS</h1>
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
        style={{ marginBottom: '20px',width:'180px',display:'flex',marginRight:'160px',justifyContent:'flex-end',marginLeft:'704px' }}
      />


    <Button 
    variant="contained" 
   // color="primary" 
 onClick={handleAddNew}
 style={{ marginBottom: '20px',textWrap:'wrap',marginLeft:'40px' ,padding:'10px',borderRadius:'5px',height:'55px',width:'130px'}}

  >
    Add Booking
  </Button>
  

  
  </div>

    <TableContainer
      component={Paper}
      style={{ overflowX: "auto", maxWidth: 1250,whiteSpace:"nowrap" }}
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
            check in date            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              
              check out date            </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Total Amount Unit
            </TableCell>
            
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            payment Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Booking Status
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { bookings.length>0 && bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // ✅ Apply pagination here
      .map((booking,index) => (            <TableRow
              key={booking._id}
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
                {booking.name}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {booking.email}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {booking.mobileNo}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {booking.address}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {booking.check_in_date}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {booking.check_out_date}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {booking.TotalAmountUnit}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >  <Select
              value={booking.paymentStatus}
              onChange={(e) => {
                const updatedBookings = [...bookings];
                updatedBookings[index].paymentStatus = e.target.value;
                setBookings(updatedBookings);
              }}
              size="small"
              variant="standard"
              fullWidth
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
            </Select>
          
            
</TableCell>

<TableCell sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }} className="border p-2">
<Select
    value={booking.Bookingstatus}
    onChange={(e) => {
      const updatedBookings = [...bookings];
      updatedBookings[index].Bookingstatus = e.target.value;
      setBookings(updatedBookings);
    }}
    size="small"
    variant="standard"
    fullWidth
  >
    <MenuItem value="Pending">Pending</MenuItem>
    <MenuItem value="Confirmed">Confirmed</MenuItem>
    <MenuItem value="Cancelled">Cancelled</MenuItem>
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
                    onClick={() => handleView(booking)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    sx={{ color: "green" }}
                    onClick={() => handleEdit(booking)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(booking)}
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
            <Typography variant="h6">booking Details</Typography>
            <IconButton onClick={handleCloseViewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedBooking && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedBooking).map(([key, value]) => (
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
      <Typography variant="h6">Edit Booking</Typography>
      <IconButton onClick={handleCloseEditModal}>
        <CloseIcon />
      </IconButton>
    </Box>

    <Grid container spacing={2} mt={2}>
      {Object.keys(editFormData)
                    .filter((field) => field !== "createdAt" && field !== "updatedAt" && field !== "__v" && field !== "_id")

      .map((field) => (
        <Grid item xs={6} key={field}>
          {field === "paymentStatus" ? (
            <FormControl fullWidth>
              <InputLabel>  payment Status</InputLabel>
            <Select
              value={editFormData[field] || ""}
              onChange={handleEditInputChange(field)}
              fullWidth
              displayEmpty
              variant="standard"
            >
              <MenuItem value="" disabled>Select Payment Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
            </Select>
            </FormControl>
          ) : field === "Bookingstatus" ? (
            <FormControl fullWidth>
              <InputLabel>  Booking Status</InputLabel>
            
            <Select
              value={editFormData[field] || ""}
              onChange={handleEditInputChange(field)}
              fullWidth
              displayEmpty
              variant="standard"
            >
              <MenuItem value="" disabled>Select Booking Status</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
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
          <Typography 
                    className="confirm_delete"

          variant="h6">Confirm Delete</Typography>
          <Typography my={2}>
            Are you sure you want to delete this booking?
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>
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
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                          <Typography variant="h6" fontWeight="bold">Add New Booking</Typography>
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
                              onChange={handleAddInputChange('name')}
                              required
                            />
                          </Grid>
                         
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="E-mail"
                              name="email"
                              value={addFormData.email}
                              onChange={handleAddInputChange('email')}
                              required
                            />
                          </Grid>
                         
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Mobile No"
                              name="mobileNo"
                              value={addFormData.mobileNo}
                              onChange={handleAddInputChange('mobileNo')}
                              required
                            />
                          </Grid>
                         
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Address"
                              name="address"
                              value={addFormData.address}
                              onChange={handleAddInputChange('address')}
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label=" check_in_date"
                              name="check_in_date"
                             // type="number"
                              value={addFormData.check_in_date}
                              onChange={handleAddInputChange('check_in_date')}
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label=" check_out_date"
                              name="check_out_date"
                             // type="number"
                              value={addFormData.check_out_date}
                              onChange={handleAddInputChange('check_out_date')}
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label=" TotalAmountUnit"
                              name="TotalAmountUnit"
                             // type="number"
                              value={addFormData.TotalAmountUnit}
                              onChange={handleAddInputChange('TotalAmountUnit')}
                              required
                            />
                          </Grid>
                          
                          
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <InputLabel id="furnishing-label"> paymentStatus</InputLabel>
                              <Select
                                labelId="furnishing-label"
                                name="paymentStatus"
                                value={addFormData.paymentStatus}
                                onChange={handleAddInputChange('paymentStatus')}
                                required
                                
                              >
                                 <MenuItem value="" disabled>Select Payment Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
                             </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <InputLabel id="furnishing-label">Bookingstatus</InputLabel>
                              <Select
                                labelId="furnishing-label"
                                name="Bookingstatus"
                                value={addFormData.Bookingstatus}
                                onChange={handleAddInputChange('Bookingstatus')}
                                required
                                
                              >
                              <MenuItem value="Pending">Pending</MenuItem>
    <MenuItem value="Confirmed">Confirmed</MenuItem>
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
                                onClick={handleAddBooking}
                              >
                                Save Booking
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Modal>
            
    </TableContainer>
       <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={bookings.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    
    </>
  );
};

export default BookingTable;