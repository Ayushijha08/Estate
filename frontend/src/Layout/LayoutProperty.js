import React from "react";
import Header from "../Component/Header/Header";
import Search from "../Search/Search";

import Property from "../Pages/Property/Property";
import Sidebar from "../Component/Sidebar/Sidebar";

const LayoutProperty=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            <Search />
        <Property/>
            

            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutProperty;