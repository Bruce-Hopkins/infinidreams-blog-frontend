import * as React from "react"
import Layout from "../components/layout"

const Singlepost = () => {
    // TODO Set automatic values to something useful.

    var postValues = {
        thumbnail: "",
        description: "This is a post that rocks",
        date: Date.now(),
        content: ["Yo bro", "This cool", "This might be the one"]
    }

    //Example of how to do the image grabbing from express api
    function Checkout() {
        return postValues.content.map(post => {
            if(post === "Yo bro") {
                return <p> {post}</p>
            } else {
                return <p> Not the one</p>
            }
        })

    }
    
  return (
    <Layout> 
        <img src={postValues.thumbnail} alt="thumbnail"/>
        <h4> {postValues.description} </h4>
        <h5> {postValues.date} </h5>
        <Checkout/>
    </Layout>

  )
}

export default Singlepost
