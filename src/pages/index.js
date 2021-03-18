import React, {useEffect, useState} from 'react'
import Layout from "../components/layout"
import { useAsync } from "react-async"
import axios from 'axios'

const IndexPage = () => {
  var[postsData, setPostsData] = useState([])

  async function thisRandomFunction (){
    try {
      await axios.get('https://www.google.com/')
    }
    catch(err) {
      console.error(err)
    }

  }
  thisRandomFunction()



  useEffect(() => {

    
  }, [])
  return (
    <Layout>
      <main className="posts-container">
        <div className="post-group"> 
        </div>
      </main>
    </Layout>

  )
}

export default IndexPage
