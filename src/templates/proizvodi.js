import React, { Component } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Menu from "../components/Menu";
import ScrollButton from "../components/ScrollToTop";
import Footer from "../components/Footer";
import Item from "../components/Item";
import { graphql } from 'gatsby'
import "../styles/items_lay.css";

const findJpg = (jpg, name) => {
    for(var i = 0; i<jpg.length; i++) {
        let pic_name = jpg[i].node.name
        if(name === pic_name) {
            return jpg[i]
        }
    }
    return null
}

const findJson = (json, name) => {
    for(var i = 0; i<json.length; i++) {
        let json_name = json[i].node.name
        if(name === json_name) {
            return json[i].node
        }
    }
    return null
}

class Proizvodi extends Component {
    componentDidMount() {
        document.title = this.props.pageContext.label
    }

    render() {
        const data = {page: this.props.location.pathname, 
            user: this.props.location.state.user};
            
        const {label} = this.props.pageContext
        const jpg = findJpg(this.props.data.jpg.edges, label)
        const json = findJson(this.props.data.json.edges[0].node.articles, label)
        const item_d = [jpg, json]
        
        return(
            <body>
                <div className="site_new">
                    <Header data={data} />
                    <main className="item main">
                        <Search d={data} />
                        <Menu d={data} />
                        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
                        <Item item_data={item_d} query={this.props.data} d={data} />
                    </main>
                    <Footer />
                </div>
            </body>
        )
    }
}

export const ItemQuery = graphql`
query ItemQuery($item_jpg: String!, $item_json: String!) {
        jpg: allFile(filter: {relativePath:{regex:$item_jpg}, extension:{eq:"jpg"}})
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
        json: allArticlesJson(filter: {name: {eq: $item_json}}) {
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
                }
              }
              name
            }
        }
    }
}
`

export default Proizvodi