import axios from 'axios'

async function postsConnect (){
    // variable for the API data
    let postData;

    // Connects to backend API and /GETs a singlepost. If there's an error returns "error"
    try {
        await axios.get(process.env.GATSBY_BACKEND_URL +'/api/posts').then((res) => {
            postData = res;
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

export default postsConnect