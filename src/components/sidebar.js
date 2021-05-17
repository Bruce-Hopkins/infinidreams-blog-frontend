import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "../stylesheets/sidebar.css"

import TwitterIcon from "../images/Socail-media/2021 Twitter logo - white.png"
import GithubIcon from "../images/Socail-media/GitHub-Mark-Light-64px.png"
import EmailIcon from "../images/Socail-media/icons8-email-64.png"
function Sidebar (){

  var[postsData, setPostsData] = useState([])    
  const [show, setShow] = React.useState(false)

  function showMenu() {
    if (show) {
      setShow(false)
    }
    else  {
      setShow(true)
    }
  }
  useEffect(() => {  
    /*  The reason why sidebar makes its own connection to the API instead of using the connection to get the posts is for two reasons
    1: The API does not send all of the blogpost for individual post pages, therefore sidebar would have to connect to tha API anyway
    2: The sidebar can now load faster than the actual posts, which will give a user soemthing to click on.  */ 
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

  // TODO, Test with larger Posts
  function GetRecentPosts() {
    // If there are more than 5 posts then it will return five
    // If not it'll only return the number of posts
    let selectedLinks = [];
    if (postsData.data) {

        // Finds the first five posts on the blog.
        if (postsData.data.length > 5) {
          for (let i = 0; i < 5; i++) {
            selectedLinks.push(postsData.data[i]);
            console.log(postsData.data[i])
          }
        } 
        else selectedLinks = postsData.data;
    }
    if (selectedLinks.length > 0) {
      return selectedLinks.map (selectedLink => {
        return <li> <a href={"/blog/"+selectedLink._id}> {selectedLink.title} </a> </li>
      })
    }

    return <div/>
  }

    return (
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
    )
  }
  
export default Sidebar