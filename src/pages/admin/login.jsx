import React from 'react'

const LoginPage = () => {
  return (
    <form action= {process.env.GATSBY_BACKEND_URL + "/api/login/"} method="POST">
        <label htmlFor="user">First name:</label>
        <input type="text" id="user" name="user"/> <br/>
        <label htmlFor="password">Last name:</label>
        <input type="password" id="password" name="password"/>
        <input type="submit" value="Submit"></input>
    </form> 
  )
}

export default LoginPage
