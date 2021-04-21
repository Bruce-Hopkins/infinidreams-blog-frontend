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
        if (postsData.data.length > 5) {
          selectedLinks = postsData.data[0, 4];
        } 
        else selectedLinks = postsData.data;
        console.log(selectedLinks);
    }
    if (selectedLinks.length > 0) {
      return selectedLinks.map (selectedLink => {
        return <a href={"blog/"+selectedLink._id}> {selectedLink.title} </a>
      })
    } else console.log(selectedLinks.length)

    return <div/>
  }

    return (
      <nav className="nav-container">
        <div className="nav-group">
          <a className="portfolio-link" href="http://www.infinidream.net/">About Me</a>
          <h3>Recent posts</h3>
          <div className="recent-posts-group">
            <GetRecentPosts/>
          </div>
          {/*TODO, connect and find the most recent blog posts */}
          <div className="icon-group">
            <a href="http://www.infinidream.net/"> </a>
            <a href="https://twitter.com/InfiniDreams1" target="_blank" rel="noopener noreferrer" > <img src={TwitterIcon} alt="Twitter icon"/> </a>
            <a href="https://github.com/Bruce-Hopkins-Jr" target="_blank" rel="noopener noreferrer">  <img src={GithubIcon} alt="Github Icon"/> </a>
            <a href="mailto: sales@budgetchamp.net" target="_blank" rel="noopener noreferrer"> <img src={EmailIcon} alt="Email Icon"/></a>  
          </div>
        </div>
      </nav>
    )
  }
  
export default Sidebar