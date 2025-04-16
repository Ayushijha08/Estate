import { useState } from "react";import axios from "axios";
import { toast } from "react-toastify";
import { Box, Button, TextField } from "@mui/material";
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [addFormData, setAddFormData] = useState({
    name:'',
    email: '',
    password: '',
  });
  
  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/User/createUser', addFormData);
      if (response.data.success) {
        toast.success('User created  successfully!');
        setAddFormData({
          name:'',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.error('Error Logging in:', error);
      toast.error(error.response?.data?.message || 'Failed to create user');
    }
  };
  
  return (
    <>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        className="register"
      >
        <Box className="header_title">Sign Up</Box>

        <Box className="signUp">
        <TextField
  id="name"
  required
  variant="standard"
  label="Enter Name"
  value={addFormData.name}
  onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
/>

<TextField
  id="email"
  type="email"
  required
  variant="standard"
  label="Enter Email Id"
  value={addFormData.email}
  onChange={(e) => setAddFormData({ ...addFormData, email: e.target.value })}
/>

<TextField
  id="password"
  type="password"
  required
  variant="standard"
  label="Enter Password"
  value={addFormData.password}
  onChange={(e) => setAddFormData({ ...addFormData, password: e.target.value })}
/>

         

          <Button
            className="primary_button"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>

          <Box className="account">
  <Link to="/sign-in" style={{ textDecoration: 'none', color: '#1976d2' }}>
    Already have an account? Log in
  </Link>
</Box>

        </Box>
      </Box>
    </>
  );
};

export default SignUp;
