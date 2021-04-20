import React from "react"
import Sidebar from "../components/sidebar";
// import SEO from "../components/SEO"

function Layout (props) {
    return (
      <div>
        <Sidebar/>
        {props.children}
      </div>
    )
  }
  
export default Layout