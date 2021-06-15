import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "../stylesheets/sidebar.css"

import Logo from "../images/InFINIDREAMS.png"
import SidebarContext from '../components/context/SidebarContext'
// Context for Sidebar to get backend


function Sidebar (){

  var[postsData, setPostsData] = useState()    
  const [showDropdown1, setShowDropdown1] = React.useState(false)
  const [showDropdown2, setShowDropdown2] = React.useState(false)

  function hover1 (){
    setShowDropdown1(true)
    setShowDropdown2(false)
  }
  function hover2 (){
    setShowDropdown1(false)
    setShowDropdown2(true)
  }
  function leaveHover1() {
    setShowDropdown1(false)
  }
  function leaveHover2() {
    setShowDropdown2(false)
  }
  useEffect(() => {  
    (async function connectToAPI (){
      try {
        await axios.get('http://localhost:5000/api/recent-posts').then((res) => {
          setPostsData(res);
        });
      }
      catch(err) {
        console.error(err)
      }
  
    })()
  }, [])

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
    <SidebarContext.Provider  value={postsData ? postsData : null}>
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
      <section className="mobile-menu-container">
        <div className="mobile-menu-group">
          <div className="mobile-logo-container">
            <a href="http://www.infinidream.net/"> <img alt="Logo" className="logo" src={Logo}/> </a>
          </div>
          <div className="mobile-dropdown-container"> 
            <div className="mobile-dropdown-group">
              <button
                onMouseEnter={hover1}
                onMouseLeave={leaveHover1}
              > 
                <h2>Pages</h2>
                <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 5.24017L3.20948e-07 -1.33068e-05L7 -1.33068e-05L3.5 5.24017Z" fill="#13A38A"/>
                </svg>
                <div className={showDropdown1 ? "nav-list show-dropdown mobile-pages-list" : "nav-list hide-dropdown"}>
                  <a href="/"> <h3>Home</h3> </a>
                  <a href="http://www.infinidream.net/"> <h3> About Me</h3> </a>
              </div>
              </button>


              <button
                onMouseEnter={hover2}
                onMouseLeave={leaveHover2}
              > 
                <h2>Recent</h2>  
                <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 5.24017L3.20948e-07 -1.33068e-05L7 -1.33068e-05L3.5 5.24017Z" fill="#13A38A"/>
                </svg>
                <div className={showDropdown2 ? "nav-list show-dropdown mobile-recent-list" : "nav-list hide-dropdown"}>
                  <GetRecentPosts/>
                </div>
              </button>
            </div>


          </div>
        </div>



      </section>


    </SidebarContext.Provider>
    )
  }
  
export default Sidebar