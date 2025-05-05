import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import Forgot from "./Auth/Forgot";

import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutProperty from "./Layout/LayoutProperty";
import LayoutBooking from "./Layout/LayoutBooking";
import LayoutAgent from "./Layout/LayoutAgent";
import LayoutBuyers from "./Layout/LayoutBuyers";
import LayoutLease from "./Layout/LayoutLease";
import LayoutFinance from "./Layout/LayoutFinance";
import LayoutSellers from "./Layout/LayoutSellers";
import LayoutProject from "./Layout/LayoutProject";
import LayoutSiteVisits from "./Layout/LayoutSiteVisits";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Auth/AuthContext";
import ProtectedRoute from "./Auth/ProtectedRoute";
import PublicRoute from "./Auth/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/SignIn" 
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <LayoutDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Property"
            element={
              <ProtectedRoute>
                <LayoutProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Booking"
            element={
              <ProtectedRoute>
                <LayoutBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Agent"
            element={
              <ProtectedRoute>
                <LayoutAgent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buyers"
            element={
              <ProtectedRoute>
                <LayoutBuyers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lease"
            element={
              <ProtectedRoute>
                <LayoutLease />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finance"
            element={
              <ProtectedRoute>
                <LayoutFinance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sellers"
            element={
              <ProtectedRoute>
                <LayoutSellers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project"
            element={
              <ProtectedRoute>
                <LayoutProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/SiteVisits"
            element={
              <ProtectedRoute>
                <LayoutSiteVisits />
              </ProtectedRoute>
            }
          />
          {/* Redirect root to dashboard */}
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
