import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Sending login request with:', { Email: email, Password: password });
      const response = await axios.post("http://localhost:3001/user/login", {
        Email: email,
        Password: password
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        console.log('Login successful, token:', response.data.token);
        login(response.data.token, {
          id: response.data.userId,
          email: email
        });
        toast.success("Login successful!");
      } else {
        console.log('Login failed:', response.data.message);
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
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
        onSubmit={handleSubmit}
      >
        <Box className="header_title">Login</Box>

        <Box className="signIn">
          <TextField
            type="email"
            required
            id="email"
            variant="standard"
            label="Enter Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            type="password"
            required
            variant="standard"
            id="password"
            label="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button 
            type="submit"
            className="primary_button" 
            sx={{ width: "400px" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;