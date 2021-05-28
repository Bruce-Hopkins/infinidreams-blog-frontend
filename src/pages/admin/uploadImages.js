import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LoginVerifiacation from '../../components/loginVerifiacation'

import "../../stylesheets/admin-styles/uploadImages.css"

const ImageHandler = ({id}) => {

    // Gets the data from the server
    var[images, setImages] = useState();
    useEffect(() => {  
        (async function connectToAPI (){
        try {
            await axios.get('http://localhost:5000/api/images', { withCredentials: true }).then((res) => {
                setImages(res.data);
            });
        }
        catch(err) {console.error(err)}
        })()
    }, [])

    // Loops through and displays the values
    function GetImages() {
        if (images) return images.map (image => { 
            return <div> 
                <img src={"http://localhost:5000/images/" + image.name}/>
                <button onClick={deleteImage.bind(this, image.name)}> </button>
            </div>
        });
        return <div/>
    }

    // Deletes the image when you click on the button. Name property is used to find the image
    function deleteImage (name ){
        console.log('http://localhost:5000/api/image/'+ name +'/delete')
        try {
            axios.post('http://localhost:5000/api/image/'+ name +'/delete', {},{ withCredentials: true }).then((res) => {
                alert("Successful")
                // TODO, Have the site refresh the page
            })
        }
        catch(err) {console.error(err)}

    }
    return (
        <LoginVerifiacation>
            <GetImages/>
        </LoginVerifiacation>
    )
}

export default ImageHandler