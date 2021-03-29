import React, {useEffect, useState} from 'react'
import Layout from "../components/layout"
import axios from 'axios'


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

    // TODO, Add metatags to this section
    // TODO, set the date to something readable
    function GetPost() {
        if (singlePostsData.data) return (
            <div className="post-container"> 
                <div className="post-group">
                    <h1> {singlePostsData.data.title}</h1>
                    <img src={`data:image/png;base64, ${singlePostsData.data.thumbnailString}` }/>
                    {singlePostsData.data.tags ? singlePostsData.data.tags.map(tag => {
                        return <p> {tag}</p>
                    }): <p> </p>}
                    <p> {singlePostsData.data.date_of_post}</p>
                </div>
            </div>

        )
        return <h1>Post Id not found</h1>
    }
    
  return (
    <Layout> 
        <GetPost/>
     </Layout>

  )
}

export default Singlepost
