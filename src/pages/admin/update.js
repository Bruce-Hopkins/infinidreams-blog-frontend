
import React, {useEffect, useState} from 'react'
import axios from 'axios'

import CreatePageForm from "../../components/createPageForm"
import "../../stylesheets/admin-styles/create.css"

const Form = ({id}) => {
  // TODO, Implement changes to prevent redirect
  // TODO, allow for the file to also be grabbed when updating
  return (
    <CreatePageForm url={"http://localhost:5000/api/post/" + id + "/update"} id={id}/>
  );
};

export default Form