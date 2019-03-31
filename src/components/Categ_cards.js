import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import NCards from "./Novo_cards.js";

const CategCards = ({jpg, json, num, a, importdata}) => {
    return(
        <div class="cards_cont">
            <div class="labels">
                <p>Akcija</p>
                <Link className="labels_link" to="/about" >
                    <p className="labels_p">
                        Prikaži sve
                    </p>
                </Link>
            </div>
            <NCards json={json} jpg={jpg} num={num} tag="" a={a} />
        </div>
    );
}

export default (props) => (
    <StaticQuery
        query={graphql`
            query CategCards {
                jpg: allFile(filter:{relativePath:{regex:"/Laptopi/"},extension:{eq:"jpg"}})
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
            }
        `}
    render={data => <CategCards jpg={data.jpg.edges} json={data.json.edges} num={props.num} a={props.a} importdata={props.importdata} />}
    />
)