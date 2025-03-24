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
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

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

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(rows); // Use this state to store and update rows data

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page when rows per page changes
  };

  const handleDelete = (id) => {
    console.log('Delete item with ID:', id);
    // You can perform your delete logic here
  };

  const handleEdit = (id) => {
    console.log('Edit item with ID:', id);
    // You can open a modal or perform your edit logic here
  };

  const handleView = (id) => {
    console.log('View item with ID:', id);
    // You can show more details of the item here
  };

  const handleDropdownChange = (columnId, value, SI_no) => {
    const updatedRows = data.map((row) =>
      row.SI_no === SI_no ? { ...row, [columnId]: value } : row
    );
    setData(updatedRows); // Update the state with the new value for the respective column
  };

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
                            <IconButton onClick={() => handleView(row.SI_no)} color="black">
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton onClick={() => handleEdit(row.SI_no)} color="black">
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.SI_no)} color="black">
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
    </Paper>
  );
}