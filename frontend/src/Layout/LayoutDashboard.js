import React from "react";
import Sidebar from "../Component/Sidebar/Sidebar";

import Header from "../Component/Header/Header";

import Dashboard from "../Pages/Dashboard/Dashboard";
//import Dashboard from "..Pages/Dashboard/Dashboard";

const LayoutDashboard=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            <Dashboard/>
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutDashboard;