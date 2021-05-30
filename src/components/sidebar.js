import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "../stylesheets/sidebar.css"

import TwitterIcon from "../images/Socail-media/2021 Twitter logo - white.png"
import GithubIcon from "../images/Socail-media/GitHub-Mark-Light-64px.png"
import EmailIcon from "../images/Socail-media/icons8-email-64.png"

// Context for Sidebar to get backend
const SidebarContext = React.createContext();

function Sidebar (){

  var[postsData, setPostsData] = useState([])    
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
    if (context.data) {
      if (context.data.length > 0) {
        return context.data.map (selectedLink => {
          return <li> <a href={"/blog/"+selectedLink._id}> {selectedLink.title} </a> </li>
        })
      }
    }


    return <div/>
  }

    return (
    <SidebarContext.Provider  value={postsData}>

      <nav className={show ? "nav-container show" : "nav-container"}>
          <svg onClick={showMenu} fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 26" width="26px" height="26px"><path d="M 0 4 L 0 6 L 26 6 L 26 4 Z M 0 12 L 0 14 L 26 14 L 26 12 Z M 0 20 L 0 22 L 26 22 L 26 20 Z"/></svg>
        <div className="nav-group">
          <div className="sections-group">
            <div className="pages-container">
              <h3> Pages:</h3>
              <div className="important-link-group"> 
                <a href="/"> Home</a>
                <a href="http://www.infinidream.net/"> About Me</a>
              </div>
            </div> 
            <div className="recent-posts-container">
              <h3>Recent posts:</h3>
              <ul className="recent-posts-group">
                <GetRecentPosts/>
              </ul>
            </div> 

          </div>

          <div className="icon-group">
            <a href="https://twitter.com/InfiniDreams1" target="_blank" rel="noopener noreferrer" > <img src={TwitterIcon} alt="Twitter icon"/> </a>
            <a href="https://github.com/Bruce-Hopkins-Jr" target="_blank" rel="noopener noreferrer">  <img src={GithubIcon} alt="Github Icon"/> </a>
            <a href="mailto: sales@budgetchamp.net" target="_blank" rel="noopener noreferrer"> <img src={EmailIcon} alt="Email Icon"/></a>  
          </div>
        </div>
      </nav>
    </SidebarContext.Provider>
    )
  }
  
export default Sidebar