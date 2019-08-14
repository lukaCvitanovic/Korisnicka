import React, { Component } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import NCards from "./Novo_cards.js";

class NUP extends Component {
    constructor(props) {
        super(props);
        const big = props.small * 2;
        const small = parseInt(props.small);
        this.state = {num: small, small_num: small, big_num: big, expand_btn:"Prikaži više"};
        this.click = this.click.bind(this);
    }

    click() {
        if (this.state.num === this.state.small_num)
        {
            this.setState({num: this.state.big_num});
            this.setState({expand_btn:"Sakrij"});
        }
        else
        {
            this.setState({num: this.state.small_num});
            this.setState({expand_btn:"Prikaži više"});
        }
    }

    render() {
        var props_json = []
        for(var i = 0; i<this.props.json.length; i++) {
            for(var j = 0; j<this.props.json[i].node.articles.length; j++) {
                props_json.push(this.props.json[i].node.articles[j])
            }
        }

        return(
            <div className="nup">
                <div class="labels">
                    <p>Novo u Prodaji</p>
                    <Link className="labels_link" to="/novo" >
                        <p className="labels_p">
                            Prikaži sve
                        </p>
                    </Link>       
                </div>
                <NCards json={props_json} jpg={this.props.jpg} num={this.state.num} tag={["new"]} a={this.props.a}/>
                <div className="prosiri" onClick={this.click}>
                    <p>{this.state.expand_btn}</p>
                </div>
            </div>
        );
    }
}

export default (props) => (
    <StaticQuery
    query={graphql`
        query nup {
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
                    name
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
                  }
                }
              }
        }
    `}
    render={data => <NUP jpg={data.jpg.edges} json={data.json.edges} small={props.small} a={props.a} />}
    />
)