import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import NCards from "./Novo_cards.js";

class NovoCards extends Component {
    render() {
        
        var props_json = []
        for(var i = 0; i<this.props.json.length; i++) {
            for(var j = 0; j<this.props.json[i].node.articles.length; j++) {
                props_json.push(this.props.json[i].node.articles[j])
            }
        }
        
        return(
            <div class="cards_cont">
                <div class="labels">
                    <p>{this.props.label}</p>
                </div>
                <NCards json={props_json} jpg={this.props.jpg} num={this.props.num} tag={this.props.tag} a={this.props.a} />
            </div>
        );
    }
}

export default (props) => (
    <StaticQuery
        query={graphql`
        query NovoCards{
            jpg: allFile(filter: {extension:{eq:"jpg"}})
            {
                edges
                {
                    node
                    {
                            relativePath
                            childImageSharp {
                                fixed(width: 125, height: 125) {
                                    ...GatsbyImageSharpFixed
                                }
                                f2: fluid(maxWidth: 400, maxHeight: 400) {
                                    ...GatsbyImageSharpFluid
                                }
                        }
                        name
                    }
                }
            }
            json: allArticlesJson(filter: {name: {ne: "db"}}) {
                edges {
                  node {
                    articles {
                      node {
                        avelable
                        description
                        details
                        name
                        payment
                        price
                        warranty
                        new
                        action
                      }
                    }
                    name
                    icon
                  }
                }
              }
        }`}
    render={data => <NovoCards jpg={data.jpg.edges} json={data.json.edges} {...props} />}
    />
)