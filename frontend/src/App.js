import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import Forgot from "./Auth/Forgot";
import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutProperty from "./Layout/LayoutProperty";
import LayoutBooking from "./Layout/LayoutBooking";
import LayoutAgent from "./Layout/LayoutAgent";
import LayoutBuyers from "./Layout/LayoutBuyers";
import LayoutLease from "./Layout/LayoutLease";
import LayoutFinance from "./Layout/LayoutFinance";
import LayoutSellers from "./Layout/LayoutSellers";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/" element={<LayoutDashboard/>}/>
        <Route path="/Property" element={<LayoutProperty/>}/>
        <Route path="/Booking" element={<LayoutBooking/>}/>
        <Route path="/Agent" element={<LayoutAgent/>}/>
        <Route path="/buyers" element={<LayoutBuyers/>}/>
        <Route path="/lease" element={<LayoutLease/>}/>
        <Route path="/finance" element={<LayoutFinance/>}/>
        <Route path="/sellers" element={<LayoutSellers/>}/>




        <Route path="/forgot-password" element={<Forgot />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;