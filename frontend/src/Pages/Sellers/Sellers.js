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
  { id: 'SI_no', label: 'SI NO.', flex: 1, minWidth: 50 },
  { id: 'name', label: 'Name', flex: 1, align: 'right', minWidth: 100 },
  { id: 'Email', label: 'E-mail', flex: 1, align: 'right', minWidth: 150 },
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

function createData(SI_no, name, Email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus) {
  return { SI_no, name, Email, mobileNo, address, LeaseStartDate, LeaseEndDate, MonthlyRent, SecurityDeposit, paymentStatus, LeaseStatus };
}

const rows = [
  createData('1', 'Ayushi', 'ayushi@mail.com', 12233344, 'sakshi', '10-02-25', '10-02-25', 1000000, 100000, 'pending', 'active'),
  createData('2', 'John', 'john@mail.com', 12233345, 'Delhi', '11-02-25', '11-02-25', 1200000, 200000, 'paid', 'terminated'),
  createData('3', 'Peter', 'peter@mail.com', 12233346, 'Mumbai', '12-02-25', '12-02-25', 1300000, 250000, 'overdue', 'expired'),
  createData('4', 'Jane', 'jane@mail.com', 12233347, 'Bangalore', '13-02-25', '13-02-25', 1400000, 300000, 'pending', 'active'),
  createData('5', 'David', 'david@mail.com', 12233348, 'Chennai', '14-02-25', '14-02-25', 1500000, 350000, 'paid', 'terminated'),
  createData('6', 'Sita', 'sita@mail.com', 12233349, 'Kolkata', '15-02-25', '15-02-25', 1600000, 400000, 'overdue', 'expired'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(rows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
    setData(updatedRows);
  };

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
    </Paper>
  );
}