import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Modal, Box, Typography, Grid, TextField,FormControl, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const columns = [
  { id: 'SI_no', label: 'SI NO.', minWidth: 120 },
  { id: 'name', label: 'Name', minWidth: 220 },
  { id: 'email', label: 'E-mail', minWidth: 280 },
  { id: 'mobileNo', label: 'Mobile Number', minWidth: 280 },
  { id: 'address', label: 'Address', minWidth: 320 },
  { id: 'check_in_date', label: 'Check-in Date', minWidth: 330 },
  { id: 'check_out_date', label: 'Check-out Date', minWidth: 220 },
  { id: 'TotalAmountUnit', label: 'Total Amount Unit', minWidth: 270 },
  { id: 'paymentStatus', label: 'Payment Status', minWidth: 220 },
  { id: 'Bookingstatus', label: 'Booking Status', minWidth: 220 },
  { id: 'action', label: 'Action', minWidth: 280, align: 'center' },
];

function createData(SI_no, name, email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus) {
  return { SI_no, name, email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus };
}

const rows = [
  createData('1', 'Ayushi', 'ayushi@mail.com', 12233344, 'sakshi', '10-02-25', '10-02-25', 1000000, 'pending', 'confirmed'),
  createData('2', 'John Doe', 'johndoe@mail.com', 12345678, 'New York', '11-02-25', '11-02-25', 2000000, 'paid', 'confirmed'),
  createData('3', 'Jane Smith', 'janesmith@mail.com', 87654321, 'California', '12-02-25', '12-02-25', 1500000, 'pending', 'confirmed'),
  createData('4', 'Mark', 'mark@mail.com', 11223344, 'Texas', '13-02-25', '13-02-25', 1800000, 'paid', 'cancelled'),
  createData('5', 'Sarah', 'sarah@mail.com', 99887766, 'Florida', '14-02-25', '14-02-25', 1100000, 'pending', 'confirmed'),
 // createData('6', 'Alex', 'alex@mail.com', 66554433, 'Chicago', '15-02-25', '15-02-25', 2500000, 'paid', 'confirmed'),
  //createData('7', 'Emma', 'emma@mail.com', 44556677, 'Las Vegas', '16-02-25', '16-02-25', 3000000, 'pending', 'confirmed'),
  //createData('8', 'Michael', 'michael@mail.com', 33445566, 'Miami', '17-02-25', '17-02-25', 2200000, 'paid', 'confirmed'),
];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  maxHeight: '90vh',
  overflow: 'auto'
};

const deleteModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  textAlign: 'center'
};

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
    //const [data, setData] = React.useState(rows); // Use this state to store and update rows data
  
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({});
  const [bookingStatus, setBookingStatus] = React.useState(rows.map(row => row.Bookingstatus));
  const [paymentStatus, setPaymentStatus] = React.useState(rows.map(row => row.paymentStatus));


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleBookingStatusChange = (event, index) => {
    const newBookingStatus = [...bookingStatus];
    newBookingStatus[index] = event.target.value;
    setBookingStatus(newBookingStatus);
  };
  const handlePaymentStatusChange = (event, index) => {
    const newPaymentStatus = [...paymentStatus];
    newPaymentStatus[index] = event.target.value;
    setPaymentStatus(newPaymentStatus);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setViewModalOpen(true);
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setEditFormData(booking);
    setEditModalOpen(true);
  };

  const handleDelete = (booking) => {
    setSelectedBooking(booking);
    setDeleteModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedBooking(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedBooking(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedBooking(null);
  };

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value
    });
  };

  const handleUpdate = () => {
    console.log('Updating booking:', editFormData);
    // Here you would typically make an API call to update the booking
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    console.log('Deleting booking:', selectedBooking);
    // Here you would typically make an API call to delete the booking
    handleCloseDeleteModal();
  };
  /*const handleDropdownChange = (columnId, value, SI_no) => {
    const updatedRows = data.map((row) =>
      row.SI_no === SI_no ? { ...row, [columnId]: value } : row
    );
    setData(updatedRows); // Update the state with the new value for the respective column
  }; */

  const renderViewModal = () => (
    <Modal
      open={viewModalOpen}
      onClose={handleCloseViewModal}
      aria-labelledby="view-modal-title"
      aria-describedby="view-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography id="view-modal-title" variant="h6" component="h2">
            booking Details
          </Typography>
          <IconButton onClick={handleCloseViewModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        {selectedBooking && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Name:</strong> {selectedBooking.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>E-mail:</strong> {selectedBooking.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><strong>Mobile no.:</strong> {selectedBooking.mobileNo
              }</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><strong>Address:</strong> {selectedBooking.address
              }</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>check in date:</strong> ₹{selectedBooking.check_in_date}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>check out date:</strong> ₹{selectedBooking.check_out_date}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Total Amount Unit:</strong> {selectedBooking.TotalAmountUnit} </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Payment Status:</strong> {selectedBooking.paymentStatus}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Booking Status:</strong> {selectedBooking.Bookingstatus}</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Modal>
  );

  const renderEditModal = () => (
    <Modal
      open={editModalOpen}
      onClose={handleCloseEditModal}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Edit booking
          </Typography>
          <IconButton onClick={handleCloseEditModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={editFormData.name || ''}
              onChange={handleEditInputChange('name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="E-mail"
              value={editFormData.email || ''}
              onChange={handleEditInputChange('email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile No."
              value={editFormData.mobileNo || ''}
              onChange={handleEditInputChange('mobileNo')}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={editFormData.address || ''}
              onChange={handleEditInputChange('address')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="check in date"
              //type="number"
              value={editFormData.check_in_date || ''}
              onChange={handleEditInputChange('check_in_date')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Check out date"
              //type="number"
              value={editFormData.check_out_date || ''}
              onChange={handleEditInputChange('check_out_date')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Total Amount Unit"
              value={editFormData.TotalAmountUnit || ''}
              onChange={handleEditInputChange('TotalAmountUnit')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Payment Status"
              value={editFormData.paymentStatus || ''}
              onChange={handleEditInputChange('paymentStatus')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Booking Status"
              value={editFormData.bookingStatus || ''}
              onChange={handleEditInputChange('bookingStatus')}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  const renderDeleteModal = () => (
    <Modal
      open={deleteModalOpen}
      onClose={handleCloseDeleteModal}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box sx={deleteModalStyle}>
        <Typography id="delete-modal-title" 
                className='confirm_delete'
                variant="h6" component="h2" gutterBottom>
          Confirm Delete
        </Typography>
        <Typography id="delete-modal-description" sx={{ mb: 3 }}>
          Are you sure you want to delete this booking?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="outlined" onClick={handleCloseDeleteModal}>
            No
          </Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ fontSize: '12px', marginLeft: '20px', maxHeight:'500px', marginTop: '0px', marginRight: '20px',width:'100%',whiteSpace:'nowrap' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ fontWeight: 'bolder', fontSize: '14px',minWidth:column.minWidth,whiteSpace:'nowrap' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.SI_no}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'action' ? (
                          <div style={{display:'flex'}}>
                            <IconButton 
                            className='view'
                            onClick={() => handleView(row)} color="black">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton 
                            className='edit'
                            onClick={() => handleEdit(row)} color="black">
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                            className='delete'
                            onClick={() => handleDelete(row)} color="black">
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ) : column.id === 'Bookingstatus' ? (
                          <FormControl fullWidth>
                            <Select
                              value={bookingStatus[index]}
                              onChange={(e) => handleBookingStatusChange(e, index)}
                              displayEmpty
                            >
                              <MenuItem value="confirmed">confirmed</MenuItem>
                              <MenuItem value="cancelled">cancelled</MenuItem>
                              <MenuItem value="completed">completed</MenuItem>
                            </Select>
                          </FormControl>
                        ) : column.id === 'paymentStatus' ? (
                          <FormControl fullWidth>
                            <Select
                              value={paymentStatus[index]}
                              onChange={(e) => handlePaymentStatusChange(e, index)}
                              displayEmpty
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="paid">Paid</MenuItem>
                              <MenuItem value="overdue">Overdue</MenuItem>
                            </Select>
                          </FormControl>
                        ) : (
                          column.format && typeof value === 'number' ? column.format(value) : value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {renderViewModal()}
      {renderEditModal()}
      {renderDeleteModal()}
    </Paper>
  );
}