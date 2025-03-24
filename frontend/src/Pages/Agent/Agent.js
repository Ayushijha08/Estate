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
  { id: 'SI_no', label: 'SI NO.', minWidth: 100 },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'Email', label: 'E-mail', align: 'right' },
  { id: 'mobileNo', label: 'Mobile Number', flex: 1, align: 'right', minWidth: 180 },
  { id: 'address', label: 'Address', flex: 1, align: 'right', minWidth: 180 },
  { id: 'lisenceNo', label: 'Lisence No', flex: 1, align: 'right' },
  { id: 'experience', label: 'Experience', flex: 1, align: 'right', format: (value) => value.toFixed(2) },
  { id: 'commissionRate', label: 'Commission Rate', flex: 1, align: 'right' },
  { id: 'status', label: 'Status', flex: 1, align: 'right' },
  { id: 'action', label: 'Action', flex: 1, align: 'left', minWidth: 250 }, // Increased width for action column
];

function createData(SI_no, name, Email, mobileNo, address, lisenceNo, experience, commissionRate, status) {
  return { SI_no, name, Email, mobileNo, address, lisenceNo, experience, commissionRate, status };
}

const rows = [
  createData('1', 'Amit', 'Amit@gmail.com', 123445, 'Ranchi', 100, 2, 10000, 'Active'),
  createData('2', 'John', 'John@gmail.com', 123446, 'Bangalore', 100001, 3, 110000, 'Inactive'),
  createData('3', 'Jane', 'Jane@gmail.com', 123447, 'Delhi', 100002, 4, 120000, 'Active'),
  createData('4', 'Doe', 'Doe@gmail.com', 123448, 'Kolkata', 100003, 5, 130000, 'Inactive'),
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
    // Perform delete logic here
  };

  const handleEdit = (id) => {
    console.log('Edit item with ID:', id);
    // Perform edit logic here
  };

  const handleView = (id) => {
    console.log('View item with ID:', id);
    // Perform view logic here
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