import React from "react"
import Sidebar from "./navbar/sidebar";
// import MobileNavbar from "../components/navbar/mobileNavbar"
// import SEO from "../components/SEO"

function Layout (props) {
    return (
      <div>
        {/* <MobileNavbar/>
        <Sidebar/> */}
        {props.children}
      </div>
    )
  }
  
export default Layout