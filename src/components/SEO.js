import React from "react"
import Helmet from "react-helmet"

function SEO (props) {
    return (
        <Helmet>
            <title>{props.title} </title>
            <meta charset="UTF-8"/>
            <meta name="description" content="Blog of Infinidream. Programming tutorials, guides, and benchmarks."/>
            <meta name="keywords" content="Infnidream Blog Bruce Hopkins Jr"/>
            <meta name="robots" content="index, follow"/>
            <meta name="language" content="EN"/>
        </Helmet>
    )
  }
  
export default SEO