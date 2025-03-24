import React from "react";
import Header from "../Component/Header/Header";
import Search from "../Search/Search";
import Lease from "../Pages/Lease/Lease"
//import Property from "../Property/Property";
import Sidebar from "../Component/Sidebar/Sidebar";

const LayoutLease=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            <Search />
            <Lease/>
            

            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutLease;