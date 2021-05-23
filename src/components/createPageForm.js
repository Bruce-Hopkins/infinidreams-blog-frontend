import React, { useState, useEffect } from "react";
import axios from 'axios'
import "../stylesheets/admin-styles/create.css"



const Form = (props) => {
    var[postsData, setPostsData] = useState([])
    var[bodyData, setBodyData] = useState([])
    var inputValue = [];
    var valuesList = [];
    


    useEffect(() => {  

        (async function connectToAPI (){
        try {
            
          await axios.get('http://localhost:5000/api/posts/' + props.id).then((res) => {
            setPostsData(res.data);
            inputValue = res.data.body;
          });
        }
        catch(err) {
            console.error(err)
        }
        loopThrough();
    
        })()
    }, [])

    // TODO Fix body and tags reloading after pressing the button
    // Body text area. Value is the property that is inside the text area
    const Input = (props) => {
        return <textarea 
            className="body-input" 
            id="body" name="body" 
            cols="60" 
            rows="4">
            {props.value ? props.value : ""}
        </textarea>
    };

    function loopThrough () {
        console.log(inputValue)
        inputValue.map (input => { 
            valuesList.push(<Input value={input} key={inputList.length} />)
        })
        setBodyData(valuesList)
    }
    // Tags text input. Value is the defualt value that the text will have
    const Tags = (props) => {
        return <input 
            className="tags-input" 
            type="text" 
            id="tags" 
            name="tags"
            defaultValue={props.value ? props.value : ""}
        />
    }
    function GetBodyValue(props) {
        if(props.bodyArray) return props.bodyArray.map (bodydata => {
           return <Input value={bodydata}/>
        })
        else return <Input/>
        
    }
    function GetTagsValue(props) {
        if(props.tagsArray) return props.tagsArray.map (tagData => {
            return <Tags value={tagData}/>
         })
         else return <Tags/>
    }

    const [inputList, setInputList] = useState([]);
    const [tagsList, setTagsList] = useState([]);

  

    const tagsButtonClick = event => {
    setTagsList(tagsList.concat(<Tags key={tagsList.length} />));
    };

    const onAddBtnClick = event => {
        setBodyData(bodyData.concat(<Input key={bodyData.length} />));
    };

  // TODO, Implement changes to prevent redirect
  return (
    <div>
      <form 
        className="admin-create-form" 
        method="POST" 
        action={ postsData ? postsData.url : "none"}
        enctype="multipart/form-data"
        >

        <label for="thumbnail">Thumbnail:</label>
        <input className="thumbnail-input" type="file" id="image" name="image"/>
        <br/>

        <label for="title">title:</label>
        <input 
            className="title-input" 
            defaultValue={props.data ? props.data.title : ""} 
            type="text" 
            id="title" 
            name="title"/>
        <br/>

        <label for="summary">summary:</label>
        <input 
            className="summary-input" 
            defaultValue={props.data ? props.data.title : ""} 
            type="text" 
            id="summary" 
            name="summary"/>
        <br/><br/>

        <label for="body">body:</label>
        <div className="body-group">
            {/* Calling Input function to at least have one text boxes for use or to display the body recieved from the update information. */}
            
            {/* {props.data ? <GetBodyValue bodyArray={props.data.body}/> : <Input/>} */}
            {/* Allows user to add more bodys if needed */}
            {/* {inputList} */}
            {bodyData}
        </div>
        <button type="button" onClick={onAddBtnClick}>Add input</button>

        <br/><br/>
        
        <label for="tags">tags:</label>
        <div className="tags-group"> 
            {props.data ? <GetTagsValue tagsArray={props.data.tags}/> : <Tags/>}
            {tagsList}
        </div>
        <button type="button" onClick={tagsButtonClick}>Add tags</button>
        <br/>

        <input className="submit-input" type="submit" value="Submit"></input>

        
      </form>
    </div>
  );
};

export default Form