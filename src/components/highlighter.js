import React from 'react';
import Prism from "prismjs"
class Page extends React.Component {

    constructor(props) {
        super(props)
      }
    
    
  componentDidMount() {
    // Call The prism API
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    return (
      <pre className>
        <code className={this.props.language ?" language-" + this.props.language : "language-javascript"}>
          {this.props.code}
        </code>
      </pre>
    )
  }
}
export default Page