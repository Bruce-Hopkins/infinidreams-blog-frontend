
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LoginVerifiacation from '../../components/loginVerifiacation'

import CreatePageForm from "../../components/createPageForm"
import "../../stylesheets/admin-styles/create.css"

const UpdatePage = ({id}) => {
  var[postsData, setPostsData] = useState();

  useEffect(() => {  

    (async function connectToAPI (){
    try {
        
      await axios.get(process.env.GATSBY_BACKEND_URL + '/api/posts/' + id).then((res) => {
        setPostsData(res.data);
      });
    }
    catch(err) {
        console.error(err)
    }
    })()
}, [id])
  return (
    <LoginVerifiacation>
      <CreatePageForm url={process.env.GATSBY_BACKEND_URL + "/api/post/" + id + "/update"} data={postsData} id={id}/>
    </LoginVerifiacation>
  );
};

export default UpdatePage