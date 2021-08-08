import React, {useEffect, useState} from "react"

import navbarConnect from "./backend-API/navbarConnect"
import Sidebar from "./navbar/sidebar";
import MobileNavbar from './navbar/mobileNavbar'
import SidebarContext from "./context/SidebarContext"
// import SEO from "../components/SEO"

function Layout (props) {
  // Connects to the sidebar inserts it into the sidebar context
  var[postsData, setPostsData] = useState()

  useEffect(() => {
    // Connects to the API and inserts into the react hooks 
    (async function connectToAPI (){
    const connect = await navbarConnect();
    setPostsData(connect.postData)
    })()    
}, [])
    return (
      <main className={props.className}>
        <SidebarContext.Provider  value={postsData ? postsData : null}>
          <Sidebar/>
          <MobileNavbar/>
        </SidebarContext.Provider>
        
          {props.children}
      </main>
    )
  }
  
export default Layout