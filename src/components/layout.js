import React from "react"
import Sidebar from "../components/navbar";
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