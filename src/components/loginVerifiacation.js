import React, {useState, useEffect} from "react"
// import {navigate} from 'gatsby';


function Layout (props) {

    var[postResponse, setPostResponse] = useState()
    useEffect(() => {  
        const requestOptions = {
            // mode: 'cors', 
            credentials: 'include',
            method: 'GET',
            headers: { 
                "Access-Control-Allow-Origin": "http://localhost:5000/"
            },
        };
        fetch("http://localhost:5000/api/validate-login", requestOptions)
            .then(response => {
                console.log(response)
                if (response.status == 200) setPostResponse(true)
                else  {
                    console.log(response.status)
                    // navigate('/admin/login');
                }
            })
            .catch(error => console.log('Form submit error', error))
    }, [])

    function GetResposone(props) {
    if (postResponse) {
        return(
            <div>
                {props.children}
            </div>
        )
    }
    return <div></div>
    }

    return (
      <GetResposone children={props.children}/>
    )
  }
  
export default Layout