import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Box, Button, TextField } from "@mui/material";
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [addFormData, setAddFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/User/login', addFormData);
      if (response.data.success) {
        toast.success('Login successfully!');
        setAddFormData({
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.error('Error Logging in:', error);
      toast.error(error.response?.data?.message || 'Failed to Login');
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        className="register"
      >
        <Box className="header_title">Login</Box>

        <Box className="signUp">
          <TextField
            type="email"
            required
            id="email"
            variant="standard"
            label="Enter Email Id"
            value={addFormData.email}
            onChange={(e) => setAddFormData({ ...addFormData, email: e.target.value })}
          />

          <TextField
            type="password"
            required
            variant="standard"
            id="password"
            label="Enter Password"
            value={addFormData.password}
            onChange={(e) => setAddFormData({ ...addFormData, password: e.target.value })}
          />

          <Button className="primary_button" onClick={handleLogin}>
            Log In
          </Button>

         
          <Box className="account">
  <Link to="/sign-up" style={{ textDecoration: 'none', color: '#1976d2' }}>
  Don't have an account? Sign up
  </Link>
</Box>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
