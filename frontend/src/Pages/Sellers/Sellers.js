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
import MenuItem from '@mui/material/MenuItem';
import { Modal, Box, Typography, Grid, TextField,Select, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const columns = [
  { id: 'SI_no', label: 'SI NO.', minWidth: 50 },
  { id: 'name', label: 'Name', align: 'right', minWidth: 100 },
  { id: 'email', label: 'E-mail', align: 'right', minWidth: 150 },
  { id: 'mobileNo', label: 'Mobile Number', align: 'right', minWidth: 180 },
  { id: 'address', label: 'Address', align: 'right', minWidth: 180 },
  { id: 'PropertyId', label: 'Property ID', align: 'right' },
  { id: 'ListedPrice', label: 'Listed Price', align: 'right' },
  { id: 'Status', label: 'Status', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' },
];

function createData(SI_no, name, email, mobileNo, address, PropertyId, ListedPrice, Status) {
  return { SI_no, name, email, mobileNo, address, PropertyId, ListedPrice, Status };
}

const rows = [
  createData('1', 'Ayushi', 'ayushi@mail.com', 12233344, 'Sakshi', '101', '2222', 'active'),
  createData('2', 'John', 'john@mail.com', 98765432, 'Downtown', '102', '5000', 'inactive'),
  createData('3', 'Emma', 'emma@mail.com', 98765432, 'Uptown', '103', '4500', 'active'),
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
    const [Rows, setRows] = React.useState({});

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [selectedSellers, setSelectedSellers] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({});


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedSellers(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedSellers(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedSellers(null);
  };

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value
    });
  };

  const handleUpdate = () => {
    console.log('Updating sellers:', editFormData);
    // Here you would typically make an API call to update the sellers
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    console.log('Deleting sellers:', selectedSellers);
    // Here you would typically make an API call to delete the sellers
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
            sellers Details
          </Typography>
          <IconButton onClick={handleCloseViewModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        {selectedSellers && (
          <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1"><strong>Name:</strong> {selectedSellers.name}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Typography variant="subtitle1"><strong>E-mail:</strong> {selectedSellers.email}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography variant="subtitle1"><strong>mobile No:</strong> {selectedSellers.mobileNo}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Typography variant="subtitle1"><strong>Address:</strong> ₹{selectedSellers.address}</Typography>
                                </Grid>
                         <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Property Id:</strong> {selectedSellers.PropertyId} </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Listed Price:</strong> {selectedSellers.ListedPrice}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Status:</strong> {selectedSellers.Status}</Typography>
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
            Edit sellers
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Property Id"
              //type="number"
              value={editFormData.PropertyId || ''}
              onChange={handleEditInputChange('PropertyId')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Listed Price"
              //type="number"
              value={editFormData.ListedPrice || ''}
              onChange={handleEditInputChange('ListedPrice')}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Status"
              value={editFormData.Status || ''}
              onChange={handleEditInputChange('Status')}
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
          Are you sure you want to delete this sellers?
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


  const handleStatusChange = (event, siNo) => {
    setRows(rows.map(row => row.SI_no === siNo ? { ...row, Status: event.target.value } : row));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, fontSize: '12px', marginLeft: '20px', marginTop: '0px', marginRight: '20px' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ fontWeight: 'bolder', fontSize: '14px' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.SI_no}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'Status' ? (
                        <Select
                          value={value}
                          onChange={(event) => handleStatusChange(event, row.SI_no)}
                          size="small"
                        >
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                      )  : column.id === 'action' ? (
                        <div  style={{display:'flex'}}>
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
