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
    function cleanString(stringToBeCleaned) {
      if(stringToBeCleaned.startsWith(" ")) {
        return stringToBeCleaned.slice(1);
      }
      return stringToBeCleaned;
    }

    // TODO, Loop through body and set the right tags
    function GetBody(body) {
        if (singlePostsData.data.body) {
          return singlePostsData.data.body.map(bodyString => {
            if (bodyString.includes("(CODE)")) {
                  const splitBodyString = bodyString.split("(CODE)");
                  console.log(splitBodyString[1]);
                  return <Page language={splitBodyString[0]} code={cleanString(splitBodyString[1])}/>
            } 
            else if (bodyString.includes("/images/")) {
              return <img src={bodyString}/>
            }
            else return <p> {cleanString(bodyString)}</p>
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
