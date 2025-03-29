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
import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Modal, Box, Typography, Grid, TextField,MenuItem,Select,InputLabel,FormControl, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
  { id: 'SI_no', label: 'SI NO.', flex: 1 },
  { id: 'propertyTitle', label: 'Property Title', flex: 1, align: 'right' },
  { id: 'propertyType', label: 'Property Type', flex: 1, align: 'right' },
  { id: 'address', label: 'Address', flex: 1, align: 'right' },
  { id: 'price', label: 'Price', flex: 1, align: 'right', format: (value) => value.toFixed(2) },
  { id: 'areaSqft', label: 'Area sqft', flex: 1, align: 'right', format: (value) => value.toFixed(2) },
  { id: 'furnishing', label: 'Furnishing', flex: 1, align: 'right' },
  { id: 'status', label: 'Status', flex: 1, align: 'right' },
  { id: 'action', label: 'Action', flex: 1, align: 'center' },
];

function createData(SI_no, propertyTitle, propertyType, address, price, areaSqft, furnishing, status) {
  return { SI_no, propertyTitle, propertyType, address, price, areaSqft, furnishing, status };
  
}

const rows = [
  createData('1', 'Luxury', 'Apartment', 'Ranchi', 100000, 100, 'furnished', 'sold'),
  createData('2', 'luxury', 'Apartment', 'Kolkata', 100000, 100, 'furnished', 'sold'),
  createData('3','luxury', 'Apartment','MP',100000,100,'furnished','sold'),
  createData('4','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold'),
  createData('5','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold'),
  createData('6','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold' ),
  createData('7','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold' ),
  createData('8','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold' ),
  createData('9','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold' ),
  createData('10','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold'),
  createData('11','Luxury', 'Apartment','Ranchi',100000,100,'furnished','sold' ),
];

console.log("rows", rows);

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
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedProperty(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedProperty(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedProperty(null);
  };

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value
    });
  };

  const handleUpdate = () => {
    console.log('Updating property:', editFormData);
    // Here you would typically make an API call to update the property
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    console.log('Deleting property:', selectedProperty);
    // Here you would typically make an API call to delete the property
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
            Property Details
          </Typography>
          <IconButton onClick={handleCloseViewModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        {selectedProperty && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Property Title:</strong> {selectedProperty.propertyTitle}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Property Type:</strong> {selectedProperty.propertyType}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><strong>Address:</strong> {selectedProperty.address}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Price:</strong> {selectedProperty.price.toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Area:</strong> {selectedProperty.areaSqft} sqft</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Furnishing:</strong> {selectedProperty.furnishing}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Status:</strong> {selectedProperty.status}</Typography>
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
            Edit Property
          </Typography>
          <IconButton onClick={handleCloseEditModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Property Title"
              value={editFormData.propertyTitle || ''}
              onChange={handleEditInputChange('propertyTitle')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Property Type"
              value={editFormData.propertyType || ''}
              onChange={handleEditInputChange('propertyType')}
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
              label="Price"
              type="number"
              value={editFormData.price || ''}
              onChange={handleEditInputChange('price')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Area (sqft)"
              type="number"
              value={editFormData.areaSqft || ''}
              onChange={handleEditInputChange('areaSqft')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Furnishing"
              value={editFormData.furnishing || ''}
              onChange={handleEditInputChange('furnishing')}
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
        <Typography id="delete-modal-title"  
        className='confirm_delete'
        variant="h6" component="h2" gutterBottom>
          Confirm Delete
        </Typography>
        <Typography id="delete-modal-description" sx={{ mb: 3,fontSize:'15px' }}>
          Are you sure you want to delete this property?
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
                  style={{ fontWeight: 'bolder', fontSize: '14px' }}
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.SI_no}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'action' ? (
                          <div>
                            <IconButton
                            className='view'
                            onClick={() => handleView(row)} color="blue">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                            className='edit'
                            onClick={() => handleEdit(row)} color="green">
                              <EditIcon />
                            </IconButton>
                            <IconButton 
                            className='delete'
                            onClick={() => handleDelete(row)} color="red">
                              <Delete />
                            </IconButton>
                          </div>
                        )
                        : column.id === 'propertyTitle' ? (
                                                  <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                              <InputLabel>Select</InputLabel>
                              <Select
                                value={row.propertyTitle}
                                onChange={(e) => handleDropdownChange('propertyTitle', e.target.value, row.SI_no)}
                                label="propertyTitle"
                              >
                                <MenuItem value="luxury">luxury</MenuItem>
                                <MenuItem value=" 3bhk">3bhk</MenuItem>
                                <MenuItem value="Apartment">Apartment</MenuItem>
                              </Select>
                            </FormControl>
                          )  
                        : column.id === 'propertyType' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Select</InputLabel>
                            <Select
                              value={row.propertyType}
                              onChange={(e) => handleDropdownChange('propertyType', e.target.value, row.SI_no)}
                              label="Property Type"
                            >
                            <MenuItem value="Apartment">Apartment</MenuItem>
                            <MenuItem value="House"> House</MenuItem>
                          <MenuItem value="commercial">commercial</MenuItem>
                        <MenuItem value="land">land</MenuItem>
                           <MenuItem value="office">office</MenuItem>
                              <MenuItem value="villa">villa</MenuItem>


                            </Select>
                          </FormControl>
                        )
                        : column.id === 'furnishing' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>furnishing</InputLabel>
                            <Select
                              value={row.furnishing}
                              onChange={(e) => handleDropdownChange('furnishing', e.target.value, row.SI_no)}
                              label="furnishing"
                            >
                              <MenuItem value="furnished">furnished</MenuItem>
                              <MenuItem value="Semi-furnished">Semi-furnished</MenuItem>
                              <MenuItem value="Unfurnished">Unfurnished</MenuItem>


                            </Select>
                          </FormControl>
                        )
                         : column.id === 'status' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>status</InputLabel>
                            <Select
                              value={row.status}
                              onChange={(e) => handleDropdownChange('status', e.target.value, row.SI_no)}
                              label="status"
                            >
                              <MenuItem value="Available">Available</MenuItem>
                              <MenuItem value="sold"> sold</MenuItem>
                              <MenuItem value="rented">rented</MenuItem>
                              <MenuItem value="Pending">Pending</MenuItem>

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