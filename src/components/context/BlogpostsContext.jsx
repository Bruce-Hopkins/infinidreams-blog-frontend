import React from 'react'

// Creates a context API for what the API gets from the backend
// I created a context API becuase this leaves more room for future features and expansion.
const BlogpostContext = React.createContext([
    {
      "_id": "",
      "thumbnailString": "",
      "title": "",
      "tags": [],
      "formattedDateOfPost": "",
      "summary": "",
    }
  ]);

export default BlogpostContext
