import React from "react";
import CreatePageForm from "../../components/createPageForm"
import "../../stylesheets/admin-styles/create.css"
import LoginVerifiacation from '../../components/loginVerifiacation'


const Form = () => {
  return (
    <LoginVerifiacation>

      <CreatePageForm url={"http://server.infinidream.net/api/post/create"}/>
    </LoginVerifiacation>
  );
};

export default Form