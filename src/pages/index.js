import React, {useEffect, useState} from 'react'
import Layout from "../components/layout"
import axios from 'axios'
import SEO from "../components/SEO"
import Sidebar from "../components/sidebar"
// import Context from "../components/contextAPI"


import "../stylesheets/index.css"
import "../stylesheets/layout.css"

//TODO, Add featured page when I have more posts.
//TODO, Add loading animation when API has not connected yet.
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
    if (postsData.data) return postsData.data.map (data => {
        return (
          <div className="blogpost-container">
            <a href={"blog/"+data._id} className="blogpost-group"> 
              <img src={`data:image/png;base64, ${data.thumbnailString}` }/> 
              <div className="blogpost-text-group">
                <h3>{data.title}</h3>
                <div className="blogpost-info">
                  {data.tags ? data.tags.map(tag => {
                    return <p className="blogposts-tags"> {tag} </p>
                  }): <p> </p>}
                  <p className="blogposts-date">{data.FormattedDateOfPost}</p>
                </div>
                <h4> {data.summary}</h4>
                {/* <a className="blog-button"> READ MORE</a> */}

              </div>
            </a>
          </div>
        )
    })
    return <h2> No Posts found</h2>
  }
  

  return (
    
    <Layout>
      <SEO title="Infinidream | Blog"/>
      <main className="posts-container">
        <div className="post-group">
            <GetData/>          
        </div>
        {/* <Sidebar/> */}
      </main>
    </Layout>

  )
}

export default IndexPage
