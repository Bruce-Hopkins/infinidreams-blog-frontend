import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "../stylesheets/sidebar.css"

import TwitterIcon from "../images/Socail-media/2021 Twitter logo - white.png"
import GithubIcon from "../images/Socail-media/GitHub-Mark-Light-64px.png"
import EmailIcon from "../images/Socail-media/icons8-email-64.png"
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
          return <li> <a href={"/blog/"+selectedLink._id}> {selectedLink.title} </a> </li>
        })
      }
    }


    return <div/>
  }

    return (
    <SidebarContext.Provider  value={postsData ? postsData : null}>

      <nav className={show ? "nav-container show" : "nav-container"}>
        <div className="nav-group">
          <div className="top-sidebar">
            <div className="sidebar-link-group"> 
              <h2>Pages</h2>
              <a href="/"> Home</a>
              <a href="http://www.infinidream.net/"> About Me</a>
            </div>
          </div> 
          <div className="Middle-sidebar">
            <div className="recent-post-group">
              <h2>Recent</h2>
              <GetRecentPosts/>
            </div>
          </div>
        </div>
      </nav>
    </SidebarContext.Provider>
    )
  }
  
export default Sidebar