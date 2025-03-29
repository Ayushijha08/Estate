import React from 'react';
import { InputAdornment, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const Search = ({ buttonText = "Add New" }) => {
  return (
    <div className="flex">
      <TextField
        className="search"
        label="Search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{
          marginBottom: '20px',
          width: '100px',
          display: 'flex',
          marginRight: '150px',
          justifyContent: 'flex-end',
          marginLeft: '800px',
        }}
      />

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{
          marginBottom: '20px',
          textWrap: 'wrap',
          marginLeft: '60px',
          padding: '10px',
          borderRadius: '5px',
          height: '50px',
          width: '140px',
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default Search;
