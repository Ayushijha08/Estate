import React from "react";
import Header from "../Component/Header/Header";


import SiteVisits from "../Pages/SiteVisits/SiteVisits";
import Sidebar from "../Component/Sidebar/Sidebar";

const LayoutSiteVisits=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
        
        <SiteVisits/>
            

            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutSiteVisits;