import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LoginVerifiacation from '../../components/loginVerifiacation'

import "../../stylesheets/admin-styles/uploadImages.css"

const ImageHandler = () => {
    var[inputFile, setInputFile] = useState([]);

    // Gets the data from the server
    var[images, setImages] = useState();
    useEffect(() => {  
        (async function connectToAPI (){
        try {
            await axios.get(process.env.GATSBY_BACKEND_URL + '/api/images', { withCredentials: true }).then((res) => {
                setImages(res.data);
            });
        }
        catch(err) {console.error(err)}
        })()
    }, [])

    // Loops through and displays the values
    function GetImages() {
        if (images) return images.map (image => { 
            return <div className="images-upload"> 
                <img alt="uploaded" src={process.env.GATSBY_BACKEND_URL + "/images/" + image.name}/>
                <button onClick={deleteImage.bind(this, image.name)}> Delete </button>
            </div>
        });
        return <div/>
    }

    // Deletes the image when you click on the button. Name property is used to find the image
    function deleteImage (name ){
        try {
            axios.post(process.env.GATSBY_BACKEND_URL + '/api/image/'+ name +'/delete', {},{ withCredentials: true }).then((res) => {
                // alert("Successful")
                // window.location.reload()
            })
        }
        catch(err) {console.error(err)}
    }
    const updateFileValue = event => {
        setInputFile(event.target.files[0])
        console.log(inputFile)
    }
    const handleSubmit = event => {
        event.preventDefault();

        // Get the file without the ext
        const name = inputFile.name.split(".")[0]

        // Create a form and add file to it
        const formData = new FormData();
        formData.append("name", name)
        formData.append("image", inputFile)

        /*  
        * Two problems could occur. One, the file is not sent right because this is not a multicontent type
        * or two, the server cannot find the file for some reason
        */
        try {
            axios.post(process.env.GATSBY_BACKEND_URL + '/api/create-image', formData,{ withCredentials: true }, {
                headers: {
                    'Content-Type': 'multipart/form-data;'
                }
            }).then((res) => {
                alert("Successful")
                window.location.reload()
            })
        }
        catch (err) {console.log(err)}

    }
    return (
        <LoginVerifiacation>
            <GetImages/>
            <form 
                className="admin-create-form" 
                method="POST" 
                enctype="multipart/form-data"
                onSubmit={handleSubmit}>

                <label htmlFor="image">Image:</label>
                <input 
                className="thumbnail-input" 
                    type="file" 
                    id="image" 
                    name="image" 
                    onChange={updateFileValue}
                    valeu={inputFile}
                    />
                <input className="submit-input" type="submit" value="Submit"></input>
            </form>
        </LoginVerifiacation>
    )
}

export default ImageHandler