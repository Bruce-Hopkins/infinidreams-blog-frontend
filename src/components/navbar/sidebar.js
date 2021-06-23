import React from 'react'
import "../../stylesheets/navbar/sidebar.css"

import Logo from "../../images/InFINIDREAMS.png"
import SidebarContext from '../context/SidebarContext'

// Main function. Is imported by layout.js
function Sidebar (){

  // Uses the sidebar context (defined in layout.js) to use backend API data
  function GetRecentPosts() {
    const context = React.useContext(SidebarContext)
    if (context) {
      if (context.data.length > 0) {
        return context.data.map (selectedLink => {
          return <div> <a href={"/blog/"+selectedLink._id}> {selectedLink.title} </a> </div>
        })
      }
    }
    return <div/>
  }

    return (
      <section className="left-section">
        <a href="http://www.infinidream.net/"> <img alt="Logo" className="logo" src={Logo}/> </a>
        <nav className="nav-container">
          <div className="nav-group">
            <div className="top-sidebar">
              <div className="pages-section"> 
                <h2>Pages</h2>
                <a href="/"> <h3>Home</h3> </a>
                <a href="http://www.infinidream.net/"> <h3> About Me</h3> </a>
              </div>
            </div> 
            <div className="middle-sidebar">
              <div className="recent-post-section">
                <h2>Recent</h2>
                <GetRecentPosts/>
              </div>
            </div>
          </div>
        </nav>
      </section>
    )
  }
  
export default Sidebar