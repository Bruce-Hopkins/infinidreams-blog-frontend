import React, {useEffect, useState} from 'react'
import Layout from "../components/layout"
import axios from 'axios'
import SEO from "../components/SEO"
import Page from "../components/highlighter"

const code = `
String foo = "foo";
String bar = "bar";
`.trim()


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
        // setTimeout(() => Prism.highlightAll(), 0)

    }, [])

    // TODO, Loop through body and set the right tags
    function GetBody(body) {
        if (singlePostsData.data.body) {
          const blogBody = singlePostsData.data.body;
          return blogBody.map(bodyString => {
            if (bodyString.includes("(CODE)")) {
                  
                  return <Page  code={code}/>
              // <pre className>
              //   <code className="language-java">
                  {/* {bodyString} */}
                {/* </code>
              </pre> */}
              
            } 
            else return <h1>nope</h1>
          })
        }
        return <h1> nothing</h1>
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
                    <GetBody/>

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
