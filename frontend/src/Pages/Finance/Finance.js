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
  { id: 'SI_no', label: 'SI NO.', flex: 1 },
  { id: 'name', label: 'Name', flex: 1, align: 'right' },
  { id: 'Amount', label: 'Amount', flex: 1, align: 'right' },
  { id: 'transactionType', label: 'Transaction Type', flex: 1, align: 'right' },
  { id: 'category', label: 'Category', flex: 1, align: 'right' },
  { id: 'paymentMode', label: 'Payment Mode', flex: 1, align: 'right' },
  { id: 'transactionDate', label: 'Transaction Date', flex: 1, align: 'right' },
  { id: 'status', label: 'Status', flex: 1, align: 'right' },
  { id: 'action', label: 'Action', flex: 1, align: 'center' },
];

function createData(SI_no, name, Amount, transactionType, category, paymentMode, transactionDate, status) {
  return { SI_no, name, Amount, transactionType, category, paymentMode, transactionDate, status };
}

const rows = [
  createData('1', 'Luxury', 10, 'income', 'salary', 'cash', '02-12-25', 'pending'),
  createData('2', 'Luxury', 20, 'expense', 'payment rent', 'bank transfer', '03-12-25', 'completed'),
  createData('3', 'Luxury', 15, 'income', 'salary', 'upi', '04-12-25', 'cancelled'),
  createData('4', 'Luxury', 25, 'expense', 'utilities', 'credit card', '05-12-25', 'pending'),
  createData('5', 'Luxury', 30, 'income', 'salary', 'debit card', '06-12-25', 'completed'),
  createData('6', 'Luxury', 40, 'expense', 'payment rent', 'cash', '07-12-25', 'pending'),
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
  const [selectedFinance, setSelectedFinance] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (finance) => {
    setSelectedFinance(finance);
    setViewModalOpen(true);
  };

  const handleEdit = (finance) => {
    setSelectedFinance(finance);
    setEditFormData(finance);
    setEditModalOpen(true);
  };

  const handleDelete = (finance) => {
    setSelectedFinance(finance);
    setDeleteModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedFinance(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedFinance(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedFinance(null);
  };

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value
    });
  };

  const handleUpdate = () => {
    console.log('Updating finance:', editFormData);
    // Here you would typically make an API call to update the finance
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    console.log('Deleting finance:', selectedFinance);
    // Here you would typically make an API call to delete the finance
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
            finance Details
          </Typography>
          <IconButton onClick={handleCloseViewModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        {selectedFinance && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Name:</strong> {selectedFinance.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Amount:</strong> {selectedFinance.Amount}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><strong>Transaction Type:</strong> {selectedFinance.transactionType}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Category:</strong> ₹{selectedFinance.category}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Payment Mode:</strong> {selectedFinance.paymentMode} </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Transaction Date:</strong> {selectedFinance.transactionDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Status:</strong> {selectedFinance.status}</Typography>
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
            Edit finance
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
              label="Amount"
              value={editFormData.Amount || ''}
              onChange={handleEditInputChange('Amount')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Transaction Type"
              value={editFormData.transactionType || ''}
              onChange={handleEditInputChange('transactionType')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category"
              //type="number"
              value={editFormData.category || ''}
              onChange={handleEditInputChange('category')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="paymentMode"
              //type="number"
              value={editFormData.paymentMode || ''}
              onChange={handleEditInputChange('paymentMode')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Transaction Date"
              value={editFormData.transactionDate || ''}
              onChange={handleEditInputChange('transactionDate')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Status"
              value={editFormData.status || ''}
              onChange={handleEditInputChange('status')}
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
        <Typography id="delete-modal-title" variant="h6" component="h2" gutterBottom>
          Confirm Delete
        </Typography>
        <Typography id="delete-modal-description" sx={{ mb: 3 }}>
          Are you sure you want to delete this finance?
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
                <TableCell key={column.id} align={column.align} style={{fontWeight: 'bolder', fontSize: '14px' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Adjust row slice based on page and rowsPerPage
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.SI_no}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'transactionType' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Transaction Type</InputLabel>
                            <Select
                              value={row.transactionType}
                              onChange={(e) => handleDropdownChange('transactionType', e.target.value, row.SI_no)}
                              label="Transaction Type"
                            >
                              <MenuItem value="income">Income</MenuItem>
                              <MenuItem value="expense">Expense</MenuItem>
                            </Select>
                          </FormControl>
                        ) : column.id === 'category' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                              value={row.category}
                              onChange={(e) => handleDropdownChange('category', e.target.value, row.SI_no)}
                              label="Category"
                            >
                              <MenuItem value="salary">Salary</MenuItem>
                              <MenuItem value="payment rent">Payment Rent</MenuItem>
                              <MenuItem value="utilities">Utilities</MenuItem>
                            </Select>
                          </FormControl>
                        ) : column.id === 'paymentMode' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Payment Mode</InputLabel>
                            <Select
                              value={row.paymentMode}
                              onChange={(e) => handleDropdownChange('paymentMode', e.target.value, row.SI_no)}
                              label="Payment Mode"
                            >
                              <MenuItem value="cash">Cash</MenuItem>
                              <MenuItem value="bank transfer">Bank Transfer</MenuItem>
                              <MenuItem value="upi">UPI</MenuItem>
                              <MenuItem value="credit card">Credit Card</MenuItem>
                              <MenuItem value="debit card">Debit Card</MenuItem>
                            </Select>
                          </FormControl>
                        ) : column.id === 'status' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                              value={row.status}
                              onChange={(e) => handleDropdownChange('status', e.target.value, row.SI_no)}
                              label="Status"
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="cancelled">Cancelled</MenuItem>
                            </Select>
                          </FormControl>
                        ) : column.id === 'action' ? (
                          <div>
                            <IconButton onClick={() => handleView(row)} color="black">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton onClick={() => handleEdit(row)} color="black">
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row)} color="black">
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        ) : (
                          value
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
        rowsPerPageOptions={[10, 25, 50]} // Added more options for rows per page
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