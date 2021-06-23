import React, { useState } from 'react'

import "../../stylesheets/navbar/mobileMenu.css"
import Logo from "../../images/InFINIDREAMS.png"
import SidebarContext from '../context/SidebarContext'

function MobileNavbar (){

  var [openMenu, setOpenMenu] = useState(false)
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


  // If the menu is closed, open it. And vice versa.
  function showMenu () {
    if (openMenu) setOpenMenu(false)
    else setOpenMenu(true)
  }

  return (
      
      <section className="mobile-menu-container">
          <div className="mobile-menu-group">
              <a className="mobile-logo-container"href="http://www.infinidream.net/"> <img alt="Logo" className="logo" src={Logo}/> </a>
              <button onClick={showMenu}>
                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2.41666V4.83332H29V2.41666H0ZM0 13.2917V15.7083H29V13.2917H0ZM0 24.1667V26.5833H29V24.1667H0Z" fill="black"/>
                </svg>
              </button>
          </div>
          <div className={openMenu ? "show mobile-side-menu" : "hide mobile-side-menu" }>

          </div>
      </section>
  )
}

export default MobileNavbar