import React, {useEffect, useState} from 'react'
import Layout from "../components/layout"

import SEO from "../components/SEO"
import BlogpostContext from '../components/context/BlogpostsContext'
import postsConnect from '../components/backend-API/postsConnect'

import "../stylesheets/index.css"
import "../stylesheets/layout.css"

const IndexPage = () => {
  var[postsData, setPostsData] = useState()
  var [error, setError] = useState(false)
  useEffect(() => {  
    (async function connectToAPI (){
      const connect = await postsConnect();
      setError(connect.isError)
      setPostsData(connect.postData);
    })()
  }, [])
  
  // Maps through each blog posts. 
  function GetData () {
    const context = React.useContext(BlogpostContext)
    if (context) 
    return context.data.map (data => {
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
                <p className="read-more"> Read more... </p>
              </div>
            </a>
          </div>
        )
    })
    if(error) {
      return <h2> There was a connection error. Try reloading the page</h2>
    }
    // TODO Change loading animation
    return <div className="loading-animation"> 
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="circle3"></div>
      <div className="circle4"></div>
    </div>
  }
  

  return (
    <BlogpostContext.Provider value={postsData ? postsData : null}>
      <Layout>
        <SEO title="Infinidream | Blog"/>
        <section className="posts-container">
          <div className="post-list">
              <GetData/>          
          </div>
        </section>
      </Layout>
    </BlogpostContext.Provider>



  )
}

export default IndexPage

