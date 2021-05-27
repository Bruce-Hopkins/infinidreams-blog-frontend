import React, { useState } from "react";
import CreatePageForm from "../../components/createPageForm"
import "../../stylesheets/admin-styles/create.css"

const Form = () => {
  // TODO, Implement changes to prevent redirect
  return (
    <CreatePageForm url={"http://localhost:5000/api/post/create"} />
  );
};

export default Form