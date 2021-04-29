import React, {useEffect, useState} from 'react'
import axios from 'axios'

const ThemeContext = React.createContext({});

function ContextTest (props) {

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
    return (
        
        <ThemeContext.Provider value={postsData.data ? postsData.data : ""}>
            {props.children}
        </ThemeContext.Provider>
        );
}

export default ContextTest
