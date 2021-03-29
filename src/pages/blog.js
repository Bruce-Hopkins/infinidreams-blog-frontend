import React, {useEffect, useState} from 'react'
import Layout from "../components/layout"
import axios from 'axios'
import SEO from "../components/SEO"


const Singlepost = ({id}) => {
    var[singlePostsData, setSinglePostsData] = useState([])

    useEffect(() => {  
        (async function connectToAPI (){
          try {
            await axios.get('http://localhost:5000/api/posts/' + id).then((res) => {
                setSinglePostsData(res)
            });
          }
          catch(err) {
            console.error(err)
          }
      
        })()
    }, [])

    // TODO, Loop through body and set the right tags
    function getBody(body) {
        
    }

    function GetPost() {
        if (singlePostsData.data) { 
          let postData = singlePostsData.data;
          return (
            <div className="post-container"> 
                <div className="post-group">
                    <h1> {postData.title}</h1>
                    <img src={`data:image/png;base64, ${postData.thumbnailString}` }/>
                    {postData.tags ? postData.tags.map(tag => {
                        return <p> {tag}</p>
                    }): <p> </p>}
                    <p>{postData.FormattedDateOfPost}</p>

                </div>
            </div>
        )}
        return <h1>Post Id not found</h1>
    }
  return (
    <Layout>
      <SEO title={singlePostsData.data ? singlePostsData.data.title : "Infinidream | Blog"}/>
      <GetPost/>
     </Layout>

  )
}

export default Singlepost
