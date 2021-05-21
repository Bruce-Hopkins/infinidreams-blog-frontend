import React, { useState } from "react";
import createPageForm from "../../components/createPageForm"
import "../../stylesheets/admin-styles/create.css"

const Input = () => {
    return <textarea className="body-input" id="body" name="body" cols="60" rows="4"></textarea>
};
const Tags = () => {
    return <input className="tags-input" type="text" id="tags" name="tags"/>
}

const Form = () => {
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
        action="http://localhost:5000/api/post/create" 
        enctype="multipart/form-data"
        >

        <label for="thumbnail">Thumbnail:</label>
        <input className="thumbnail-input" type="file" id="image" name="image"/>
        <br/>

        <label for="title">title:</label>
        <input className="title-input" type="text" id="title" name="title"/>
        <br/>

        <label for="summary">summary:</label>
        <input className="summary-input" type="text" id="summary" name="summary"/>
        <br/>
  
        <br/>

        <label for="body">body:</label>
        <div className="body-group">
          {/* Calling Input function to at least have one text boxes for use   */}
          <Input/>
          {inputList}
        </div>
        <button type="button" onClick={onAddBtnClick}>Add input</button>

        <br/>

        <br/>
        
        <label for="tags">tags:</label>
        <div className="tags-group"> 
          <Tags/>
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