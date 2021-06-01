import React from 'react'

// Context for blogpage To get the backend data. Data stucture would be simular to the default attributes
const SinglepostConetext = React.createContext([
    {
      "title": "",
      "body": [],
      "tags": [],
      "FormattedDateOfPost": "",
      "thumbnailString": "",
    }
  ]);

  export default SinglepostConetext