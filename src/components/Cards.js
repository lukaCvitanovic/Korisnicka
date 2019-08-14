import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import NCards from "./Novo_cards.js";
//import _ from "underscore";
//import Card from "./Card.js";

//const dirpath = "../resorces/articles/";
/*
const Pics = (list,a) => list.map(el => {
    return(
        <Card src={el[0].node.childImageSharp.fixed} text={el[1]} a={a} />
    );
});*/

const Cards = ({jpg, json, num, a}) => {
    /*
    const card = [];
    const cards_num = parseInt(num);

    var js = [];
    var jp = [];

    for(var i = 0; i<json.length; i++) {
        js.push(json[i].node);
        jp.push(jpg[i].node);
    }

    var jsort = _.sortBy(js, 'name');
    var jpsort = _.sortBy(jp, 'name');

    var jpgOld = [];
    for(i = 0; i<jpsort.length; i++) {
        var temp = {"node":jpsort[i]};
        jpgOld.push(temp);
    }

    for(i = 0;i < cards_num; i++) {
        temp = [jpgOld[i],jsort[i]];
        card.push(temp);
    }

    const crds = Pics(card,a);
    */
    console.log(json)
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
            <NCards json={json[0].node.articles} jpg={jpg} num={parseInt(num)} tag={[]} a={a} />
        </div>
    );
}

export default (props) => (
    <StaticQuery
        query={graphql`
            query Cards {
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
                                    f2: fluid(maxWidth: 400, maxHeight: 400) {
                                        ...GatsbyImageSharpFluid
                                    }
                            }
                            name
                        }
                    }
                }
                json: allArticlesJson(filter: {name: {eq: "Laptopi"}}) {
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

/*

*/

/*
class Cards extends Component {
    render({data:{allFile:{edges}}}) {
        //const crds = [];
        //const cards_num = 4;

      //  for(var i = 0; i < cards_num; i++) {
      //      crds.push(<Card />);
      //  }
        const {node} = edges;
        const crds = Pics(node);

        return(
            <div class="cards_cont">
                <div class="labels">
                    <p>Proizvodi na Akciji</p>
                    <p>LINK</p>            
                </div>
                <div class="cards">
                    {crds}
                </div>
            </div>
        );
    }
}

export default Cards;*/

/*export const query = graphql`
query Cards {
    site {
        siteMetadata {
          title
        }
      }
    }
`*/

/*
query Cards {
    allFile(filter:{relativePath:{regex:"/laptop/"}})
    {
        edges
        {
            node
            {
            relativePath
            name
            }
        }
    }
}
*/