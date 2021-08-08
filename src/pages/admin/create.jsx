import React from "react";
import CreatePageForm from "../../components/createPageForm"
import "../../stylesheets/admin-styles/create.css"
import LoginVerifiacation from '../../components/loginVerifiacation'


const Form = () => {
  return (
    <LoginVerifiacation>

      <CreatePageForm url={process.env.GATSBY_BACKEND_URL + "/api/post/create"}/>
    </LoginVerifiacation>
  );
};

export default Form