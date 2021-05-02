import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "../stylesheets/sidebar.css"

import TwitterIcon from "../images/Socail-media/2021 Twitter logo - white.png"
import GithubIcon from "../images/Socail-media/GitHub-Mark-Light-64px.png"
import EmailIcon from "../images/Socail-media/icons8-email-64.png"
function Sidebar (){

  var[postsData, setPostsData] = useState([])
  useEffect(() => {  
    (async function connectToAPI (){
      try {
        await axios.get('http://localhost:5000/api/posts').then((res) => {
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
        return <li> <a href={"blog/"+selectedLink._id}> {selectedLink.title} </a> </li>
      })
    }

    return <div/>
  }

    return (
      <nav className="nav-container">
        <div className="nav-group">
          <h3 className="pages-header"> Pages:</h3>
          <div className="important-link-group"> 
            <a className="portfolio-link" href="/"> Home</a>
            <a className="portfolio-link" href="http://www.infinidream.net/"> About Me</a>
          </div>


          <h3>Recent posts:</h3>
          <ul className="recent-posts-group">
            <GetRecentPosts/>
          </ul>
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