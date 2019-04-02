import React from "react";
import { StaticQuery, graphql } from "gatsby";
import NCards from "./Novo_cards.js";

const NovoCards = ({jpg, json, num, a, tag, label}) => {
    return(
        <div class="cards_cont">
            <div class="labels">
                <p>{label}</p>
            </div>
            <NCards json={json} jpg={jpg} num={num} tag={tag} a={a} />
        </div>
    );
}

export default (props) => (
    <StaticQuery
        query={graphql`
        query NovoCards{
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
                        }
                        name
                    }
                }
            }
            json: allLaptopiJson {
                edges {
                    node {
                        description
                        price
                        payment
                        name
                    }
                }
            }
        }`}
    render={data => <NovoCards jpg={data.jpg.edges} json={data.json.edges} {...props} />}
    />
)