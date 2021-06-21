import React from "react"
import Sidebar from "./navbar/sidebar";
import MobileNavbar from './navbar/mobileNavbar'
// import SEO from "../components/SEO"

function Layout (props) {
    return (
      <div>
        <Sidebar/>
        <MobileNavbar/>
        {props.children}
      </div>
    )
  }
  
export default Layout