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

    function hex2a(hexx) {
      var hex = hexx.toString();//force conversion
      var str = '';
      for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
    }
    function sortThroughHexCodes(hexCodeOfString) {
      let entireString = [];
      if (hexCodeOfString.includes("&#x")) {
        const hexNumberSplits = hexCodeOfString.split("&#x");
        entireString.push(hexNumberSplits[0])
        for (let i = 1; i < hexNumberSplits.length; i++) {
          let hexCode = hexNumberSplits[i].substring(0, 3);
          if (hexCode.includes(';')) {
            let splitHexCode = hexCode.split(';')[0];
            entireString.push(hex2a(splitHexCode));
          }
          let nonHexCodes = hexNumberSplits[i].split(hexCode)[1];
          if(nonHexCodes != '') entireString.push(nonHexCodes)
        }
        return entireString.join("");
      }
      return hexCodeOfString;
    }

    // TODO, Loop through body and set the right tags
    // TODO, If it finds a hex like this, split that perticular part into a normal char
    function GetBody(body) {
        if (singlePostsData.data.body) {
          return singlePostsData.data.body.map(bodyString => {
            if (bodyString.includes("(CODE)")) {
                  const splitBodyString = bodyString.split("(CODE)");
                  console.log(splitBodyString[1])
                  return <Page language={splitBodyString[0]} code={sortThroughHexCodes(splitBodyString[1])}/>
            } 
            else {
              // console.log(hex2a(bodyString))
              return <h1>{sortThroughHexCodes(bodyString)}</h1>
            }
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
                        return <p> {sortThroughHexCodes(tag)}</p>
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
      <SEO title={singlePostsData.data ? sortThroughHexCodes(singlePostsData.data.title) : "Infinidream | Blog"}/>
      <GetPost/>
    </Layout>

  )
}

export default Singlepost
