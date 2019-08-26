import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import NCards from "./Novo_cards.js";

const Cards = ({jpg, json, num, a}) => {
    var props_json = []
        for(var i = 0; i<json.length; i++) {
            for(var j = 0; j<json[i].node.articles.length; j++) {
                props_json.push(json[i].node.articles[j])
            }
        }

    return(
        <div class="cards_cont">
            <div class="labels">
                <p>Akcija</p>
                <Link className="labels_link" to="/akcije" >
                    <p className="labels_p">
                        Prikaži sve
                    </p>
                </Link>
            </div>
            <NCards json={props_json} jpg={jpg} num={parseInt(num)} tag={["action"]} a={a} />
        </div>
    );
}

export default (props) => (
    <StaticQuery
        query={graphql`
            query Cards {
                jpg: allFile(filter:{extension:{eq:"jpg"}})
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
    render={data => <Cards jpg={data.jpg.edges} json={data.json.edges} num={props.num} a={props.a} />}
    />
)