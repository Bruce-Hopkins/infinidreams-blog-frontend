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
        return context.data.reverse().map (selectedLink => {
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
    <div>

      <nav className="mobile-menu-container">
        <div className="mobile-menu-group">
            <a className="mobile-logo-container"href="/"> <img alt="Logo" className="logo" src={Logo}/> </a>
            <button  onClick={showMenu}>
              <svg className={openMenu ? "menu-svg" : "show menu-svg" }  width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 2.41666V4.83332H29V2.41666H0ZM0 13.2917V15.7083H29V13.2917H0ZM0 24.1667V26.5833H29V24.1667H0Z" fill="black"/>
              </svg>
              <svg className={openMenu ? "show menu-svg" : "menu-svg" } width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 10L10 30" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 10L30 30" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

        </div>
      </nav>

      <div className={openMenu ? "show cover" : "cover" }>
        <div className="side-menu-container">
          <div className={"side-menu-group"}>


            <div className="mobile-pages-section"> 
              <h2>Pages</h2>
              <a href="/"> Home</a>
              <a href="http://www.infinidream.net/"> About Me</a>
            </div>
            <div className="mobile-recent-posts">
              <h2> Recent Posts</h2>
              <GetRecentPosts/>
            </div>


          </div>

        </div>
      </div>
    </div>  

  )
}

export default MobileNavbar