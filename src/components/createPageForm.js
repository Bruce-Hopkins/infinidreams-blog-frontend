import React, { useState} from "react";
import "../stylesheets/admin-styles/create.css"

const Form = (props) => {

    // Updates the input data
    var[bodyData, setBodyData] = useState([]);
    var [tagsData, setTagsData] = useState([]);
    var [hasGottenProps, setHasGottonProps] = useState(false);

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
    const Input = (props) => {
        return <textarea 
            className="body-input" 
            id={props._id} 
            name="body" 
            cols="60" 
            rows="4"
            defaultValue={props.value ? props.value : ""}
            >
            
        </textarea>
    };
    
    // Takes the values from the variable inputValue and adds it to the bodyData state
    function loopThroughBody (inputList) {
        let valuesList = [];
        inputList.map (input => { 
            valuesList.push(<Input 
                value={input} 
                key={valuesList.length} 
                _id={valuesList.length} 
                />)
        });
        setBodyData(valuesList);
    }
    function loopThroughTags (inputList) {
        let tagsValuesList = [];
        inputList.map (input => {
            tagsValuesList.push(<Tags
                value={input}
                key={tagsValuesList.length}
                _id={tagsValuesList.length}
            />)
        });
        setTagsData(tagsValuesList);
    }  

    (async function getPropsValue (){
        if(props.data && !hasGottenProps) {
            loopThroughBody(props.data.body);
            loopThroughTags(props.data.tags);

            setHasGottonProps(true)
        }
    })()
    
    const tagsButtonClick = event => {
        setTagsData(tagsData.concat(<Tags key={tagsData.length} _id={tagsData.length} />));
    };

    const onAddBtnClick = event => {
        setBodyData(bodyData.concat(<Input key={bodyData.length} _id={bodyData.length}/>));
    };

  return (
    <div>
      <form 
        className="admin-create-form" 
        method="POST" 
        enctype="multipart/form-data"
        action={ props.url ? props.url : "/"}
        >

        <label for="thumbnail">Thumbnail:</label>
        <input 
        className="thumbnail-input" 
            type="file" 
            id="image" 
            name="image" 
            />
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
            defaultValue={props.data ? props.data.summary : ""} 
            type="text" 
            id="summary" 
            name="summary"/>
        <br/><br/>

        <label for="body">body:</label>
        <div className="body-group">
            {bodyData}
            {/* {props.data ? bodyData : <Input/>} */}
        </div>
        <button type="button" onClick={onAddBtnClick}>Add input</button>

        <br/><br/>
        
        <label for="tags">tags:</label>
        <div className="tags-group"> 
        {tagsData}
            {/* { props.data ? tagsData : <Tags/>} */}
        </div>
        <button type="button" onClick={tagsButtonClick}>Add tags</button>
        <br/>

        <input className="submit-input" type="submit" value="Submit"></input>

        
      </form>
    </div>
  );
};

export default Form