import React, { useState } from "react";
import ReactDOM from "react-dom";

const Input = () => {
    return <textarea id="body" name="body" cols="40" rows="0"></textarea>
};
const Tags = () => {
    return <input type="text" id="tags" name="tags"/>
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

  return (
    <div>
      <form method="POST" action="/">
        <label for="thumbnail">Thumbnail</label>
        <input type="file" id="thumbnail" name="thumbnail"/>
        <br/>

        <label for="title">title</label>
        <input type="text" id="title" name="title"/>
        <br/>

        <label for="summary">summary</label>
        <input type="text" id="summary" name="summary"/>
        <br/>
  
        <button onClick={onAddBtnClick}>Add input</button>
        <br/>

        <label for="body">body</label>
        {inputList}
        <br/>

        <button onClick={tagsButtonClick}>Add tags</button>
        <br/>
        
        <label for="tags">tags</label>
        {tagsList}
        <br/>

        <input type="submit" value="Submit"></input>

        
      </form>
    </div>
  );
};

export default Form