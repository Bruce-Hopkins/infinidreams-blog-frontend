import React, {useEffect, useState} from 'react'
import axios from 'axios'

import "../../stylesheets/admin-styles/posts.css"
import "../../stylesheets/blog.css"

// ! Do not allow for nonlogged in user to access without login
const Posts = () => {

  // TODO, change this to be the component that connects through axios later

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
        <div className="admin-post-container"> 
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
                </div>
                </a>
            </div>
            <div className="admin-post-buttons">
              <form method="POST" action={"http://localhost:5000/api/post/" + data._id + "/delete"}> <input id="delete" type="submit" value="Delete"/> </form>
              <a id="update" href={"/admin/update/" + data._id}> <input id="update" type="submit" value="Update"/> </a>
            </div> 

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
    <div>
        <GetData/>
    </div>
  );
};

export default Posts