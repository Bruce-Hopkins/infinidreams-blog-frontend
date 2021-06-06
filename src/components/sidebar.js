import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "../stylesheets/sidebar.css"

import Logo from "../images/InFINIDREAMS.png"
import SidebarContext from '../components/context/SidebarContext'
// Context for Sidebar to get backend


function Sidebar (){

  var[postsData, setPostsData] = useState()    
  const [show, setShow] = React.useState(false)

  function showMenu() {
    if (show) setShow(false)
    else setShow(true)
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
          return <a href={"/blog/"+selectedLink._id}> {selectedLink.title} </a> 
        })
      }
    }


    return <div/>
  }

    return (
    <SidebarContext.Provider  value={postsData ? postsData : null}>
      <section className="left-section">
        <a href="http://www.infinidream.net/"> <img alt="Logo" className="logo" src={Logo}/> </a>
        <nav className={show ? "nav-container show" : "nav-container"}>
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


    </SidebarContext.Provider>
    )
  }
  
export default Sidebar