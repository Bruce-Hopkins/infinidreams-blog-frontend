import React, {useEffect, useState} from 'react'
import Layout from "../components/layout"
import axios from 'axios'
import SEO from "../components/SEO"
import Page from "../components/highlighter"

import "../stylesheets/blog.css"
import "../stylesheets/layout.css"

// TODO Make context more clear on what is supposed to be the defualt
const SinglePostConetext = React.createContext();


const Singlepost = ({id}) => {
    var[singlePostsData, setSinglePostsData] = useState([])
 
    useEffect(() => {  
        (async function connectToAPI (){
          try {
            await axios.get('http://localhost:5000/api/posts/' + id).then((res) => {
                setSinglePostsData(res)
                if (res.data.title) document.title = res.data.title;
            });
          }
          catch(err) {
            console.error(err)
          }
      
        })()
        // setTimeout(() => Prism.highlightAll(), 0)

    }, [])
    function cleanString(stringToBeCleaned) {
      if(stringToBeCleaned.startsWith(" ")) {
        return stringToBeCleaned.slice(1);
      }
      return stringToBeCleaned;
    }

    // TODO,. add lazy loading.
    //This will sort through the body property in the API and return different html tags depending on the content
    function GetBody() {
        const context = React.useContext(SinglePostConetext)
        if (context.data.body) {

          return context.data.body.map(bodyString => {

            if (bodyString.includes("(CODE)")) {
                  const splitBodyString = bodyString.split("(CODE)");
                  return <Page language={splitBodyString[0]} code={cleanString(splitBodyString[1])}/>
            } 

            else if (bodyString.includes("/images/")) {
              return <img alt="body" src={bodyString}/>
            }

            else return <p> {cleanString(bodyString)}</p>
          })
        }
        return <h1> There was a problem</h1>
    }

    function GetPost() {
      const context =  React.useContext(SinglePostConetext);
        if (context.data) { 
          return (

              <div className="post-container"> 
                  <div className="post-group">
                    <div className="gradient-container"> 
                      <div className="title-group">
                        <div className="title-text-group">
                          <h1> {context.data.title}</h1>
                          <span className="info-group">
                            {context.data.tags ? context.data.tags.map(tag => {
                                return <p className="title-tags"> {tag}</p>
                            }): <p> </p>}
                            <p>{context.data.FormattedDateOfPost}</p>
                          </span>

                        </div>
                        <img  alt="Thumbnail" className="blog-thumbnail" src={`data:image/png;base64, ${context.data.thumbnailString}` }/>
                      </div>
                    
                    </div>

                      <div className="body-group">
                        <GetBody/>
                      </div>

                  </div>
              </div>

        )}
        return <h1>Post Id not found</h1>
    }
  return (
    <SinglePostConetext.Provider  value={singlePostsData}>

      <Layout>
        {/* Change title depending on the blog post title */}
        <SEO title={singlePostsData.data ? singlePostsData.data.title : ""}/>
        <GetPost/>
      </Layout>
    </SinglePostConetext.Provider>


  )
}

export default Singlepost
