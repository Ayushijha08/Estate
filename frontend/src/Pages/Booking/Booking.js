//name, email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus
import { useEffect, useState } from "react";
import TablePagination from '@mui/material/TablePagination';

import {  InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { Table, Select, MenuItem,TableHead,TableBody,TableRow,TableCell, IconButton,Modal, Box, Typography,  Paper,Grid,TextField,Button, TableContainer,} from "@mui/material";
import {
  Visibility,
  Edit,
  Delete, Close as CloseIcon,
} from "@mui/icons-material";
import axios from "axios";
const BookingTable = () => {
  const [data, setData] = useState([
    {
      
        id: 1,
        name: "Luxury",
        email: "Apartment",
        mobileNo:"121324",
        address: "Ranchi",
        check_in_date:"423",
        check_out_date:"5",
        TotalAmountUnit:"546",
        paymentStatus: "Active",
        Bookingstatus:"pending"
      
    },
    {
      id: 2,
      name: "Luxury",
      email: "Apartment",
      mobileNo:"121324",
      address: "Ranchi",
      check_in_date:"423",
      check_out_date:"5",
      TotalAmountUnit:"546",
      paymentStatus: "Active",
      Bookingstatus:"pending"
    
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
  const [selectedBooking, setselectedBooking] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [searchTerm,setSearchTerm]= useState("");
    const [apiBookings,setApiBookings]=useState([]);
  

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

  const handleConfirmDelete = () => {
    console.log("Deleting booking:", selectedBooking);
    // Here you would typically make an API call to delete the booking
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
      .map((booking) => (            <TableRow
              key={booking._id}
              className="text-center"
              sx={{ fontWeight: "bold" }}
            >
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {booking._id}
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
              >
                <Select
                variant="standard"
    value={booking.paymentStatus}
    onChange={(e) => handleStatusChange(booking._id, "paymentStatus", e.target.value)}
    className="border p-1 rounded"
  >
    <MenuItem value="Pending">Pending</MenuItem>
    <MenuItem value="Completed">Completed</MenuItem>
    <MenuItem value="Failed">Failed</MenuItem>
  </Select>
</TableCell>

<TableCell sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }} className="border p-2">
  <Select
    value={booking.Bookingstatus}
    variant="standard"

    onChange={(e) => handleStatusChange(booking._id, "Bookingstatus", e.target.value)}
    className="border p-1 rounded"
  >
    <MenuItem value="Confirmed">Confirmed</MenuItem>
    <MenuItem value="Cancelled">Cancelled</MenuItem>
    <MenuItem value="Completed">Completed</MenuItem>
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
      {Object.keys(editFormData).map((field) => (
        <Grid item xs={6} key={field}>
          {/* Dropdown for Payment Status */}
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
          ) : field === "Bookingstatus" ? (
            
            <Select
              fullWidth
              variant="standard"

              value={editFormData[field] || ""}
              onChange={(e) => handleEditInputChange(field)(e)}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Booking Status</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
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
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography my={2}>
            Are you sure you want to delete this booking?
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