import axios from 'axios'

async function SinglepostConnect (id){

    // variable for the API data    
    let postData;

    // Connects to backend API and /GETs a singlepost. If theres an error returns "error"
    try {
      await axios.get('http://server.infinidream.net/api/posts/' + id).then((res) => {
          postData = res;
          if (res.data.title) document.title = res.data.title;
      });
    }
    catch(err) {
        console.error(err)
        return {
            postData: null,
            isError: true
        };
    }
    return { 
        postData: postData, 
        isError: false
    }

}
export default SinglepostConnect