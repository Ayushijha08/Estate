
import { useEffect, useState } from "react";
import {  InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
  FormControl,
  InputLabel,
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
const FinanceTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Luxury",
      Amount: "Apartment",
      transactionType:"121324",
      category: "Ranchi",
      paymentMode:"423",
      transactionDate:"5",
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
  const [selectedFinance, setSelectedFinance] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [finances, setFinance] = useState([]);
  const [searchTerm,setSearchTerm]= useState("");
    const [apiFinances,setApiFinances]=useState([]);
  

  const getAllfinances = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/finance/getAllfinances`      );
      console.log("response", res.data);
      setFinance(res.data);
      setApiFinances(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllfinances();
  }, []);
  const handleView = (finances) => {
    setSelectedFinance(finances);
    setViewModalOpen(true);
  };

  const handleEdit = (finances) => {
    setSelectedFinance(finances);
    setEditFormData(finances);
    setEditModalOpen(true);
  };

  const handleDelete = (finances) => {
    setSelectedFinance(finances);
    setDeleteModalOpen(true);
  };
  const handleTransactionTypeChange = (id, value) => {
    const updatedFinances = finances.map((finance) =>
      finance._id === id ? { ...finance, transactionType: value } : finance
    );
    setFinance(updatedFinances);
  
     };
     const handlePaymentModeChange = (id, value) => {
      const updatedFinances = finances.map((finance) =>
        finance._id === id ? { ...finance, paymentMode: value } : finance
      );
      setFinance(updatedFinances);
    
     
    };
    const handleStatusChange = (id, value) => {
      const updatedFinances = finances.map((finance) =>
        finance._id === id ? { ...finance, status: value } : finance
      );
      setFinance(updatedFinances);
    
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
        setFinance(apiFinances); // Reset to full list when search is empty
        return;
    }

    const filtered = apiFinances.filter((finances) => {
      return (
        finances.name.toLowerCase().includes(value) ||   // propertyTitle = gfdgf.includes(gfdgf)
        finances.Amount.toLowerCase().includes(value) ||
        finances.category.toLowerCase().includes(value) ||
        finances.transactionDate.toString().toLowerCase().includes(value)
      );
    });

    setFinance(filtered);
};


  const handleUpdate = () => {
    console.log("Updating finances:", editFormData);
    // Here you would typically make an API call to update the finances
    handleCloseEditModal();
  };

  const handleConfirmDelete = () => {
    console.log("Deleting finances:", selectedFinance);
    // Here you would typically make an API call to delete the finances
    handleCloseDeleteModal();
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
   // color="primary" 
 //onClick={handleAddNew}
 style={{ marginBottom: '20px',textWrap:'wrap',marginLeft:'40px' ,padding:'10px',borderRadius:'5px',height:'55px',width:'130px'}}

  >
    Add finance
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
              ID
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            Amount
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            transactionType
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            category
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
            paymentMode
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} className="border p-2">
              {" "}
              transactionDate
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
          { finances.length>0 && 
finances.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((finances, index) => (
  <TableRow
              key={finances._id}
              className="text-center"
              sx={{ fontWeight: "bold" }}
            >
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {finances._id}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >          
                {finances.name}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {finances.Amount}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                <Select
    value={finances.transactionType}
    variant="standard"
    onChange={(e) => handleTransactionTypeChange(finances._id, "transactionType")(e)}
    className="border p-1 rounded"
  >
    <MenuItem value="Credit">Credit</MenuItem>
    <MenuItem value="Debit">Debit</MenuItem>
  </Select>
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {finances.category}
              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
  <Select
    value={finances.paymentMode}
    variant="standard"
    onChange={(e) => handlePaymentModeChange(finances._id, "paymentMode")(e)}
    className="border p-1 rounded"
  >
    <MenuItem value="Cash">Cash</MenuItem>
    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
    <MenuItem value="Credit Card">Credit Card</MenuItem>
    <MenuItem value="Debit Card">Debit Card</MenuItem>
    <MenuItem value="Online">Online</MenuItem>
  </Select>              </TableCell>
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
                {finances.transactionDate}
              </TableCell>
             
              <TableCell
                sx={{ padding: "4px", fontSize: "12px", textAlign: "center" }}
                className="border p-2"
              >
  <Select
    value={finances.status}
    variant="standard"
    onChange={(e) => handleStatusChange(finances._id, "status")(e)}
    className="border p-1 rounded"
  >
    <MenuItem value="Pending">Pending</MenuItem>
    <MenuItem value="Completed">Completed</MenuItem>
    <MenuItem value="Failed">Failed</MenuItem>
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
                    onClick={() => handleView(finances)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    sx={{ color: "green" }}
                    onClick={() => handleEdit(finances)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDelete(finances)}
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
            <Typography variant="h6">finances Details</Typography>
            <IconButton onClick={handleCloseViewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedFinance && (
            <Grid container spacing={2} mt={2}>
              {Object.entries(selectedFinance).map(([key, value]) => (
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
            <Typography variant="h6">Edit finances</Typography>
            <IconButton onClick={handleCloseEditModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2} mt={2}>
  {Object.keys(editFormData).map((field) => (
    <Grid item xs={6} key={field}>
      {field === "transactionType" ? (
        <FormControl fullWidth>
          <InputLabel>Transaction Type</InputLabel>
          <Select
            value={editFormData[field] || ""}
            onChange={handleEditInputChange(field)}
            variant="standard"
          >
            <MenuItem value="Credit">Credit</MenuItem>
            <MenuItem value="Debit">Debit</MenuItem>
          </Select>
        </FormControl>
      ) : field === "paymentMode" ? (
        <FormControl fullWidth>
          <InputLabel>Payment Mode</InputLabel>
          <Select
            value={editFormData[field] || ""}
            onChange={handleEditInputChange(field)}
            variant="standard"
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Debit Card">Debit Card</MenuItem>
            <MenuItem value="Online">Online</MenuItem>
          </Select>
        </FormControl>
      ) : field === "status" ? (
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={editFormData[field] || ""}
            onChange={handleEditInputChange(field)}
            variant="standard"
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
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
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography my={2}>
            Are you sure you want to delete this finances?
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
      count={finances.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </>
  );
};

export default FinanceTable;