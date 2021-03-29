import React from "react"
import Helmet from "react-helmet"

function SEO (props) {
    //TODO Add title depending on the blog title
    return (
        <Helmet>
            <title>{props.title} </title>
            <meta name="description" content="Blog of Infinidream. Programming tutorials, guides, and benchmarks."/>
            <meta name="keywords" content="Infnidream Blog Bruce Hopkins Jr"/>
            <meta name="robots" content="index, follow"/>
            <meta name="language" content="EN"/>
        </Helmet>
    )
  }
  
export default SEO