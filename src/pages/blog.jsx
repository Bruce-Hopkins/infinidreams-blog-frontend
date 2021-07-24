import React, {useEffect, useState} from 'react'
import Layout from "../components/layout"
import { navigate } from "gatsby"

import SEO from "../components/SEO"
import Page from "../components/highlighter"
import SinglepostContext from '../components/context/SinglepostContext'
import blogConnnect from "../components/backend-API/blogConnect"

import "../stylesheets/blog.css"
import "../stylesheets/layout.css"

// Main function. 
const Singlepost = ({id}) => {
    var[singlePostsData, setSinglePostsData] = useState()
    var [isError, setError] = useState(false)

    // Connects to the API and inserts into the react hooks 
    useEffect(() => {
      (async function connectToAPI (){
        let connect = await blogConnnect(id)
        setSinglePostsData(connect.postData)
        
        // Redirect to 404 if the page is not found.
        if(connect.isError) navigate("/404")
      })()    
    },[])

    // Take away the spaces at the beginning of a String
    function cleanString(stringToBeCleaned) {
      if(stringToBeCleaned.startsWith(" ")) return stringToBeCleaned.slice(1);
      return stringToBeCleaned;
    }

    // This will sort through the body property in the API and return different html tags depending on the 
    function RedirectForError(){
      if (isError) navigate("/")
    }
    function GetBody() {
        const context = React.useContext(SinglepostContext)
        if (context) {

          return context.data.body.map(bodyString => {

            if (bodyString.includes("(CODE)")) {
              const splitBodyString = bodyString.split("(CODE)");
              return <Page language={splitBodyString[0]} code={cleanString(splitBodyString[1])}/>
            } 
            else if (bodyString.includes("</Header>")) {
              const header = bodyString.match(new RegExp("<Header>" + "(.*)" + "</Header>"))[1]
              return <h3 className="body-header"> {header}</h3>
            }
            else if (bodyString.includes("</Link>")) {
              const href = bodyString.match(new RegExp("href='" + "(.*)" + "'"))[1]
              const linkText = bodyString.match(new RegExp(">" + "(.*)" + "</Link>"))[1]
              return <a className="body-link" href={href}> {linkText} </a>
            }
            else if (bodyString.includes("/images/")) return <img alt="body-image" className="body-image" src={bodyString}/>
            else if (bodyString !== "") return <p> {cleanString(bodyString)}</p>
          })
        } {}
        return <h2> There was a problem</h2>
    }

    // Get all the attributes of the API and create the post. Also used the GetBody function
    function GetPost() {
      const context = React.useContext(SinglepostContext);
        if (context) {
          return (
              <div className="post-container"> 
                  <div className="post-group">
                    <h1> {context.data.title}</h1>
                    <h4>{context.data.summary}</h4>
                    <span className="info-group">
                      {context.data.tags ? context.data.tags.map(tag => {
                          // Only return that tag if it's not empty 
                          if (tag !== "") return <p className="title-tags"> {tag}</p>
                      }): <p> </p>}
                      <p className="tag-space">|</p>
                      <p className="title-date">{context.data.FormattedDateOfPost}</p>
                    </span>
                    <img  alt="Thumbnail" className="blog-thumbnail" src={`data:image/png;base64, ${context.data.thumbnailString}` }/>
                  
                    <div className="body-group">
                      <GetBody/>
                    </div>

                  </div>
              </div>

        )}
        return <div> </div>
    }

    
  return (
    <SinglepostContext.Provider  value={singlePostsData ? singlePostsData : null}>
      <Layout>
        <SEO title={singlePostsData ? singlePostsData.data.title : ""}/>
        <GetPost/>
      </Layout>
    </SinglepostContext.Provider>


  )
}



export default Singlepost
