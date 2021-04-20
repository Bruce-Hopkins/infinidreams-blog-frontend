import React from "react"
import "../stylesheets/sidebar.css"

import TwitterIcon from "../images/Socail-media/2021 Twitter logo - white.png"
import GithubIcon from "../images/Socail-media/GitHub-Mark-Light-64px.png"
import EmailIcon from "../images/Socail-media/icons8-email-64.png"
function Sidebar (){
    return (
      <nav className="nav-container">
        <div className="nav-group">
          <a className="portfolio-link" href="http://www.infinidream.net/">About Me</a>
          <h3>Recent posts</h3>
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