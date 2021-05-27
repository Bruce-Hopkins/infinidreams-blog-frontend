import React, { useState, useEffect } from "react";
import axios from 'axios'
import "../stylesheets/admin-styles/create.css"
import Cookies from 'universal-cookie';


const Form = (props) => {

    // Gets the data from the API
    var[postsData, setPostsData] = useState([]);

    // const cookies = new Cookies();
    // cookies.set('user', 'Pacman', { path: '/' });
    // console.log(cookies.get('user')); // Pacman


    

    // Updates the input data
    var[bodyComponentState, setbodyComponentState] = useState([]);
    var[inputValueStates, setInputValueStates] = useState([]);

    var[inputSummary, setInputSummary] = useState([]);
    var[inputTitle, setInputTitle] = useState([]);
    var[inputFile, setInputFile] = useState([]);

    var inputBodyValue = [];
    var bodyComponents = [];

    var inputTagsValue = [];
    var tagsComponents = [];

    var [tagsComponentsState, setTagsComponent] = useState([]);
    var [tagsValues, setTagsValues] = useState();

    var propsValues = props.data;
    var [hasGottenProps, setHasGottonProps] = useState(false);



        // Tags text input. Value is the defualt value that the text will have
    const Tags = (props) => {
        return <input 
            className="tags-input" 
            type="text" 
            id={props._id}
            name="tags"
            onChange={updateTagsValue}
            defaultValue={props.value ? props.value : ""}
        />
    }

    const Input = (props) => {
        return <textarea 
            className="body-input" 
            id={props._id} 
            name="body" 
            cols="60" 
            rows="4"
            onChange={updateBodyValue}
            defaultValue={props.value ? props.value : ""}
            >
            
        </textarea>
    };
    // Takes the values from the variable inputValue and adds it to the bodyComponentState state

    function loopThroughBody () {
        inputBodyValue.map (input => { 
            bodyComponents.push(<Input 
                value={input} 
                key={bodyComponents.length} 
                _id={bodyComponents.length} 
                />)
        });
        setInputValueStates(inputBodyValue);
        setbodyComponentState(bodyComponents);
    }
    function loopThroughTags () {
        inputTagsValue.map (input => {
            tagsComponents.push(<Tags
                value={input}
                key={tagsComponents.length}
                _id={tagsComponents.length}
            />)
        });
        setTagsValues(inputTagsValue);
        setTagsComponent(tagsComponents);

    }  

    (async function getPropsValue (){
        if(propsValues && !hasGottenProps) {
            setPostsData(propsValues)

            // TODO I could just pass these into the function parameters
            inputBodyValue = props.data.body;
            inputTagsValue = props.data.tags;

            // Set the defualt values to the states
            loopThroughBody();
            loopThroughTags();
            setInputTitle(props.data.title)
            setInputSummary(props.data.summary)

            // Prevent this function from happening again
            setHasGottonProps(true)
        }
    })()
    
    const tagsButtonClick = event => {
        setTagsComponent(tagsComponentsState.concat(<Tags key={tagsComponentsState.length} _id={tagsComponentsState.length} />));
        tagsComponents = tagsComponentsState;
    };

    const onAddBtnClick = event => {
        setbodyComponentState(bodyComponentState.concat(<Input key={bodyComponentState.length} _id={bodyComponentState.length}/>));
        bodyComponents= bodyComponentState;
    };

    // Update the body text areas everytime the text area is updated
    const updateBodyValue = event => {
        // ! If this works do the same for the other component
        console.log(bodyComponents)

        // Updates the specific textarea of the body input based on the ID
        let id = parseInt(event.target.getAttribute('id'));
        let copyOfbodyComponentState = bodyComponents;
        copyOfbodyComponentState[id] = <Input 
            _id={id} 
            key={id} 
            value={event.target.value} 
            onChange={updateBodyValue} 
        /> 
        setbodyComponentState(copyOfbodyComponentState);
        bodyComponents = copyOfbodyComponentState;
        
        // Then get the atrribute to POST the update request
        var copyOfInputValueStates = inputValueStates;
        copyOfInputValueStates[id] = event.target.value;
        setInputValueStates(copyOfInputValueStates);
    }

    const updateTagsValue = event => {
        console.log(tagsValues)

        // Updates a specific input of the tag input based on the ID
        let id = parseInt(event.target.getAttribute('id'));
        let copyOfTagsComponent = tagsComponentsState;
        copyOfTagsComponent[id] = <Tags 
            _id={id} 
            key={id} 
            value={event.target.value} 
            onChange={updateTagsValue} 
        /> 
        setTagsComponent(copyOfTagsComponent);
        tagsComponents = copyOfTagsComponent;

        // Then get the atrribute to POST the update request
        var copyOftagsValues = tagsValues;
        copyOftagsValues[id] = event.target.value;
        setTagsValues(copyOftagsValues)
    }
    const updateTitleValue = event => {setInputTitle(event.target.value)}
    const updateSummaryValue = event => {setInputSummary(event.target.value)}
    const updateFileValue = event => {setInputFile(event.target.files[0])}

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();

        // formData.append("image", inputFile);
        formData.append("title", inputTitle);
        // formData.append("summary", inputSummary);

        var formBody = new FormData();
        formBody.append("title", inputTitle)
        formBody.append("summary", inputSummary)
        inputValueStates.forEach((body) => {
            formBody.append("body", body);
        })
        console.log(tagsValues)
        tagsValues.forEach((tag) => {
            formBody.append("tags", tag);
        })


    
    
        const requestOptions = {
            // mode: 'cors', 
            credentials: 'include',
            method: 'POST',
            headers: { 
                // 'Content-Type': 'multipart/form-data; boundary=---------------------------163825111427849300701499879782', 
                "Access-Control-Allow-Origin": "http://localhost:5000/"
        },
            body: formBody
        };
        fetch(props.url, requestOptions)
            .then(response => console.log(response))
            .catch(error => console.log('Form submit error', error))
      };




  // TODO, Implement changes to prevent redirect
  return (
    <div>
      <form 
        className="admin-create-form" 
        method="POST" 
        // enctype="multipart/form-data"
        // action={ props.url ? props.url : "/"}
        onSubmit={handleSubmit}
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
            {props.data ? bodyComponentState : <Input/>}
        </div>
        <button type="button" onClick={onAddBtnClick}>Add input</button>

        <br/><br/>
        
        <label for="tags">tags:</label>
        <div className="tags-group"> 
            {/* {props.data ? <GetTagsValue tagsArray={props.data.tags}/> : <Tags/>} */}
            { props.data ? tagsComponentsState : <Tags/>}
        </div>
        <button type="button" onClick={tagsButtonClick}>Add tags</button>
        <br/>

        <input className="submit-input" type="submit" value="Submit"></input>

        
      </form>
    </div>
  );
};

export default Form