import React from 'react'

const LoginPage = () => {
  return (
    <form action="http://localhost:5000/api/login/" method="POST">
        <label for="user">First name:</label>
        <input type="text" id="user" name="user"/> <br/>
        <label for="password">Last name:</label>
        <input type="password" id="password" name="password"/>
        <input type="submit" value="Submit"></input>
    </form> 
  )
}

export default LoginPage
