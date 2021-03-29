import React, {useEffect, useState} from 'react'
import Layout from "../components/layout"
import axios from 'axios'
import SEO from "../components/SEO"

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
  
  // map through each blog posts. 
  function GetData () {
    if (postsData.data) return postsData.data.map (data => {
        return (
          <div className="blog-post">
              <h3>{data.title}</h3>
              <h4> {data.summary}</h4>
              {data.tags ? data.tags.map(tag => {
                return <p> {tag} </p>
              }): <p> </p>}
              <img src={`data:image/png;base64, ${data.thumbnailString}` }/> 
              <p>{data.FormattedDateOfPost}</p>
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
          {/* { postsData.data ? postsData.data.map((data, index) => {
            return <h1 key={index}>{data.title} </h1>

          }) : <h1> not found </h1>} */}

          <GetData/>
        </div>
      </main>
    </Layout>

  )
}

export default IndexPage
