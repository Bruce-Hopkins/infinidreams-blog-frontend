import React, {useEffect, useState} from 'react'
import Layout from "../components/layout"
import axios from 'axios'
import SEO from "../components/SEO"


import "../stylesheets/index.css"
import "../stylesheets/layout.css"

//TODO, Add featured page when I have more posts.
// TODO, Fix infinite loading when page backend down. Either Check regularly if page is up, or give a message if the page fails to connect

// Creates a context API for what the API gets from the backend
const BlogPostContext = React.createContext();

const IndexPage = () => {
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
  
  // Maps through each blog posts. 
  function GetData () {
    const context = React.useContext(BlogPostContext)
    if (context.data) return context.data.map (data => {
        return (
          <div className="blogpost-container">
            <a href={"blog/"+data._id} className="blogpost-group"> 
              <img alt="Thumbnail" src={`data:image/png;base64, ${data.thumbnailString}` }/> 
              <div className="blogpost-text-group">
                <h3>{data.title}</h3>
                <div className="blogpost-info">
                  {data.tags ? data.tags.map(tag => {
                    return <p className="blogposts-tags"> {tag} </p>
                  }): <p> </p>}
                  <p className="blogposts-date">{data.FormattedDateOfPost}</p>
                </div>
                <h4> {data.summary}</h4>
              </div>
            </a>
          </div>
        )
    })
    return <div className="loading-animation"> 
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="circle3"></div>
      <div className="circle4"></div>
    </div>
  }
  

  return (
    <BlogPostContext.Provider value={postsData}>
      <Layout>
        <SEO title="Infinidream | Blog"/>
        <main className="posts-container">
          <div className="post-list">
              <GetData/>          
          </div>
        </main>
      </Layout>
    </BlogPostContext.Provider>



  )
}

export default IndexPage

