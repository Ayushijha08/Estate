import React from "react";
import Header from "../Component/Header/Header";

import Sellers from "../Pages/Sellers/Sellers"
//import Finance from "../Pages/Finance/Finance";
import Sidebar from "../Component/Sidebar/Sidebar";

const LayoutSellers=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            
            <Sellers />
            

            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutSellers;