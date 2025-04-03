import React from "react";
import Header from "../Component/Header/Header";

import Booking from "../Pages/Booking/Booking";
//import Property from "../Property/Property";
import Sidebar from "../Component/Sidebar/Sidebar";

const LayoutBooking=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <Booking />
            

            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutBooking;