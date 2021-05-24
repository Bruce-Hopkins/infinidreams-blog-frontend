import React, { useState, useEffect } from "react";
import axios from 'axios'
import "../stylesheets/admin-styles/create.css"

const Form = (props) => {

    // Gets the data from the API
    var[postsData, setPostsData] = useState([]);

    // Updates the input data
    var[bodyData, setBodyData] = useState([]);
    var[inputValueStates, setInputValueStates] = useState([]);

    var[inputSummary, setInputSummary] = useState([]);
    var[inputTitle, setInputTitle] = useState([]);
    var[inputFile, setInputFile] = useState([]);

    var inputBodyValue = [];
    var valuesList = [];

    var inputTagsValue = [];
    var tagsValuesList = [];

    var [tagsData, setTagsData] = useState([]);
    var [tagsValues, setTagsValues] = useState()

    

    // TODO, use context API in this section
    useEffect(() => {  
        (async function connectToAPI (){
        try {
            
          await axios.get('http://localhost:5000/api/posts/' + props.id).then((res) => {
            setPostsData(res.data);
            inputBodyValue = res.data.body;
            inputTagsValue = res.data.tags;
            console.log(inputTagsValue)
          });
        }
        catch(err) {
            console.error(err)
        }
        loopThroughBody();
        loopThroughTags();
    
        })()
    }, [])

    // TODO Fix body and tags reloading after pressing the button
    // Body text area. Value is the property that is inside the text area
    const Input = (props) => {
        return <textarea 
            className="body-input" 
            id={props._id} 
            name="body" 
            cols="60" 
            rows="4"
            onChange={updateBodyValue}
            >
            {props.value ? props.value : ""}
        </textarea>
    };



    // Tags text input. Value is the defualt value that the text will have
    const Tags = (props) => {
        return <input 
            className="tags-input" 
            type="text" 
            id={props._id}
            name="tags"
            defaultValue={props.value ? props.value : ""}
        />
    }

        // Takes the values from the variable inputValue and adds it to the bodyData state
        function loopThroughBody () {
            inputBodyValue.map (input => { 
                valuesList.push(<Input 
                    value={input} 
                    key={valuesList.length} 
                    _id={valuesList.length} 
                    />)
            });
            setInputValueStates(inputBodyValue);
            setBodyData(valuesList);
        }
        function loopThroughTags () {
            inputTagsValue.map (input => {
                tagsValuesList.push(<Tags
                    value={input}
                    key={tagsValuesList.length}
                    _id={tagsValuesList.length}
                />)
            });
            setTagsValues(inputTagsValue);
            setTagsData(tagsValuesList);
    
        }  

    const tagsButtonClick = event => {
        setTagsData(tagsData.concat(<Tags key={tagsData.length} _id={tagsData.length} />));
    };

    const onAddBtnClick = event => {
        setBodyData(bodyData.concat(<Input key={bodyData.length} _id={bodyData.length}/>));
    };

    // Update the body text areas everytime the text area is updated
    const updateBodyValue = event => {

        // Updates the textareas
        let id = parseInt(event.target.getAttribute('id'));
        let copyOfBodyData = bodyData;
        copyOfBodyData[id] = <Input 
            _id={id} 
            key={id} 
            value={event.target.value} 
            onChange={updateBodyValue} 
        /> 
        setBodyData(copyOfBodyData);
        
        // Then get the atrribute to POST the update request
        var copyOfInputValueStates = inputValueStates;
        copyOfInputValueStates[id] = event.target.value;
        setInputValueStates(copyOfInputValueStates);
        console.log(inputValueStates)
    }

    const updateTagsValue = event => {
        let id = parseInt(event.target.getAttribute('id'));
        let copyOfTagsData = tagsData;
        copyOfTagsData[id] = <Tags 
            _id={id} 
            key={id} 
            value={event.target.value} 
            onChange={updateTagsValue} 
        /> 
        setTagsData(copyOfTagsData);

        // Then get the atrribute to POST the update request
        var copyOftagsValues = tagsValues;
        copyOftagsValues[id] = event.target.value;
        setTagsValues(copyOftagsValues)
        console.log(tagsValues)
    }
    const updateTitleValue = event => {setInputTitle(event.target.value)}
    const updateSummaryValue = event => {setInputSummary(event.target.value)}
    const updateFileValue = event => {setInputFile(event.target.files[0])}


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
        <input 
        className="thumbnail-input" 
            type="file" 
            id="image" 
            name="image" 
            onChange={updateFileValue}
            />
        <br/>

        <label for="title">title:</label>
        <input 
            className="title-input" 
            defaultValue={props.data ? props.data.title : ""} 
            onChange={updateTitleValue}
            type="text" 
            id="title" 
            name="title"/>
        <br/>

        <label for="summary">summary:</label>
        <input 
            className="summary-input" 
            defaultValue={props.data ? props.data.summary : ""} 
            onChange={updateSummaryValue}
            type="text" 
            id="summary" 
            name="summary"/>
        <br/><br/>

        <label for="body">body:</label>
        <div className="body-group">
            {bodyData}
        </div>
        <button type="button" onClick={onAddBtnClick}>Add input</button>

        <br/><br/>
        
        <label for="tags">tags:</label>
        <div className="tags-group"> 
            {/* {props.data ? <GetTagsValue tagsArray={props.data.tags}/> : <Tags/>} */}
            {tagsData}
        </div>
        <button type="button" onClick={tagsButtonClick}>Add tags</button>
        <br/>

        <input className="submit-input" type="submit" value="Submit"></input>

        
      </form>
    </div>
  );
};

export default Form