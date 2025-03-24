import React from "react";
import Header from "../Component/Header/Header";
import Search from "../Search/Search";

import Finance from "../Pages/Finance/Finance";
import Sidebar from "../Component/Sidebar/Sidebar";

const LayoutFinance=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            <Search />
            <Finance />
            

            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutFinance;