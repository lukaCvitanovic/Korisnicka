import React, { Component } from "react";
import { graphql, StaticQuery } from "gatsby";

class Query extends Component {
  sendToParent = () => {
    this.props.parentCallback(this.props.data);
  }

  render() {
    this.sendToParent();
      return(
          <p></p>
      );
  }
}  

export default (props) => (
    <StaticQuery
    query={graphql`
    query {
        allArticlesJson (filter: {name:{eq:"db"}}) {
          edges {
            node {
              data {
                username
                pass
              }
            }
          }
        }
      }
    `}
    render={data => <Query data={data} parentCallback={props.parentCallback}/>}
    />
)