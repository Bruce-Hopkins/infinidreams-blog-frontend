import React, { useState } from "react";
import "../stylesheets/admin-styles/create.css"



const Form = (props) => {

    // Body text area. Value is the property that is inside the text area
    const Input = (value) => {
        return <textarea 
            className="body-input" 
            id="body" name="body" 
            cols="60" 
            rows="4">
            {value ? value : ""}
        </textarea>
    };

    // Tags text input. Value is the defualt value that the text will have
    const Tags = (value) => {
        return <input 
            className="tags-input" 
            type="text" 
            id="tags" 
            name="tags"
            value={value ? value : ""}
        />
    }
    function GetBodyValue(bodyArray) {
        return bodyArray.map (bodydata => {
           return <Input value={bodydata}/>
        })
    }
    function GetTagsValue(tagsArray) {
        return tagsArray.map (bodydata => {
            return <Input value={bodydata}/>
         })
    }

    const [inputList, setInputList] = useState([]);
    const [tagsList, setTagsList] = useState([]);

  

    const tagsButtonClick = event => {
    setTagsList(tagsList.concat(<Tags key={tagsList.length} />));
    };

    const onAddBtnClick = event => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
    };

  // TODO, Implement changes to prevent redirect
  return (
    <div>
      <form 
        className="admin-create-form" 
        method="POST" 
        action={props.url}
        enctype="multipart/form-data"
        >

        <label for="thumbnail">Thumbnail:</label>
        <input className="thumbnail-input" type="file" id="image" name="image"/>
        <br/>

        <label for="title">title:</label>
        <input 
            className="title-input" 
            value={props.data.title ? props.data.title : ""} 
            type="text" 
            id="title" 
            name="title"/>
        <br/>

        <label for="summary">summary:</label>
        <input 
            className="summary-input" 
            value={props.data.title ? props.data.title : ""} 
            type="text" 
            id="summary" 
            name="summary"/>
        <br/><br/>

        <label for="body">body:</label>
        <div className="body-group">
            {/* Calling Input function to at least have one text boxes for use or to display the body recieved from the update information. */}
            {props.data.body ? <GetBodyValue bodyArray={props.data.body}/> : <Input/>}
            {/* Allows user to add more bodys if needed */}
            {inputList}
        </div>
        <button type="button" onClick={onAddBtnClick}>Add input</button>

        <br/><br/>
        
        <label for="tags">tags:</label>
        <div className="tags-group"> 
            {props.data.tags ? <GetTagsValue tagsArray={props.data.tags}/> : <Tags/>}
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