import React from "react";
import CreatePageForm from "../../components/createPageForm"
import "../../stylesheets/admin-styles/create.css"
import LoginVerifiacation from '../../components/loginVerifiacation'


const Form = () => {
  return (
    <LoginVerifiacation>

      <CreatePageForm/>
    </LoginVerifiacation>
  );
};

export default Form