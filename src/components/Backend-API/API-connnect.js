import React, {useEffect, useState} from 'react'
import axios from 'axios'

exports.SidebarConnect = async function (){
    // variable for the API data
    let postData;

    /* Trys to connect to API and inserts the data into the variable
        if it fails returns "error" */
    try {
        await axios.get('http://localhost:5000/api/recent-posts').then((res) => {
            postData = res;
        });
    }
    catch(err) {
        console.error(err);
        return "error";
    }

    return postData;
}