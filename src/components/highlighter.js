import React from 'react';
// import ReactDOM from 'react-dom';
import Prism from "prismjs"
const code = `
String foo = "foo";
String bar = "bar";
`.trim()
// className="line-numbers"
// TODO, implement this code into the blog page
class Page extends React.Component {

    constructor(props) {
        super(props)
      }
    
    
  componentDidMount() {
    // You can call the Prism.js API here
    // Use setTimeout to push onto callback queue so it runs after the DOM is updated
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    return (
      <pre className>
        <code className="language-java">
          {this.props.code}
        </code>
      </pre>
    )
  }
}
export default Page