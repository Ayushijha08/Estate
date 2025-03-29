import React from "react";
import Header from "../Component/Header/Header";
import Search from "../Search/Search";
import Agent from "../Pages/Agent/Agent";
//import Property from "../Property/Property";
import Sidebar from "../Component/Sidebar/Sidebar";

const LayoutAgent=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            <Search buttonText="Add Agent" />
            <Agent/>
            

            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutAgent;