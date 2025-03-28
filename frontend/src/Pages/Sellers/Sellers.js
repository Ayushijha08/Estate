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

const initialRows = [
  createData('1', 'Ayushi', 'ayushi@mail.com', 12233344, 'Sakshi', '101', '2222', 'active'),
  createData('2', 'John', 'john@mail.com', 98765432, 'Downtown', '102', '5000', 'inactive'),
  createData('3', 'Emma', 'emma@mail.com', 98765432, 'Uptown', '103', '4500', 'active'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState(initialRows);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                      ) : column.id === 'action' ? (
                        <div>
                          <IconButton color="black">
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton color="black">
                            <EditIcon />
                          </IconButton>
                          <IconButton color="black">
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
    </Paper>
  );
}
