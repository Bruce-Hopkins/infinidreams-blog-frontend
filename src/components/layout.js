import React from "react"
import Sidebar from "../components/Sidebar";
import SEO from "../components/SEO"

function Layout (props) {
    return (
      <div>
        <Sidebar/>
        <SEO/>
        {props.children}
      </div>
    )
  }
  
export default Layout