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
import {  MenuItem, FormControl } from '@mui/material';
import { Modal, Box, Typography, Grid, TextField,Select,InputLabel, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const columns = [
  { id: 'SI_no', label: 'SI NO.', flex: 1, minWidth: 50 },
  { id: 'name', label: 'Name', flex: 1, align: 'right', minWidth: 100 },
  { id: 'email', label: 'E-mail', flex: 1, align: 'right', minWidth: 150 },
  { id: 'mobileNo', label: 'Mobile Number', flex: 1, align: 'right', minWidth: 180 },
  { id: 'address', label: 'Address', flex: 1, align: 'right', minWidth: 180 },
  { id: 'LeaseStartDate', label: 'Lease Start Date', flex: 1, align: 'right', format: (value) => value.toFixed(2) },
  { id: 'LeaseEndDate', label: 'Lease End Date', flex: 1, align: 'right', format: (value) => value.toFixed(2) },
  { id: 'MonthlyRent', label: 'Monthly Rent', flex: 1, align: 'right', format: (value) => value.toFixed(2) },
  { id: 'SecurityDeposit', label: 'Security Deposit', flex: 1, align: 'right' },
  { id: 'PaymentStatus', label: 'Payment Status', flex: 1, align: 'right' },
  { id: 'LeaseStatus', label: 'Lease Status', flex: 1, align: 'right' },
  { id: 'action', label: 'Action', flex: 1, align: 'center' },
];

function createData(SI_no, name, email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus) {
  return { SI_no, name, email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus };
}

const rows = [
  createData('1', 'Ayushi', 'ayushi@mail.com', 12233344, 'sakshi', '10-02-25', '10-02-25', 1000000, 100000, 'pending', 'active'),
  createData('2', 'John', 'john@mail.com', 12233345, 'Delhi', '11-02-25', '11-02-25', 1200000, 200000, 'paid', 'terminated'),
  createData('3', 'Peter', 'peter@mail.com', 12233346, 'Mumbai', '12-02-25', '12-02-25', 1300000, 250000, 'overdue', 'expired'),
  createData('4', 'Jane', 'jane@mail.com', 12233347, 'Bangalore', '13-02-25', '13-02-25', 1400000, 300000, 'pending', 'active'),
  createData('5', 'David', 'david@mail.com', 12233348, 'Chennai', '14-02-25', '14-02-25', 1500000, 350000, 'paid', 'terminated'),
  createData('6', 'Sita', 'sita@mail.com', 12233349, 'Kolkata', '15-02-25', '15-02-25', 1600000, 400000, 'overdue', 'expired'),
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
    const [data, setData] = React.useState(rows); // Use this state to store and update rows data
  
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [selectedLease, setSelectedLease] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedLease(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedLease(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedLease(null);
  };

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value
    });
  };

  const handleUpdate = () => {
    console.log('Updating lease:', editFormData);
    // Here you would typically make an API call to update the lease
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    console.log('Deleting lease:', selectedLease);
    // Here you would typically make an API call to delete the lease
    handleCloseDeleteModal();
  };
  const handleDropdownChange = (columnId, value, SI_no) => {
    const updatedRows = data.map((row) =>
      row.SI_no === SI_no ? { ...row, [columnId]: value } : row
    );
    setData(updatedRows); // Update the state with the new value for the respective column
  };

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
            lease Details
          </Typography>
          <IconButton onClick={handleCloseViewModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        {selectedLease && (
          <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1"><strong>Name:</strong> {selectedLease.name}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1"><strong>E-mail:</strong> {selectedLease.email}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1"><strong>mobile No:</strong> {selectedLease.mobileNo}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1"><strong>Address:</strong> ₹{selectedLease.address}</Typography>
                      </Grid>
             
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Lease Start Date:</strong> {selectedLease.LeaseStartDate} </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Lease End Date:</strong> {selectedLease.LeaseEndDate} </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Monthly Rent:</strong> {selectedLease.MonthlyRent} </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Security Deposit:</strong> {selectedLease.SecurityDeposit} </Typography>
            </Grid>



            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Payment Status:</strong> {selectedLease.paymentStatus}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Lease Status:</strong> {selectedLease.LeaseStatus}</Typography>
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
            Edit lease
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mobile No"
                      value={editFormData.mobileNo || ''}
                      onChange={handleEditInputChange('mobileNo')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Address"
                      //type="number"
                      value={editFormData.address || ''}
                      onChange={handleEditInputChange('address')}
                    />
                  </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lease Start Date"
              value={editFormData.LeaseStartDate || ''}
              onChange={handleEditInputChange('LeaseStartDate')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lease End Date"
              value={editFormData.LeaseEndDate || ''}
              onChange={handleEditInputChange('LeaseEndDate')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Monthly Rent"
              //type="number"
              value={editFormData.MonthlyRent || ''}
              onChange={handleEditInputChange('MonthlyRent')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Security Deposit"
              //type="number"
              value={editFormData.SecurityDeposit || ''}
              onChange={handleEditInputChange('SecurityDeposit')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label=" Payment Status"
              value={editFormData.paymentStatus || ''}
              onChange={handleEditInputChange('paymentStatus')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label=" Lease Status"
              value={editFormData.LeaseStatus || ''}
              onChange={handleEditInputChange('LeaseStatus')}
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
          Are you sure you want to delete this lease?
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer className="table" sx={{ maxHeight: 440, fontSize: '12px', marginLeft: '20px', marginTop: '0px', marginRight: '20px' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                
                    fontWeight: 'bolder',
                    fontSize: '14px',
                    padding: '12px',  // Added padding to cells for better spacing
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.SI_no} sx={{ height: '60px' }}> {/* Increased row height for better spacing */}
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ padding: '12px' }}  // Added padding to table cells for spacing
                      >
                        {column.id === 'PaymentStatus' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Payment Status</InputLabel>
                            <Select
                              value={row.paymentStatus}
                              onChange={(e) => handleDropdownChange('paymentStatus', e.target.value, row.SI_no)}
                              label="Payment Status"
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="paid">Paid</MenuItem>
                              <MenuItem value="overdue">Overdue</MenuItem>
                            </Select>
                          </FormControl>
                        ) : column.id === 'LeaseStatus' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Lease Status</InputLabel>
                            <Select
                              value={row.LeaseStatus}
                              onChange={(e) => handleDropdownChange('LeaseStatus', e.target.value, row.SI_no)}
                              label="Lease Status"
                            >
                              <MenuItem value="active">Active</MenuItem>
                              <MenuItem value="terminated">Terminated</MenuItem>
                              <MenuItem value="expired">Expired</MenuItem>
                            </Select>
                          </FormControl>
                        ) : column.id === 'action' ? (
                          <div  style={{display:'flex'}}>
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
        count={data.length}
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