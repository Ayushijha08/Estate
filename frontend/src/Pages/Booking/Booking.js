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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const columns = [
  { id: 'SI_no', label: 'SI NO.', flex: 1,minWidth:50 },
  { id: 'name', label: 'Name', flex: 1, align: 'right', minWidth: 100 },
  { id: 'Email', label: 'E-mail', flex: 1, align: 'right', minWidth: 150 },
  { id: 'mobileNo', label: 'Mobile Number', flex: 1, align: 'right', minWidth: 180 },
  { id: 'address', label: 'Address', flex: 1, align: 'right', minWidth: 180 },
  { id: 'check_in_date', label: 'Check-in Date', flex: 1, align: 'right', minWidth: 150 },
  { id: 'check_out_date', label: 'Check-out Date', flex: 1, align: 'right', minWidth: 150 },
  { id: 'TotalAmountUnit', label: 'Total Amount Unit', flex: 1, align: 'right', minWidth: 180 },
  { id: 'paymentStatus', label: 'Payment Status', flex: 1, align: 'right', minWidth: 180 },
  { id: 'Bookingstatus', label: 'Booking Status', flex: 1, align: 'right', minWidth: 180 },
  { id: 'action', label: 'Action', flex: 1, align: 'center', minWidth: 200 },
];

function createData(SI_no, name, Email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus) {
  return { SI_no, name, Email, mobileNo, address, check_in_date, check_out_date, TotalAmountUnit, paymentStatus, Bookingstatus };
}

const rows = [
  createData('1', 'Ayushi', 'ayushi@mail.com', 12233344, 'sakshi', '10-02-25', '10-02-25', 1000000, 'pending', 'confirmed'),
  createData('2', 'John Doe', 'johndoe@mail.com', 12345678, 'New York', '11-02-25', '11-02-25', 2000000, 'paid', 'confirmed'),
  createData('3', 'Jane Smith', 'janesmith@mail.com', 87654321, 'California', '12-02-25', '12-02-25', 1500000, 'pending', 'confirmed'),
  createData('4', 'Mark', 'mark@mail.com', 11223344, 'Texas', '13-02-25', '13-02-25', 1800000, 'paid', 'cancelled'),
  createData('5', 'Sarah', 'sarah@mail.com', 99887766, 'Florida', '14-02-25', '14-02-25', 1100000, 'pending', 'confirmed'),
  createData('6', 'Alex', 'alex@mail.com', 66554433, 'Chicago', '15-02-25', '15-02-25', 2500000, 'paid', 'confirmed'),
  createData('7', 'Emma', 'emma@mail.com', 44556677, 'Las Vegas', '16-02-25', '16-02-25', 3000000, 'pending', 'confirmed'),
  createData('8', 'Michael', 'michael@mail.com', 33445566, 'Miami', '17-02-25', '17-02-25', 2200000, 'paid', 'confirmed'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [bookingStatus, setBookingStatus] = React.useState(rows.map(row => row.Bookingstatus));
  const [paymentStatus, setPaymentStatus] = React.useState(rows.map(row => row.paymentStatus));

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

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ fontSize: '12px', marginLeft: '20px', marginTop: '0px', marginRight: '20px' }}>
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
    </Paper>
  );
}