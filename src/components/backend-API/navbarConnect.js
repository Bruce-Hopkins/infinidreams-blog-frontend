import React, {useEffect, useState} from 'react'
import axios from 'axios'

async function SidebarConnect(){
    // variable for the API data
    let postData;

    // Connects to backend API and /GETs a singlepost. If there's an error returns "error"
    try {
        await axios.get('http://localhost:5000/api/recent-posts').then((res) => {
            postData = res;
        });
    }
    catch(err) {
        console.error(err);
        // if there's an error set error to true
        return {
            postData: null,
            isError: true
        };
    }

    return { 
        postData: postData, 
        isError: false}
}

export default SidebarConnect