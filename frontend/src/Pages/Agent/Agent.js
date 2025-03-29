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
import { Select, MenuItem, FormControl,InputLabel } from '@mui/material';
import { Modal, Box, Typography, Grid, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const columns = [
  { id: 'SI_no', label: 'SI NO.', minWidth: 100 },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'email', label: 'E-mail', align: 'right' },
  { id: 'mobileNo', label: 'Mobile Number', flex: 1, align: 'right', minWidth: 180 },
  { id: 'address', label: 'Address', flex: 1, align: 'right', minWidth: 180 },
  { id: 'lisenceNo', label: 'Lisence No', flex: 1, align: 'right' },
  { id: 'experience', label: 'Experience', flex: 1, align: 'right', format: (value) => value.toFixed(2) },
  { id: 'commissionRate', label: 'Commission Rate', flex: 1, align: 'right' },
  { id: 'status', label: 'Status', flex: 1, align: 'right' },
  { id: 'action', label: 'Action', flex: 1, align: 'left', minWidth: 250 }, // Increased width for action column
];

function createData(SI_no, name, email, mobileNo, address, lisenceNo, experience, commissionRate, status) {
  return { SI_no, name, email, mobileNo, address, lisenceNo, experience, commissionRate, status };
}

const rows = [
  createData('1', 'Amit', 'Amit@gmail.com', 123445, 'Ranchi', 100, 2, 10000, 'Active'),
  createData('2', 'John', 'John@gmail.com', 123446, 'Bangalore', 100001, 3, 110000, 'Inactive'),
  createData('3', 'Jane', 'Jane@gmail.com', 123447, 'Delhi', 100002, 4, 120000, 'Active'),
  createData('4', 'Doe', 'Doe@gmail.com', 123448, 'Kolkata', 100003, 5, 130000, 'Inactive'),
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
  const [selectedAgent, setSelectedAgent] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (agent) => {
    setSelectedAgent(agent);
    setViewModalOpen(true);
  };

  const handleEdit = (agent) => {
    setSelectedAgent(agent);
    setEditFormData(agent);
    setEditModalOpen(true);
  };

  const handleDelete = (agent) => {
    setSelectedAgent(agent);
    setDeleteModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedAgent(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedAgent(null);
    setEditFormData({});
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedAgent(null);
  };

  const handleEditInputChange = (field) => (event) => {
    setEditFormData({
      ...editFormData,
      [field]: event.target.value
    });
  };

  const handleUpdate = () => {
    console.log('Updating agent:', editFormData);
    // Here you would typically make an API call to update the agent
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    console.log('Deleting agent:', selectedAgent);
    // Here you would typically make an API call to delete the agent
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
            agent Details
          </Typography>
          <IconButton onClick={handleCloseViewModal} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        {selectedAgent && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Name:</strong> {selectedAgent.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>E-mail:</strong> {selectedAgent.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><strong>mobile No:</strong> {selectedAgent.mobileNo}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Address:</strong> ₹{selectedAgent.address}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>lisence No:</strong> {selectedAgent.lisenceNo} </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Experience:</strong> {selectedAgent.experience}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Commission Rate:</strong> {selectedAgent.commissionRate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Status:</strong> {selectedAgent.status}</Typography>
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
            Edit agent
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
              label="Lisence No"
              //type="number"
              value={editFormData.lisenceNo || ''}
              onChange={handleEditInputChange('lisenceNo')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Experience "
              value={editFormData.experience || ''}
              onChange={handleEditInputChange('experience')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label=" Commission Rate"
              value={editFormData.commissionRate || ''}
              onChange={handleEditInputChange('commissionRate')}
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
        <Typography id="delete-modal-description" sx={{ mb: 3 }}>
          Are you sure you want to delete this agent?
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
                  style={{  fontWeight: 'bolder', fontSize: '14px' }}
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
                        {column.id === 'status' ? (
                          <FormControl variant="outlined" sx={{ minWidth: 90 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                              value={row.status}
                              onChange={(e) => handleDropdownChange('status', e.target.value, row.SI_no)}
                              label="Status"
                            >
                              <MenuItem value="active">Active</MenuItem>
                              <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                          </FormControl>
                        ) : column.id === 'action' ? (
                          <div>
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