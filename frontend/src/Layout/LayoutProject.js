import React from "react";
import Header from "../Component/Header/Header";


import Project from "../Pages/Project/Project";
import Sidebar from "../Component/Sidebar/Sidebar";

const LayoutProject=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
        
        <Project/>
            

            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutProject;