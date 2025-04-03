import React from "react";
import Header from "../Component/Header/Header";
//import Search from "../Search/Search";

import Sidebar from "../Component/Sidebar/Sidebar";
import Buyers from "../Pages/Buyers/Buyers";


const LayoutBuyers=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
          
            <Buyers/>
            

            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutBuyers;