column.id === 'transactionType' ? (
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
