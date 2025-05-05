import React from "react";
import Header from "../Component/Header/Header";

import Property from "../Pages/Property/Property";
import Sidebar from "../Component/Sidebar/Sidebar";

const LayoutProperty = () => {
  return (
    <>
      <div className="layout">
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Header className="header" />
            <div className="pages">
              <Property />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutProperty;
